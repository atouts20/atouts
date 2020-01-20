import { Role } from '../model/Role';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';



@Injectable({
    providedIn: 'root'
})
export class RoleService {
    host: string = environment.backend;
   // private host: string = 'http://localhost:8080';
    private newRole = new Subject<string>();
    newRoleStream = this.newRole.asObservable();

    constructor(public httpClient: HttpClient, private authService: AuthenticationService) {

    }

    newRoleCom() {
        this.newRole.next('ok');
    }


    getRoles(): Observable<object> {
        return this.httpClient.get(this.host + '/listRoles');
    }
    getRole(id: number): Observable<object> {
        return this.httpClient.get(this.host + '/listRole/' + id,
            { headers: new HttpHeaders({ 'Authorization': this.authService.loadToken() }) });
    }

    postRole(role: Role): Observable<any> {
        return this.httpClient.post(this.host + '/saveRole', role,
            { headers: new HttpHeaders({ 'Authorization': this.authService.loadToken() }) });
    }

    putRole( role: Role) {
        return this.httpClient.put(this.host + '/updateRole/' + role.id, role,
            { headers: new HttpHeaders({ 'Authorization': this.authService.loadToken() }) });
    }

    deleteBien(id: any) {
        return this.httpClient.delete(this.host + '/role/' + id,
            { headers: new HttpHeaders({ 'Authorization': this.authService.loadToken() }) });
    }


}
