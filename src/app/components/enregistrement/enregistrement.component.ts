import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Role } from '../../model/Role';
import { AuthenticationService } from '../../service/authentication.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { AppUser } from '../../model/model.AppUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enregistrement',
  templateUrl: './enregistrement.component.html',
  styleUrls: ['./enregistrement.component.css']
})
export class EnregistrementComponent implements OnInit {
  sexeList = [{ name: 'FEMME' }, { name: 'HOMME' }];
  matrimonialeList = [{ name: 'MARIE(E)' }, { name: 'CELIBATAIRE' }, { name: 'DIVORCE(E)' }, { name: 'VEUF' }, { name: 'VEUVE' }];

  isDisabledButton = false;

  validateFormUser_Etape1: FormGroup;
  validateFormUser_Etape2: FormGroup;
  validateFormUser_Etape3: FormGroup;
  validateFormUser_Etape4: FormGroup;
  validateFormUser_Etape5: FormGroup;
  selectedIndex = 0;

  //birthday = this.validateFormUser_Etape1.get('dateNaissance');

  imageUrl = 'assets/images/user.jpg';
  imageUrl1 = 'assets/images/cni.png';
  imageUrl2 = 'assets/images/signature.JPG';
  selectedFiles: FileList;
  selectedFiles1: FileList;
  selectedFiles2: FileList;
  fileToUpload: File = null;
  fileToUpload1: File = null;
  fileToUpload2: File = null;

  listOfOption = Array<Role>();
  paysList: Array<any> = [];
  metierList: Array<any> = [];

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


  comments = [
    { date: new Date(), message: 'A' },
    { date: new Date(), message: 'B' },
    { date: new Date(), message: 'C' },
    { date: new Date(), message: 'D' }
  ];

