import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { AuthenticationService } from '../../service/authentication.service';
import { User } from '../../model/model.user';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenStorage } from '../../utils/token.storage';
import { AppUser } from '../../model/model.AppUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;
  user: AppUser;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService,
    private authService: AuthenticationService,
    private tokenStorage: TokenStorage,
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.maxLength(20),
      Validators.minLength(8), Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[-+!*$@%_])([-+!*$@%_\\w]{8,15})$')]],
      remember: [true]
    });

    this.tokenStorage.signOut();
    this.authService.setIsConnectedUser();
    this.authService.setCurrentUserConnected();
  }
  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }

  submitForm(): void {
    if (this.validateForm.valid === true) {
      const formData = this.validateForm.value;
      this.authService.login(formData.username, formData.password).subscribe(
        (data) => {
          console.log(data);
          if (data.success === false) {
            this.createMessage('error', 'Identifiants invalids !');
          } else {
            let jwt = data.headers.get('Authorization');
            console.log(jwt);
            console.log('je suis jwt ======>');
            this.tokenStorage.saveToken(jwt);
            this.storeCurrentUser();
            console.log(this.tokenStorage.getToken());
            location.href = '/atouts/admin';
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.createMessage('error', 'Erreur système. Veuillez réessayer ultérieurement !');
        });
    } else {
      this.createMessage('warning', 'Formulaire invalids. Veuillez renseigner tous les champs !');
    }
  }

  storeCurrentUser() {
    const formData = this.validateForm.value;
    this.authService.retrieveCurrentUser(formData.username).subscribe(
      (data) => {

        console.log(data);

        console.log(JSON.parse(this.tokenStorage.getCurrentUser()));
        if (this.tokenStorage.saveCurrentUser(JSON.stringify(data)) == true) {
          this.authService.setIsConnectedUser();
          this.authService.setCurrentUserConnected();
          this.user = JSON.parse(this.tokenStorage.getCurrentUser());

          if (this.user.roles[0].roleName == 'ADMIN') {
            location.href = '/admin';
          } else {

            if (this.user.roles[0].roleName == 'ROLE_USER_STRUCTURE_EXTERNE') {

              location.href = '/admin-structure-externe';
            }

            if (this.user.roles[0].roleName == 'ROLE_USER_PTF') {
              location.href = '/admin-ptf';
            }

          }



          //this.router.navigate(['admin']);
        }
        //window.l();
      },
      (error: HttpErrorResponse) => {
        // console.log('An error is occured ' + error.message);
      }
    );

  }

  onRegister() {
    this.router.navigate(['/register']);
  }



}
