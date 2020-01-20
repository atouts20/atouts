import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EchangeService {
  //private host: string = 'http://localhost:8080';

  host: string = environment.backend;

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) { }

  // Pour les echanges par utilisateur
  getEchangeAAccepter(id: number, pg: number, size: number): Observable<object> {
    console.log(id);
    return this.httpClient.get(this.host + '/listEchangeAAccepterParProprietaire/' + id + '?page=' + pg + '&size=' + size);
  }
 
  getEchangeAActiver(id: number, pg: number, size: number): Observable<object> {
    console.log(id);
    return this.httpClient.get(this.host + '/listEchangeAActiverParProprietaire/' + id + +id + '?page=' + pg + '&size=' + size);
  }
  getEchangeUser(id: number, pg: number, size: number): Observable<object> {
    console.log(id);
    return this.httpClient.get(this.host + '/listEchangeParProprietaire/' + id + '?page=' + pg + '&size=' + size);
  }

  postEchange(dataForm: FormData) {
    return this.httpClient.post(this.host + '/postEchange', dataForm);
  }



  deleteEchange(id: any) {
    return this.httpClient.delete(this.host + '/compteMonnaie/' + id);
  }

  // Pour le Service
  /* getServicesPublication(): Observable<object> {
    return this.httpClient.get(this.host + '/listesServicesPublication',
      { headers: new HttpHeaders({ 'Authorization': this.authService.loadToken() }) });
  } */
}
