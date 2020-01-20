import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Subject, Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Compte } from '../model/model.compte';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  private host: string = environment.backend + '/compte';

  private newCompte = new Subject<string>();
  newUserStream = this.newCompte.asObservable();

  constructor(public httpClient: HttpClient, private authService: AuthenticationService) { }

  newUserCom() {
    this.newCompte.next("ok");
  }


  getComptes(): Observable<object> {
    return this.httpClient.get(this.host + '/listes');
  }
  getComptesValeurs(): Observable<object> {
    return this.httpClient.get(this.host + '/listes-valeurs');
  }
  getComptesMonnaies(): Observable<object> {
    return this.httpClient.get(this.host + '/listes-monnaies');
  }

  postCompte(compte: Compte): Observable<any> {
    return this.httpClient.post(this.host + '/save', compte);
  }

  getCompte(): Observable<object> {
    return this.httpClient.get(this.host + '/valeurs');
  }
  getMonComptevaleur(id: number): Observable<object> {
    return this.httpClient.get(this.host + '/mon-compte/' + id);
  }

  getCompteSysteme(): Observable<object> {
    return this.httpClient.get(this.host + '/listes-comptes-systemes');
  }


  activerCompte(numcompte: any): Observable<any> {
    return this.httpClient.post(this.host + '/active-compte', + numcompte);
  }


  desactiverCompte(numcompte: any): Observable<any> {
    return this.httpClient.post(this.host + '/desactive-compte', + numcompte);
  }




  deleteCompte(id: any) {
    return this.httpClient.delete(this.host + '/comptes/' + id);
  }

  unCompte(id: any) {
    return this.httpClient.get(this.host + '/liste/' + id);
  }

  getComptesValeursPourFavori(numcompte: string): Observable<object> {
    return this.httpClient.get(this.host + '/un/' + numcompte);
  }
}
