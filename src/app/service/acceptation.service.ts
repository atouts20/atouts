import { Echange } from '../model/model.echange';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcceptationService {
  // private host: string = 'http://localhost:8080';
  host: string = environment.backend;
  private echange: Echange;

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) { }

  getEchangeAaccepter(): Observable<object> {
    return this.httpClient.get(this.host + '/listEchangesAaccepter');
  }

  getEchangeAactiver(): Observable<object> {
    return this.httpClient.get(this.host + '/listEchangesAactiver');
  }

  getEchanges(): Observable<object> {
    return this.httpClient.get(this.host + '/listEchanges');
  }

  patchEchangesAccepter(id: number): Observable<object> {

    return this.httpClient.delete(this.host + '/accepteEchange/' + id);

  }

  patchEchangesActiver(id: number): Observable<object> {

    return this.httpClient.delete(this.host + '/activeEchange/' + id);

  }

  deleteEchange(id: number): Observable<object> {
    return this.httpClient.delete(this.host + '/deleteEchange/' + id);
  }
















  getService(): Observable<object> {
    return this.httpClient.get(this.host + '/listesServicesPublication',
      { headers: new HttpHeaders({ 'Authorization': this.authService.loadToken() }) });
  }
  getServiceActiver(): Observable<object> {
    return this.httpClient.get(this.host + '/listesServicesPublicationAccepter',
      { headers: new HttpHeaders({ 'Authorization': this.authService.loadToken() }) });
  }
  getProduit(): Observable<object> {
    return this.httpClient.get(this.host + '/listesServicesPublication',
      { headers: new HttpHeaders({ 'Authorization': this.authService.loadToken() }) });
  }
  getProduitActiver(): Observable<object> {
    return this.httpClient.get(this.host + '/listesProduitsPublicationAccepter',
      { headers: new HttpHeaders({ 'Authorization': this.authService.loadToken() }) });
  }

}
