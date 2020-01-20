import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import {TokenStorage} from './token.storage';

@Injectable()
export class RoleGuardService implements CanActivate {

  constructor(private auth: TokenStorage) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    return this.auth.isAdmin();
  }

}
