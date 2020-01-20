import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../../../../../model/model.commande-service';
import { Operation } from '../../../../../model/model.operation';
import { AppUser } from '../../../../../model/model.AppUser';
import { HttpClient, HttpErrorResponse } from '../../../../../../../node_modules/@angular/common/http';
import { Router } from '../../../../../../../node_modules/@angular/router';
import { FormBuilder } from '../../../../../../../node_modules/@angular/forms';
import { NzMessageService, NzModalService } from '../../../../../../../node_modules/ng-zorro-antd';
import { AuthenticationService } from '../../../../../service/authentication.service';
import { TokenStorage } from '../../../../../utils/token.storage';
import { CommandeServiceAdminService } from '../../../../../service/commande-payment/admin/commande-service-admin.service';
import { OperationBanqueService } from '../../../../../service/operationBanque.service';
import { Services } from '../../../../../model/model.services';

@Component({
  selector: 'app-admin-commande-service',
  templateUrl: './admin-commande-service.component.html',
  styleUrls: ['./admin-commande-service.component.css']
})
export class AdminCommandeServiceComponent implements OnInit {

  isVisibleCommandeService = false;
  isVisibleOperation =false;
  selectedIndex = 0;
  btnFermerText: string = '';
  unecommandeService: CommandeService = new CommandeService;  
  service: Services = new Services("","",0,"",0,0,"",null);
  commandesServiceNonAccepteList: Array<CommandeService> = [];
  commandesServiceAccepteList: Array<CommandeService> = [];
  commandesServiceAnnuleList: Array<CommandeService> = [];
  retraitTrList: Array<Operation> = [];
  
  user: AppUser;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService,
    private modalService: NzModalService,
    private authService: AuthenticationService,
    private tokenStorage: TokenStorage,
    private commandeServiceAdminService: CommandeServiceAdminService,
    private operationBanqueService: OperationBanqueService,
  ) {
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    console.log(JSON.parse(this.tokenStorage.getCurrentUser()));
    console.log(this.user.id);
    
    this.getCommandesServiceNonAccepter();
    this.getCommandesServiceAccepter();
    this.getCommandesServiceAnnuler();  
  }


  getCommandesServiceNonAccepter(){
  this.commandeServiceAdminService.getCommandesServiceAdminNonAccepter().subscribe((data: Array<CommandeService>) => {
    this.commandesServiceNonAccepteList = data;
    console.log(data);
  },
    (error: HttpErrorResponse) => {
      this.createMessage('danger', 'Echec de chargement !');
    });
}

getCommandesServiceAccepter(){
  this.commandeServiceAdminService.getCommandesServiceAdminAccepter().subscribe((data: Array<CommandeService>) => {
    this.commandesServiceAccepteList = data;
    console.log(data);
  },
    (error: HttpErrorResponse) => {
      this.createMessage('danger', 'Echec de chargement !');
    });
}


getCommandesServiceAnnuler(){
  this.commandeServiceAdminService.getCommandesServiceAdminAnnuler().subscribe((data: Array<CommandeService>) => {
    this.commandesServiceAnnuleList = data;
    console.log(data);
  },
    (error: HttpErrorResponse) => {
      this.createMessage('danger', 'Echec de chargement !');
    });
}

  
  



  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }
  
  


  supprimerCommandeService(commandeService: CommandeService) {
    this.commandeServiceAdminService.deleteCommandeServiceAdmin(commandeService.id).subscribe((data: Boolean) => {
      console.log(data);
      this.createMessage('success', 'Commande service supprimée avec succès !');
     
      this.commandesServiceAnnuleList = this.commandesServiceAnnuleList.filter(d => d.id !== commandeService.id);
    },
      (error: HttpErrorResponse) => {
        this.createMessage('danger', 'Echec de suppression !');
      });
  }


  accepterCommandeService(commandeService: CommandeService){
    this.commandeServiceAdminService.accepterCommandeServiceAdmin(commandeService.id).subscribe((data: Boolean) => {
      console.log(data);
      this.createMessage('success', 'Commande service acceptée avec succès !');
     
      this.commandesServiceNonAccepteList = this.commandesServiceNonAccepteList.filter(d => d.id !== commandeService.id);
    },
      (error: HttpErrorResponse) => {
        this.createMessage('danger', 'Echec de l\'acceptation !');
      });
  }

  annulerCommandeService(commandeService: CommandeService){
    this.commandeServiceAdminService.annulerCommandeServiceAdmin(commandeService.id).subscribe((data: Boolean) => {
      console.log(data);
      this.createMessage('success', 'Commande service annulée avec succès !');
     
      this.commandesServiceAccepteList = this.commandesServiceAccepteList.filter(d => d.id !== commandeService.id);
    },
      (error: HttpErrorResponse) => {
        this.createMessage('danger', 'Echec de annulation !');
      });
  }




  

  inspecterCommandeService(commandeService: CommandeService) {
    this.isVisibleCommandeService = true;
    this.unecommandeService = commandeService;
    this.service = this.unecommandeService.service;
    this.btnFermerText = 'FERMER'
  }



  
  inspecterOperations(commandeService: CommandeService){
    this.operationBanqueService.getRetraitTrByCommandeServiceId(commandeService.id).subscribe((data: Array<Operation>) => {
      this.isVisibleOperation = true
      this.retraitTrList = data;
      console.log(data);      
    this.btnFermerText = 'FERMER'
    },
      (error: HttpErrorResponse) => {
        this.createMessage('danger', 'Echec de chargement !');
      });
  }

  
  

  

  
  handleCancel() {
    this.isVisibleCommandeService = false;
    this.isVisibleOperation = false;
  }

}
