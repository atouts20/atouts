import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Publication } from './../../../../model/model.publication';
import { CleGrouper } from './../../../../model/model.cleGrouper';
import { Groupe } from './../../../../model/model.groupe';
import { Bien } from './../../../../model/model.bien';
import { Grouper } from './../../../../model/model.grouper';
import { AppUser } from './../../../../model/model.AppUser';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PublicationService } from './../../../../service/publication.service';
import { GrouperService } from './../../../../service/grouper.service';
import { GroupeService } from './../../../../service/groupe.service';
import { BienService } from './../../../../service/bien.service';
import { TokenStorage } from './../../../../utils/token.storage';
import { AuthenticationService } from './../../../../service/authentication.service';

@Component({
  selector: 'app-acceptation-demande',
  templateUrl: './acceptation-demande.component.html',
  styleUrls: ['./acceptation-demande.component.css']
})
export class AcceptationDemandeComponent implements OnInit {


  pageContacts: any;

  pageBiens: any;
  pageBiensG: any;
  pageProduits: any;
  pageServices: any;

  mc: string = '';
  mcG: string = '';

  currentPg: number = 0;
  currentPgG: number = 0;
  currentPgP: number = 0;
  currentPgS: number = 0;

  sz: number = 5;

  searchValue = '';
  childrenVisible = false;

  pages: Array<number>;
  pagesG: Array<number>;
  pagesP: Array<number>;
  pagesS: Array<number>;

  global: Boolean = false;

  produitDemandeList = [];
  produitAccepterList = [];
  produitRejeterList: Array<Publication> = [];
  produitCreerList: Array<Publication> = [];



  tof: Array<any>;
  listTof: Array<any>;
  tofi: any;
  tok: any;




  size: number = 5;

  imageUrl: string = 'assets/asRach/images/default.jpg';
  selectedFiles: FileList;
  fileToUpload: File = null;

  visible = false;
  validateForm: FormGroup;

  formData = new FormData();

  inputValue;

  propret: AppUser;
  username;

  index1 = 0;
  index2 = 0;
  index3 = 0;

  sourcePDemandes;
  sourcePAcceptes;
  sourcePNAcceptes;

  sourceEDemandes;
  sourceEAcceptes;
  sourceENAcceptes;

  searchResultPDemande;
  searchResultPAccepte;
  searchResultPNAccepte;

  searchResultEDemande;
  pageED;

  searchResultEAccepte;
  pageEA;

  searchResultENAccepte;
  pageENA;

  pagePD;
  pagePA;
  pagePNA;

  pageSize = 2;


  sortName = null;
  sortValue = null;
  searchAddress = [];

  sourceProduits;
  sourceServices;

  searchResultProduit;
  pageProd;

  pageEchanges: any;

  options;
  optionsC;
  optionsG
  dataSet1 = [];
  dataSet2 = [];

  editCache1 = {};
  editCache2 = {};
  editCache3 = {};
  editCache4 = {};

  edit: boolean = false;

  edit1: boolean = false;

  ajou: boolean = false;

  dot = true;


  //part;
  partmn;
  partvl;
  finish: boolean;


  i = 1;
  editCache = {};

  dataSet = [];

  nom: string;
  dat;
  dat1;
  dat2;
  dat3;
  dat4;
  num: string

  today = new Date();
  jstoday = '';

  sortMap = {
    username: null,
    nom: null,
    prenom: null
  };
  sortMap1 = {
    username: null,
    nom: null,
    prenom: null
  };
  sortMap2 = {
    username: null,
    nom: null,
    prenom: null
  };

  sortMap3 = {
    username: null,
    nom: null,
    prenom: null
  };

  sortMap4 = {
    username: null,
    nom: null,
    prenom: null
  };


  sortName1 = null;
  sortValue1 = null;
  searchValue1 = '';
  searchAddress1 = [];

  sortName2 = null;
  sortValue2 = null;
  searchValue2 = '';
  searchAddress2 = [];

  sortName3 = null;
  sortValue3 = null;
  searchValue3 = '';
  searchAddress3 = [];

  sortName4 = null;
  sortValue4 = null;
  searchValue4 = '';
  searchAddress4 = [];


