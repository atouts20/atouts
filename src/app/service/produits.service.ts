import { Produit } from '../model/model.produit';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
import { NzMessageService } from 'ng-zorro-antd';
import { AppUser } from '../model/model.AppUser';
import { Panier } from '../model/model.panier';
import { ProduitItems } from '../model/model.produitItems';
import { DestockageForm } from '../model/DestockageForm';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  /* private host: string = 'http://localhost:8080'; */
  host: string = environment.backend;
  private newProduit = new Subject<string>();
  newProduitStream = this.newProduit.asObservable();

  // NavbarCounts
  navbarCartCount = 0;
  navbarFavProdCount = 0;
  valeurAtout = 0;
  public panier: Panier = null;

  constructor(
    public httpClient: HttpClient,
    private authService: AuthenticationService,
    private message: NzMessageService
  ) {
/* 
    let panier = localStorage.getItem("avct_item");
    if (panier) {
      this.panier = JSON.parse(panier);
    } else {
      this.panier = new Panier();
    } */
  }

  newUserCom() {
    this.newProduit.next('ok');
  }

  getProduits() {
    return this.httpClient.get(this.host + '/listeProduits');
  }

  getProduitsActiver() {
    return this.httpClient.get(this.host + '/listes-produits-activer');
  }
  getProduitPasActiver(): Observable<object> {
    return this.httpClient.get(this.host + '/listes-produits-non-activer');
  }



  /* getStockActuel(id: number) {
    return this.httpClient.get(this.host + '/stock-actuel-produit/' + id);
} */







isDestocker(destockageForm: DestockageForm): Observable<Object> {
  console.log(destockageForm);
  return this.httpClient.post(this.host + '/destockage', destockageForm);
}








  activerProduit(produit: Produit): Observable<Object> {

    return this.httpClient.post(this.host + '/activer-produit', produit);
  }

  postProduit(produit: Produit): Observable<Object> {
    console.log(produit);
    return this.httpClient.post(this.host + '/produit', produit);
  }

  putProduit(id: any, produit: any) {
    return this.httpClient.put(this.host + '/produit/' + id, produit);
  }

  deleteProduit(id: any) {
    return this.httpClient.delete(this.host + '/produit/' + id);
  }

  // Adding new Product to cart db if logged in else localStorage
  /* addToCart(produit: Produit): void {
    console.log(produit);
    console.log(produit.id);
    let produitItems: ProduitItems = this.panier.items.get(produit.id);
    if (produitItems) {
      console.log(produitItems);
      produitItems.quantite += produit.quantite;
      //this.savePanier();
    } else {
      produitItems = new ProduitItems();
      produitItems.produit = produit;
      produitItems.prix = produit.prix;
      produitItems.quantite = produit.quantite;
      this.panier.items.set(produit.id, produitItems);
      console.log('this.panier');
      console.log(this.panier);
      console.log('this.panier.items');
      console.log(this.panier.items);
      console.log('this.panier.items.valeur');
      console.log(this.panier.items.values);
      this.savePanier();
    }
  } */
  savePanier() {
    console.log(this.panier);
    localStorage.setItem('avct_item', JSON.stringify(this.panier));
  }
  getPanier(): Panier {
    return JSON.parse(localStorage.getItem('avct_item'));

  }
  getPanierCourrent() {
    return this.panier;
  }
  getTotal(): number {
    let total = 0;
    let items: IterableIterator<ProduitItems> = this.panier.items.values();

    for (let pi of items) {
      total += pi.prix * pi.quantite;
    }
    return total;
  }


  /*  addToCart(data: ProduitItems): void {
    let produitItems: ProduitItems = data;
    //let a: Produit[];
   let a: any;
     a = JSON.parse(localStorage.getItem('avct_item')) || [];
   if(data.produit == a){
     a.set( a.get(produitItems.quantite + a.quantite));
   }
    // a.push(produitItems);
     //this.toastrService.wait('Adding Product to Cart', 'Product Adding to the cart'); 
     this.message.loading('Adding Product to Cart');
     setTimeout(() => {
       localStorage.setItem('avct_item', JSON.stringify(a));
       this.calculateLocalCartProdCounts();
     }, 200);
   } */
  // Fetching Locat CartsProducts
  getLocalCartProduits(): Produit[] {
    const produits: Produit[] = JSON.parse(localStorage.getItem('avct_item')) || [];

    return produits;
  }

  // returning LocalCarts Product Count
  calculateLocalCartProdCounts(): number {
    return this.navbarCartCount = this.getLocalCartProduits().length;
  }

  //payement de mes achats
  payerProduit(): number {
    return this.navbarCartCount = this.getLocalCartProduits().length;
  }

  //recuperation du solde
  monSolde(): number {
    return this.valeurAtout;
  }
  // Fetching Locat CartsProducts
  getLocalUser(): AppUser {
    const userConnecte: AppUser = JSON.parse(localStorage.getItem('user'));

    return userConnecte;
  }

}
