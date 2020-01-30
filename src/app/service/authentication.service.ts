import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { User } from '../model/model.user';
import { environment } from '../../environments/environment';
import { AppUser } from '../model/model.AppUser';
import { TokenStorage } from '../utils/token.storage';
import { Role } from './../model/Role';


@Injectable()
export class AuthenticationService {
    private host: string = environment.backend;
    private jwtToken = null;
    private AuthToken = null;
    private roles: Array<Role>;
    private newAppUser = new Subject<string>();

    newUserStream = this.newAppUser.asObservable();
    public user: string;
    public users: any;
    public username: string;
    private photo: string;
    private idUser: string;
    public currentUser: BehaviorSubject<AppUser>;
    public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    //etat:number;

    constructor(public http: HttpClient, private tokenStorage: TokenStorage) {
        this.currentUser = new BehaviorSubject<AppUser>(JSON.parse(this.tokenStorage.getCurrentUser()));
        this.isUserLoggedIn = new BehaviorSubject<boolean>((JSON.parse(this.tokenStorage.getCurrentUser()) != null) ? true : false);

    }

    public setCurrentUserConnected() {
        this.currentUser = new BehaviorSubject<AppUser>(JSON.parse(this.tokenStorage.getCurrentUser()));
    }

    public setIsConnectedUser() {
        this.isUserLoggedIn = new BehaviorSubject<boolean>((JSON.parse(this.tokenStorage.getCurrentUser()) != null) ? true : false);
    }
    newUserCom() {
        this.newAppUser.next('ok');
    }

    login(username: string, password: string): Observable<any> {
        console.log('login::');
        const credentials = { username: username, password: password };
        console.log(credentials);
        return this.http.post(this.host + '/login', credentials, { observe: 'response' });
    }

    // login(user){
    //   if(this.jwtToken==null) this.loadToken();
    //   return this.http.get(this.host+"/utilisateur",{headers: new HttpHeaders({'Authorization': this.jwtToken})});
    // }
    /*  saveToken(jwt: string) {
         this.jwtToken = jwt;
         localStorage.setItem('token', jwt);
        // let jwtHelper = new JwtHelper();
         console.log(jwtHelper);
         this.roles = jwtHelper.decodeToken(this.jwtToken).roles;
         this.username = jwtHelper.decodeToken(this.jwtToken).sub;
 
         sessionStorage.setItem('user', this.username);
 
         this.getUser(this.username)
             .subscribe(data => {
                 this.users = data;
 
                 localStorage.setItem('utilisateur', JSON.stringify(this.users));
 
                 //this.loadIdUser();
 
             }, err => {
                 console.log(err);
             });
 
     } */

    loadToken() {
        return this.jwtToken = localStorage.getItem('token');
    }

    /* loadIdUser() {
        const personne = JSON.parse(localStorage.getItem('utilisateur'));
        console.log(personne.id);
        return personne;
    }
    loadId() {
        const personne = JSON.parse(localStorage.getItem('utilisateur'));
        console.log(personne.id);
        return personne.id;
    } */
    loadPhoto() {
        const personne = JSON.parse(localStorage.getItem('utilisateur'));
        //console.log(personne.photo);
        return personne.photo;
    }


    /*  logout() {
         this.jwtToken = null;
         localStorage.removeItem('token');
     } */

    /* loadUser() {
        return this.user = sessionStorage.getItem('user');
    } */

    /*  loadPhoto() {
         return localStorage.getItem('photo');
     } */


    logout() {
        this.jwtToken = null;
        /* localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('photo'); */
        localStorage.clear();
    }



    postUsersSave(dataForm: FormData) {

        return this.http.post(this.host + '/register', dataForm, { observe: 'response' });
    }

    postUsersSaveFinal(dataForm: FormData, id: any) {

        return this.http.post(this.host + '/register-final/' + id, dataForm, { observe: 'response' });
    }


    getRoles(id: any): Observable<object> {
        return this.http.get(this.host + '/roles/' + id);
    }

    //Fait avec httpClient et jwt
    postAppUser(dataForm: FormData): Observable<Object> {
        return this.http.post(this.host + '/register', dataForm);
    }



    retrieveCurrentUser(username: string) {
        return this.http.get(this.host + '/me/' + username);
    }

    //,  
    getUtilisateur(): Observable<object> {
        return this.http.get(this.host + '/listUtilisateurs');
    }

    getUtilisateurNonActives(): Observable<object> {
        return this.http.get(this.host + '/listUtilisateurs-non-actives');
    }

    getRole(): Observable<object> {

        return this.http.get(this.host + '/listRoles');
    }

    getPays(): Observable<object> {

        return this.http.get(this.host + '/pays');
    }
    getMetier(): Observable<object> {

        return this.http.get(this.host + '/metier');
    }

    getLoggedUsers(): Observable<object> {

        return this.http.get(this.host + '/loggedUsers');
    }



    //Fait avec httpClient et jwt
    deleteUtilisateur(id: number) {
        if (this.jwtToken == null) this.loadToken();
        return this.http.delete(this.host + '/delete/' + id);
    }
    /*    setEtat(etat:number){
            if(this.jwtToken==null){
                this.etat=0;
            }
            this.etat=etat;
        }  */

    isDeconnect() {
        if (this.jwtToken == null) {
            return true;
        }
        return false;
    }



    isAdmin() {
        if (this.AuthToken != null) {
            for (let r of this.roles) {
                if (r.roleName === 'ADMIN') { return true; }
            }
        }

        return false;
    }
    isUser() {
        if (this.AuthToken != null) {
            for (let r of this.roles) {
                if (r.roleName === 'USER') { return true; }
            }
        }

        return false;
    }

    grtUtilisateur(): Observable<object> {
        if (this.jwtToken == null) this.loadToken();
        return this.http.get(this.host + '/listAppUsers');
    }

    getUser(username: string) {
        return this.http.get(this.host + '/chercherUser?username=' + username);
    }

    // Jasperreport
    postAppUserReport() {
        if (this.jwtToken == null) this.loadToken();
        return this.http.get(this.host + '/export');
    }
}