  nouv: boolean = false;

  selectedclient: AppUser;

  sommemn: number = 0;
  sommevl: number = 0;
  nocent: boolean = false;
  cent: boolean = false;
  depass: boolean = false;
  idUser;
  idtest;
  index = null;

  idEchange;


  pkGrouper: CleGrouper;
  groupe: Groupe;
  grouper: Grouper;
  bien: Bien
  produit;
  service;
  idGp;
  idbien
  idprop;
  choix;
  switchValue = false;
  switupValue = false;
  biengrp = false;
  isgroupe = false;
  isuse = false;
  annul = false;
  pastof = false;

  sourceEchanges;

  searchResulEchange;

  pageEchang;

  searchResultService;

  pageServ;


  sourcePDemandesNAc;

  sourcePNC;

  sourceListEchange;

  sourceEchangeDesactives;



  public: boolean = false;

  creerBien: boolean = false;

  cree: boolean = false;

  pubNcId;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private bienService: BienService,
    public httpC: HttpClient,
    private publicationService: PublicationService,
    private grouperService: GrouperService,
    private groupeService: GroupeService,
    private tokenStorage: TokenStorage,
  ) {
    this.propret = JSON.parse(this.tokenStorage.getCurrentUser());
    console.log(this.propret);
  }


  ngOnInit() {

    this.cree = false;


    this.dataSet = [];
    this.updateEditCache();


    let nom = btoa(this.propret.nom);

    let dat = new Date().getTime();

    let num = 'GP' + nom + dat;

    this.validateForm = this.fb.group({
      nom: [null, [Validators.email, Validators.required]],
      description: [null, [Validators.required]],
      prix: [null, [Validators.required]],
      tBCCV: [null, [Validators.required]],
      stock: [null, [Validators.required]],
      stockAlert: [null, [Validators.required]],
      cat: ['PROD'],
      switch: [null],
      proprietaire: [null],
      id: [num, [Validators.required]],
      nomGroupe: [null, [Validators.required]],
      appUser: [null, [Validators.required]],
      partmn: [null, [Validators.required]],
      partvl: [null, [Validators.required]],
    });


    this.authService.getUtilisateur()
      .subscribe((data: Array<AppUser>) => {
        this.optionsC = data;
        console.log(this.optionsC);
      },
        err => {
          console.log(err);
        });



    this.groupeService.getGroupe()
      .subscribe((data: Array<Groupe>) => {
        this.optionsG = data;
        console.log(this.optionsG);
      },
        err => {
          console.log(err);
        });


    this.loadDemandesPubNAc();
    this.loadDemandesPubNC();

    this.getDemandeProduitRejeter();

  }
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  submitForm(): void {
    if (this.public && this.creerBien) {
      console.log(this.switchValue);

      if (!this.switchValue) {
        console.log(this.validateForm.value);

        let k = 0;
        for (const i in this.validateForm.controls) {
          this.validateForm.controls[i].markAsDirty();
          this.validateForm.controls[i].updateValueAndValidity();
          k++;
        }
        console.log(k);


        this.bien = {
          nom: this.validateForm.value.nom,
          description: this.validateForm.value.description,
          photo: null,
          prix: this.validateForm.value.prix,
          tBCCV: this.validateForm.value.tBCCV,
          stock: this.validateForm.value.stock,
          stockAlert: this.validateForm.value.stockAlert,
          type: this.validateForm.value.cat,
          proprietaire: this.validateForm.value.proprietaire
        };

        this.formData.append('bien', JSON.stringify(this.bien));
        this.formData.append('file', this.fileToUpload);

        console.log(this.bien);

        this.bienService.postBiens(this.formData)
          .subscribe(
            res => {
              console.log(res);
              this.cree = true;
              this.resetbien();
            },
            err => {
              console.log(err);
            }
          );
        /* if(!this.isuser() && this.switchValue) */
      } else {

        this.sommemn = 0;
        this.sommevl = 0;
        this.index = 0;
        console.log(this.validateForm.value);


        let k = 0;
        for (const i in this.validateForm.controls) {
          this.validateForm.controls[i].markAsDirty();
          this.validateForm.controls[i].updateValueAndValidity();
          k++;
        }
        console.log(k);

        this.pkGrouper = { appUser_id: this.validateForm.value.appUser.id, groupe_id: this.validateForm.value.id };

        this.groupe = {
          id: this.validateForm.value.id,
          nomGroupe: this.validateForm.value.nomGroupe
        };

        this.grouper = {
          pkGrouper: this.pkGrouper,
          partmn: this.validateForm.value.partmn,
          partvl: this.validateForm.value.partvl,
          groupe: this.groupe,
          appUser: this.validateForm.value.appUser
        };

        this.bien = {
          nom: this.validateForm.value.nom,
          description: this.validateForm.value.description,
          photo: null,
          prix: this.validateForm.value.prix,
          tBCCV: this.validateForm.value.tBCCV,
          stock: this.validateForm.value.stock,
          stockAlert: this.validateForm.value.stockAlert,
          type: this.validateForm.value.cat,
          proprietaire: this.groupe
        };

        this.idGp = this.validateForm.value.id;

        this.idtest = this.grouper.pkGrouper.appUser_id;

        this.partmn = this.validateForm.value.partmn;
        this.partvl = this.validateForm.value.partvl;

        this.formData.append('bien', JSON.stringify(this.bien));
        this.formData.append('file', this.fileToUpload);

        console.log(this.grouper);

        this.index = this.dataSet.findIndex(item => item.pkGrouper.appUser_id === this.idtest);
        console.log(this.index);

        console.log(this.validateForm.value.partmn);
        console.log(this.validateForm.value.partvl);

        if (this.dataSet.length == 0) {

          if (k !== 0) {
            this.dataSet = [...this.dataSet, this.grouper];
            this.updateEditCache();
            console.log(this.editCache);
          }

          this.dataSet.forEach(item => {
            this.sommemn = this.sommemn + item.partmn * 1;
          });

          this.dataSet.forEach(item => {
            this.sommevl = this.sommevl + item.partvl * 1;
          });

          /* this.somme = this.somme + this.validateForm.value.part*1; */
          console.log(this.dataSet);

        } else {

          if (this.index == -1) {
            /*  this.somme = this.somme + this.part*1; */
            console.log(this.sommemn);
            console.log(this.sommevl);

            if (k !== 0) {
              this.dataSet = [...this.dataSet, this.grouper];
              this.updateEditCache();
            }

            this.dataSet.forEach(item => {
              this.sommemn = this.sommemn + item.partmn * 1;
            });

            this.dataSet.forEach(item => {
              this.sommevl = this.sommevl + item.partvl * 1;
            });

            console.log(this.dataSet);

          } else {
            this.dataSet.forEach(item => {
              this.sommemn = this.sommemn + item.partmn * 1;
            });

            this.dataSet.forEach(item => {
              this.sommevl = this.sommevl + item.partvl * 1;
            });

            console.log(this.dataSet);
          }
        }

        if (this.sommemn < 1 || this.sommevl < 1) {
          this.nocent = true;
          this.depass = false;
          this.cent = false;
        }
        if (this.sommemn > 1 || this.sommevl > 1) {
          this.depass = true;
          this.nocent = false;
          this.cent = false;
        }
        if (this.sommemn == 1 && this.sommevl == 1) {
          this.cent = true;
        }



        console.log(this.sommemn);
        console.log(this.sommevl);
      }
    }

  }

  cancelEdit1(key: string): void {
    this.editCache1[key].edit = false;
    console.log(this.editCache1[key].data);
  }

  cancelEdit(key: number): void {
    this.editCache[key].edit = false;
    console.log(this.editCache[key].data);
  }



  saveEdit(key: number): void {
    this.sommemn = 0;
    this.sommevl = 0;
    const index = this.dataSet.findIndex(item => item.pkGrouper.appUser_id === key);

    console.log('11111111');
    console.log(this.dataSet[index]);
    console.log('11111111');

    console.log('22222222');
    console.log(this.editCache[key].data);
    console.log('22222222');


    Object.assign(this.dataSet[index], this.editCache[key].data);
    this.editCache[key].edit = false;

    this.dataSet[index] = this.editCache[key].data;
    console.log(this.dataSet);
    //this.updateEditCache();

    this.dataSet.forEach(item => {
      this.sommemn = this.sommemn + item.partmn * 1;
    })

    this.dataSet.forEach(item => {
      this.sommevl = this.sommevl + item.partvl * 1;
    })

    if (this.sommemn < 1 || this.sommevl < 1) {
      this.nocent = true;
      this.depass = false;
      this.cent = false;
    }
    if (this.sommemn > 1 || this.sommevl > 1) {
      this.depass = true;
      this.nocent = false;
      this.cent = false;
    }
    if (this.sommemn == 1 && this.sommevl == 1) {
      this.cent = true;
    }

  }


  accepter(key: string): void {

    this.publicationService.publicationAccepte(key, this.editCache3[key].data)
      .subscribe((data: Publication) => {
        this.produitAccepterList.unshift(data);
      },
        err => {
          console.log('Error occured');
        });

  }
  rejeterProjet(key: string): void {

    this.publicationService.putrejetProduit(key, this.editCache3[key].data)
      .subscribe((data: Publication) => {
        this.produitAccepterList.unshift(data);
      },
        err => {
          console.log('Error occured');
        });

  }


  delete(key: number) {
    this.sommemn = 0;
    this.sommevl = 0;
    const dataSet = this.dataSet.filter(d => d.pkGrouper.appUser_id !== key);
    this.dataSet = dataSet;
    /* this.somme = this.somme - this.editCache[key].data.part*1; */

    this.dataSet.forEach(item => {
      this.sommemn = this.sommemn + item.partmn * 1;
    })

    this.dataSet.forEach(item => {
      this.sommevl = this.sommevl + item.partvl * 1;
    })

    console.log(this.dataSet);

    if (this.sommemn < 1 || this.sommevl < 1) {
      this.nocent = true;
      this.depass = false;
      this.cent = false;
    }
    if (this.sommemn > 1 || this.sommevl > 1) {
      this.depass = true;
      this.nocent = false;
      this.cent = false;
    }
    if (this.sommemn == 1 && this.sommevl == 1) {
      this.cent = true;
    }

  }

  updateEditCache(): void {
    this.dataSet.forEach(item => {
      this.editCache[item.pkGrouper.appUser_id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  updateEditCache1(): void {
    this.dataSet1.forEach(item => {
      this.editCache1[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  updateEditCache2(): void {
    this.dataSet2.forEach(item => {
      this.editCache2[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  updateEditCache3(): void {
    this.produitDemandeList.forEach(item => {
      this.editCache3[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  updateEditCache4(): void {
    this.produitAccepterList.forEach(item => {
      this.editCache4[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }



  loadDemandesPubNAc() {
    this.publicationService.getDemandesPubProduit()
      .subscribe((data: Array<Publication>) => {
        this.produitDemandeList = data;
        this.dat3 = data;
        this.updateEditCache3();
        console.log(this.produitDemandeList);
      }, err => {
        console.log(err);
      })
  }


  loadDemandesPubNC() {
    this.publicationService.getDemandesProduitAccepter()
      .subscribe((data: Array<Publication>) => {
        this.produitAccepterList = data;
        this.dat4 = data;
        this.updateEditCache4();
        console.log(this.produitAccepterList);
      }, err => {
        console.log(err);
      })

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


  sort1(sortName: string, value: boolean): void {
    this.sortName1 = sortName;
    this.sortValue1 = value;
    for (const key in this.sortMap1) {
      this.sortMap1[key] = (key === sortName ? value : null);
    }
    this.search1();
  }


  filterAddressChange1(value: string[]): void {
    this.searchAddress1 = value;
    this.search1();
  }


  sort2(sortName: string, value: boolean): void {
    this.sortName2 = sortName;
    this.sortValue2 = value;
    for (const key in this.sortMap2) {
      this.sortMap2[key] = (key === sortName ? value : null);
    }
    this.search2();
  }


  filterAddressChange2(value: string[]): void {
    this.searchAddress2 = value;
    this.search2();
  }


  sort3(sortName: string, value: boolean): void {
    this.sortName3 = sortName;
    this.sortValue3 = value;
    for (const key in this.sortMap3) {
      this.sortMap3[key] = (key === sortName ? value : null);
    }
    this.search3();
  }


  filterAddressChange3(value: string[]): void {
    this.searchAddress3 = value;
    this.search3();
  }


  sort4(sortName: string, value: boolean): void {
    this.sortName4 = sortName;
    this.sortValue4 = value;
    for (const key in this.sortMap4) {
      this.sortMap4[key] = (key === sortName ? value : null);
    }
    this.search4();
  }

  rejeter(id){
    
  }


  filterAddressChange4(value: string[]): void {
    this.searchAddress4 = value;
    this.search4();
  }





  search(): void {
    const filterFunc = (item) => {
      return (this.searchAddress.length ? this.searchAddress.some(nom => item.nom.indexOf(nom) !== -1) : true) &&
        (item.nom.indexOf(this.searchValue) !== -1);
    };
    const data = this.dat.filter(item => filterFunc(item));
    this.dataSet1 = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1 : -1) :

      (b[this.sortName] > a[this.sortName] ? 1 : -1));
  }



  search1(): void {
    const filterFunc = (item) => {
      return (this.searchAddress1.length ? this.searchAddress1.some(nom => item.nom.indexOf(nom) !== -1) : true) &&
        (item.nom.indexOf(this.searchValue1) !== -1);
    };
    const data = this.dat1.filter(item => filterFunc(item));
    this.dataSet1 = data.sort((a, b) => (this.sortValue1 === 'ascend') ? (a[this.sortName1] > b[this.sortName1] ? 1 : -1) :

      (b[this.sortName1] > a[this.sortName1] ? 1 : -1));
  }





  search2(): void {
    const filterFunc = (item) => {
      return (this.searchAddress2.length ? this.searchAddress2.some(nom => item.nom.indexOf(nom) !== -1) : true) &&
        (item.nom.indexOf(this.searchValue2) !== -1);
    };
    const data = this.dat2.filter(item => filterFunc(item));
    this.dataSet2 = data.sort((a, b) => (this.sortValue2 === 'ascend') ? (a[this.sortName2] > b[this.sortName2] ? 1 : -1) :

      (b[this.sortName2] > a[this.sortName2] ? 1 : -1));
  }




  search3(): void {
    const filterFunc = (item) => {
      return (this.searchAddress3.length ? this.searchAddress3.some(nom => item.nom.indexOf(nom) !== -1) : true) &&
        (item.nom.indexOf(this.searchValue3) !== -1);
    };
    const data = this.dat3.filter(item => filterFunc(item));
    this.produitDemandeList = data.sort((a, b) => (this.sortValue3 === 'ascend') ? (a[this.sortName3] > b[this.sortName3] ? 1 : -1) :

      (b[this.sortName3] > a[this.sortName3] ? 1 : -1));
  }





  search4(): void {
    const filterFunc = (item) => {
      return (this.searchAddress4.length ? this.searchAddress4.some(nom => item.nom.indexOf(nom) !== -1) : true) &&
        (item.nom.indexOf(this.searchValue4) !== -1);
    };
    const data = this.dat4.filter(item => filterFunc(item));
    this.produitAccepterList = data.sort((a, b) => (this.sortValue4 === 'ascend') ? (a[this.sortName4] > b[this.sortName4] ? 1 : -1) :

      (b[this.sortName4] > a[this.sortName4] ? 1 : -1));
  }




  resetbien() {
    this.ngOnInit();
    this.formData = new FormData();
    this.imageUrl = 'assets/asRach/images/default.jpg';
    this.inputValue == '';
    this.dataSet = [];
    this.editCache = {};
    this.sommemn = 0;
    this.sommevl = 0;
    this.depass = false;
    this.nocent = false;
    this.switchValue = false;
  }



  isproduit() {
    if (this.inputValue == 'PROD') return true;
    if (this.inputValue == 'SERV') return false;
  }



  log(value: boolean) {
    console.log(value);
    if (value == true) this.annul = true;
  }


  ajout() {
    //this.fileToUpload = null;
    this.pastof = false;
    this.sommemn = 0;
    this.sommevl = 0;
    this.imageUrl = 'assets/asRach/images/default.jpg';
    this.switchValue = false;
    this.inputValue == 'PROD'
    this.ngOnInit();
    this.open();
  }


  isPub() {
    if (this.inputValue == 'PUB') return true;
  }



  /* ajout(){   
    this.fileToUpload=null;  
    this.imageUrl = 'assets/asRach/images/default.jpg';
      this.inputValue=='PUB'  
    this.ngOnInit();
    this.open();   
  } */



  /* avance(key: string){
    this.idEchange=null
    this.formData= new FormData();
    this.fileToUpload=null;
    this.imageUrl = 'http://localhost:8080/files/'+this.editCache1[key].data.photo;
    this.dataSet=[];
    this.edit=true; 
    this.edit1=false;
    this.ajou=false;          
    console.log(this.edit);
    console.log(this.editCache1[key].data.photo);
   
    this.editCache1[key].edit = false;
    this.ngOnInitUpdate(key);
    this.open();
  } */

  avance1(key: string) {
    this.idEchange = null
    this.formData = new FormData();
    //this.fileToUpload = null;
    this.imageUrl = 'http://localhost:8080/files/' + this.editCache1[key].data.photo;
    //this.dataSet1=[];
    this.public = false;
    this.creerBien = false;
    console.log(this.editCache1[key].data.photo);

    this.editCache1[key].edit = false;
    this.ngOnInitUpdate1(key);
    this.open();
  }

  avance2(key: string) {
    // this.fileToUpload = null;
    this.imageUrl = 'http://localhost:8080/files/' + this.editCache2[key].data.photo;
    //this.dataSet2=[];
    this.public = false;
    this.creerBien = false;
    console.log(this.editCache2[key].data.photo);
    this.ngOnInitUpdate2(key);
    this.open();
  }

  inspecterProduit(key: string) {
    //this.fileToUpload = null;
    this.imageUrl = 'http://localhost:8080/files/' + this.editCache3[key].data.photo;
    //this.produitDemandeList=[];
    //this.public = true;
    // this.creerBien = false;
    console.log(this.editCache3[key].data.photo);
    this.ngOnInitUpdate3(key);
    this.open();
  }

  avance4(key: string) {
    // this.fileToUpload = null;
    this.imageUrl = 'http://localhost:8080/files/' + this.editCache4[key].data.photo;
    //this.produitAccepterList=[];
    console.log(this.imageUrl);
    this.public = true;
    this.creerBien = true;
    console.log(this.editCache4[key].data.photo);
    this.ngOnInitUpdate4(key);
    this.open();
  }

  startEdit1(key: string): void {
    this.editCache1[key].edit = true;
    console.log(this.editCache1[key].data);
  }

  startEdit(key: number): void {
    this.editCache[key].edit = true;
    console.log(this.editCache[key].data)
  }



  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }


  onSelectFile(event) {
    this.selectedFiles = event.target.files;
    console.log(event.target.files);
    this.fileToUpload = <File>event.target.files[0];
    this.pastof = false;
    console.log(this.fileToUpload.name);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  /* ngOnInitUpdate(key: string){
    console.log(this.edit);
    this.validateForm = this.fb.group({
      nom: [this.editCache1[key].data.nom, [Validators.required]],
      description: [this.editCache1[key].data.description, [Validators.required]],
      photo: [this.editCache1[key].data.photo, [Validators.required]],
      proprietaire: [this.editCache1[key].data.proprietaire],                  
    }); 
  
    this.idEchange=this.editCache1[key].data.id;
    
    this.dataSet=this.editCache1[key].data.proprietaire;
    console.log(this.dataSet);   
  
  } */

  ngOnInitUpdate1(key: string) {
    this.validateForm = this.fb.group({
      nom: [this.editCache1[key].data.nom, [Validators.required]],
      description: [this.editCache1[key].data.description, [Validators.required]],
      prix: [this.editCache1[key].data.prix, [Validators.required]],

      tBCCV: [this.editCache1[key].data.tBCCV, [Validators.required]],
      stock: [this.editCache1[key].data.stock, [Validators.required]],
      stockAlert: [this.editCache1[key].data.stockAlert, [Validators.required]],
      photo: [this.editCache1[key].data.photo, [Validators.required]],
      proprietaire: [this.editCache1[key].data.proprietaire],
    });

    this.dataSet = this.editCache1[key].data.proprietaire;
    console.log(this.dataSet);
  }

  ngOnInitUpdate2(key: string) {
    this.validateForm = this.fb.group({
      nom: [this.editCache2[key].data.nom, [Validators.required]],
      description: [this.editCache2[key].data.description, [Validators.required]],
      prix: [this.editCache2[key].data.prix, [Validators.required]],

      tBCCV: [this.editCache2[key].data.tBCCV, [Validators.required]],
      stock: [this.editCache2[key].data.stock, [Validators.required]],
      stockAlert: [this.editCache2[key].data.stockAlert, [Validators.required]],
      photo: [this.editCache2[key].data.photo, [Validators.required]],
      proprietaire: [this.editCache2[key].data.proprietaire],
    });

    this.dataSet = this.editCache2[key].data.proprietaire;
    console.log(this.dataSet);

  }

  ngOnInitUpdate3(key: string) {
    this.validateForm = this.fb.group({
      nom: [this.editCache3[key].data.nom, [Validators.required]],
      description: [this.editCache3[key].data.description, [Validators.required]],
      prix: [this.editCache3[key].data.prix, [Validators.required]],

      tBCCV: [this.editCache3[key].data.tBCCV, [Validators.required]],
      stock: [this.editCache3[key].data.stock, [Validators.required]],
      stockAlert: [this.editCache3[key].data.stockAlert, [Validators.required]],
      photo: [this.editCache3[key].data.photo, [Validators.required]],
      proprietaire: [this.editCache3[key].data.proprietaire],
    });

    this.dataSet = this.editCache3[key].data.proprietaire;
    console.log(this.dataSet);

  }




  ngOnInitUpdate4(key: string) {
    console.log(this.creerBien);

    this.dataSet = [];
    this.updateEditCache();

    let nom = btoa(this.propret.nom);

    let dat = new Date().getTime();

    let num = 'GP' + nom + dat;

    this.validateForm = this.fb.group({
      nom: [this.editCache4[key].data.nom, [Validators.required]],
      description: [this.editCache4[key].data.description, [Validators.required]],
      photo: [this.editCache4[key].data.photo, [Validators.required]],
      prix: [this.editCache4[key].data.prix, [Validators.required]],
      tBCCV: [null, [Validators.required]],
      stock: [null, [Validators.required]],
      stockAlert: [null, [Validators.required]],
      cat: ['PROD'],
      switch: [null],
      proprietaire: [null],
      id: [num, [Validators.required]],
      nomGroupe: [null, [Validators.required]],
      appUser: [null],
      partmn: [null],
      partvl: [null],
    });

    this.pubNcId = this.editCache4[key].data.id;

  }

  valider() {

    if (this.sommemn == 1 && this.sommevl == 1) {

      this.groupeService.postGroupes(this.groupe)
        .subscribe(
          res => {
            console.log(res);

            console.log(this.dataSet);
            this.dataSet.forEach(item => {

              this.grouperService.postGroupers(item)
                .subscribe(
                  res => {
                    console.log(res);

                  },
                  err => {
                    console.log(err);
                  }
                );

            });



            this.bienService.postBiens(this.formData)
              .subscribe(
                res => {
                  console.log(res);

                  this.cree = true;

                  this.resetbien();
                  this.creer(this.pubNcId);

                },
                err => {
                  console.log(err);
                }
              );

          },
          err => {
            console.log(err);
          }
        );

    }


  }

  creer(key: string): void {

    this.publicationService.publicationCreer(key, this.editCache4[key].data)
      .subscribe(
        res => {
          console.log(res);
          this.ngOnInit();
        },
        err => {
          console.log("Error occured");
        });

  }

  getDemandeProduitRejeter() {
    this.publicationService.getDemandesProduitRejeter().subscribe(
      (data: Array<Publication>) => {
        this.produitRejeterList = data;
      }, (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }


}
