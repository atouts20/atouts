import { Bien } from '../model/model.bien';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcceptationBiensService {
  //private host: string = 'http://localhost:8080';
  host: string = environment.backend;
  private bien: Bien;

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) { }

  getBienAaccepter(): Observable<object> {
    return this.httpClient.get(this.host + '/listBiensAaccepter',
      { headers: new HttpHeaders({ 'Authorization': this.authService.loadToken() }) });
  }

  getBienAactiver(): Observable<object> {
    return this.httpClient.get(this.host + '/listBiensAactiver',
      { headers: new HttpHeaders({ 'Authorization': this.authService.loadToken() }) });
  }

  getBiens(): Observable<object> {
    return this.httpClient.get(this.host + '/listBiens',
      { headers: new HttpHeaders({ 'Authorization': this.authService.loadToken() }) });
  }

  patchBiensAccepter(id: number): Observable<object> {
    return this.httpClient.delete(this.host + '/accepteBien/' + id,
      { headers: new HttpHeaders({ 'Authorization': this.authService.loadToken() }) });

  }

  patchBiensActiver(id: number): Observable<object> {

    return this.httpClient.delete(this.host + '/activeBien/' + id,
      { headers: new HttpHeaders({ 'Authorization': this.authService.loadToken() }) });

  }

  deleteBien(id: number): Observable<object> {
    return this.httpClient.delete(this.host + '/deleteBien/' + id,
      { headers: new HttpHeaders({ 'Authorization': this.authService.loadToken() }) });
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
