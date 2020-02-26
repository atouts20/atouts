import { Component, OnInit } from '@angular/core';
import { Role } from '../../../../model/Role';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { AppUser } from '../../../../model/model.AppUser';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../service/authentication.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { RoleService } from '../../../../service/role.service';
import { TokenStorage } from '../../../../utils/token.storage';
import { Bloquer } from '../../../../model/model.bloquer';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-crud-utilisateur',
  templateUrl: './crud-utilisateur.component.html',
  styleUrls: ['./crud-utilisateur.component.css']
})
export class CrudUtilisateurComponent implements OnInit {
  sexeList = [{ name: 'FEMME' }, { name: 'HOMME' }];
  matrimonialeList = [{ name: 'MARIE(E)' }, { name: 'CELIBATAIRE' }, { name: 'DIVORCE(E)' }, { name: 'VEUF' }, { name: 'VEUVE' }];
  ecran: number = 256;
  roleList: Array<Role> = [];
  sortName = null;
  sortValue = null;
  searchValue = '';
  childrenVisible = false;
  searchAddress = [];
  listUtilisateurs1 = [];
  usernameList: Array<string> = [];

  edit: boolean = false;
  admin: boolean = false;

  user: any;

  iduser: number;
  idtest
  index
  dateFormat = 'dd/MM/yyyy';
  listLogger;


  imageUrl: String = 'assets/asRach/images/iws_c.png';
  imageUrl1: String = 'assets/asRach/images/iws_c.png';
  imageUrl2: String = 'assets/asRach/images/iws_c.png';
  selectedFiles: FileList;
  selectedFiles1: FileList;
  selectedFiles2: FileList;
  fileToUpload: File = null;
  fileToUpload1: File = null;
  fileToUpload2: File = null;
  i = 1;
  editCache = {};
  listUtilisateurs: AppUser[];
  listUtilisateursBloques = [];
  //multipleValue = Array<Role>();
  multipleValue: Role;
  listOfOption = Array<Role>();
  currentUser: AppUser = null;
  appUser: AppUser;
  sortMap = {
    username: null,
    nom: null,
    prenom: null
  };
  // $event: Array<{ name: string; age: number; address: string; checked: boolean }>
  visible = false;
  validateForm: FormGroup;
  validateFormRoles: FormGroup;
  roleForm: FormGroup;



  isVisibleFormBloquer = false;
  validateFormBloquer: FormGroup;
  appUserCourent: AppUser = null;
  index2 = 0;

  listeBloquagesByUtilisateur = [];
  isVisibleListBloquage = false;

