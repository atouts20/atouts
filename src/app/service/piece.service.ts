import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AuthenticationService } from './authentication.service';



@Injectable({
    providedIn: 'root'
})
export class PieceService {

    url: string = 'http://localhost:8080' + '/piece';

  constructor(private http: HttpClient) { }

  // Enregistrement des objectifs de développement durable
  save(piece: any): Observable<Object> {
    return this.http.post(`${this.url}/save`, piece);
  }

  // Enregistrement des objectifs de développement durable
  delete(piece: any): Observable<Object> {
    return this.http.post(`${this.url}/delete-piece`, piece);
  }

  // liste des objectifs de développement durable
  list(): Observable<Object> {
    return this.http.get(`${this.url}/list`);
  }

  downloadFile(fileName: string): Observable<Blob> {

    return this.http.get(this.url + '/downloadFile/' + fileName,  {responseType: 'blob'});

  }

}
