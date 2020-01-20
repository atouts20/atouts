import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class UtilisateurService {
    constructor(public http: HttpClient, private authService: AuthenticationService) { }


    postUtilisateur(formData: FormData): Observable<any> {
        return this.http.post('http://localhost:8080/registerFront', formData, { observe: 'response' });
    }
    postUtilisateurM(formData: FormData): Observable<any> {
        return this.http.patch('http://localhost:1234/utilisateursM', formData);
    }

    getUtilisateursG(mc: string, pg: number, sz: number) {
        return this.http.get('http://localhost:8080/chercherUsersG?mc=' + mc + '&page=' + pg + '&size = ' + sz,
            { headers: new HttpHeaders({ 'Authorization': this.authService.loadToken() }) })
    }
}