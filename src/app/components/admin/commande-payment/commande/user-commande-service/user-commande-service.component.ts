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
import { CommandeServiceUserService } from '../../../../../service/commande-payment/user/commande-service-user.service';
@Component({
  selector: 'app-user-commande-service',
  templateUrl: './user-commande-service.component.html',
  styleUrls: ['./user-commande-service.component.css']
})
export class UserCommandeServiceComponent implements OnInit {

  isVisibleCommandeService = false;
  selectedIndex = 0;
  btnFermerText: string = '';
  unecommandeService: CommandeService = new CommandeService;  
  service: Services = new Services("","",0,"",0,0,"",null);
  commandesServiceNonAccepteList: Array<CommandeService> = [];
  commandesServiceAccepteList: Array<CommandeService> = [];
  
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
    private commandeServiceUserService: CommandeServiceUserService,
    private operationBanqueService: OperationBanqueService,
  ) {
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    console.log(JSON.parse(this.tokenStorage.getCurrentUser()));
    console.log(this.user.id);
    
    this.getCommandesServiceNonAccepter();
    this.getCommandesServiceAccepter();
  }


  getCommandesServiceNonAccepter(){
  this.commandeServiceUserService.getCommandesServiceUserNonAccepter(this.user.id).subscribe((data: Array<CommandeService>) => {
    this.commandesServiceNonAccepteList = data;
    console.log(data);
  },
    (error: HttpErrorResponse) => {
      this.createMessage('danger', 'Echec de chargement !');
    });
}

getCommandesServiceAccepter(){
  this.commandeServiceUserService.getCommandesServiceUserAccepter(this.user.id).subscribe((data: Array<CommandeService>) => {
    this.commandesServiceAccepteList = data;
    console.log(data);
  },
    (error: HttpErrorResponse) => {
      this.createMessage('danger', 'Echec de chargement !');
    });
}



  
  



  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }
  
  


  supprimerCommandeServiceA(commandeService: CommandeService) {
    this.commandeServiceUserService.deleteCommandeServiceUser(commandeService.id).subscribe((data: Boolean) => {
      console.log(data);
      this.createMessage('success', 'Commande service supprimée avec succès !');
     
      this.commandesServiceAccepteList = this.commandesServiceAccepteList.filter(d => d.id !== commandeService.id);
    },
      (error: HttpErrorResponse) => {
        this.createMessage('danger', 'Echec de suppression !');
      });
  }

  supprimerCommandeServiceNA(commandeService: CommandeService) {
    this.commandeServiceUserService.deleteCommandeServiceUser(commandeService.id).subscribe((data: Boolean) => {
      console.log(data);
      this.createMessage('success', 'Commande service supprimée avec succès !');
     
      this.commandesServiceNonAccepteList = this.commandesServiceNonAccepteList.filter(d => d.id !== commandeService.id);
    },
      (error: HttpErrorResponse) => {
        this.createMessage('danger', 'Echec de suppression !');
      });
  }


 

  

  inspecterCommandeService(commandeService: CommandeService) {
    this.isVisibleCommandeService = true;
    this.unecommandeService = commandeService;
    this.service = this.unecommandeService.service;
    this.btnFermerText = 'FERMER'
  }




  

  
  handleCancel() {
    this.isVisibleCommandeService = false;
  }

}
