import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Groupe } from '../model/model.groupe';
import { environment } from '../../environments/environment';



@Injectable({
    providedIn: 'root'
})
export class GroupeService {
    //host: string = 'http://localhost:8080';
    host: string = environment.backend;

    private newGroupe = new Subject<string>();
    newUserStream = this.newGroupe.asObservable();

    constructor(
        public http: HttpClient,
        public httpC: HttpClient,
        private authService: AuthenticationService
    ) { }

    newUserCom() {
        this.newGroupe.next('ok');
    }

    getGroupe(): Observable<object> {
        return this.httpC.get(this.host + '/groupes');
    }


    postGroupes(groupe: Groupe): Observable<any> {
        return this.httpC.post(this.host + '/groupes', groupe);
    }

    putGroupe(groupe: any) {
        return this.httpC.put(this.host + '/editgroupes', groupe);
    }


    putGroupeN(groupe: any) {
        return this.httpC.put(this.host + '/editgroupe', groupe);
    }


    deleteGroupe(id: any) {
        return this.httpC.delete(this.host + '/groupes/' + id);
    }

}
