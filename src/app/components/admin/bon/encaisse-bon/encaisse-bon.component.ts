import { Component, OnInit } from '@angular/core';
import { Bon } from '../../../../model/model.bon';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { AuthenticationService } from '../../../../service/authentication.service';
import { BonService } from '../../../../service/bon.service';
import { AppUser } from '../../../../model/model.AppUser';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-encaisse-bon',
  templateUrl: './encaisse-bon.component.html',
  styleUrls: ['./encaisse-bon.component.css']
})
export class EncaisseBonComponent implements OnInit {

  visible = false;
  numero: string = '';
  secret: number;

  bon: Bon;
  isVisibleBon;
  retourBon: any;
  childrenVisible = false;
  btnFermerText: string;

  validateForm: FormGroup;

  dataSet: Array<Bon> = [];

  user: AppUser = null;
  unBonTrouver: Bon;
  uneReponse

  tabs = [
    {
      active: true,
      name: 'Encaisser',
      icon: 'pay-circle',
      position: 0
    },
    {
      active: false,
      name: 'Confirmation',
      icon: 'check',
      position: 1
    },
    {
      active: false,
      name: 'Imprimer',
      icon: 'printer',
      position: 2
    },
    {
      active: false,
      name: 'Emettre',
      icon: 'money-collect',
      position: 3
    },
  ];

  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    private authenticationService: AuthenticationService,
    private bonService: BonService,
    private message: NzMessageService,
  ) {

  }

  ngOnInit() {
    this.makeForm();
    this.loadEncaisse();

    //this.user = this.authenticationService.loadIdUser();

  }
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  makeForm(): void {
    this.validateForm = this.fb.group({

      numeroBon: [null, [Validators.required]],
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

  rechercherUnBon() {
    console.log(this.numero);
    if (this.numero == '' || this.numero == null) {
      this.createMessage('error', 'Echec ! veillez entré un numero du bon !');
    } else {
      this.bonService.listByNumeroBon(this.numero).subscribe(
        (data: Bon) => {
          this.unBonTrouver = data;
          if (data != null) {

            this.modalService.info({
              nzTitle: 'Information',
              nzContent: '<p> Le Bon de numero . <strong>' + data.numeroBon +
                '</strong> et valeur <strong>' + data.montant + ' </strong> a été retrouvé avec succès et peut etre encassé après confirmation.</p>',
              nzOkText: null,
              nzCancelText: 'Ok',
              nzOnCancel: () => this.validateForm.reset()
            });
          } else {
            this.modalService.error({
              nzTitle: 'Erreur',
              nzContent: '<p> Le Bon de numero . <strong>' + data.numeroBon +
                '</strong> n\'existe plus. Veillez bien vérifier le numero du bon.</p>',
              nzOkText: null,
              nzCancelText: 'Ok',
              nzOnCancel: () => this.validateForm.reset()
            });
          }
        }, (error: HttpErrorResponse) => {
          this.createMessage('error', 'Echec de la recherche du bon ! ce numero n\'est pas valide');
        });
    }
  }
  confirmationBon() {
    this.bon = new Bon(null, null, null, this.secret, null, null, null,
      null, null, null);

    if (this.bon == null) {
      this.createMessage('error', 'Echec ! veillez entré un secret du bon !');
    } else {
      this.bonService.saveEncaisse(this.bon).subscribe(
        (data: Bon) => {
          this.unBonTrouver = data;
          if (data != null) {
            this.modalService.info({
              nzTitle: 'Information',
              nzContent: '<p> Félicitation votre opératio d\'encaissement de <strong>' + data.montant +
                '</strong> et valeur a été effectué avec succès. Le bon numero <strong>' + data.numeroBon +
                ' </strong> peut etre liquidé par un partenaire</p>',
              nzOkText: null,
              nzCancelText: 'Ok',
              nzOnCancel: () => this.validateForm.reset()
            });
          } else {
            this.modalService.error({
              nzTitle: 'Erreur',
              nzContent: '<p> Erreur du secret du bon . <strong>' + data.numeroBon +
                '</strong>ce secret n\'existe pas. Veillez bien vérifier le secret du bon.</p>',
              nzOkText: null,
              nzCancelText: 'Ok',
              nzOnCancel: () => this.validateForm.reset()
            });
          }
        }, (error: HttpErrorResponse) => {
          this.createMessage('error', 'Echec de la recherche du bon ! ce secret n\'est pas valide');
        });
    }
  }
  handleCancel() { }

  /*  confirmationBon1(): void {
 
     const formData = this.validateForm.value;
 
     this.bon = new Bon(null, formData.numeroBon, null, null, null, null, this.user.username,
       null, null, null);
     console.log(this.bon);
     this.bonService.saveEncaisse(this.bon)
       .subscribe(
         data => {
           this.retourBon = data;
           console.log(data);
           if (this.retourBon != null) {
             this.modalService.info({
               nzTitle: 'Information',
               nzContent: '<p> Le bon numero,  <strong>' + data.id +
                 '</strong> de montant  <strong>' + data.montant + ' </strong> a été ' +
                 'encaissé avec succès.</p>',
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
 
   } */

  initialiseFormulaire(): void {
    this.validateForm.reset();
  }

  private loadEncaisse() {
    this.bonService.listEncaisse()
      .subscribe((data: Array<Bon>) => {
        console.log(data);
        this.dataSet = data;
        console.log("test test test" + data);
      }, err => {
        console.log('Echec de chargements des Comptes !!!');
      });
  }
  /* Debut méthode format monnetaire */
  formatNumber(num: number): string {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }
  /* Fin méthode format monnetaire */

  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }
}
