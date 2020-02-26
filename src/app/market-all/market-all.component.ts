import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BienService } from '../service/bien.service';
import { MaketAllService } from '../service/maketAll.service';
import { Produit } from '../model/model.produit';
import { Services } from '../model/model.services';
import { Echange } from '../model/model.echange';
import { ProduitsService } from '../service/produits.service';
import { ServicesService } from '../service/services.service';
import { PanierService } from '../service/panier.service';
import { Panier } from '../model/model.panier';

@Component({
  selector: 'app-market-all',
  templateUrl: './market-all.component.html',
  styleUrls: ['./market-all.component.css']
})
export class MarketAllComponent implements OnInit {

  listOfData
  data: any[] = [];
  selectedIndex = 2;
  echangesList: Array<Echange> = [];
  //listOfDisplayData1 = [];fatal: unable to access 'https://github.com/adimouch21/projetbasco.git/': Could not resolve host: github.com
  tabs = [
    {
      active: false,
      name: 'Echanges',
      //icon: 'home'
    },
    {
      active: false,
      name: 'Services',
      //icon: 'info-circle'
    },
    {
      active: false,
      name: 'Produits',
      //icon: 'appstore'
    },
    {
      active: false,
      name: 'Accueil',
      //icon: 'home'
    }
  ];
  listOfDisplayData2 = [];
  pages: number = 0;
  pagesEchange: number = 0; 
  pagesService: number = 0;

  pagesNo: number = 0;
  pageSize: number = 8;
  motCle: string = '';
  

  currentProduit: number = 0;

  //percent: number = 0;

  pageSizeService: number = 8;
  pageSizeEchange: number = 8;
  searchValue = '';
  sortName: string | null = null;
  sortValue: string | null = null;
  fileToUpload: File = null;
  selectedFiles: FileList;
  produitsActiverList: Array<Produit> = [];
  servicesActiverList: Array<Services> = [];

  panier: Panier;


