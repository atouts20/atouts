import { Component, OnInit } from '@angular/core';
import { Commande } from '../../../../../model/model.commande';
import { CommandeUserService } from '../../../../../service/commande-payment/user/commande-user.service';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Payment } from '../../../../../model/model.payment';
import { PaymentUserService } from '../../../../../service/commande-payment/user/payment-user.service';
import { AppUser } from '../../../../../model/model.AppUser';
import { Router } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { AuthenticationService } from '../../../../../service/authentication.service';
import { TokenStorage } from '../../../../../utils/token.storage';
import { ProduitItems } from '../../../../../model/model.produitItems';
import { Commander } from '../../../../../model/model.commander';

@Component({
  selector: 'app-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.css']
})
export class UserPaymentComponent implements OnInit {
  visible = false;
  isVisiblePayment = false;
  btnFermerText: string = '';
  uneCommande: Commande = new Commande;
  unPayment: Payment = new Payment;
  paymentUserList: Array<Payment> = [];
  commanders: Array<Commander> = [];

  validateFormVerifierPayment: FormGroup;
  user: AppUser;

  childrenVisible = false;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService,
    private modalService: NzModalService,
    private authService: AuthenticationService,
    private tokenStorage: TokenStorage,
    private commandeUserService: CommandeUserService,
    private paymentUserService: PaymentUserService,
  ) {
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    console.log(JSON.parse(this.tokenStorage.getCurrentUser()));
    console.log(this.user.id);

    this.makeFormVerifierPayment();

    this.getPaymentUserList();

  }


  getPaymentUserList(){
  this.paymentUserService.getPaymentsUser().subscribe((data: Array<Payment>) => {
    this.paymentUserList = data;
    console.log(data);
  },
    (error: HttpErrorResponse) => {
      this.createMessage('danger', 'Echec de chargement !');
    });
}

  
  
open(): void {
  this.visible = true;
}


close(): void {
  this.visible = false;
}
  


  makeFormVerifierPayment(): void {
    this.validateFormVerifierPayment = this.fb.group({
      codePayment: [null, [Validators.required]],
    });
  } 

  

  verifierPayment() {

    let codePayment = this.validateFormVerifierPayment.value.codePayment;

    
    this.paymentUserService.getPayment(codePayment).subscribe((data: Payment) => {
      console.log(data);

      if(data !== null){

        this.close();

      this.modalService.info({
        nzTitle: 'Information',
        nzContent: '<p> Code payement valide.</p>'+
        '<p> La commande numero: '+ data.commande.id +' de montant total '
        + data.commande.totalAmount +',</p>'+ '<p> a été dejà payé </p>',
        nzOkText: null,
        nzCancelText: 'Ok',
        nzOnCancel: () => this.finPayment()
      });

      }else{
        this.modalService.info({
          nzTitle: 'Information',
          nzContent: '<p> Code payement invalide.</p>'+
          '<p> La commande numero: '+ data.commande.id +' de montant total '
          + data.commande.totalAmount +',</p>'+ '<p> n\'est pas encore payé </p>',
          nzOkText: null,
          nzCancelText: 'Ok',
          nzOnCancel: () => this.finPayment1()
        });
      }

      


    },
      (error: HttpErrorResponse) => {
        this.createMessage('danger', 'Echec de vérification ! réessayer ou contacter Aatout.');
      });
  } 




  finPayment(){
    console.log("Vérification ok");
  } 
  finPayment1(){
    console.log("Vérification non ok");
  } 


  



  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }
  
  


  supprimerPayment(payment: Payment) {
    this.paymentUserService.deletePaymentUser(payment).subscribe((data: Payment) => {
      console.log(data);
      this.createMessage('success', 'Payment supprimé avec succès !');
     
      this.paymentUserList = this.paymentUserList.filter(d => d.id !== payment.id);
    },
      (error: HttpErrorResponse) => {
        this.createMessage('danger', 'Echec de suppression !');
      });
  }




  

  inspecterPayment(payment: Payment) {
    this.isVisiblePayment = true;
    this.unPayment = payment;
    this.uneCommande = this.unPayment.commande;
    this.commanders = this.uneCommande.commanders;
    this.btnFermerText = 'FERMER'
  }

  

  

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateFormVerifierPayment.reset();
    for (const key in this.validateFormVerifierPayment.controls) {
      this.validateFormVerifierPayment.controls[key].markAsPristine();
      this.validateFormVerifierPayment.controls[key].updateValueAndValidity();
    }
  }

  
  handleCancel() {
    this.isVisiblePayment = false;
  }

}
