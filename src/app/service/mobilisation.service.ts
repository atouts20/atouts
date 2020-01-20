import { Injectable } from '@angular/core';
import { Mobilisation } from '../model/model.mobilisation';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MobilisationService {

  url: string = environment.backend + '/mobilisation';

  constructor(
    public httpClient: HttpClient,
    private message: NzMessageService
  ) { }

  // Enregistrement des informateurs
  save(formData: FormData): Observable<object> {
    return this.httpClient.post(`${this.url}/save`, formData);
  }

  // Suppression  d'un informateurs
  delete(mobilisation: Mobilisation): Observable<object> {
    return this.httpClient.post(`${this.url}/delete`, mobilisation);
  }

  // Suppression  d'un informateurs
  deleteByUser(mobilisation: Mobilisation): Observable<object> {
    return this.httpClient.post(`${this.url}/delete-by-user`, mobilisation);
  }

  // liste  des informateurs
  list(): Observable<object> {
    return this.httpClient.get(`${this.url}/list`);
  }

  // liste  des informateurs
  getById(id: number): Observable<object> {
    return this.httpClient.get(`${this.url}/list-by-id/` + id);
  }

   // liste  des informateurs
   getMobilisationUser(id: number): Observable<object> {
    return this.httpClient.get(`${this.url}/list-by-utilisateur/` + id);
  }
}
