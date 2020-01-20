import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  host: string = environment.backend + '/publication';

  private newPublication = new Subject<string>();
  newProduitStream = this.newPublication.asObservable();

  constructor(
    private httpClient: HttpClient,
    private authService: AuthenticationService
  ) { }

  newUserCom() {
    this.newPublication.next('ok');
  }

  getProduitDemandePub(): Observable<object> {
    return this.httpClient.get(this.host + '/listProduitDemandePub');
  }

  getServiceDemandePub(): Observable<object> {
    return this.httpClient.get(this.host + '/listServiceDemandePub');
  }


  getDemandePublication(id: number, pg: number, size: number, motCle: string): Observable<object> {
    console.log(id);
    return this.httpClient.get(this.host + '/list-demande-pub/' + id + '?page=' + pg + '&size=' + size + '&mc=' + motCle);
  }
  getDemandePublicationAc(id: number, pg: number, size: number, motCle: string): Observable<object> {
    console.log(id);
    return this.httpClient.get(this.host + '/list-demande-pub-accepter/' + id + '?page=' + pg + '&size=' + size + '&mc=' + motCle);
  }
  getDemandePublicationNAc(id: number, pg: number, size: number, motCle: string): Observable<object> {
    console.log(id);
    return this.httpClient.get(this.host + '/list-demande-pub-non-accept/' + id + '?page=' + pg + '&size=' + size + '&mc=' + motCle);
  }


  getDemandesPubProduit(): Observable<object> {
    return this.httpClient.get(this.host + '/list-demande-produit');
  }

  getDemandesPubService(): Observable<object> {
    return this.httpClient.get(this.host + '/list-demande-service');
  }



  getDemandesProduitAccepter(): Observable<object> {
    return this.httpClient.get(this.host + '/list-demande-produit-accepter');
  }

  getDemandesServiceAccepter(): Observable<object> {
    return this.httpClient.get(this.host + '/list-demande-service-accepter');
  }


  getDemandesProduitRejeter(): Observable<object> {
    return this.httpClient.get(this.host + '/list-demande-produit-rejeter');
  }

  getDemandesServiceRejeter(): Observable<object> {
    return this.httpClient.get(this.host + '/list-demande-service-rejeter');
  }




  /*  getDemandesPubNAc(): Observable<object> {
     return this.httpClient.get(this.host + '/listDemandePubNonAccept');
   }
   
   getDemandesPubNC(): Observable<object> {
     return this.httpClient.get(this.host + '/listDemandePubNonCreer');
   } */


  /*  getDemandePublication(propriet): Observable<any> {
    return this.httpClient.post(this.host + '/listDemandePub', propriet);
  } */

  /*  getDemandePublicationAc(propriet): Observable<any> {
     return this.httpClient.post(this.host + '/listDemandePubAc', propriet);
   } */
  /*  getDemandePublicationNAc(propriet): Observable<any> {
     return this.httpClient.post(this.host + '/listDemandePubNAc', propriet);
   }  */


  postDemandePublication(formData: FormData): Observable<any> {
    return this.httpClient.post(this.host + '/save', formData);
  }


  publicationAccepte(id: any, publication: any) {
    return this.httpClient.put(this.host + '/publicationAccepte/' + id, publication);
  }

  publicationCreer(id: any, publication: any) {
    return this.httpClient.post(this.host + '/postbiens/' + id, publication);
  }
  putrejetProduit(id: any, publication: any) {
    return this.httpClient.post(this.host + '/publication-produit-rejeter/' + id, publication);
  }

  putrejetService(id: any, publication: any) {
    return this.httpClient.post(this.host + '/publication-service-rejeter/' + id, publication);
  }



}