  userSubmit: AppUser = new AppUser();

  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.id === o2.id : o1 === o2);
  compareFnPays = (o1: any, o2: any) => (o1 && o2 ? o1.capital === o2.capital : o1 === o2);


  dataSet = [];
  dataSet1 = [];
  dat;

  paysList: Array<any> = [];
  metierList: Array<any> = [];



  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService,
    private modalService: NzModalService,
    private roleService: RoleService,
    private authService: AuthenticationService,
    private tokenStorage: TokenStorage
  ) {
    this.currentUser = JSON.parse(this.tokenStorage.getCurrentUser());
  }


  ngOnInit(): void {

    /* this.dataSet = [];
    this.updateEditCache(); */
    this.resolutionDrawer();
    this.getListloggedUsers();
    console.log(this.currentUser);
    console.log("dfjkwxbbbbbbbgsbjk");
    console.log(this.authService.setCurrentUserConnected());
    console.log(this.authService.setIsConnectedUser());
    //this.getList();
    this.makeFormeUtilisateur();
    this.makeFormeUtilisateurRoles();
    this.makeFormBloquer();
    this.loadUser();
    this.loadRoles();
    this.loadUserBloques();
    this.authService.newUserStream.subscribe(data => this.loadUser());
    this.getListloggedUsers();
    this.getPays();
    this.getMetier();

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



  makeFormeUtilisateur(): void {
    this.validateForm = this.fb.group({

      /* nom: [null, [Validators.required]],
      prenom: [null, [Validators.required]],

      dateNaissance: [null, [Validators.required]],
      lieu: [null, [Validators.required]],


      password: [null, [Validators.required, Validators.maxLength(20),
      Validators.minLength(8), Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[-+!*$@%_])([-+!*$@%_\\w]{8,15})$')]],
      repassword: [null, [Validators.required, this.confirmationValidator]],

      phoneNumber: [null, [Validators.required]],
      phoneNumber1: [null, [Validators.required]],

      contactPersonneContacter: [null, [Validators.required]],
      relationPersonne: [null, [Validators.required]],

      signature: [null, [Validators.required]],
      profession: [null, [Validators.required]],

      nomPere: [null, [Validators.required]],
      nomMere: [null, [Validators.required]],

      nationalite: [null, [Validators.required]],
      residance: [null, [Validators.required]],

      dateEmission: [null, [Validators.required]],
      dateExpiration: [null, [Validators.required]],

      categorie: [null, [Validators.required]],
      departement: [null, [Validators.required]],

      contactPere: [null, [Validators.required]],
      contactMere: [null, [Validators.required]],

      matrimoniale: [null, [Validators.required]],
      nomEtPrenomConjoint: [null, [Validators.required]],

      nbrEnfant: [null, [Validators.required]],
      personneContacter: [null, [Validators.required]],

      naturePiece: [null, [Validators.required]],
      nci: [null, [Validators.required]],

      email: [null, [Validators.email, Validators.required]],
      username: [null, [Validators.required]],


      phoneNumber2: [null, [Validators.required]],
      sexe: [null, [Validators.required]],
      roles: [null, [Validators.required]],

      photo: [null, [Validators.required]],
      scane: [this.fileToUpload, [Validators.required]], */

      nom: [this.userSubmit != null ? this.userSubmit.nom : null, [Validators.required]],
      prenom: [this.userSubmit != null ? this.userSubmit.prenom : null, [Validators.required]],
      dateNaissance: [this.userSubmit != null ? this.userSubmit.dateNaissance : null, [Validators.required]],
      lieu: [this.userSubmit != null ? this.userSubmit.lieu : null, [Validators.required]],
      departement: [this.userSubmit != null ? this.userSubmit.departement : null, [Validators.required]],
      residance: [this.userSubmit != null ? this.userSubmit.residance : null, [Validators.required]],
      nationalite: [this.userSubmit != null ? this.userSubmit.nationalite : null, [Validators.required]],
      sexe: [this.userSubmit != null ? this.userSubmit.sexe : null, [Validators.required]],
      roles: [this.userSubmit != null ? this.userSubmit.roles : null, [Validators.required]],
      matrimoniale: [this.userSubmit != null ? this.userSubmit.matrimoniale : null, [Validators.required]],
      nomEtPrenomConjoint: [this.userSubmit != null ? this.userSubmit.nomEtPrenomConjoint : null, [Validators.required]],
      nbrEnfant: [this.userSubmit != null ? this.userSubmit.nbrEnfant : null, [Validators.required]],
      nci: [this.userSubmit != null ? this.userSubmit.nci : null, [Validators.required]],
      dateExpiration: [this.userSubmit != null ? this.userSubmit.dateExpiration : null, [Validators.required]],
      metier: [this.userSubmit != null ? this.userSubmit.metier : null, [Validators.required]],
      metiers: [this.userSubmit != null ? this.userSubmit.metiers : null, [Validators.required]],
      phoneNumber: [this.userSubmit != null ? this.userSubmit.phoneNumber : null, [Validators.required]],
      phoneNumber1: [this.userSubmit != null ? this.userSubmit.phoneNumber1 : null],
      personneContacter: [this.userSubmit != null ? this.userSubmit.personneContacter : null, [Validators.required]],
      contactPersonneContacter: [this.userSubmit != null ? this.userSubmit.contactPersonneContacter : null, [Validators.required]],
      relationPersonne: [this.userSubmit != null ? this.userSubmit.relationPersonne : null, [Validators.required]],
      nomPere: [this.userSubmit != null ? this.userSubmit.nomPere : null, [Validators.required]],
      nomMere: [this.userSubmit != null ? this.userSubmit.nomMere : null, [Validators.required]],
      email: [this.userSubmit != null ? this.userSubmit.email : null, [Validators.email, Validators.required]],
      username: [this.userSubmit != null ? this.userSubmit.username : null, [Validators.required, this.userNameAsyncValidator]],
      password: [this.userSubmit != null ? this.userSubmit.password : null, [Validators.required, Validators.maxLength(16),
      Validators.minLength(8), Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[-+!*$@%_])([-+!*$@%_\\w]{8,15})$')]],
      repassword: [this.userSubmit != null ? this.userSubmit.repassword : null, [Validators.required, this.confirmationValidator]],



    });
  }

  makeFormeUtilisateurRoles(): void {
    this.validateFormRoles = this.fb.group({
      role: [null, [Validators.required]],
    });
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  ajout() {
    this.edit = false;
    this.admin = false;
    this.imageUrl = 'assets/asRach/images/default.jpg';
    this.imageUrl1 = 'assets/asRach/images/default1.jpg';
    this.imageUrl2 = 'assets/asRach/images/default2.jpg';

    this.userSubmit = null;
    this.makeFormeUtilisateur();

    //this.ngOnInit();
    this.open();
  }

  /* export(){
    this.authService.getReport()
  .subscribe(
    (res : String) => {
       console.log(res);  
    },
    err => {
      console.log("Error occured");
    });
  } */


  submitForm(): void {

    console.log(this.validateForm.value);



    let k = 0;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
      k++;
    }
    console.log(k);


    if (!this.edit) {

      const formData = new FormData();

      this.user = this.validateForm.value;

      /* this.user = {
        nom: this.validateForm.value.nom,
        prenom: this.validateForm.value.prenom,
        dateNaissance: this.validateForm.value.dateNaissance,
        lieu: this.validateForm.value.lieu,
        departement: this.validateForm.value.departement,
        username: this.validateForm.value.username,
        password: this.validateForm.value.password,
        email: this.validateForm.value.email,
        profession: this.validateForm.value.profession,
        tel: this.validateForm.value.tel,
        tel1: this.validateForm.value.tel1,
        tel2: this.validateForm.value.tel2,
        residance: this.validateForm.value.residance,
        categorie: this.validateForm.value.categorie,
        nationalite: this.validateForm.value.nationalite,
        naturePiece: this.validateForm.value.naturePiece,
        nci: this.validateForm.value.nci,
        dateEmission: this.validateForm.value.dateEmission,
        dateExpiration: this.validateForm.value.dateExpiration,
        nomPere: this.validateForm.value.nomPere,
        nomMere: this.validateForm.value.nomMere,
        contactPere: this.validateForm.value.contactPere,
        contactMere: this.validateForm.value.contactMere,
        matrimoniale: this.validateForm.value.matrimoniale,
        nomEtPrenomConjoint: this.validateForm.value.nomEtPrenomConjoint,
        nbrEnfant: this.validateForm.value.nbrEnfant,
        personneContacter: this.validateForm.value.personneContacter,
        contactPersonneContacter: this.validateForm.value.contactPersonneContacter,
        relationPersonne: this.validateForm.value.relationPersonne,
        sexe: this.validateForm.value.sexe,
        roles: this.validateForm.value.roles,
      }; */

      console.log(this.user);

      formData.append('user', JSON.stringify(this.user));
      formData.append('file', this.fileToUpload);
      formData.append('file1', this.fileToUpload1);
      formData.append('file2', this.fileToUpload2);

      console.log(formData);



      if (k !== 0) {
        this.authService.postAppUserAdmin(formData)
          .subscribe((res: AppUser) => {
            this.imageUrl = 'assets/asRach/images/default.jpg';
            this.imageUrl1 = 'assets/asRach/images/default1.jpg';
            this.imageUrl2 = 'assets/asRach/images/default2.jpg';

            this.fileToUpload = null;
            this.fileToUpload1 = null;
            this.fileToUpload2 = null;
            console.log(res);
            this.validateForm.reset();

             this.listUtilisateurs.unshift(res);

            this.dat = this.listUtilisateurs;
            this.updateEditCache(); 

            /* this.close();
            this.loadUser(); */

          },
            err => {
              console.log(err);
            }
          );
      }
    } else {

      if (!this.admin) {

        if (k !== 0) {

          const formData = new FormData();

          this.user = this.validateForm.value;

          console.log(this.user);

          formData.append('user', JSON.stringify(this.user));

          //if(this.fileToUpload!==null)
          formData.append('file', this.fileToUpload);
          formData.append('file1', this.fileToUpload1);
          formData.append('file2', this.fileToUpload2);

          console.log(formData);

          console.log(this.edit);

          console.log(this.iduser);

          if (this.fileToUpload != null && this.fileToUpload1 != null && this.fileToUpload2 != null) {

            this.authService.putUtilisateurF(this.iduser, formData)
              .subscribe((res: AppUser) => {
                this.imageUrl = 'assets/asRach/images/default.jpg';
                this.imageUrl1 = 'assets/asRach/images/default1.jpg';
                this.imageUrl2 = 'assets/asRach/images/default2.jpg';
                this.fileToUpload = null;
                this.fileToUpload1 = null;
                this.fileToUpload2 = null;
                console.log(res);
                this.validateForm.reset();

                 this.listUtilisateurs = this.listUtilisateurs.filter(d => d.id !== res.id);
                this.listUtilisateurs.unshift(res);

                this.dat = this.listUtilisateurs;
                this.updateEditCache();  

                
                this.close();
                //this.loadUser();
                
              },
                err => {
                  console.log(err);
                }
              );

          } else {
            console.log(this.user);
            this.authService.putUtilisateur(this.iduser, this.user)
              .subscribe((res: AppUser) => {
                this.imageUrl = 'assets/asRach/images/default.jpg';
                this.imageUrl1 = 'assets/asRach/images/default1.jpg';
                this.imageUrl2 = 'assets/asRach/images/default2.jpg';
                this.fileToUpload = null;
                this.fileToUpload1 = null;
                this.fileToUpload2 = null;
                console.log(res);
                 this.validateForm.reset();

              this.listUtilisateurs = this.listUtilisateurs.filter(d => d.id !== res.id);
                this.listUtilisateurs.unshift(res);

                this.dat = this.listUtilisateurs;
                this.updateEditCache(); 

                this.close();
                //this.loadUser();
              },
                err => {
                  console.log(err);
                }
              );
          }


        }

      } else {

        /*  this.user ={nom:this.validateForm.value.nom,
           prenom:this.validateForm.value.prenom, 
           dateNaissance:this.validateForm.value.dateNaissance, 
           username:this.validateForm.value.username,          
           email:this.validateForm.value.email, 
           tel:this.validateForm.value.tel, 
           roles:this.dataSet1
         }; */


        //this.idtest = this.validateForm.value.role.id;
        this.idtest = this.multipleValue.id;
        this.index = this.dataSet1.findIndex(item => item.id === this.idtest);
        console.log(this.index);

        if (this.dataSet1.length == 0) {

          if (k !== 0) {
            //this.dataSet1 = [...this.dataSet1, this.validateForm.value.role];
            this.dataSet1 = [...this.dataSet1, this.multipleValue];
            //this.updateEditCache();          
          }

          console.log(this.dataSet1);

        } else {

          if (this.index == -1) {


            if (k !== 0) {
              //this.dataSet1 = [...this.dataSet1, this.validateForm.value.role];
              this.dataSet1 = [...this.dataSet1, this.multipleValue];
              //this.updateEditCache();          
            }

            console.log(this.dataSet1);

          } else {


            console.log(this.dataSet1);

          }



        }

      }



    }



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

  }

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  startEdit(key: string): void {
    this.editCache[key].edit = true;

    console.log(this.editCache[key].data);
    //this.saveEdit(this.editCache[key].data);
  }

  cancelEdit(key: string): void {
    this.editCache[key].edit = false;

    console.log(this.editCache[key].data);
  }

  saveEdit(key: number): void {
    const index = this.listUtilisateurs.findIndex(item => item.id === key);

    console.log('11111111');
    console.log(this.listUtilisateurs[index]);
    console.log('11111111');

    console.log('22222222');
    console.log(this.editCache[key].data);
    console.log('22222222');

    this.authService.putUtilisateur(key, this.editCache[key].data)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        });

    //this.authService.putUtilisateur(this.editCache[key].data);
    Object.assign(this.listUtilisateurs[index], this.editCache[key].data);
    // this.listUtilisateurs[ index ] = this.editCache[ key ].data;
    this.editCache[key].edit = false;

  }


  delete(key: number) {
    /* const index = this.dataSet.findIndex(item => item.id === key);
    this.dataSet.splice(index,1); */

    this.authService.deleteUtilisateur(key)
      .subscribe(data => {
        console.log(data);
        this.listUtilisateurs = this.listUtilisateurs.filter(d => d.id !== key);
        this.dat = this.listUtilisateurs;
        this.updateEditCache();
        //this.ngOnInit();
      }, err => {
        console.log(err);
      })
  }

  delete1(key: number) {

    const dataSet = this.dataSet1.filter(d => d.id !== key);
    this.dataSet1 = dataSet;

    console.log(this.dataSet1);

  }




  updateEditCache(): void {

    this.listUtilisateurs.forEach(item => {
      // console.log(this.editCache[item.id]);
      if (!this.editCache[item.id]) {
        this.editCache[item.id] = {
          edit: false,
          data: { ...item }
        };
      }
    });
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  handeFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
    console.log(this.imageUrl + '---TOLODE---' + file.item(0).name + '--GéGé----' +
      Image.toString);

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



  startDelete(utilisateurs) {
    this.authService.deleteUtilisateur(utilisateurs).subscribe(response => this.loadUser());

  }
  private loadUser() {
    this.authService.getUtilisateur()
      .subscribe((data: Array<AppUser>) => {

        this.listUtilisateurs = data;
        this.dat = data;
        this.updateEditCache();
        console.log(this.listUtilisateurs);

      }, (error: HttpErrorResponse) => {
        console.log(error);
      });
  }



  private loadRoles() {
    this.authService.getRole()
      .subscribe((data: Array<Role>) => {
        this.listOfOption = data;
        //this.updateEditCache();

        console.log(this.listOfOption);

      }, err => {
        console.log(err);
      });
  }

  private loadUserBloques() {
    this.authService.getUtilisateurBloques()
      .subscribe((data: Array<AppUser>) => {

        this.listUtilisateursBloques = data;
        //this.updateEditCache();
        console.log(this.listUtilisateursBloques);

      }, (error: HttpErrorResponse) => {
        console.log(error);
      });
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }


  sort(sortName: string, value: boolean): void {
    this.sortName = sortName;
    this.sortValue = value;
    for (const key in this.sortMap) {
      this.sortMap[key] = (key === sortName ? value : null);
    }
    this.search();
  }

  filterAddressChange(value: string[]): void {
    this.searchAddress = value;
    this.search();
  }


  search(): void {
    const filterFunc = (item) => {
      return (this.searchAddress.length ? this.searchAddress.some(username => item.username.indexOf(username) !== -1) : true) &&
        (item.username.indexOf(this.searchValue) !== -1);
    };
    const data = this.dat.filter(item => filterFunc(item));
    this.listUtilisateurs = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1 : -1)
      : (b[this.sortName] > a[this.sortName] ? 1 : -1));
  }


  edition() {
    this.authService.postAppUserReport()
      .subscribe(
        data => {
          console.log(data);
        },
        err => {
          console.log(err);
        }
      );
  }

  getList(): void {
    this.roleService.getRoles().subscribe(
      (data: Array<Role>) => {
        this.roleList = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }

  getListloggedUsers(): void {

    this.authService.getLoggedUsers().subscribe(
      (data: Array<any>) => {
        console.log("=========================");
        console.log(this.listLogger);
        console.log(data);
        console.log("=========================")
        this.listLogger = data;
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }









  avance(user: AppUser) {
    this.edit = true;
    this.admin = false;

    console.log(this.edit);
    this.editCache[user.id].edit = false;

    /* this.imageUrl = "http://localhost:8080/files/" + this.editCache[key].data.photo;
    this.imageUrl1 = "http://localhost:8080/files/" + this.editCache[key].data.scane;
    this.imageUrl2 = "http://localhost:8080/files/" + this.editCache[key].data.signature; */

    this.userSubmit = user;
    console.log(this.userSubmit);
    this.makeFormeUtilisateur();
    this.iduser = user.id;
    this.imageUrl = "http://localhost:8080/files/" + this.userSubmit.photo;
    this.imageUrl1 = "http://localhost:8080/files/" + this.userSubmit.scane;
    this.imageUrl2 = "http://localhost:8080/files/" + this.userSubmit.signature;
    //this.ngOnInitUpdate(key);

    this.open();
  }

  admins(key: string) {
    console.log(this.editCache[key].data);
    this.edit = true;
    this.admin = true;
    //console.log(this.dataSet1);
    console.log(this.admin);
    this.editCache[key].edit = false;

    this.userSubmit = this.editCache[key].data;
    this.makeFormeUtilisateur();
    this.iduser = this.editCache[key].data.id;

    this.dataSet1 = this.editCache[key].data.roles;

    //this.ngOnInitUpdate(key);
    console.log(this.dataSet1);
    this.open();
  }


  validAdmin() {
    /* this.user ={
      nom: this.validateForm.value.nom,
      prenom:this.validateForm.value.prenom, 
      dateNaissance:this.validateForm.value.dateNaissance, 
      lieu:this.validateForm.value.lieu,
      departement: this.validateForm.value.departement,
      username: this.validateForm.value.username,
      email: this.validateForm.value.email,  
      profession: this.validateForm.value.profession,
      tel: this.validateForm.value.tel,
      tel1: this.validateForm.value.tel1,
      tel2: this.validateForm.value.tel2,
      residance: this.validateForm.value.residance,
      categorie: this.validateForm.value.categorie,
      nationalite: this.validateForm.value.nationalite,
      naturePiece: this.validateForm.value.naturePiece,
      nci: this.validateForm.value.nci,
      dateEmission: this.validateForm.value.dateEmission,
      dateExpiration: this.validateForm.value.dateExpiration,
      nomPere: this.validateForm.value.nomPere,
      nomMere: this.validateForm.value.nomMere,
      contactPere: this.validateForm.value.contactPere,
      contactMere: this.validateForm.value.contactMere,
      matrimoniale: this.validateForm.value.matrimoniale,
      nomEtPrenomConjoint: this.validateForm.value.nomEtPrenomConjoint,
      nbrEnfant: this.validateForm.value.nbrEnfant,
      personneContacter: this.validateForm.value.personneContacter,
      contactPersonneContacter: this.validateForm.value.contactPersonneContacter,
      relationPersonne: this.validateForm.value.relationPersonne,
      sexe: this.validateForm.value.sexe,      
      roles:this.dataSet1,
    };
*/
    this.userSubmit.roles = this.dataSet1;
    //user
    console.log(this.user);
    this.authService.putUtilisateur(this.iduser, this.userSubmit)
      .subscribe((res: AppUser) => {
        console.log(res);
        /* let dd=res
        this.dataSet1= dd.roles
        console.log(this.dataSet1); */

        this.listUtilisateurs = this.listUtilisateurs.filter(d => d.id !== res.id);
        this.listUtilisateurs.unshift(res);

        this.dat = this.listUtilisateurs;
        this.updateEditCache();

        this.close();

        //this.ngOnInit();
      },
        err => {
          console.log("Error occured");
        });

  }

  /*
    ngOnInitUpdate(key: string){
      console.log(this.edit);
      console.log(this.editCache[key].data);
  
      this.validateForm = this.fb.group({     
  
        nom: [this.editCache[key].data.nom, [Validators.required]],
        prenom: [this.editCache[key].data.prenom, [Validators.required]],
        dateNaissance: [this.editCache[key].data.dateNaissance, [Validators.required]],
        lieu: [this.editCache[key].data.lieu, [Validators.required]],
        departement: [this.editCache[key].data.departement, [Validators.required]],
        username: [this.editCache[key].data.username, [Validators.required]],
        password: [null, [Validators.required]],
        repassword: [null, [Validators.required, this.confirmationValidator]],
        email: [this.editCache[key].data.email, [Validators.email, Validators.required]],  
        profession: [this.editCache[key].data.profession,[Validators.required]],
        tel: [this.editCache[key].data.tel,[Validators.required]],
        tel1: [this.editCache[key].data.tel1, [Validators.required]],
        tel2: [this.editCache[key].data.tel2, [Validators.required]],
        residance: [this.editCache[key].data.residance, [Validators.required]],
        categorie: [this.editCache[key].data.categorie, [Validators.required]],
        nationalite: [this.editCache[key].data.nationalite, [Validators.required]],
        naturePiece: [this.editCache[key].data.naturePiece, [Validators.required]],
        nci: [this.editCache[key].data.nci, [Validators.required]],
        dateEmission: [this.editCache[key].data.dateEmission, [Validators.required]],
        dateExpiration: [this.editCache[key].data.dateExpiration, [Validators.required]],
        nomPere: [this.editCache[key].data.nomPere, [Validators.required]],
        nomMere: [this.editCache[key].data.nomMere, [Validators.required]],
        contactPere: [this.editCache[key].data.contactPere, [Validators.required]],
        contactMere: [this.editCache[key].data.contactMere, [Validators.required]],
        matrimoniale: [this.editCache[key].data.matrimoniale, [Validators.required]],
        nomEtPrenomConjoint: [this.editCache[key].data.nomEtPrenomConjoint, [Validators.required]],
        nbrEnfant: [this.editCache[key].data.nbrEnfant, [Validators.required]],
        personneContacter: [this.editCache[key].data.personneContacter, [Validators.required]],
        contactPersonneContacter: [this.editCache[key].data.contactPersonneContacter, [Validators.required]],
        relationPersonne: [this.editCache[key].data.relationPersonne, [Validators.required]],
        sexe: [this.editCache[key].data.sexe, [Validators.required]],
        roles: [this.editCache[key].data.roles],
        role: null
  
  
      });
       
      this.iduser=this.editCache[key].data.id;
  
      this.loadRoles(this.iduser);
  
       this.imageUrl = "http://localhost:8080/files/"+this.editCache[key].data.photo;   
      this.imageUrl1 = "http://localhost:8080/files/"+this.editCache[key].data.scane;   
      this.imageUrl2 = "http://localhost:8080/files/"+this.editCache[key].data.signature;    
  
    }
  
  
  
    loadRoles(id: number){
      console.log(id);
      this.authService.getRoles(id)
      .subscribe((data: Array<Role>) => {
        this.roleList = data;
        console.log(data);
  
        console.log(this.dataSet1);
      }, err => {
        console.log(err);     
      });   
    } */




  makeFormBloquer(): void {
    this.validateFormBloquer = this.fb.group({
      motif: [null, [Validators.required]]
    });
  }


  handleCancelBloquer() {
    this.validateFormBloquer.reset();
    this.isVisibleFormBloquer = false;
  }



  bloquer(appUser: AppUser) {
    this.isVisibleFormBloquer = true;
    this.appUserCourent = appUser;

  }



  onDebloquer(appUser: AppUser) {
    //this.isVisibleFormBloquer = true;
    this.appUserCourent = appUser;
    this.modalService.info({
      nzTitle: 'Information',
      nzContent: '<p> Etes-vous sur de débloquer l\'utilisateur?.</p>',
      nzOkText: 'Oui',
      nzCancelText: 'Non',
      nzOnCancel: () => console.log("non"),
      nzOnOk: () => this.debloquer()
    });
  }


  debloquer() {
    //let motif = this.validateFormBloquer.value.motif;
    //console.log(motif);
    this.authService.debloquerAppUser(this.appUserCourent.id).subscribe((data: boolean) => {
      console.log(data);

      if (data == true) {
        this.modalService.info({
          nzTitle: 'Information',
          nzContent: '<p> Débloquage effectué avec succès.</p>',
          nzOkText: null,
          nzCancelText: 'Ok',
          nzOnCancel: () => this.listUtilisateursBloques = this.listUtilisateursBloques.filter(i => i.id !== this.appUserCourent.id)
        });
        //this.listUtilisateursBloques = this.listUtilisateursBloques.filter(i => i.id !== this.appUserCourent.id);
      } else {
        this.createMessage('danger', 'Erreure de débloquage !');
      }

    },
      (error: HttpErrorResponse) => {
        this.createMessage('danger', 'Echec de débloquage !');
      });

  }

  enregistrerBloquer() {
    let motif = this.validateFormBloquer.value.motif;
    console.log(motif);
    this.authService.bloquerAppUser(this.appUserCourent.id, motif).subscribe((data: boolean) => {
      console.log(data);

      if (data == true) {
        this.modalService.info({
          nzTitle: 'Information',
          nzContent: '<p> Bloquage effectué avec succès.</p>',
          nzOkText: null,
          nzCancelText: 'Ok',
          nzOnCancel: () => this.handleCancelBloquer()
        });
        this.listUtilisateurs = this.listUtilisateurs.filter(i => i.id !== this.appUserCourent.id);
      } else {
        this.createMessage('danger', 'Erreure de bloquage !');
      }

    },
      (error: HttpErrorResponse) => {
        this.createMessage('danger', 'Echec de bloquage !');
      });

  }



  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }


  handleCancelListerMotif() {
    this.listeBloquagesByUtilisateur = [];
    this.isVisibleListBloquage = false;
  }


  listerMotif(appUser: AppUser) {
    this.appUserCourent = appUser;

    this.authService.getBloquagesByUtilisateurId(this.appUserCourent.id).subscribe((data: Array<Bloquer>) => {
      console.log(data);
      this.listeBloquagesByUtilisateur = data;
      this.isVisibleListBloquage = true;


    },
      (error: HttpErrorResponse) => {
        this.createMessage('danger', 'Echec de liste des bloquages !');
      });

  }
  resolutionDrawer():number {
    if(screen.width >= 1200){
      this.ecran = 768;
      return  this.ecran;
    }
    if(screen.width >= 920 ){
      this.ecran = 768;
      return  this.ecran;
    }
    if(screen.width <= 4200){
      this.ecran = 300;
      return  this.ecran;
    }
   
  }

  getUserNames(){
    this.authService.getUsernames().subscribe(
      (data: Array<string>) => {
        this.usernameList = data;
        console.log( this.usernameList);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }


  userNameAsyncValidator = (control: FormControl) =>
  new Observable((observer: Observer<ValidationErrors | null>) => {
    setTimeout(() => {
      const found =  this.usernameList.find(element => element === control.value);
      if (control.value === found) {
        // you have to return `{error: true}` to mark it as an error event
        observer.next({ error: true, duplicated: true });
      } else {
        observer.next(null);
      }
      observer.complete();
    }, 1000);
  });

}
