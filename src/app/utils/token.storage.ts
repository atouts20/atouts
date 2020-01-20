import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const TOKEN_KEY = 'AuthToken';
const CURRENT_USER = 'CURRENT_USER';
const ROLE_ADMIN = 'ROLE_ADMIN';

@Injectable()
export class TokenStorage {


  expirationsession: number;
  constructor() {

    this.expirationsession = new Date().getTime() + environment.expirationTime;
  }

  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(CURRENT_USER);
    window.sessionStorage.clear();
  }

  public saveUserRole(role: string) {
    window.sessionStorage.setItem(ROLE_ADMIN, role);
  }

  public isAdmin(): boolean {
    let isAdmin: boolean = false;
    if (JSON.parse(this.getCurrentUser()) != null) {
      JSON.parse(this.getCurrentUser()).roles.forEach(function (value) {
        if (value.name === ROLE_ADMIN) {
          isAdmin = true;
        }
      });
    }
    return isAdmin;
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public getCurrentUser(): string {
    return sessionStorage.getItem(CURRENT_USER);
  }

  public saveCurrentUser(currentUser): boolean {
    window.sessionStorage.removeItem(CURRENT_USER);
    window.sessionStorage.setItem(CURRENT_USER, currentUser);
    return true;
  }


}
