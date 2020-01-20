import { Component, OnInit } from '@angular/core';
import { ProduitsService } from '../../../service/produits.service';
import { Panier } from '../../../model/model.panier';
import { ProduitItems } from '../../../model/model.produitItems';
import { PanierService } from '../../../service/panier.service';
import { Router } from '@angular/router';
import { CommandeService } from '../../../service/commande.service';
import { NzModalService } from '../../../../../node_modules/ng-zorro-antd';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  panier: Panier;
  editCache = {};

  searchValue = '';
  childrenVisible = false;

  constructor(private produitService: ProduitsService,
     private router: Router,
     public panierService: PanierService,
    public commandeService: CommandeService,
    private modalService: NzModalService,) { }

  ngOnInit() {
    /* console.log( this.produitService.getPanier().items.values() );
    let gg = this.produitService.getPanier().items.values();
    console.log(gg);
    console.log(this.produitService.getPanier()); */
    // this.produitService.panier.items.values
    //console.log(this.panierService.panier.items.values())


    this.panier = this.panierService.panier
    //this.panier=this.panierService.ChargerPanier();
    console.log(this.panier);
    this.updateEditCache();
  }

  onRemoveProductFromCaddy(p: ProduitItems) {
    this.panierService.removeProduct(p.id);
  }

  onNewCommande() {
    this.router.navigateByUrl("/client");
  }

  onReturnMarket() {
    this.router.navigateByUrl("/market-all");
  }




  updateEditCache(): void {

    this.panier.items.forEach(item => {
      // console.log(this.editCache[item.id]);
      if (!this.editCache[item.id]) {
        this.editCache[item.id] = {
          edit: false,
          data: { ...item }
        };
      }
    });
  }

  search(){}
  reset(){}


  startEdit(key: number): void {
    this.editCache[key].edit = true;
    console.log(this.editCache[key].data);
  }

  cancelEdit(key: number): void {
    this.editCache[key].edit = false;
    console.log(this.editCache[key].data);
  }

  saveEdit(key: number): void {
    const index = this.panier.items.findIndex(item => item.id === key);

    if (this.editCache[key].data.quantite > 0 && this.editCache[key].data.quantite < 3) {

      
      //if ((this.panier.items[index].quantite + this.editCache[key].data.quantite) < 3) {

        console.log('11111111');
        console.log(this.panier.items[index]);
        console.log('11111111');

        console.log('22222222');
        console.log(this.editCache[key].data);
        console.log('22222222');
        //this.authService.putUtilisateur(this.editCache[key].data);
        Object.assign(this.panier.items[index], this.editCache[key].data);
        // this.listUtilisateurs[ index ] = this.editCache[ key ].data;
        localStorage.setItem('locale', JSON.stringify(this.panier));

        this.editCache[key].edit = false;

      }

    //}

  }


  onViderPanier(){

    this.modalService.info({
      nzTitle: 'Information',
      nzContent: '<p> Etes-vous sur de vider votre panier? </p>',
      nzOkText: 'oui',
      nzCancelText: 'non',
      nzOnCancel: () => console.log('non'),
      nzOnOk: () => this.viderPanier()
    });

  }


  viderPanier(){
    this.panierService.initPanier();
    this.commandeService.initCommande();
    this.router.navigateByUrl("/market-all");
  }


  startDelete(id: number) {
    this.panierService.removeProduct(id);
    //this.panierService.ChargerPanier();
    this.panier = this.panierService.panier
    this.panier.items = this.panier.items.filter(i => i.id !== id);
  }



}
