import { Component, OnInit } from '@angular/core';
import { PasswordForgetService } from './../../service/password-forget.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NzModalService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-forgot',
  templateUrl: './password-forgot.component.html',
  styleUrls: ['./password-forgot.component.css']
})
export class PasswordForgotComponent implements OnInit {
  email: string;
  validateForm: FormGroup;
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

  constructor(
    private passwordForgetService: PasswordForgetService,
    private modalService: NzModalService,
    private fb: FormBuilder,
    private router: Router 
    ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
    });
  }
  forget() {
    console.log(this.email);
    this.passwordForgetService.saveForget(this.email).subscribe(
      
      data => {
        this.modalService.success({
          nzTitle: 'Information',
          nzContent: '<p>Un lien de récupération de votre mot de passe vous a été envoyé !</p>',
          nzOnOk: () => console.log('Info OK')   
        });

      }, (eror: HttpErrorResponse) => {
        console.log('Echec !')
      }
    );
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
