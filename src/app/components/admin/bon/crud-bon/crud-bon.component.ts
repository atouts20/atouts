import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Bon } from '../../../../model/model.bon';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import { AuthenticationService } from '../../../../service/authentication.service';
import { BonService } from '../../../../service/bon.service';
import { AppUser } from '../../../../model/model.AppUser';
import { TokenStorage } from '../../../../utils/token.storage';
import { HttpErrorResponse } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-crud-bon',
  templateUrl: './crud-bon.component.html',
  styleUrls: ['./crud-bon.component.css']
})
export class CrudBonComponent implements OnInit {

  // input numric
  value = '';
  title = 'Input a number';

  visible = false;

  bon: Bon;
  retourBon: Bon;
  validateForm: FormGroup;

  bonList: Array<Bon> = [];

  user: AppUser = null;
  childrenVisible = false;

  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    private authenticationService: AuthenticationService,
    private tokenStorage: TokenStorage,
    private message: NzMessageService,
    private bonService: BonService) {

  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    this.makeForm();
    this.loadBon();

  }
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  makeForm(): void {
    this.validateForm = this.fb.group({

      montant: [null, [Validators.required, Validators.min(0)]],
      description: [null, [Validators.required]],
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
    if (formData.montant >= 500 && this.validateForm.valid) {
      this.bon = new Bon(null, null, formData.description, null, formData.montant, null, null,
        null, this.user.username, null);
      console.log(this.bon);
      this.bonService.save(this.bon).subscribe(
        (data: Bon) => {
          this.retourBon = data;
          if (this.retourBon.id != null) {
            this.bonList.unshift(this.retourBon);
            this.createMessage('success', '<p> Le bon numero,  <strong>' + data.numeroBon +
              '</strong> de montant  <strong>' + data.montant + ' </strong> a été ' +
              'créé avec succès.</p>');

          } else {
            this.createMessage('danger', 'Solde insufisant !');
          }
        },
        (error: HttpErrorResponse) => {
          this.createMessage('danger', 'Echec de génération du bon !');
        });
    } else {
      this.createMessage('danger', 'Désolé le montant du bon à généré doit etre supérieur à 500 !');
    }


  }

  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }

  initialiseFormulaire(): void {
    this.validateForm.reset();
  }

  private loadBon() {
    this.bonService.list()
      .subscribe((data: Array<Bon>) => {
        console.log(data);
        this.bonList = data;
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
