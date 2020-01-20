import { Component, OnInit } from '@angular/core';
import { Role } from '../../../../model/Role';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AppUser } from '../../../../model/model.AppUser';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../service/authentication.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { RoleService } from '../../../../service/role.service';
import { TokenStorage } from '../../../../utils/token.storage';

@Component({
  selector: 'app-crud-utilisateur-final',
  templateUrl: './crud-utilisateur-final.component.html',
  styleUrls: ['./crud-utilisateur-final.component.css']
})
export class CrudUtilisateurFinalComponent implements OnInit {

  roleList: Array<Role> = [];
  sortName = null;
  sortValue = null;
  searchValue = '';
  searchAddress = [];
  listUtilisateurs1 = [];
  paysList: Array<any> = [];
  metierList: Array<any> = [];

  edit: boolean = false;
  admin: boolean = false;

  user: any;
  unUser: any;
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
  listUtilisateurs = [];
  multipleValue = Array<Role>();
  currentUser: AppUser = null;
  appUser: AppUser;
  childrenVisible = false;
  sortMap = {
    username: null,
    nom: null,
    prenom: null
  };
  // $event: Array<{ name: string; age: number; address: string; checked: boolean }>
  visible = false;
  validateForm: FormGroup;
  roleForm: FormGroup;

  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.id === o2.id : o1 === o2);

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
    this.getListloggedUsers();
    console.log(this.currentUser);
    console.log("dfjkwxbbbbbbbgsbjk");
    console.log(this.authService.setCurrentUserConnected());
    console.log(this.authService.setIsConnectedUser());
    this.getList();
    this.makeFormeUtilisateur();
    this.loadUser();
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
      nom: [null, [Validators.required]],
      prenom: [null, [Validators.required]],
      dateNaissance: [null, [Validators.required]],
      lieu: [null, [Validators.required]],
      departement: [null, [Validators.required]],
      residance: [null, [Validators.required]],
      nationalite: [null, [Validators.required]],
      sexe: [null, [Validators.required]],
      matrimoniale: [null, [Validators.required]],
      nomEtPrenomConjoint: [null, [Validators.required]],
      nbrEnfant: [null, [Validators.required]],
      //profession: [this.userSubmit != null ? this.userSubmit.profession : null, [Validators.required]],
      categorie: [null, [Validators.required]],
      naturePiece: [null, [Validators.required]],
      nci: [null, [Validators.required]],
      //dateEmission: [this.userSubmit != null ? this.userSubmit.dateEmission : null, [Validators.required]],
      dateExpiration: [null, [Validators.required]],
      metier: [null, [Validators.required]],
      metiers: [null, [Validators.required]],
      personneContacter: [null, [Validators.required]],
      contactPersonneContacter: [null, [Validators.required]],
      relationPersonne: [null, [Validators.required]],
      nomPere: [null, [Validators.required]],
      contactPere: [null, [Validators.required]],
      nomMere: [null, [Validators.required]],
      contactMere: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      phoneNumber1: [null],
      phoneNumber2: [null],
      email: [null, [Validators.email, Validators.required]],
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
    this.imageUrl = 'assets/asRach/images/default.jpg';
    this.imageUrl1 = 'assets/asRach/images/default1.jpg';
    this.imageUrl2 = 'assets/asRach/images/default8.jpg';
    this.ngOnInit();
    this.open();
  }


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

      //this.user =this.validateForm.value;

      this.user = {
        nom: this.validateForm.value.nom,
        prenom: this.validateForm.value.prenom,
        dateNaissance: this.validateForm.value.dateNaissance,
        lieu: this.validateForm.value.lieu,
        departement: this.validateForm.value.departement,
        username: this.validateForm.value.username,
        password: this.validateForm.value.password,
        email: this.validateForm.value.email,
        profession: this.validateForm.value.profession,
        phoneNumber: this.validateForm.value.phoneNumber,
        phoneNumber1: this.validateForm.value.phoneNumber1,
        phoneNumber2: this.validateForm.value.phoneNumber2,
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
      };

      console.log(this.user);

      formData.append('user', JSON.stringify(this.user));
      formData.append('file', this.fileToUpload);
      formData.append('file1', this.fileToUpload1);
      formData.append('file2', this.fileToUpload2);

      console.log(formData);



      if (k !== 0) {
        this.authService.postAppUser(formData)
          .subscribe(
            (res: any) => {
              this.listUtilisateurs.unshift(res);
              this.imageUrl = 'assets/asRach/images/default.jpg';
              this.imageUrl1 = 'assets/asRach/images/default1.jpg';
              this.imageUrl2 = 'assets/asRach/images/default2.jpg';
              console.log(res);
              this.modalService.info({
                nzTitle: 'Information',
                nzContent: '<p> L\'utilisateur Numero. <strong>' + res.id +
                  '</strong> a été enregistré avec succès.</p>',
                nzOkText: null,
                nzCancelText: 'Ok',
                nzOnCancel: () => this.validateForm.reset()
              });

              // this.ngOnInit();
              //this.close();

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

          this.authService.postAppUser(formData)
            .subscribe(
              res => {
                this.imageUrl = 'assets/asRach/images/default.jpg';
                this.imageUrl1 = 'assets/asRach/images/default1.jpg';
                this.imageUrl2 = 'assets/asRach/images/default2.jpg';
                console.log(res);
                /* this.validateForm.reset();
                this.ngOnInit();
                this.close(); */
              },
              err => {
                console.log(err);
              }
            );
        }

      } else {

        /*  this.user ={nom:this.validateForm.value.nom,
           prenom:this.validateForm.value.prenom, 
           dateNaissance:this.validateForm.value.dateNaissance, 
           username:this.validateForm.value.username,          
           email:this.validateForm.value.email, 
           phoneNumber:this.validateForm.value.phoneNumber, 
           roles:this.listUtilisateurs1
         }; */


        this.idtest = this.validateForm.value.role.id;
        this.index = this.listUtilisateurs1.findIndex(item => item.id === this.idtest);
        console.log(this.index);

        if (this.listUtilisateurs1.length == 0) {

          if (k !== 0) {
            this.listUtilisateurs1 = [...this.listUtilisateurs1, this.validateForm.value.role];
            //this.updateEditCache();          
          }

          console.log(this.listUtilisateurs1);


        } else {

          if (this.index == -1) {


            if (k !== 0) {
              this.listUtilisateurs1 = [...this.listUtilisateurs1, this.validateForm.value.role];
              //this.updateEditCache();          
            }

            console.log(this.listUtilisateurs1);

          } else {
            console.log(this.listUtilisateurs1);
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

  saveEdit(key: string): void {
    const index = this.listUtilisateurs.findIndex(item => item.id === key);

    console.log('11111111');
    console.log(this.listUtilisateurs[index]);
    console.log('11111111');

    console.log('22222222');
    console.log(this.editCache[key].data);
    console.log('22222222');
    //this.authService.putUtilisateur(this.editCache[key].data);
    Object.assign(this.listUtilisateurs[index], this.editCache[key].data);
    // this.listUtilisateurs[ index ] = this.editCache[ key ].data;
    this.editCache[key].edit = false;

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
    this.authService.getUtilisateurNonActives()
      .subscribe((data: Array<AppUser>) => {

        this.listUtilisateurs = data;
        this.updateEditCache();
        console.log(this.listUtilisateurs);

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
    const data = this.listUtilisateurs.filter(item => filterFunc(item));
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









  avance(key: number){
    /* this.edit=true; 
    this.admin=false;

    console.log(this.edit); */
    this.iduser = key;
    this.editCache[key].edit = false;
    this.editCache[key].data
    console.log(this.editCache[key].data);
    this.ngOnInitUpdate(key);
    this.open();
  }


  ngOnInitUpdate(key: number){
    console.log(this.edit);
    //this.editCache[key].data.username  this.editCache[key].data.photo;



    console.log(this.editCache[key].data);

    this.validateForm = this.fb.group({     

      nom: [this.editCache[key].data.nom, [Validators.required]],
      prenom: [this.editCache[key].data.prenom, [Validators.required]],
      dateNaissance: [this.editCache[key].data.dateNaissance, [Validators.required]],
      lieu: [this.editCache[key].data.lieu, [Validators.required]],
      departement: [this.editCache[key].data.departement, [Validators.required]],
      email: [this.editCache[key].data.email, [Validators.email, Validators.required]],  
      phoneNumber: [this.editCache[key].data.phoneNumber,[Validators.required]],
      phoneNumber1: [this.editCache[key].data.phoneNumber1, [Validators.required]],
      phoneNumber2: [this.editCache[key].data.phoneNumber2, [Validators.required]],
      residance: [this.editCache[key].data.residance, [Validators.required]],
      categorie: [this.editCache[key].data.categorie, [Validators.required]],
      nationalite: [this.editCache[key].data.nationalite, [Validators.required]],
      naturePiece: [this.editCache[key].data.naturePiece, [Validators.required]],
      nci: [this.editCache[key].data.nci, [Validators.required]],
      dateExpiration: [this.editCache[key].data.dateExpiration, [Validators.required]],
      metier: [this.editCache[key].data.metier, [Validators.required]],
      metiers: [this.editCache[key].data.metiers, [Validators.required]],
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
    });    
    

     this.imageUrl = "http://localhost:8080/files/"+this.editCache[key].data.photo;   
    this.imageUrl1 = "http://localhost:8080/files/"+this.editCache[key].data.scane;   
    this.imageUrl2 = "http://localhost:8080/files/"+this.editCache[key].data.signature;    

  }





  submitFormFinal(): void {
      const formData = new FormData();

      //this.user =this.validateForm.value;

      
      this.editCache[this.iduser].data.nom = this.validateForm.value.nom;
      this.editCache[this.iduser].data.prenom = this.validateForm.value.prenom;
      this.editCache[this.iduser].data.dateNaissance = this.validateForm.value.dateNaissance;
      this.editCache[this.iduser].data.lieu = this.validateForm.value.lieu;
      this.editCache[this.iduser].data.departement = this.validateForm.value.departement;
      this.editCache[this.iduser].data.email = this.validateForm.value.email;
      this.editCache[this.iduser].data.phoneNumber = this.validateForm.value.phoneNumber;
      this.editCache[this.iduser].data.phoneNumber1 = this.validateForm.value.phoneNumber1;
      this.editCache[this.iduser].data.phoneNumber2 = this.validateForm.value.phoneNumber2;
      this.editCache[this.iduser].data.residance = this.validateForm.value.residance;
      this.editCache[this.iduser].data.categorie = this.validateForm.value.categorie;
      this.editCache[this.iduser].data.nationalite = this.validateForm.value.nationalite;
      this.editCache[this.iduser].data.naturePiece = this.validateForm.value.naturePiece;
      this.editCache[this.iduser].data.nci = this.validateForm.value.nci;
      this.editCache[this.iduser].data.dateExpiration = this.validateForm.value.dateExpiration;
      this.editCache[this.iduser].data.metier = this.validateForm.value.metier;
      this.editCache[this.iduser].data.metiers = this.validateForm.value.metiers;
      this.editCache[this.iduser].data.nomPere = this.validateForm.value.nomPere;
      this.editCache[this.iduser].data.nomMere = this.validateForm.value.nomMere;
      this.editCache[this.iduser].data.contactPere = this.validateForm.value.contactPere;
      this.editCache[this.iduser].data.contactMere = this.validateForm.value.contactMere;
      this.editCache[this.iduser].data.matrimoniale = this.validateForm.value.matrimoniale;
      this.editCache[this.iduser].data.nomEtPrenomConjoint = this.validateForm.value.nomEtPrenomConjoint;
      this.editCache[this.iduser].data.nbrEnfant = this.validateForm.value.nbrEnfant;
      this.editCache[this.iduser].data.personneContacter = this.validateForm.value.personneContacter;
      this.editCache[this.iduser].data.contactPersonneContacter = this.validateForm.value.contactPersonneContacter;
      this.editCache[this.iduser].data.relationPersonne = this.validateForm.value.relationPersonne;
      this.editCache[this.iduser].data.sexe = this.validateForm.value.sexe;  
        

      console.log(this.editCache[this.iduser].data);

      formData.append('user', JSON.stringify(this.editCache[this.iduser].data));
      formData.append('file', this.fileToUpload);
      formData.append('file1', this.fileToUpload1);
      formData.append('file2', this.fileToUpload2);

      console.log(formData);


      this.authService.postUsersSaveFinal(formData,this.iduser)
        .subscribe(
          (res: any) => {
            this.unUser = res;
            console.log(res);
            this.imageUrl = 'assets/asRach/images/default.jpg';
            this.imageUrl1 = 'assets/asRach/images/default1.jpg';
            this.imageUrl2 = 'assets/asRach/images/default2.jpg';
            this.fileToUpload = null;
            this.fileToUpload1 = null;
            this.fileToUpload2 = null;
            this.modalService.success({
              nzTitle: 'Information',
              nzContent: '<b> Félicitation vous avez Créé votre compte atout avec succès. Un mail de confirmation vous à été envoyez à l\'adresse <strong>'
                + this.unUser.email + '</strong> pour finalisé votre inscription.</b>',
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

    createMessage(type: string, msg: string): void {
      this.message.create(type, msg);
    }
  

  
    finish() {
      console.log("ok");      
      this.validateForm.reset();
    this.imageUrl = 'assets/asRach/images/default.jpg';
    this.imageUrl1 = 'assets/asRach/images/default1.jpg';
    this.imageUrl2 = 'assets/asRach/images/default8.jpg';
    this.listUtilisateurs = this.listUtilisateurs.filter(i => i.id !== this.iduser);
    }



}
