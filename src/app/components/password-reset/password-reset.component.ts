import { Component, OnInit } from '@angular/core';
import { PasswordForgetService } from './../../service/password-forget.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
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
    private router: Router,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      password: [null, [Validators.required, Validators.maxLength(20),
      Validators.minLength(8), Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[-+!*$@%_])([-+!*$@%_\\w]{8,15})$')]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],

    });
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  submitForm() {
    if (this.validateForm.invalid) {
      this.modalService.error({
        nzTitle: 'Erreur',
        nzContent: '<p> Mot de passe invalide.</p>',
        nzOkText: null,
        nzCancelText: 'Ok',
        nzOnCancel: () => console.log('cancel')
      });
    } else {
      const formData = this.validateForm.value;
      this.passwordForgetService.saveReset(formData).subscribe(

        data => {
          this.validateForm = null;
          console.log(data);
          this.modalService.success({
            nzTitle: 'Information',
            nzContent: '<p>Félicitation ! Mot de passe restauré avec succès.</p>',
            nzOnOk: () => console.log('Info OK')
          });

        }, (eror: HttpErrorResponse) => {
          this.createMessage('warning', 'Echec de l\'enregistrement de recupération !');
        }
      );
    }
  }

  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
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
