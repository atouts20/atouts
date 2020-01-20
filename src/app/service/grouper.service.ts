import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Grouper } from '../model/model.grouper';
import { environment } from '../../environments/environment';



@Injectable({
    providedIn: 'root'
})
export class GrouperService {
   //private host: string = 'http://localhost:8080';
   host: string = environment.backend;

    constructor( public httpClient: HttpClient, private authService: AuthenticationService) { }

    getGrouper(id: any): Observable<object> {
        return this.httpClient.get(this.host + '/groupers/' + id);
    }


    postGroupers(grouper: Grouper): Observable<any> {
        return this.httpClient.post(this.host + '/groupers', grouper);
    }

    putGrouper(groupe_id: any, appUser_id: any, grouper: any) {
        return this.httpClient.put(this.host + '/groupers/' + groupe_id + '/' + appUser_id, grouper);
    }


    deleteGrouper(groupe_id: any, appUser_id: any) {
        return this.httpClient.delete(this.host + '/groupers/' + groupe_id + '/' + appUser_id);
    }

}