  visible = false;
  favoris = false;
  //fin = false;
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    public httpC: HttpClient,
    private bienService: BienService,
    private maketService: MaketAllService,
    private produitService: ProduitsService,
    private serviceServiveces: ServicesService,
    private panierService: PanierService,
    private activeRoute: ActivatedRoute,
  ) { }

  log(index: number): void {
    console.log(index);
    console.log(this.selectedIndex);
    switch (this.selectedIndex) {
      case 0:

        {
          //this.loadEchange();

          break;
        }
      case 1:

        {
          //this.loadServiceActiver();

          break;
        }
      case 2:

        {
          //this.loadProduitsActiver();

          break;
        }
      case 3:

        {
          this.returnAccueil();

          break;
        }

      default:
        {
          //this.loadEchange();

          break;
        }

    }
  }



  ngOnInit() {
    let id = this.activeRoute.snapshot.params['paramKey'];
    if (id) {
      this.selectedIndex = id;
    }


    //this.panier=this.panierService.panier
    /* console.log(this.listOfDisplayData)
    this.loadData(1); */
    this.loadEchange();
    this.loadProduitsActiver();
    this.loadServesActiver();

    //this.panierService.val
  }
  /*  private loadEchange() {
     this.maketService.getEchangesPage(0)
       .subscribe((data: any) => {
         console.log(data);
         this.echangesList = data.content;
         console.log(this.echangesList);
         console.log(this.echangesList);
         this.pages = data.totalElements;
         this.pageSize = data.size;
       }, err => {
         console.log(err);
       });
   } */

  loadEchange() {
    this.maketService.getEchangesPages(this.motCle, this.pagesNo, this.pageSize)
      .subscribe((data: any) => {
        console.log(data);
        this.echangesList = data.content;
       
        console.log(this.echangesList);
        console.log(this.echangesList);
        this.pagesEchange = data.totalElements;
        this.pageSizeEchange = data.size;
      }, err => {
        console.log(err);
      });
  }

  shop(id: number, px: any, tb: any) {
    let tok = this.authService.loadToken();
    if (tok == null) {
      this.router.navigate(['/connexion']);
    } else {
      //this.router.navigate(['/shopping',id]);  
      this.router.navigate(['/autofact', id, px, tb]);
    }


  }


  returnAccueil() {
    this.router.navigate(['/home']);
  }

  /* isFinish(){
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 360000000; j++) {
       console.log(j);
      }
      this.percent +=25;
    }
    return true;
  } */




  /* Début ==== listes des produits activer ==== */

  /*  private loadProduitsActiver() {
     this.maketService.getProduitsPages(0)
       .subscribe((data: any) => {
         this.produitsActiverList = data.content;
         this.pages = data.totalElements;
         this.pageSize = data.size;
         console.log(this.produitsActiverList);
 
       }, (error: HttpErrorResponse) => {
         console.log('Echec !');
       });
   } */

  loadProduitsActiver() {
    this.maketService.getProduitsPages(this.motCle, this.pagesNo, this.pageSize)
      .subscribe((data: any) => {
        this.produitsActiverList = data.content;
        this.pages = data.totalElements;
        this.pageSize = data.size;
        console.log(this.produitsActiverList);

      }, (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }
  /* Début ==== listes des produits activer ==== */

  /* Début ==== listes des produits activer ==== */

  /* private loadServesActiver() {
    this.maketService.getServicesPages(0)
      .subscribe((data: any) => {
        this.servicesActiverList = data.content;
        console.log(this.servicesActiverList);
        this.pages = data.totalElements;
        console.log(' this.pages = data.totalElements');
        console.log(this.pages);
        this.pageSize = data.size;
        console.log('this.pageSize = data.size');
        console.log(this.pageSize);
      }, (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  } */

  loadServesActiver() {
    this.maketService.getServicesPages(this.motCle, this.pagesNo, this.pageSize)
      .subscribe((data: any) => {
        this.servicesActiverList = data.content;
        console.log(this.servicesActiverList);
        this.pagesService = data.totalElements;
        console.log(' this.pages = data.totalElements');
        console.log(this.pagesService);
        this.pageSizeService = data.size;
        console.log('this.pageSize = data.size');
        console.log(this.pageSize);
      }, (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }
  /* Début ==== listes des produits activer ==== */


  setFavoris(id: number) {
    this.currentProduit = id;
    console.log(id);
    if (this.favoris) {
      this.favoris = false;
    } else {
      this.favoris = true;
    }
  }


  /*
  loadData(pi: number): void {
    this.dataSet = new Array(8).fill({}).map((_, index) => {
       return {
 
       };
     }); 
  } */
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  sort(sortName: string, value: string): void {
    this.sortName = sortName;
    this.sortValue = value;
    this.search();
  }


  search(): void {
    const filterFunc = (item: { title: string; description: string; image: string; avatar: string }) => {
      return (item.title.indexOf(this.searchValue) !== -1
      );
    };

    const data = this.listOfData.filter((item: { title: string; description: string; image: string; avatar: string }) => filterFunc(item));
    this.echangesList = data.sort((a, b) =>
      this.sortValue === 'ascend'
        ? a[this.sortName!] > b[this.sortName!]
          ? 1
          : -1
        : b[this.sortName!] > a[this.sortName!]
          ? 1
          : -1
    );
  }

  loadData(pi: number): void {

  }

  /* 
    loadData(pi: number): void {
      this.data = new Array(5).fill({}).map((_, index) => {
        return {
          href: 'http://ant.design',
          title: `ant design part ${index} (page: ${pi})`,
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
          content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
        };
      });
    } */




  /* les 3 fonctions de recherche*/

  gotoPageEchange(i: number) {
    this.pagesNo = i - 1;
    console.log(this.pages);
    this.loadEchange();
  }

  chercherEchange() {
    this.loadEchange();
  }

  gotoPageService(i: number) {
    this.pagesNo = i - 1;
    console.log(this.pages);
    this.loadServesActiver();
  }

  chercherService() {
    this.loadServesActiver();
  }

  gotoPageProduit(i: number) {
    this.pagesNo = i - 1;
    console.log(this.pages);
    this.loadProduitsActiver();
  }

  chercherProduit() {
    this.loadProduitsActiver();
  }
  /* Debut méthode format monnetaire */
  formatNumber(num: number): string {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  }
  /* Fin méthode format monnetaire */

  gotoDetail(id: number) {
    this.router.navigate(['/detail-produit/' + id]);
  }

  removeProduit(key: number) {
    this.produitService.deleteProduit(key);
  }

  /*  addToCart(produit: Produit) {
     this.produitService.addToCart(produit);
   } */

  addToCart(produit: Produit) {
    console.log(produit);
    this.panierService.addToCart(produit);
  }

  onNewCommande(service: Services) {
    localStorage.setItem('service', JSON.stringify(service));
    this.router.navigateByUrl("/client-service");
  }

  goToPanier() {

    this.router.navigateByUrl("/panier");
  }

  ////////////////////////////////////////

  gotoDetailService(id: number) {
    this.router.navigate(['/detail-service/' + id]);
  }

  gotoDetailEchange(id: number) {
    this.router.navigate(['/detail-echange/' + id]);
  }




  removeService(key: number) {
    this.serviceServiveces.deleteService(key);
  }

  addToCartService(service: Services) {
    this.serviceServiveces.addToCartService(service);
  }




  addFavourite(produit: Produit) {
    //this.produitService.addFavouriteProduct(produit);
  }

}
