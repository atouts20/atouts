import { Component, OnInit } from '@angular/core';
import { TokenStorage } from '../../utils/token.storage';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../service/authentication.service';
import { AppUser } from './../../model/model.AppUser';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  isCollapsed = false;
  //user: User = null;
  isUserLoggedIn: boolean = false;
  openMap: { [name: string]: boolean } = {
    sub1: false,
    sub2: false,
    sub3: false,
    sub4: false,
    sub5: false,
    sub6: false,
    sub7: false,
    sub8: false
  };
  isAdmin: boolean = false;
  isUser: boolean = false;
  userConnect: AppUser = null;
  constructor(
    private tokenStorage: TokenStorage,
    private router: Router,
    private auth: AuthenticationService,
  ) {
    this.userConnect = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.userConnect = JSON.parse(this.tokenStorage.getCurrentUser());
    console.log('this.isAdmin = this.UserIsAdmin')
    this.isAdmin = this.UserIsAdmin();
    console.log('this.isUser = this.UserIsUser')

    this.isUser = this.userIsUser();
  }

  UserIsAdmin() {
    if (this.tokenStorage.getToken() !== null != null) {
      if (this.userConnect.roles[0].roleName === 'ADMIN') {
        console.log(this.userConnect.roles[0].roleName);
        return true;
      }
    }

    return false;
  }
  userIsUser() {
    if (this.tokenStorage.getToken() !== null != null) {

      if (this.userConnect.roles[0].roleName === 'USER') {
        console.log(this.userConnect.roles[0].roleName);
        return true;
      }

    }
    return false;
  }

  openHandler(value: string): void {
    for (const key in this.openMap) {
      if (key !== value) {
        this.openMap[key] = false;
      }
    }
  }
  onBack() {
    this.isCollapsed = false;
  }
  logout() {
    this.isUserLoggedIn = false;
    //this.user = null;
    this.tokenStorage.signOut();
    this.router.navigate(['connexion']);
  }

}
