import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaketAllService {
  //private host: string = 'http://localhost:8080';
  host: string = environment.backend;

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) { }


  getEchangesPages(motCle: string, pg: number, size: number): Observable<object> {

    return this.httpClient.get(this.host + '/echanges-page?page=' + pg + '&size=' + size + '&mc=' + motCle);
  }
  getProduitsPages(motCle: string, pg: number, size: number) {
    return this.httpClient.get(this.host + '/produits-page?page=' + pg + '&size=' + size + '&mc=' + motCle);
  }

  getServicesPages(motCle: string, pg: number, size: number): Observable<object> {
    return this.httpClient.get(this.host + '/services-page?page=' + pg + '&size=' + size + '&mc=' + motCle);
  }


  getProduitById(id: number): Observable<object> {
    return this.httpClient.get(this.host + '/detail-produit/' + id);
  }

  getServiceById(id: number): Observable<object> {
    return this.httpClient.get(this.host + '/detail-service/' + id);
  }

  getEchangeById(id: number): Observable<object> {
    return this.httpClient.get(this.host + '/detail-echange/' + id);
  }
 

  /* getProduits(): Observable<object> {
    return this.httpClient.get(this.host + '/listes-produits-activer');
  }
 */

}
