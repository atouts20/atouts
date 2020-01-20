import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PasswordForget } from '../model/model.password-forget';

@Injectable({
  providedIn: 'root'
})
export class PasswordForgetService {
  url: string = environment.backend;

  constructor(
    public httpClient: HttpClient,
  ) { }
  saveForget(email: string): Observable<object> {
    return this.httpClient.post(`${this.url}/forgot-password`, email);
  }
  saveReset(passwordForget: PasswordForget): Observable<object> {
    return this.httpClient.post(`${this.url}/reset-password`, passwordForget);
  }
}