  userSubmit: AppUser = new AppUser();
  current = 0;
  unUser: AppUser = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private modalService: NzModalService,
    private http: HttpClient,
    private message: NzMessageService
  ) {
  }


  ngOnInit(): void {
    this.makeFormUser();
    this.getPays();
    this.getMetier();
    this.imageUrl = 'assets/images/user.jpg';
    this.imageUrl1 = 'assets/images/cni.png';
    this.imageUrl2 = 'assets/images/signature.JPG';
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


  monAge(birthday) {
    birthday = new Date(birthday);
    return new Number((new Date().getTime() - birthday.getTime() / 31536000000).toFixed(0));
  }

  getPays() {
    this.authService.getPays().subscribe(
      (data: Array<any>) => {
        this.paysList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });

  }

  getMetier() {
    this.authService.getMetier().subscribe(
      (data: Array<any>) => {
        this.metierList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });

  }

  makeFormUser(): void {
    this.validateFormUser_Etape1 = this.fb.group({
      nom: [this.userSubmit != null ? this.userSubmit.nom : null, [Validators.required]],
      prenom: [this.userSubmit != null ? this.userSubmit.prenom : null, [Validators.required]],
      dateNaissance: [this.userSubmit != null ? this.userSubmit.dateNaissance : null, [Validators.required]],
      lieu: [this.userSubmit != null ? this.userSubmit.lieu : null, [Validators.required]],
      departement: [this.userSubmit != null ? this.userSubmit.departement : null, [Validators.required]],
      residance: [this.userSubmit != null ? this.userSubmit.residance : null, [Validators.required]],
      nationalite: [this.userSubmit != null ? this.userSubmit.nationalite : null, [Validators.required]],
      sexe: [this.userSubmit != null ? this.userSubmit.sexe : null, [Validators.required]],
    });

    this.validateFormUser_Etape2 = this.fb.group({
      matrimoniale: [this.userSubmit != null ? this.userSubmit.matrimoniale : null, [Validators.required]],
      nomEtPrenomConjoint: [this.userSubmit != null ? this.userSubmit.nomEtPrenomConjoint : null, [Validators.required]],
      nbrEnfant: [this.userSubmit != null ? this.userSubmit.nbrEnfant : null, [Validators.required]],
      //profession: [this.userSubmit != null ? this.userSubmit.profession : null, [Validators.required]],
      //categorie: [this.userSubmit != null ? this.userSubmit.categorie : null, [Validators.required]],
      //naturePiece: [this.userSubmit != null ? this.userSubmit.naturePiece : null, [Validators.required]],
      nci: [this.userSubmit != null ? this.userSubmit.nci : null, [Validators.required]],
      //dateEmission: [this.userSubmit != null ? this.userSubmit.dateEmission : null, [Validators.required]],
      dateExpiration: [this.userSubmit != null ? this.userSubmit.dateExpiration : null, [Validators.required]],
      metier: [this.userSubmit != null ? this.userSubmit.metier : null, [Validators.required]],
      metiers: [this.userSubmit != null ? this.userSubmit.metiers : null, [Validators.required]],
      phoneNumber: [this.userSubmit != null ? this.userSubmit.phoneNumber : null, [Validators.required]],
     
     
    });

    this.validateFormUser_Etape3 = this.fb.group({
      phoneNumber1: [this.userSubmit != null ? this.userSubmit.phoneNumber1 : null],
      personneContacter: [this.userSubmit != null ? this.userSubmit.personneContacter : null, [Validators.required]],
      contactPersonneContacter: [this.userSubmit != null ? this.userSubmit.contactPersonneContacter : null, [Validators.required]],
      relationPersonne: [this.userSubmit != null ? this.userSubmit.relationPersonne : null, [Validators.required]],
      nomPere: [this.userSubmit != null ? this.userSubmit.nomPere : null, [Validators.required]],
     // contactPere: [this.userSubmit != null ? this.userSubmit.contactPere : null, [Validators.required]],
      nomMere: [this.userSubmit != null ? this.userSubmit.nomMere : null, [Validators.required]],
      //contactMere: [this.userSubmit != null ? this.userSubmit.contactMere : null, [Validators.required]],
    });

    this.validateFormUser_Etape4 = this.fb.group({
      //phoneNumber2: [this.userSubmit != null ? this.userSubmit.phoneNumber2 : null],
      email: [this.userSubmit != null ? this.userSubmit.email : null, [Validators.email, Validators.required]],
      username: [this.userSubmit != null ? this.userSubmit.username : null, [Validators.required]],
      password: [this.userSubmit != null ? this.userSubmit.password : null, [Validators.required, Validators.maxLength(16),
      Validators.minLength(8), Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[-+!*$@%_])([-+!*$@%_\\w]{8,15})$')]],
      repassword: [this.userSubmit != null ? this.userSubmit.repassword : null, [Validators.required, this.confirmationValidator]],

    });
    this.validateFormUser_Etape5 = this.fb.group({
      agree: [false]
    });

  }


  done(): void {
    if (this.validateFormUser_Etape5.value === false) {
      this.createMessage('warning', '<b> Veillez lire et approuvez la condition générale d\'utilisation de atout ! </b>');
    } else {
      console.log(this.userSubmit);
      const formData = new FormData();

      console.log(this.userSubmit);

      formData.append('user', JSON.stringify(this.userSubmit));
      formData.append('file', this.fileToUpload);
      formData.append('file1', this.fileToUpload1);
      formData.append('file2', this.fileToUpload2);

      console.log(formData);


      this.authService.postUsersSave(formData)
        .subscribe(
          (res: any) => {
            this.unUser = res;
            console.log(res);
            console.log('Email*******');
            console.log(this.unUser.email);
            this.imageUrl = 'assets/images/user.jpg';
            this.imageUrl1 = 'assets/images/cni.png';
            this.imageUrl2 = 'assets/images/signature.jpg';
            this.fileToUpload = null;
            this.fileToUpload1 = null;
            this.fileToUpload2 = null;
            this.modalService.success({
              nzTitle: 'Information',
              nzContent: '<b> Félicitation ! Vous avez créé votre compte atouts avec succès. Un mail de confirmation vous a été envoyé à l\'adresse <strong>'
                + this.unUser.email + '</strong> pour finaliser votre inscription.</b>',
              nzOkText: null,
              nzCancelText: 'Ok',
              nzOnCancel: () => this.finish()

            });
          },
          (error: HttpErrorResponse) => {
            this.createMessage('error', 'Echec de l\'enregistrement !');
          }
        );
    }
  }
  finish() {
    this.current = 0;
    this.validateFormUser_Etape1.reset();
    this.validateFormUser_Etape2.reset();
    this.validateFormUser_Etape3.reset();
    this.validateFormUser_Etape4.reset();
    this.validateFormUser_Etape5.reset();
  }
  pre(): void {
    this.current -= 1;

  }

  next(): void {
    this.changeContent();
  }


  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateFormUser_Etape4.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateFormUser_Etape4.controls.password.value) {
      return { confirm: true, error: true };
    }

  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }


  data = [
    {
      title: 'Title 1',
    },
    {
      title: 'Title 2',
    },
    {
      title: 'Title 3',
    },
    {
      title: 'Title 4',
    },
  ];




  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    console.log(this.fileToUpload);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  onSelectFile(event) {
    this.selectedFiles = event.target.files;
    console.log(event.target.files);
    this.fileToUpload = <File>event.target.files[0];
    console.log(this.fileToUpload.name);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  onSelectFile1(event) {
    this.selectedFiles1 = event.target.files;
    console.log(event.target.files);
    this.fileToUpload1 = <File>event.target.files[0];
    console.log(this.fileToUpload1.name);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl1 = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload1);
  }

  onSelectFile2(event) {
    this.selectedFiles2 = event.target.files;
    console.log(event.target.files);
    this.fileToUpload2 = <File>event.target.files[0];
    console.log(this.fileToUpload2.name);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl2 = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload2);
  }

  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }



  changeContent(): void {
    switch (this.current) {
      case 0: {
        if (this.validateFormUser_Etape1.valid) {
          this.userSubmit = Object.assign(this.userSubmit, this.validateFormUser_Etape1.value);
          console.log(this.validateFormUser_Etape1.value);
          // this.tokenStorage.saveCurrentProjet(this.userSubmit);
          this.current += 1;
        } else {

          this.modalService.error({
            nzTitle: 'Erreur',
            nzContent: '<p> Formulaire invalide. Veuillez renseigner tous les champs obligatoires se terminant ' +
              ' par <b>(*)</b></p>',
            nzOkText: null,
            nzCancelText: 'Ok',
            nzOnCancel: () => console.log(),
          });
        }

        break;
      }
      case 1: {
        if (this.validateFormUser_Etape2.valid) {
          this.userSubmit = Object.assign(this.userSubmit, this.validateFormUser_Etape2.value);
          console.log(this.userSubmit);
          //this.tokenStorage.saveCurrentProjet(this.userSubmit);
          this.current += 1;
        } else {

          this.modalService.error({
            nzTitle: 'Erreur',
            nzContent: '<p> Formulaire invalide. Veuillez renseigner tous les champs obligatoires se terminant ' +
              ' par <b>(*)</b></p>',
            nzOkText: null,
            nzCancelText: 'Ok',
            nzOnCancel: () => console.log(),
          });
        }
        break;
      }
      case 2: {
        if (this.validateFormUser_Etape3.valid) {
          this.userSubmit = Object.assign(this.userSubmit, this.validateFormUser_Etape3.value);
          console.log(this.userSubmit);
          // this.tokenStorage.saveCurrentProjet(this.userSubmit);
          this.current += 1;
        } else {

          this.modalService.error({
            nzTitle: 'Erreur',
            nzContent: '<p> Formulaire invalide. Veuillez renseigner tous les champs obligatoires se terminant ' +
              ' par <b>(*)</b></p>',
            nzOkText: null,
            nzCancelText: 'Ok',
            nzOnCancel: () => console.log(),
          });
        }
        break;
      }
      case 3: {
        if (this.validateFormUser_Etape4.valid) {
          this.userSubmit = Object.assign(this.userSubmit, this.validateFormUser_Etape4.value);
          console.log(this.userSubmit);
          //this.tokenStorage.saveCurrentProjet(this.userSubmit);
          this.current += 1;
        } else {

          this.modalService.error({
            nzTitle: 'Erreur',
            nzContent: '<p> Formulaire invalide. Veuillez renseigner tous les champs obligatoires se terminant ' +
              ' par <b>(*)</b></p>',
            nzOkText: null,
            nzCancelText: 'Ok',
            nzOnCancel: () => console.log(),
          });
        }
        break;
      }
      case 4: {
        if (this.validateFormUser_Etape5.valid) {
          this.userSubmit = Object.assign(this.userSubmit, this.validateFormUser_Etape5.value);
          console.log(this.userSubmit);
          //this.tokenStorage.saveCurrentProjet(this.userSubmit);
          this.current += 1;
        } else {

          this.modalService.error({
            nzTitle: 'Erreur',
            nzContent: '<p> Formulaire invalide. Veuillez renseigner tous les champs obligatoires se terminant ' +
              ' par <b>(*)</b></p>',
            nzOkText: null,
            nzCancelText: 'Ok',
            nzOnCancel: () => console.log(),
          });
        }
        break;
      }
      default: {

        this.current += 1;
      }
    }
  }

  onIndexChange(event: number): void {
    this.current = event;
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
