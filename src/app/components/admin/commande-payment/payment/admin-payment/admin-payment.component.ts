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
import { PaymentAdminService } from '../../../../../service/commande-payment/admin/payment-admin.service';
import { OperationBanqueService } from '../../../../../service/operationBanque.service';
import { Operation } from '../../../../../model/model.operation';


@Component({
  selector: 'app-admin-payment',
  templateUrl: './admin-payment.component.html',
  styleUrls: ['./admin-payment.component.css']
})
export class AdminPaymentComponent implements OnInit {

  visible = false;
  isVisiblePayment = false;
  isVisibleOperation =false;
  btnFermerText: string = '';
  uneCommande: Commande = new Commande;
  unPayment: Payment = new Payment;
  paymentAdminList: Array<Payment> = [];
  commanders: Array<Commander> = [];
  depotTrList: Array<Operation> = [];

  childrenVisible =false;
  

  validateFormVerifierPayment: FormGroup;
  user: AppUser;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService,
    private modalService: NzModalService,
    private authService: AuthenticationService,
    private tokenStorage: TokenStorage,
    private commandeUserService: CommandeUserService,
    private paymentAdminService: PaymentAdminService,
    private operationBanqueService: OperationBanqueService,
  ) {
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    console.log(JSON.parse(this.tokenStorage.getCurrentUser()));
    console.log(this.user.id);

    this.makeFormVerifierPayment();

    this.getPaymentAdminList();

  }


  getPaymentAdminList(){
  this.paymentAdminService.getPaymentsAdmin().subscribe((data: Array<Payment>) => {
    this.paymentAdminList = data;
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

    
    this.paymentAdminService.getPayment(codePayment).subscribe((data: Payment) => {
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
    this.paymentAdminService.deletePaymentAdmin(payment).subscribe((data: Payment) => {
      console.log(data);
      this.createMessage('success', 'Payment supprimé avec succès !');
     
      this.paymentAdminList = this.paymentAdminList.filter(d => d.id !== payment.id);
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


  inspecterOperations(payment: Payment){    
    this.unPayment = payment;
    this.uneCommande = this.unPayment.commande;
    this.getDepotTrsList(this.uneCommande);
  }


  getDepotTrsList(commande :Commande){
    this.operationBanqueService.getDepotTrByCommandeId(commande.id).subscribe((data: Array<Operation>) => {
      this.isVisibleOperation = true
      this.depotTrList = data;
      console.log(data);      
    this.btnFermerText = 'FERMER'
    },
      (error: HttpErrorResponse) => {
        this.createMessage('danger', 'Echec de chargement !');
      });
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
    this.isVisibleOperation = false;
  }

}
