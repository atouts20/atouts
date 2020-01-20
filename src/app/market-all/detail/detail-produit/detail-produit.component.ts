import { Component, OnInit } from '@angular/core';
import { Produit } from '../../../model/model.produit';
import { Services } from '../../../model/model.services';
import { Echange } from '../../../model/model.echange';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MaketAllService } from '../../../service/maketAll.service';
import { ProduitsService } from '../../../service/produits.service';
import { PanierService } from '../../../service/panier.service';
import { CommandeService } from '../../../service/commande.service';
import { Commande } from '../../../model/model.commande';
import { NzMessageService } from '../../../../../node_modules/ng-zorro-antd';

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.component.html',
  styleUrls: ['./detail-produit.component.css']
})
export class DetailProduitComponent implements OnInit {

  paramKey: number;
  produit: Produit = new Produit("","",0,"",0,0,0,"",null);
  service: Services;
  echange: Echange;
  quantiteChoisi: number = 0;

  percent: number = 0;

  constructor(private router: Router,
    private activeRoute: ActivatedRoute,
    public httpClient: HttpClient,
    private maketService: MaketAllService,
    private produitService: ProduitsService,
    private panierService: PanierService,
    private commandeService: CommandeService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
     this.paramKey = this.activeRoute.snapshot.params['paramKey'];
    this.maketService.getProduitById(this.paramKey).subscribe(
      (data: Produit) => {
        this.produit = data;
        console.log(this.produit);
      });

//this.isFinish = false;

      //let d = this.panierService.returnQtPn(this.produit)

  }
  /* Debut méthode format monnetaire */
  formatNumber(num: number): string {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }
  /* Fin méthode format monnetaire */


  returnQtPn() : number{
    
    const index = this.panierService.panier.items.findIndex(item => item.id === this.produit.id);
    if (index > -1) { 
      this.quantiteChoisi = this.panierService.panier.items[index].quantite;
    }
    return this.quantiteChoisi;

  }


  isFinish(): boolean{
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 180; j++) {
       console.log(j);
      }
      this.percent +=25;
      /* let r = false;
      if(this == undefined){
        return false
      } */
      return false;
    }
    return true;
    //this.reverseStockage();
  }

  /* isFinish(): boolean{
    let r = false;
    let i = 0;
    while (i < 4) {
      for (let j = 0; j < 180; j++) {
       console.log(j);
      }   
      i++;
    }

  } */

  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }

  reverseStockage(){

    this.commandeService.chargerProduitFromPanier();

    this.commandeService.reverseStock().subscribe((data: Commande) => {
      console.log(data);
    
    }, (error: HttpErrorResponse) => {
          this.createMessage('warning', 'Echec de l\'enregistrement commande ! ');
          /* this.modalService.error({
            nzTitle: 'Information',
            nzContent: '<p>Echec de l\'enregistrement commande !</p>',
            nzOnOk: () => console.log('Info OK')
          }); */
        });

  } 



  /* addToCart() {
    this.panierService.addToCart(this.produit);
    this.router.navigateByUrl("/panier");
  } */

  addToCart(produit: Produit) {
    console.log(produit);
		this.panierService.addToCart(produit);
  } 

  /* removeFromCart(){
    this.panierService.removeProduct(this.produit.id);
    this.panierService.removeProduct(this.produit);
    this.router.navigateByUrl("/panier");
  } */

  diminuerFromCart(produit : Produit){
    //if(this.produit){
    this.panierService.diminuerProduct(produit);
    //this.router.navigateByUrl("/panier");
  //}
  }

  ngOnDestroy() {
    	//this.sub.unsubscribe();
  }

  /* gotoDetail(id: number) {
    this.router.navigate(['/market-all/' +id]);
  } */

  onReturnMarket(){
    this.router.navigate(['/market-all/' + 2]);
  }

}
