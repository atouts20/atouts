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

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private host: string = environment.backend + '/commande';
  
  public commande:Commande=new Commande();

  constructor(private panierService:PanierService,
    private httpClient:HttpClient,
    private tokenStorage: TokenStorage,){}

    public setClient(client:Client){
      this.commande.client=client;
    }

    public chargerProduitFromPanier(){
      this.commande.produits=[];
     this.panierService.panier.items.forEach(item => {
      this.commande.produits.push(item);          
     });
     console.log(this.commande);
    }

    public getTotal():number{
      let total:number=0;
      this.commande.produits.forEach(p=>{
        total+=p.prix*p.quantite;
      });
      return total;
    }
  
    submitOrder() {
      console.log(this.commande);
      console.log(this.tokenStorage.getToken());

      return this.httpClient.post(this.host+"/ajout-commandes",this.commande,);
    }


    reverseStock() {
      console.log(this.commande);
      console.log(this.tokenStorage.getToken());
      return this.httpClient.post(this.host+"/reverse",this.commande,);
    }



initCommande(){
  this.commande = new Commande();
}



    /* { headers: new HttpHeaders({ 'Authorization': this.tokenStorage.getToken() }) } */
  
    public getCommande(id:number):Observable<Commande>{
      return this.httpClient.get<Commande>(this.host+"/commandes/"+id);
    }

}
