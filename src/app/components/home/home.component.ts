import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  array = ['assets/images/1.jpg', 'assets/images/2.jpg', 'assets/images/3.jpg', 'assets/images/4.jpg'];
  /* effect = 'scrollx'; */
  tabs = [
    {
      active: false,
      name: 'Acceuil',
      icon: 'home'
    },
    {
      active: false,
      name: 'A propos',
      icon: 'info-circle'
    },
    {
      active: false,
      name: 'Publications',
      icon: 'appstore'
    },
    {
      active: false,
      name: 'Connexion',
      icon: 'user'
    }
  ];
  selectedIndex = 0;

  constructor(private router: Router) { }

  ngOnInit() {
   /*  setTimeout(() => {
      this.effect = 'fade';
    }, 100000); */
  }

  log(index: number): void {
    console.log(index);
    console.log(this.selectedIndex);
    switch (this.selectedIndex) {
      case 0:

        {
          this.blank();

          break;
        }
      case 1:

        {
          this.apropos();

          break;
        }
      case 2:

        {
          this.market();

          break;
        }
        case 3:
  
          {
            this.login();
  
            break;
          }

      default:
        {
          this.blank();

          break;
        }

    }
  }

  apropos() {
    this.router.navigate(['/apropos']);
  }

  blank() {
    this.router.navigate(['/blank']);
  }

  login() {
    this.router.navigate(['/connexion']);
  }

  market() {

    this.router.navigate(['/market-all']);
  }


  connexion() {
    console.log('La vie est belle in god we trust');
    this.router.navigate(['/connexion']);
  }

}
