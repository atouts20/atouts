import { Component, OnInit } from '@angular/core';
import { Produit } from '../../../model/model.produit';
import { Services } from '../../../model/model.services';
import { Echange } from '../../../model/model.echange';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpRequest, HttpResponse} from "@angular/common/http";
import { MaketAllService } from '../../../service/maketAll.service';
import { ProduitsService } from '../../../service/produits.service';
import { PanierService } from '../../../service/panier.service';
import { EchangeService } from '../../../service/echange.service';
import { AppUser } from '../../../model/model.AppUser';
import { filter } from '../../../../../node_modules/@types/minimatch';

@Component({
  selector: 'app-detail-echange',
  templateUrl: './detail-echange.component.html',
  styleUrls: ['./detail-echange.component.css']
})
export class DetailEchangeComponent implements OnInit {

  paramKey: number;
  echange: Echange = new Echange("","","",null);

  prorietaire : AppUser = new AppUser();

  constructor(private router: Router,
    private activeRoute: ActivatedRoute,
    public httpClient: HttpClient,
    private maketService: MaketAllService,
    private echangeService: EchangeService,
    private panierService: PanierService,public http: HttpClient,
  ) { }

  ngOnInit() {
     this.paramKey = this.activeRoute.snapshot.params['paramKey'];
    this.maketService.getEchangeById(this.paramKey).subscribe(
      (data: Echange) => {
        this.echange = data;
        this.prorietaire = data.proprietaires;
        console.log(this.echange);
      });

      //let d = this.panierService.returnQtPn(this.produit)
      //this.echange.proprietaires.nom
  }
  /* Debut méthode format monnetaire */
  formatNumber(num: number): string {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }
  /* Fin méthode format monnetaire */


  /* returnQtPn() : number{
    
    const index = this.panierService.panier.items.findIndex(item => item.id === this.produit.id);
    if (index > -1) { 
      this.quantiteChoisi = this.panierService.panier.items[index].quantite;
    }
    return this.quantiteChoisi;

  } */


  gotoWatsapp(){
    //this.router.navigateByUrl("https://wa.me/15551234567?text=I'm%20interested%20in%20your%20car%20for%20sale");
  

      const req = new HttpRequest('GET', "https://wa.me/22997543734?text=I'm%20interested%20in%20your%20car%20for%20sale");
    this.http.request(req).subscribe((data: any) => {          
          console.log(data.body);         
        },
        err => {
          console.log(err); 
        });  

  
  }

  /* gotoCall(){
    startActivity(new Intent(Intent.ACTION_CALL, Uri.parse("tel:" + "60963055")));
  } */



  /* addToCart() {
    this.panierService.addToCart(this.produit);
    this.router.navigateByUrl("/panier");
  } */

  /* addToCart(produit: Produit) {
    console.log(produit);
		this.panierService.addToCart(produit);
  } */ 

  /* removeFromCart(){
    this.panierService.removeProduct(this.produit.id);
    this.panierService.removeProduct(this.produit);
    this.router.navigateByUrl("/panier");
  } */

  /* diminuerFromCart(){
    this.panierService.diminuerProduct(this.produit);
  } */

  ngOnDestroy() {
    	//this.sub.unsubscribe();
  }

  onReturnMarket(){
    this.router.navigate(['/market-all/' + 0]);
  }

  /* onReturnMarket(){    
    this.router.navigateByUrl("/market-all");
  } */

}
