import { Component, OnInit } from '@angular/core';
import { Services } from '../../../model/model.services';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MaketAllService } from '../../../service/maketAll.service';
import { ProduitsService } from '../../../service/produits.service';

@Component({
  selector: 'app-detail-service',
  templateUrl: './detail-service.component.html',
  styleUrls: ['./detail-service.component.css']
})
export class DetailServiceComponent implements OnInit {

  paramKey: number;
  //service: Services;
    
  service: Services = new Services("","",0,"",0,0,"",null);
  quantiteChoisi: number = 0;

  constructor(private router: Router,
    private activeRoute: ActivatedRoute,
    public httpClient: HttpClient,
    private maketService: MaketAllService,
    private produitService: ProduitsService
  ) { }

  ngOnInit() {
     this.paramKey = this.activeRoute.snapshot.params['paramKey'];
    this.maketService.getServiceById(this.paramKey).subscribe(
      (data: Services) => {
        this.service = data;
        console.log(this.service);
      });

  }
  /* Debut méthode format monnetaire */
  formatNumber(num: number): string {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }
  /* Fin méthode format monnetaire */

  addToCart(service: Services) {
  
      //this.produitService.addToCart(service);
      this.quantiteChoisi = this.produitService.calculateLocalCartProdCounts();

  }


  onNewCommande() {
    localStorage.setItem('service', JSON.stringify(this.service));
    this.router.navigateByUrl("/client-service");      
  }

  onReturnMarket(){
    this.router.navigate(['/market-all/' + 1]);
  }

  /* onReturnMarket(){    
    this.router.navigateByUrl("/market-all");
  } */

  ngOnDestroy() {
    	//this.sub.unsubscribe();
  }
}
