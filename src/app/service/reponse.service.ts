import { Injectable } from '@angular/core';
import { Reponse } from '../model/model.reponse';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReponseService {

  url: string = environment.backend + '/reponse';

  constructor(
      public httpClient: HttpClient,
  ) { }

   // Enregistrement des informateurs
save(reponse: Reponse): Observable<object> {
  return this.httpClient.post(`${this.url}/save`, reponse);
}

// Suppression  d'un informateurs
delete(reponse: Reponse): Observable<object> {
  return this.httpClient.post(`${this.url}/delete`, reponse);
}

// Suppression  d'un informateurs
deleteByUser(reponse: Reponse): Observable<object> {
  return this.httpClient.post(`${this.url}/delete-by-user`, reponse);
}

// liste  des informateurs
list(): Observable<object> {
  return this.httpClient.get(`${this.url}/list`);
}

// liste  des informateurs
getById(id: number): Observable<object> {
  console.log(id);
  return this.httpClient.get(`${this.url}/list-by-mobilisation/` + id);
}
}
