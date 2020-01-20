import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { SousCompte } from '../model/model.sousCompte';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SousCompteService {
  url: string = environment.backend + '/sous-compte';

  constructor(
    public httpClient: HttpClient,
  ) { }

  // Enregistrement des objectifs de développement durable
  save(sousCompte: SousCompte): Observable<Object> {
    return this.httpClient.post(`${this.url}/save`, sousCompte);
  }

  // Enregistrement des objectifs de développement durable
  delete(sousCompte: SousCompte): Observable<Object> {
    return this.httpClient.post(`${this.url}/delete`, sousCompte);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.httpClient.get(`${this.url}/list`);
  }
}
