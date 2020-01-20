import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {

  authUrl = environment.backend;

  constructor(private http: HttpClient) {
  }

  attemptAuth(usernameOrEmail: string, password: string): Observable<any> {
    const credentials = { usernameOrEmail: usernameOrEmail, password: password };
    console.log('attempAuth ::');
    return this.http.post(`${this.authUrl}/signin`, credentials);
  }

  retrieveCurrentUser(username: string) {
    return this.http.get(this.authUrl + '/me/' + username);
  }

}
