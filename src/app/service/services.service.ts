import { Services } from '../model/model.services';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
import { NzMessageService } from 'ng-zorro-antd';
import { AppUser } from '../model/model.AppUser';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
 // private host: string = 'http://localhost:8080';
 host: string = environment.backend;
  private newService = new Subject<string>();
  newServiceStream = this.newService.asObservable();

  navbarCartCount = 0;
  navbarFavProdCount = 0;
  valeurAtout = 0;

  constructor(public httpClient: HttpClient, 
    private authService: AuthenticationService,
    private message: NzMessageService) { }

  newUserCom() {
    this.newService.next('ok');
  }


  getService(): Observable<object> {
    return this.httpClient.get(this.host + '/listServices');
  }

  getServiceActiver(): Observable<object> {
    return this.httpClient.get(this.host + '/listes-services-activer');
  }

  getServicePasActiver(): Observable<object> {
    return this.httpClient.get(this.host + '/listes-services-non-activer');
  }

  activerService(service: Services): Observable<Object> {
    
    return this.httpClient.post(this.host + '/activer-service', service);
  }

  deleteService(id: any) {
    return this.httpClient.delete(this.host + '/service/' + id);
  }

  // Adding new Product to cart db if logged in else localStorage
  addToCartService(data: Services): void {
    let a: Services[];

    a = JSON.parse(localStorage.getItem('avct_item')) || [];

    a.push(data);
    /* this.toastrService.wait('Adding Product to Cart', 'Product Adding to the cart'); */
    this.message.loading('Adding Services to Cart');
    setTimeout(() => {
      localStorage.setItem('avct_item', JSON.stringify(a));
      this.calculateLocalCartServicesCounts();
    }, 200);
  }
  // Fetching Locat CartsProducts
  getLocalCartServices(): Services[] {
    const produits: Services[] = JSON.parse(localStorage.getItem('avct_item')) || [];

    return produits;
  }
   
  // returning LocalCarts Product Count
  calculateLocalCartServicesCounts(): number {
    return this.navbarCartCount = this.getLocalCartServices().length;
  }

  //payement de mes achats
  payerProduit(): number {
    return this.navbarCartCount = this.getLocalCartServices().length;
  }

  //recuperation du solde
  monSolde(): number {
    return this.valeurAtout ;
  }
 // Fetching Locat CartsProducts
 getLocalUser(): AppUser {
  const userConnecte: AppUser = JSON.parse(localStorage.getItem('user'));

  return userConnecte;
}

}
