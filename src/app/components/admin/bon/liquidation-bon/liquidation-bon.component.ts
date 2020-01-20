import { Component, OnInit } from '@angular/core';
import { Bon } from '../../../../model/model.bon';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import { AuthenticationService } from '../../../../service/authentication.service';
import { BonService } from '../../../../service/bon.service';
import { AppUser } from '../../../../model/model.AppUser';
import { TokenStorage } from '../../../../utils/token.storage';

@Component({
  selector: 'app-liquidation-bon',
  templateUrl: './liquidation-bon.component.html',
  styleUrls: ['./liquidation-bon.component.css']
})
export class LiquidationBonComponent implements OnInit {

  visible = false;

  bon: Bon;

  retourBon: any;

  validateForm: FormGroup;

  dataSet: Array<Bon> = [];

  user: AppUser = null;
  childrenVisible = false;

  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    private authService: AuthenticationService,
    private bonService: BonService,
    private tokenStorage: TokenStorage,
  ) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    console.log(this.user);
  }

  ngOnInit() {

    this.makeForm();
    this.loadLiquide();
  }
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  makeForm(): void {
    this.validateForm = this.fb.group({

      id: [null, [Validators.required]],
    });
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }



  submitForm(): void {

    const formData = this.validateForm.value;

    this.bon = new Bon(null, formData.numeroBon, null, null, null, null, null,
      this.user.username, null, null);
    console.log(this.bon);
    this.bonService.saveLiquidation(this.bon)
      .subscribe(
        data => {
          this.retourBon = data;
          console.log(data);
          if (this.retourBon != null) {
            this.modalService.info({
              nzTitle: 'Information',
              nzContent: '<p> Le bon numero,  <strong>' + data.id +
                '</strong> de montant  <strong>' + data.montant + ' </strong> a été ' +
                'liquidé avec succès.</p>',
              nzOkText: null,
              nzCancelText: 'Ok',
              nzOnCancel: () => this.initialiseFormulaire()
            });
          } else {

            this.modalService.info({
              nzTitle: 'Information',
              nzContent: '<p> Echec encaissement.</p>',
              nzOkText: null,
              nzCancelText: 'Ok',
              nzOnCancel: () => this.initialiseFormulaire()
            });

          }

          console.log(data);
        },
        err => {
          console.log(err);
        });

  }

  initialiseFormulaire(): void {
    this.validateForm.reset();
  }
  private loadLiquide() {
    this.bonService.listLiquide()
      .subscribe((data: Array<Bon>) => {
        console.log(data);
        this.dataSet = data;
        console.log(data);
      }, err => {
        console.log('Echec de chargements des Comptes !!!');
      });
  }

  // Debut méthode format monnetaire
  formatNumber(num: number): string {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }
  // Fin méthode format monnetaire

}
