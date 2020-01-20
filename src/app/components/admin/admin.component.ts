import { Component, OnInit } from '@angular/core';
import { TokenStorage } from '../../utils/token.storage';
import { Router } from '@angular/router';

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
    sub7: false
  };
  constructor(
    private tokenStorage: TokenStorage,
    private router: Router,
  ) { }

  ngOnInit() {
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
