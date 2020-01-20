import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';


import {Contact} from '../model/model.contact';
import {HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';

import {AppUser} from '../model/model.AppUser';


@Injectable()
export class ContactsService {

  //private jwtToken=null;

  constructor(public authService: AuthenticationService, public httpC: HttpClient) {
    //this.jwtToken=this.authService.loadToken();
  }


  //Fait avec httpClient et jwt
  getContacts(mc: string, pg: number, sz: number) {
    //  if(this.jwtToken==null) this.jwtToken=this.authService.loadToken();
    return this.httpC.get('http://localhost:8080/chercherContacts?mc=' + mc + '&page=' + pg + '&size=' + sz,
      {headers: new HttpHeaders({'Authorization': this.authService.loadToken()})});
    //this.jwtToken=null;
  }


  //Fait avec httpClient et jwt
  getContact(id: number) {
    return this.httpC.get('http://localhost:8080/contacts/' + id,
      {headers: new HttpHeaders({'Authorization': this.authService.loadToken()})});
  }


  getUser(mc: string) {
    return this.httpC.get('http://localhost:8080/chercherUser?username=' + mc,
      {headers: new HttpHeaders({'Authorization': this.authService.loadToken()})});
  }


  //Fait avec httpClient et jwt
  postContacts(contatct: Contact) {
    return this.httpC.post('http://localhost:8080/contacts', contatct,
      {headers: new HttpHeaders({'Authorization': this.authService.loadToken()})});
  }


  //Fait avec httpClient et jwt
  postUsers(user: AppUser) {
    return this.httpC.post('http://localhost:8080/register', user, {observe: 'response'});
  }


  //Fait avec httpClient et jwt
  putContacts(contact: Contact) {
    return this.httpC.put('http://localhost:8080/contacts/' + contact.id, contact,
      {headers: new HttpHeaders({'Authorization': this.authService.loadToken()})});
  }


  //Fait avec httpClient et jwt
  deleteContact(id: number) {
    return this.httpC.delete('http://localhost:8080/contacts/' + id,
      {headers: new HttpHeaders({'Authorization': this.authService.loadToken()})});
  }


}
