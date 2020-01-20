import { Client } from '../../../model/model.client';
import { Component, OnInit } from '@angular/core';
import { AppUser } from '../../../model/model.AppUser';
import { TokenStorage } from '../../../utils/token.storage';
import { PanierService } from '../../../service/panier.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { CommandeServiceService } from '../../../service/commande-service.service';
//import { Client } from '../../../model/model.client';
import { CommandeService } from '../../../model/model.commande-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-client-service',
  templateUrl: './client-service.component.html',
  styleUrls: ['./client-service.component.css']
})
export class ClientServiceComponent implements OnInit {

  public mode: number = 0;
  panelStyle: string = 'panel-default';

  user: AppUser = null;

  //client: Client = null;
  client: Client={nom:"", prenom: "",email:"",phoneNumber:"",addresse:"",username:"",livraison:"", detail: "",pin:0};

  constructor(
    public commandeServiceService: CommandeServiceService,
    private tokenStorage: TokenStorage,
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
    this.commandeServiceService.setClient(client);
    this.commandeServiceService.chargerServiceFromLocal();
    this.mode = 1;
  }

  onOrder() {
    this.commandeServiceService.submitOrder().subscribe((data: CommandeService) => {
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
      if (data.soldeOk === true) {
        console.log(data);
        // this.createMessage('error', '<p>Votre solde est insufissant !</p>');
        this.modalService.warning({
          nzTitle: 'Information',
          nzContent: '<p>Votre solde est insufissant !</p>',
          nzOnOk: () => console.log('Info OK')
        });
      }
      if (data.soldeOk === false && data.compteClientOk === false && data.verifieCompteClientOK === false && data.pin === false) {
        this.commandeServiceService.commandeService.id = data.id;
        this.commandeServiceService.commandeService.date = data.date;
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
  localStorage.removeItem('service');
}
  


  /* onPayOrder() {
    this.router.navigateByUrl('/payment/' + this.commandeService.commande.id);
  } */

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
