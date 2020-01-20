import { AuthenticationService } from './authentication.service';
import { Bon } from '../model/model.bon';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BonService {
  host: string = environment.backend + '/bon';
  //private host: string = 'http://localhost:8080/bon';

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) { }

  // Enregistrement des bons
  save(bon: Bon): Observable<any> {
    return this.httpClient.post(this.host + '/save', bon);
  }
  // Enregistrement encaissement bon
  saveEncaisse(secret: Bon): Observable<any> {

    return this.httpClient.post(`${this.host}/encaisse/`, secret);
  }
  // Enregistrement liquidation bon
  saveLiquidation(bon: Bon): Observable<any> {
    return this.httpClient.post(this.host + '/liquide', bon);
  }

  // Enregistrement bon
  delete(bon: Bon): Observable<object> {
    return this.httpClient.post(`${this.host}/delete`, bon);
  }

  // liste des bons
  list(): Observable<object> {
    return this.httpClient.get(`${this.host}/lists-bons`);
  }
  // liste des bons
  listByNumeroBon(numeroBon: string): Observable<object> {
    return this.httpClient.get(`${this.host}/verifier-un-bon/` + numeroBon);
  }
  // liste des bons
  listEncaisse(): Observable<object> {
    return this.httpClient.get(`${this.host}/lists-encaisses`);
  }
  // liste des bons
  listLiquide(): Observable<object> {
    return this.httpClient.get(`${this.host}/lists-liquides`);
  }

}
