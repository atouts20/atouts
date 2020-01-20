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
import { CommandeAdminService } from '../../../../../service/commande-payment/admin/commande-admin.service';
import { Operation } from '../../../../../model/model.operation';
import { OperationBanqueService } from '../../../../../service/operationBanque.service';

@Component({
  selector: 'app-admin-commande',
  templateUrl: './admin-commande.component.html',
  styleUrls: ['./admin-commande.component.css']
})
export class AdminCommandeComponent implements OnInit {
  visible = false;
  isVisibleCommande = false;
  isVisibleOperation =false;
  selectedIndex = 0;
  btnFermerText: string = '';
  uneCommande: Commande = new Commande;
  payment: Payment = null;
  commandesNonPayerList: Array<Commande> = [];
  commandesPayerList: Array<Commande> = [];
  retraitTrList: Array<Operation> = [];
  //produits: Array<ProduitItems> = [];
  commanders: Array<Commander> = [];

  childrenVisible =false;

  validateFormPayment: FormGroup;
  user: AppUser;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService,
    private modalService: NzModalService,
    private authService: AuthenticationService,
    private tokenStorage: TokenStorage,
    private commandeAdminService: CommandeAdminService,
    private paymentUserService: PaymentUserService,
    private operationBanqueService: OperationBanqueService,
  ) {
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    console.log(JSON.parse(this.tokenStorage.getCurrentUser()));
    console.log(this.user.id);

    this.makeFormPayment(null); 

    this.getCommandesNonPayer();
    this.getCommandesPayer(); 

  }


getCommandesNonPayer(){
  this.commandeAdminService.getCommandesAdminNonPayer().subscribe((data: Array<Commande>) => {
    this.commandesNonPayerList = data;
    console.log(data);
  },
    (error: HttpErrorResponse) => {
      this.createMessage('danger', 'Echec de chargement !');
    });
}

getCommandesPayer(){
  this.commandeAdminService.getCommandesAdminPayer().subscribe((data: Array<Commande>) => {
    this.commandesPayerList = data;
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

  payerCommande(commande :Commande){
    this.open();
    this.uneCommande = commande;
  }


  makeFormPayment(payment: Payment): void {
    this.validateFormPayment = this.fb.group({
      badgeLivreur: [(payment != null) ? payment.badgeLivreur : null, [Validators.required]],
      contrepartieFcfa: [(payment != null) ? payment.contrepartieFcfa : null, [Validators.required, Validators.min(0)]],
      observation: [(payment != null) ? payment.observation : null],
    });
  }

  

  enregistrerPayment() {
    this.payment = {
      id: null,
      datePayment: null,
      montant: null,
      contrepartieFcfa: this.validateFormPayment.value.contrepartieFcfa,
      badgeLivreur: this.validateFormPayment.value.badgeLivreur,
      codePayment: null,
      observation: this.validateFormPayment.value.observation,
      supr: false,
      commande: this.uneCommande,
    };
    console.log(this.payment);

    
    this.paymentUserService.postPayment(this.payment).subscribe((data: Payment) => {
      console.log(data);

      if(data !== null){

        this.close();

      this.modalService.info({
        nzTitle: 'Information',
        nzContent: '<p> Payment effectué avec succès.</p>'+
        '<p> Le code de payment est: '+ data.codePayment +' .</p>',
        nzOkText: null,
        nzCancelText: 'Ok',
        nzOnCancel: () => this.finPayment()
      });

      }else{
        this.createMessage('danger', 'Problème de payment !');
      }

      


    },
      (error: HttpErrorResponse) => {
        this.createMessage('danger', 'Echec du payment !');
      });
  }




  finPayment(){
    console.log("Payment ok");
  }



  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }
  
  


  supprimerCommande(commande: Commande) {
    this.commandeAdminService.deleteCommandeAdmin(commande.id).subscribe((data: Boolean) => {
      console.log(data);
      this.createMessage('success', 'Commande supprimée avec succès !');
     
      this.commandesPayerList = this.commandesPayerList.filter(d => d.id !== commande.id);
    },
      (error: HttpErrorResponse) => {
        this.createMessage('danger', 'Echec de suppression !');
      });
  }




  

  inspecterCommande(commande: Commande) {
    this.isVisibleCommande = true;
    this.uneCommande = commande;
    this.commanders = this.uneCommande.commanders;
    this.btnFermerText = 'FERMER'
  }



  
  inspecterOperations(commande :Commande){
    this.operationBanqueService.getRetraitTrByCommandeId(commande.id).subscribe((data: Array<Operation>) => {
      this.isVisibleOperation = true
      this.retraitTrList = data;
      console.log(data);      
    this.btnFermerText = 'FERMER'
    },
      (error: HttpErrorResponse) => {
        this.createMessage('danger', 'Echec de chargement !');
      });
  }
  

  

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateFormPayment.reset();
    for (const key in this.validateFormPayment.controls) {
      this.validateFormPayment.controls[key].markAsPristine();
      this.validateFormPayment.controls[key].updateValueAndValidity();
    }
  }

  
  handleCancel() {
    this.isVisibleCommande = false;
    this.isVisibleOperation = false;
  }

}
