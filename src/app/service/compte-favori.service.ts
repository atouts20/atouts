import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CompteFavori } from './../model/model.compte-favori';

@Injectable({
  providedIn: 'root'
})
export class CompteFavoriService {

  url: string = environment.backend + '/compte-favori';

  constructor(
    public httpClient: HttpClient,
  ) { }

  // Enregistrement des informateurs
  save(favori: CompteFavori): Observable<object> {
    return this.httpClient.post(`${this.url}/save`, favori);
  }

  // Suppression  d'un informateurs
  delete(favori: CompteFavori): Observable<object> {
    return this.httpClient.post(`${this.url}/delete`, favori);
  }

  // Suppression  d'un informateurs
  deleteByUser(favori: CompteFavori): Observable<object> {
    return this.httpClient.post(`${this.url}/delete-by-user`, favori);
  }

  // liste  des informateurs
  list(id: number): Observable<object> {
    return this.httpClient.get(`${this.url}/list/` + id);
  }

  // liste  des informateurs
  getById(id: number): Observable<object> {
    console.log(id);
    return this.httpClient.get(`${this.url}/list-by-mobilisation/` + id);
  }
}
