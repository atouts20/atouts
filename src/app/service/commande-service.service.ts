import { TokenStorage } from '../utils/token.storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Panier } from '../model/model.panier';
import { ProduitItems } from '../model/model.produitItems';
import { Produit } from '../model/model.produit';
import { Commande } from '../model/model.commande';
import { PanierService } from './panier.service';
import { environment } from '../../environments/environment';
import { Client } from '../model/model.client';
import { Observable } from 'rxjs';
import { CommandeService } from '../model/model.commande-service';

@Injectable({
  providedIn: 'root'
})
export class CommandeServiceService {
  private host: string = environment.backend + '/commande-service';
  
  public commandeService:CommandeService=new CommandeService();

  constructor(private panierService:PanierService,
    private httpClient:HttpClient,
    private tokenStorage: TokenStorage,){}

    public setClient(client:Client){
      this.commandeService.client=client;
    }

    public chargerServiceFromLocal(){
      this.commandeService.service = JSON.parse(localStorage.getItem('service')); 
     console.log(this.commandeService);
    }
    
  
    submitOrder() {
      console.log(this.commandeService);
      console.log(this.tokenStorage.getToken());
      return this.httpClient.post(this.host+"/ajout-commande-service",this.commandeService,);
    }


    reverseStock() {
      console.log(this.commandeService);
      console.log(this.tokenStorage.getToken());

      return this.httpClient.post(this.host+"/reverse",this.commandeService,);
    }

    
    /* { headers: new HttpHeaders({ 'Authorization': this.tokenStorage.getToken() }) } */
  
   /*  public getCommande(id:number):Observable<Commande>{
      return this.httpClient.get<Commande>(this.host+"/commandes/"+id);
    } */

}
