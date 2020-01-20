import { Client } from '../../../model/model.client';
import { PanierService } from '../../../service/panier.service';
import { TokenStorage } from '../../../utils/token.storage';
import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../../../service/commande.service';
import { Router } from '@angular/router';
import { Commande } from '../../../model/model.commande';
import { AppUser } from '../../../model/model.AppUser';
import { NzMessageService } from 'ng-zorro-antd';
import { NzModalService } from 'ng-zorro-antd';
import { HttpErrorResponse } from '@angular/common/http';
import { Panier } from '../../../model/model.panier';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  public mode: number = 0;
  panelStyle: string = 'panel-default';

  user: AppUser = null;

  panier :Panier;

  constructor(
    public commandeService: CommandeService,
    private tokenStorage: TokenStorage,
    public panierService: PanierService,
    private message: NzMessageService,
    private modalService: NzModalService,
    private router: Router
  ) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    console.log(this.user);
  }

  ngOnInit() {
    console.log(this.user);
    //this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    console.log(this.tokenStorage.getToken());

  }

  onSaveClient(client: Client) {
    client.username = this.user.username;
    client.detail = null;
    this.commandeService.setClient(client);
    //this.panierService.setClient(client);
    this.commandeService.chargerProduitFromPanier();
    this.mode = 1;
  }

  onOrder() {
    this.commandeService.submitOrder().subscribe((data: Commande) => {
      console.log(data.verifieCompteClientOK);
      console.log(data);
      console.log(data.pin);
      console.log(data.compteClientOk);

      if (data.pin === true) {
        //this.createMessage('error', '<p>Echec copine non valide !</p>');
        console.log(data);
        this.modalService.error({
          nzTitle: 'Information',
          nzContent: '<p>Echec code pin non valide !</p>',
          nzOnOk: () => console.log('Info OK')
        });
      }

      if (data.verifieCompteClientOK === true) {
        console.log(data);
        this.modalService.error({
          nzTitle: 'Information',
          nzContent: '<p>compte non opérationnel, veillez contacter atout !</p>',
          nzOnOk: () => console.log('Info OK')
        });
        
        //this.createMessage('error', '<p>compte non opérationnel, veillez contacter atout !</p>');
      }
      if (data.compteClientOk === true) {
        console.log(data);
        // this.createMessage('error', '<p>Echec vous ne pouvez pas acheté pour quelqu\'un !</p>');
        this.modalService.warning({
          nzTitle: 'Information',
          nzContent: '<p>Echec vous ne pouvez pas acheté pour quelqu\'un !</p>',
          nzOnOk: () => console.log('Info OK')
        });
      }
      if (data.stockOk === true) {
        console.log(data);
        // this.createMessage('error', '<p>Votre solde est insufissant !</p>');
        this.modalService.warning({
          nzTitle: 'Information',
          nzContent: '<p>Le stock est insufissant pour votre Commande. veuillez reconstituer votre panier !</p>',
          //nzOnOk: () => console.log('Info OK')
          nzOnOk: () => this.finCommande()
        });
      }
      if (data.soldeOk === true) {
        console.log(data);
        // this.createMessage('error', '<p>Votre solde est insufissant !</p>');
        this.modalService.warning({
          nzTitle: 'Information',
          nzContent: '<p>Votre solde est insufissant !</p>',
          nzOnOk: () => console.log('Info OK')
        });
      }
      if (data.soldeOk === false && data.compteClientOk === false && data.verifieCompteClientOK === false && data.pin === false && data.stockOk === false) {
        this.commandeService.commande.id = data.id;
        this.commandeService.commande.date = data.date;
        this.panelStyle = 'panel-success';

        this.modalService.info({
          nzTitle: 'Information',
          nzContent: '<p> Merci pour votre commande.</p>',
          nzOkText: null,
          nzCancelText: 'Ok',
          nzOnCancel: () => this.finCommande()
        });
      }

    }, (error: HttpErrorResponse) => {
      //this.createMessage('warning', 'Echec de l\'enregistrement commande ! ');
      this.modalService.error({
        nzTitle: 'Information',
        nzContent: '<p>Echec de l\'enregistrement commande !</p>',
        nzOnOk: () => console.log('Info OK')
      });
    });
  }

  finCommande(){
    //localStorage.removeItem('locale');
    //this.panierService.panier.items = [];  
    this.panierService.initPanier();
    this.commandeService.initCommande();
    //localStorage.setItem('locale', JSON.stringify(this.panier));
    //this.router.navigateByUrl("/panier");
    this.router.navigateByUrl("/market-all");
    //this.router.navigateByUrl("/market-all");
  }


  onPayOrder() {
    this.router.navigateByUrl('/payment/' + this.commandeService.commande.id);
  }

  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }

  onReturnMarket(){    
    this.router.navigateByUrl("/market-all");
  }

  onReturnPanier(){    
    this.router.navigateByUrl("/panier");
  }

}
