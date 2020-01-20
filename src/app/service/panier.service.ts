import { Client } from '../model/model.client';
import { Injectable } from '@angular/core';
import { Panier } from '../model/model.panier';
import { ProduitItems } from '../model/model.produitItems';
import { Produit } from '../model/model.produit';
import { NzMessageService } from 'ng-zorro-antd';
import { ProduitsService } from './produits.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DestockageForm } from '../model/DestockageForm';
import { TokenStorage } from '../utils/token.storage';
import { AppUser } from '../model/model.AppUser';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  public panier: Panier = null;
  //produitItems : IterableIterator<ProduitItems>;
  public currentCaddyName: string = "panier";
  client: Client = { nom: "", prenom: "", email: "", phoneNumber: "", addresse: "", username: "", livraison: "", detail: "", pin: 0 };
  qt = 0;
  public val = 0;
  user: AppUser = null;
  /* public listPaniers:Array<{num:number,name:string}>=[{num:1,name:'panier'}];
  public paniers:Map<string,Panier>=new Map(); */

  constructor(
    private message: NzMessageService,
    private produitsService: ProduitsService, 
    private tokenStorage: TokenStorage,) {
      
    /* this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    console.log(this.user); */

    let panier = localStorage.getItem("locale");

    if (panier) {
      this.panier = JSON.parse(panier);
    } else {

       this.panier = new Panier(this.currentCaddyName);
      this.panier.client = { nom: "", prenom: "", email: "", phoneNumber: "", addresse: "", username: "", livraison: "", detail: "", pin: 0 }; 
      
      //this.panier.appUser
      //.panier = this.user.panier;

      localStorage.setItem('locale', JSON.stringify(this.panier));
      console.log(panier);
    }
  }

  // Adding new Product to cart db if logged in else localStorage
  addToCart(produit: Produit): void {
    console.log(produit);
    console.log(produit.id);
    console.log(this.panier);

    

    this.ChargerPanier();
    //console.log(this.panier.items.entries());
  //let produitItems = this.panier.items.get(produit.id);
  const index = this.panier.items.findIndex(item => item.id === produit.id);
    if (index > -1) {
      //produitItems = this.panier.items.get(produit.id);
      //console.log( this.produitItems);
      //produitItems.quantite += produit.quantite; 
      this.panier.items[index].quantite += produit.quantite; 

      if(this.panier.items[index].quantite > 2 ){
        this.panier.items[index].quantite -= produit.quantite; 
        this.createMessage('warning', 'quantité maximale par produit atteinte!');
      }

      localStorage.setItem('locale', JSON.stringify(this.panier));
      //this.savePanier();
    } else {

        if(this.panier.items.length <= 2){

      let produitItems = new ProduitItems();
      produitItems.id = produit.id;
      produitItems.nom = produit.nom;
      produitItems.prix = produit.prix;
      produitItems.quantite = produit.quantite;
      produitItems.tBCCV = produit.tBCCV;
      this.panier.items.unshift(produitItems);
      console.log('this.panier');
      console.log(this.panier);
      console.log('this.panier.items');
      console.log(this.panier.items);
      //console.log('this.panier.items.valeur');
      //console.log(this.panier.items.values());
      this.savePanier();
     // this.produitItems  = this.panier.items.values();
      localStorage.setItem('locale', JSON.stringify(this.panier));

      }else{
        this.createMessage('warning', 'Vous ne pouvez constituer un panier de plus de 3 produits !');
      }

    }
  }

  returnQtPn(produit: Produit) : number{
    
    const index = this.panier.items.findIndex(item => item.id === produit.id);
    if (index > -1) { 
      this.qt = this.panier.items[index].quantite;
    }
    return this.qt;

  }


  savePanier() {
    console.log(this.panier);
    //let panier=this.paniers[this.currentCaddyName];
    //localStorage.setItem(this.currentCaddyName, JSON.stringify(panier));
  }

  /* loadCaddyFromLocalStorage(): Panier {
    let myCaddiesList=localStorage.getItem("ListCaddies_"+this.authService.authenticatedUser.username);
    this.listCaddies=myCaddiesList==undefined?[{num:1,name:'Caddy1'}]:JSON.parse(myCaddiesList);
    this.listCaddies.forEach(c=>{
      let cad=localStorage.getItem("myCaddy_"+this.authService.authenticatedUser.username+"_"+c.name);
      this.caddies[c.name]=cad==undefined?new Caddy(c.name):JSON.parse(cad);
    })

  }  */


  /* getPanier(): IterableIterator<ProduitItems> {
    return JSON.parse(localStorage.getItem('locale'));
  } */

  ChargerPanier() {
    this.panier = JSON.parse(localStorage.getItem('locale'));
  }

  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }



  /* getPanier():Panier {
     let panier=this.paniers[this.currentCaddyName];
    return panier; 
  } */

  
    /* let caddy=this.panier[this.currentCaddyName];
   delete caddy.items[id]; */


 /*  public removeProduct(id: number): void {
    const index = this.panier.items.findIndex(item => item.id === id);
    this.panier.items.splice(index, 1);
    localStorage.setItem('locale', JSON.stringify(this.panier));
  } */

   public removeProduct(id: number): void {
    const index = this.panier.items.findIndex(item => item.id === id);
    this.panier.items.splice(index, 1);
    localStorage.setItem('locale', JSON.stringify(this.panier));
  }

  public diminuerProduct(produit: Produit): void {

    if(produit){

    if(produit.quantite > 0 && produit.quantite < 3){

    const index = this.panier.items.findIndex(item => item.id === produit.id);
    if(this.panier.items[index].quantite >= produit.quantite){
      this.panier.items[index].quantite -= produit.quantite;
      localStorage.setItem('locale', JSON.stringify(this.panier));
      if(this.panier.items[index].quantite == 0){
        this.panier.items.splice(index, 1);
        localStorage.setItem('locale', JSON.stringify(this.panier));
      }

    }

    }

  }

  }

  getTotal(): number {
    let total = 0;
    let items = this.panier.items;

    for (let pi of items) {
      total += pi.prix * pi.quantite;
    }
    return total;
  }

  /* setClient(client: Client) {
    this.ChargerPanier()
    this.panier.client = client;
    localStorage.setItem('locale', JSON.stringify(this.panier));
  } */


  initPanier(){
    //this.panier = this.user.panier;
    this.panier = new Panier(this.currentCaddyName);
    this.panier.client = { nom: "", prenom: "", email: "", phoneNumber: "", addresse: "", username: "", livraison: "", detail: "", pin: 0 };
    localStorage.setItem('locale', JSON.stringify(this.panier));
    console.log(this.panier);
  }


}
