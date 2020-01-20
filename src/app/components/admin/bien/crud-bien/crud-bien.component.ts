import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Services } from '../../../../model/model.services';
import { Produit } from '../../../../model/model.produit';
import { Groupe } from '../../../../model/model.groupe';
import { AppUser } from '../../../../model/model.AppUser';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Grouper } from '../../../../model/model.grouper';
import { AuthenticationService } from '../../../../service/authentication.service';
import { GrouperService } from '../../../../service/grouper.service';
import { BienService } from '../../../../service/bien.service';
import { ServicesService } from '../../../../service/services.service';
import { ProduitsService } from '../../../../service/produits.service';
import { CleGrouper } from '../../../../model/model.cleGrouper';
import { Bien } from '../../../../model/model.bien';
import { GroupeService } from '../../../../service/groupe.service';
import { Router } from '@angular/router';
import { UtilisateurService } from '../../../../service/UtilisateurService';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';
import { NzModalService } from 'ng-zorro-antd';
import { TokenStorage } from './../../../../utils/token.storage';

@Component({
  selector: 'app-crud-bien',
  templateUrl: './crud-bien.component.html',
  styleUrls: ['./crud-bien.component.css']
})
export class CrudBienComponent implements OnInit {
  imageUrl: string = 'assets/asRach/images/default.jpg';
  selectedFiles: FileList;
  fileToUpload: File = null;


  visible = false;
  validateForm: FormGroup;

  options;
  optionsC;
  optionsG
  dataSet1 = [];
  dataSet2 = [];
  dataSet3 = [];

  editCache1 = {};
  editCache2 = {};
  editCache3 = {};

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

  sortName = null;
  sortValue = null;
  searchValue = '';
  searchAdddatas = [];

  sortName1 = null;
  sortValue1 = null;
  searchValue1 = '';
  searchAdddatas1 = [];
  childrenVisible = false;

  sortName2 = null;
  sortValue2 = null;
  searchValue2 = '';
  searchAdddatas2 = [];


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

  /* ====================== */
  produitsNonActiverList: Array<Produit> = [];
  produitsActiverList: Array<Produit> = [];
  servicesNonActiverList: Array<Services> = [];
  servicesActiverList: Array<Services> = [];

  pkGrouper: CleGrouper;
  groupe: Groupe;
  grouper: Grouper;
  bien: Bien;
  produit;
  service;
  idGp;
  idbien
  idprop;
  formData = new FormData();
  inputValue;
  choix;
  switchValue = false;
  switupValue = false;
  biengrp = false;
  isgroupe = false;
  isuse = false;
  annul = false;
  pastof = false;
  currentUser: AppUser = null;

  index1 = 0;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private grouperService: GrouperService,
    private groupeService: GroupeService,
    private bienService: BienService,
    private produitsService: ProduitsService,
    private message: NzMessageService,
    private modalService: NzModalService,
    private servicesService: ServicesService,
    private tokenStorage: TokenStorage,
  ) {
    this.currentUser = JSON.parse(this.tokenStorage.getCurrentUser());
    console.log(this.currentUser);
  }

  ngOnInit() {
    this.loadServiceActiver();
    this.loadProduitActiver();
    this.dataSet = [];
    this.updateEditCache();

    let nom = btoa(this.currentUser.nom);

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
      //type: [null],
      switch: [null],
      //user: [null, [Validators.required]],    
      //groupe: [null],
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
        (error: HttpErrorResponse) => {
          console.log('Echec !');
        });



    this.groupeService.getGroupe()
      .subscribe((data: Array<Groupe>) => {
        this.optionsG = data;
        console.log(this.optionsG);
      },
        (error: HttpErrorResponse) => {
          console.log('Echec !');
        });





    /* this.loadBien();
 
   this.bienService.newUserStream.subscribe(data=>this.loadBien());
*/
    this.loadProduitNonActiver();

    this.bienService.newUserStream.subscribe(data => this.loadProduitNonActiver());

    this.loadServiceNonActiver();

    this.bienService.newUserStream.subscribe(data => this.loadServiceNonActiver());

    /*  this.loadBienDesactives();
 
     this.bienService.newUserStream.subscribe(data => this.loadBienDesactives());
  */


  }


  ngOnInitUpdate(key: string) {
    console.log(this.edit);

    /* if(this.editCache1[key].data.groupe != null){  */

    this.validateForm = this.fb.group({
      biengrp: [null],
      nom: [this.editCache1[key].data.nom, [Validators.required]],
      description: [this.editCache1[key].data.description, [Validators.required]],
      photo: [this.editCache1[key].data.photo, [Validators.required]],
      prix: [this.editCache1[key].data.prix, [Validators.required]],
      tBCCV: [this.editCache1[key].data.tBCCV, [Validators.required]],
      stock: [this.editCache1[key].data.stock, [Validators.required]],
      stockAlert: [this.editCache1[key].data.stockAlert, [Validators.required]],
      //cat: [this.editCache1[key].data.cat],
      switup: [null],
      proprietaire: [this.editCache1[key].data.proprietaire],
      //groupe: [this.editCache1[key].data.groupe],
      // user: [this.editCache1[key].data.user],
      //id: [this.editCache1[key].data.groupe.id, [Validators.required]],
      //nomGroupe: [this.editCache1[key].data.groupe.nomGroupe, [Validators.required]],
      id: [this.editCache1[key].data.proprietaire.id, [Validators.required]],
      nomGroupe: [this.editCache1[key].data.proprietaire.nomGroupe, [Validators.required]],
      appUser: [null],                      /* , [Validators.required] */
      partmn: [null],                      /* , [Validators.required] */
      partvl: [null],                      /* , [Validators.required] */
    });

    this.idbien = this.editCache1[key].data.id;
    this.idprop = this.editCache1[key].data.proprietaire.id

    //this.imageUrl = 'http://localhost:8080/files/'+this.editCache1[key].data.photo;  



    this.loadGrouper(this.idprop);




  }
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }


  submitForm(): void {
    //if(!this.edit){
    if (this.ajou) {
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
        console.log('this.formData kkk !!!');
        console.log(this.bien);
        console.log('this.formData kkk !!!');
        console.log(this.formData);
        console.log('this.formData kkk !!!');

        this.bienService.postBiens(this.formData)
          .subscribe(
            (data) => {
              console.log(data);
              this.dataetbien();
              if (data.type == 'PROD') {
                this.produitsNonActiverList.unshift(data);
                this.modalService.info({
                  nzTitle: 'Information',
                  nzContent: '<b> L\'opération numéro. <strong>' + data.id +
                    '</strong> a été enregistré avec succès.</b>',
                  nzOkText: null,
                  nzCancelText: 'Ok',
                  nzOnCancel: () => console.log('ok')
                });
              } else {
                this.servicesNonActiverList.unshift(data);
                this.modalService.info({
                  nzTitle: 'Information',
                  nzContent: '<b> L\'opération numéro. <strong>' + data.id +
                    '</strong> a été enregistré avec succès.</b>',
                  nzOkText: null,
                  nzCancelText: 'Ok',
                  nzOnCancel: () => console.log('ok')
                });
              }
            },
            (error: HttpErrorResponse) => {
              this.createMessage('danger', 'Echec de l\'enregistrement !');
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

        /* this.somme = this.somme + this.validateForm.value.part*1; */

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



        //this.index == null && 



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

        /* if(this.somme<=1){
   
         if (k !== 0) {
           this.dataSet = [ ...this.dataSet,  this.grouper ];
           this.updateEditCache();          
         }      
   
     }else{
       this.depass=true;
     } */



        console.log(this.sommemn);
        console.log(this.sommevl);
      }


    }

    /*  
    }else{
    
    if(!this.isgroupe){
       console.log(this.validateForm.value);      
 
       let k = 0;
       for (const i in this.validateForm.controls) {
         this.validateForm.controls[i].markAsDirty();
         this.validateForm.controls[i].updateValueAndValidity();
         k++;
       }
       console.log(k); 
          
   
             this.bien ={nom:this.validateForm.value.nom,
               description:this.validateForm.value.description, 
               prix:this.validateForm.value.prix, 
               tBCCV:this.validateForm.value.tBCCV,
               stock:this.validateForm.value.stock,
               stockAlert:this.validateForm.value.stockAlert, 
               cat:this.validateForm.value.cat,
               groupe:this.validateForm.value.groupe,
               user:this.validateForm.value.user};  

         
        if(this.fileToUpload != null){
         this.pastof=false;
        this.formData.append('bien',JSON.stringify(this.bien));
        this.formData.append('file',this.fileToUpload);
      
        console.log(this.bien); 
 
        this.bienService.putBienF(this.idbien,this.formData)
        .subscribe(
          data => {
            console.log(data); 
          
            this.loadBien();
            
            
          },
          (error: HttpErrorResponse) => {
             console.log('Echec !');
          }
        );

       }else{
         this.pastof=true;
       }
 
     }else{ */

    /*  this.somme =0;
     this.index =0; */

    if (this.edit) {


      if (!this.switupValue) {

        console.log(this.validateForm.value);


        let k = 0;
        for (const i in this.validateForm.controls) {
          this.validateForm.controls[i].markAsDirty();
          this.validateForm.controls[i].updateValueAndValidity();
          k++;
        }
        console.log(k);


        this.produit = {
          nom: this.validateForm.value.nom,
          description: this.validateForm.value.description,
          prix: this.validateForm.value.prix,
          tBCCV: this.validateForm.value.tBCCV,
          stock: this.validateForm.value.stock,
          stockAlert: this.validateForm.value.stockAlert,
          cat: 'PROD',
          proprietaire: this.validateForm.value.proprietaire
        };



        if (this.fileToUpload != null) {

          this.sommemn = 0;
          this.sommevl = 0;

          this.formData.append('bien', JSON.stringify(this.produit));
          this.formData.append('file', this.fileToUpload);

          console.log(this.produit);
          this.bienService.putBienF(this.idbien, this.formData)
            .subscribe(
              (data: any) => {
                console.log(data);
                this.fileToUpload = null;

                this.dataSet.forEach(item => {
                  this.sommemn = this.sommemn + item.partmn * 1;
                });

                this.dataSet.forEach(item => {
                  this.sommevl = this.sommevl + item.partvl * 1;
                });

                this.produitsNonActiverList.unshift(data);
                this.modalService.info({
                  nzTitle: 'Information',
                  nzContent: '<b> L\'opération numéro. <strong>' + data.id +
                    '</strong> a été modifié avec succès.</b>',
                  nzOkText: null,
                  nzCancelText: 'Ok',
                  nzOnCancel: () => this.validateForm.reset()
                });

                //this.loadProduitNonActiver();

              },
              (error: HttpErrorResponse) => {
                this.createMessage('danger', 'Echec de l\'enregistrement de modification !');
              }
            );

        } else {

          this.sommemn = 0;
          this.sommevl = 0;

          let produit = {
            nom: this.validateForm.value.nom,
            description: this.validateForm.value.description,
            photo: this.validateForm.value.photo,
            prix: this.validateForm.value.prix,
            tBCCV: this.validateForm.value.tBCCV,
            proprietaire: this.validateForm.value.proprietaire,
            stock: this.validateForm.value.stock,
            stockAlert: this.validateForm.value.stockAlert
          };


          console.log(produit);
          this.bienService.putProduit(this.idbien, produit)
            .subscribe(
              data => {
                console.log(data);

                this.dataSet.forEach(item => {
                  this.sommemn = this.sommemn + item.partmn * 1;
                });

                this.dataSet.forEach(item => {
                  this.sommevl = this.sommevl + item.partvl * 1;
                });

                this.loadProduitNonActiver();

              },
              (error: HttpErrorResponse) => {
                console.log('Echec !');
              }
            );

        }



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


        this.idGp = this.validateForm.value.id;

        this.idtest = this.grouper.pkGrouper.appUser_id;

        this.partmn = this.validateForm.value.partmn;
        this.partvl = this.validateForm.value.partvl;

        console.log(this.grouper);

        this.index = this.dataSet.findIndex(item => item.pkGrouper.appUser_id === this.idtest);
        console.log(this.index);

        console.log(this.validateForm.value.partmn);
        console.log(this.validateForm.value.partvl);

        if (this.dataSet.length == 0) {

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

          if (this.index == -1) {

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

    if (this.edit1) {


      if (!this.switupValue) {

        console.log(this.validateForm.value);


        let k = 0;
        for (const i in this.validateForm.controls) {
          this.validateForm.controls[i].markAsDirty();
          this.validateForm.controls[i].updateValueAndValidity();
          k++;
        }
        console.log(k);

        this.service = {
          nom: this.validateForm.value.nom,
          description: this.validateForm.value.description,
          prix: this.validateForm.value.prix,
          tBCCV: this.validateForm.value.tBCCV,
          stock: null,
          stockAlert: null,
          cat: 'SERV',
          proprietaire: this.validateForm.value.proprietaire
        };



        if (this.fileToUpload != null) {

          this.sommemn = 0;
          this.sommevl = 0;


          this.formData.append('bien', JSON.stringify(this.service));
          this.formData.append('file', this.fileToUpload);

          console.log(this.service);
          this.bienService.putBienF(this.idbien, this.formData)
            .subscribe(
              data => {
                console.log(data);
                this.fileToUpload = null;

                this.dataSet.forEach(item => {
                  this.sommemn = this.sommemn + item.partmn * 1;
                });

                this.dataSet.forEach(item => {
                  this.sommevl = this.sommevl + item.partvl * 1;
                });
                this.loadServiceNonActiver();


              },
              (error: HttpErrorResponse) => {
                this.createMessage('danger', 'Echec de l\'enregistrement !');
              }
            );

        } else {


          this.sommemn = 0;
          this.sommevl = 0;

          let service = {
            nom: this.validateForm.value.nom,
            description: this.validateForm.value.description,
            photo: this.validateForm.value.photo,
            prix: this.validateForm.value.prix,
            tBCCV: this.validateForm.value.tBCCV,
            proprietaire: this.validateForm.value.proprietaire
          };


          console.log(service);
          this.bienService.putService(this.idbien, service)
            .subscribe(
              data => {
                console.log(data);

                this.dataSet.forEach(item => {
                  this.sommemn = this.sommemn + item.partmn * 1;
                });

                this.dataSet.forEach(item => {
                  this.sommevl = this.sommevl + item.partvl * 1;
                });


                this.loadServiceNonActiver();


              },
              (error: HttpErrorResponse) => {
                this.createMessage('danger', 'Echec de l\'enregistrement !');
              }
            );

        }



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


        this.idGp = this.validateForm.value.id;

        this.idtest = this.grouper.pkGrouper.appUser_id;

        this.partmn = this.validateForm.value.partmn;
        this.partvl = this.validateForm.value.partvl;

        console.log(this.grouper);

        this.index = this.dataSet.findIndex(item => item.pkGrouper.appUser_id === this.idtest);
        console.log(this.index);

        console.log(this.validateForm.value.partmn);
        console.log(this.validateForm.value.partvl);

        if (this.dataSet.length == 0) {

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

          if (this.index == -1) {

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
            })

            this.dataSet.forEach(item => {
              this.sommevl = this.sommevl + item.partvl * 1;
            })

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



  valider() {


    /* if(!this.switchValue){
      this.bienService.postBiens(this.formData)
            .subscribe(
              data => {
                console.log(data); 
                this.dataetbien(); 
              },
              (error: HttpErrorResponse) => {
                 console.log('Echec !');
              }
            );
     }else{ */


    if (this.sommemn == 1 && this.sommevl == 1) {

      this.groupeService.postGroupes(this.groupe)
        .subscribe(
          data => {
            console.log(data);

            console.log(this.dataSet);
            this.dataSet.forEach(item => {

              this.grouperService.postGroupers(item)
                .subscribe(
                  data => {
                    console.log(data);

                  },
                  (error: HttpErrorResponse) => {
                    console.log('Echec !');
                  }
                );

            });



            this.bienService.postBiens(this.formData)
              .subscribe(
                data => {
                  console.log(data);

                  this.dataetbien();

                },
                (error: HttpErrorResponse) => {
                  this.createMessage('danger', 'Echec de l\'enregistrement !');
                }
              );

          },
          (error: HttpErrorResponse) => {
            this.createMessage('danger', 'Echec de l\'enregistrement !');
          }
        );

    }




    /* else{
      this.nocent=true;
    } */

  }

  validerGrp() {

    if (this.sommemn == 1 && this.sommevl == 1) {

      let groupe = {
        id: this.validateForm.value.id,
        nomGroupe: this.validateForm.value.nomGroupe,
        //groupers:this.dataSet 
      };

      console.log(groupe);

      this.groupeService.putGroupe(groupe)
        .subscribe(
          data => {
            console.log(data);


            this.dataSet.forEach(item => {

              this.grouperService.postGroupers(item)
                .subscribe(
                  data => {
                    console.log(data);

                  },
                  (error: HttpErrorResponse) => {
                    console.log('Echec !');
                  }
                );

            });


            //this.loadGroupe();
            //this.dataSet = [];
            //this.editCache = {};
            //this.somme=0;
            this.depass = false;
            this.nocent = false;

          },
          (error: HttpErrorResponse) => {
            console.log('Echec !');
          }
        );
    }


  }


  dataetbien() {
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
  dataetbienEdit() {
    /* this.ngOnInit(); */
    this.formData = new FormData();
    /*  this.imageUrl = 'assets/asRach/images/default.jpg';             
     this.inputValue==''; 
     this.dataSet = [];
     this.editCache = {};
     this.somme=0;
     this.depass=false; 
     this.nocent=false; */
  }


  cancelEdit1(key: number): void {
    this.editCache1[key].edit = false;
    console.log(this.editCache1[key].data);
  }

  cancelEdit2(key: number): void {
    this.editCache2[key].edit = false;
    console.log(this.editCache2[key].data);
  }


  saveEdit1(key: number): void {
    const index = this.produitsActiverList.findIndex(item => item.id === key);

    console.log('11111111');
    console.log(this.produitsActiverList[index]);
    console.log('11111111');

    console.log('22222222');
    console.log(this.editCache1[key].data);
    console.log('22222222');


    this.bienService.putProduit(key, this.editCache1[key].data)
      .subscribe(
        data => {
          console.log(data);
        },
        (error: HttpErrorResponse) => {
          this.createMessage('danger', 'Echec de l\'enregistrement !');
        });

    /*  this.groupeService.putGroupe(this.editCache1[key].data)
     .subscribe(
       data => {
          console.log(data);  
       },
       (error: HttpErrorResponse) => {
         console.log('(error: HttpErrorResponse)or occured');
       });   */

    Object.assign(this.produitsActiverList[index], this.editCache1[key].data);
    this.editCache1[key].edit = false;
  }

  saveEdit2(key: number): void {
    const index = this.servicesActiverList.findIndex(item => item.id === key);

    console.log('11111111');
    console.log(this.servicesActiverList[index]);
    console.log('11111111');

    console.log('22222222');
    console.log(this.editCache2[key].data);
    console.log('22222222');


    this.bienService.putService(key, this.editCache2[key].data)
      .subscribe(
        data => {
          console.log(data);
        },
        (error: HttpErrorResponse) => {
          console.log('(error: HttpErrorResponse)or occured');
        });

    Object.assign(this.servicesActiverList[index], this.editCache2[key].data);
    this.editCache2[key].edit = false;
  }

  activer(key: number): void {

    if (this.editCache3[key].data.stock == null) {
      this.bienService.putService(key, this.editCache3[key].data)
        .subscribe(
          data => {
            console.log(data);
            this.ngOnInit();
          },
          (error: HttpErrorResponse) => {
            this.createMessage('danger', 'Echec de l\'enregistrement !');
          });
    } else {
      this.bienService.putProduit(key, this.editCache3[key].data)
        .subscribe(
          data => {
            console.log(data);
            this.ngOnInit();
          },
          (error: HttpErrorResponse) => {
            this.createMessage('danger', 'Echec de l\'enregistrement !');
          });
    }



    //Object.assign(this.dataSet2[index], this.editCache2[key].data);      
    // this.editCache2[key].edit = false;
  }


  delete1(id: number) {

    this.bienService.deleteBien(id)
      .subscribe(data => {
        console.log(data);
        this.produitsActiverList = this.produitsActiverList.filter(i => i.id !== id);

      }, (error: HttpErrorResponse) => {
        this.createMessage('warning', 'Echec de l\'enregistrement ! ');
      });

    /* this.groupeService.deleteGroupe(key)
    .subscribe(data=>{
        console.log(data);
        this.loadGroupe();
    },(error: HttpErrorResponse)=>{
       console.log('Echec !');
    }) */

  }

  delete2(id: number) {

    this.bienService.deleteBien(id)
      .subscribe((data: Services) => {
        console.log(data);
        // this.loadServiceNonActiver();
        this.servicesActiverList = this.servicesActiverList.filter(d => d.id !== data.id);
        this.createMessage('info', 'Suppression effectuée !');
      }, (error: HttpErrorResponse) => {
        this.createMessage('danger', 'Echec de suppression !');
      });

  }


  updateEditCache(): void {
    this.dataSet.forEach(item => {
      /* if (!this.editCache[item.pkGrouper.appUser_id]) { */
      this.editCache[item.pkGrouper.appUser_id] = {
        edit: false,
        data: { ...item }
      };
      /* } */
    });

  }





  /* updateEditCache1(): void {
    this.dataSet1.forEach(item => {
      if (!this.editCache1[ item.id ]) {
        this.editCache1[ item.id ] = {
          edit: false,
          data: {...item}
        };
      }
    });
  } */

  updateEditCache1(): void {
    this.produitsActiverList.forEach(item => {
      /* if (!this.editCache1[ item.id ]) { */
      this.editCache1[item.id] = {
        edit: false,
        data: { ...item }
      };
      /*  } */
    });
  }

  updateEditCache2(): void {
    this.servicesActiverList.forEach(item => {
      this.editCache2[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  updateEditCache3(): void {
    this.dataSet3.forEach(item => {
      this.editCache3[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }


  isproduit() {
    if (this.inputValue === 'PROD') {
      return true;
    }
    if (this.inputValue === 'SERV') {
      return false;
    }
  }

  isuser() {
    if (!this.edit) {
      // console.log(this.choix);
      if (this.choix == null) { return true; }
      if (this.choix === 'user') { return true; }
      if (this.choix === 'groupe') { return false; }
    } else {

      if (this.choix == null) { return true; }
      if (this.choix === 'user') { return false; }
      if (this.choix === 'groupe') { return true; }
    }


  }

  /* isuseredit(){
    //if(!this.edit) return true;
    if(this.choix=='user') return true;
    if(this.choix=='groupe') return false;
    
  } */

  /*  annul(){
     if(this.choix=='user') return true;
     if(this.choix=='groupe') return true;
     
   } */

  log(value: boolean) {
    console.log(value);
    if (value == true) this.annul = true;
  }

  logupG(value: boolean) {
    console.log(value);
  }

  ajout() {
    //this.isuser()=false;
    this.fileToUpload = null;
    this.pastof = false;
    this.nouv = true;
    this.edit = false;
    this.edit1 = false;
    this.ajou = true;
    this.sommemn = 0;
    this.sommevl = 0;
    this.imageUrl = 'assets/asRach/images/default.jpg';
    //this.isgroupe=false;
    this.switchValue = false;
    this.switupValue = false;
    this.inputValue == 'PROD';

    this.ngOnInit();
    this.open();
  }



  avance(key: string) {
    this.idbien = null;
    this.formData = new FormData();
    this.pkGrouper = null;
    this.groupe = null;
    this.grouper = null;
    this.bien = null;
    this.fileToUpload = null;
    this.imageUrl = 'http://localhost:8080/files/' + this.editCache1[key].data.photo;
    this.pastof = false;
    //this.choix=null;
    this.switchValue = false;
    this.switupValue = false;
    this.biengrp = false;
    this.dataSet = [];
    //this.dataSet1=[];
    this.edit = true;
    this.edit1 = false;
    this.ajou = false;
    // this.isuser();           
    console.log(this.edit);
    console.log(this.editCache1[key].data.photo);

    this.editCache1[key].edit = false;

    /* if(this.editCache1[key].data.groupe !== null ){
      this.isgroupe=true;
      this.isuse=false;
    }else{
      this.isuser();
      this.isuse=true;
      this.isgroupe=false;      
    } */
    this.annul = true;

    this.sommemn = 0;
    this.sommevl = 0;
    this.ngOnInitUpdate(key);
    this.open();
  }

  avance1(key: string) {
    this.idbien = null;
    this.formData = new FormData();
    this.pkGrouper = null;
    this.groupe = null;
    this.grouper = null;
    this.bien = null;
    this.fileToUpload = null;
    this.imageUrl = 'http://localhost:8080/files/' + this.editCache2[key].data.photo;
    this.pastof = false;

    this.switchValue = false;
    this.switupValue = false;
    this.biengrp = false;
    this.dataSet = [];

    this.edit1 = true;
    this.edit = false;
    this.ajou = false;
    console.log(this.edit1);
    console.log(this.editCache2[key].data.photo);

    this.editCache2[key].edit = false;


    this.annul = true;

    this.sommemn = 0;
    this.sommevl = 0;
    this.ngOnInitUpdate1(key);
    this.open();
  }



  startEdit(key: number): void {
    this.editCache[key].edit = true;
    console.log(this.editCache[key].data);
  }

  startEdit1(key: string): void {
    this.editCache1[key].edit = true;
    console.log(this.editCache1[key].data);
  }

  startEdit2(key: string): void {
    this.editCache2[key].edit = true;
    console.log(this.editCache2[key].data);
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

   // this.dataSet[index] = this.editCache[key].data;
    console.log(this.dataSet);
    //this.updateEditCache();

    this.dataSet.forEach(item => {
      this.sommemn = this.sommemn + item.partmn * 1;
    });

    this.dataSet.forEach(item => {
      this.sommevl = this.sommevl + item.partvl * 1;
    });

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
    this.pastof = false;
    console.log(this.fileToUpload.name);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  ngOnInitUpdate1(key: string) {
    console.log(this.edit1);

    this.validateForm = this.fb.group({
      biengrp: [null],
      nom: [this.editCache2[key].data.nom, [Validators.required]],
      description: [this.editCache2[key].data.description, [Validators.required]],
      photo: [this.editCache2[key].data.photo, [Validators.required]],
      prix: [this.editCache2[key].data.prix, [Validators.required]],
      tBCCV: [this.editCache2[key].data.tBCCV, [Validators.required]],
      /*  stock: [this.editCache1[key].data.stock, [Validators.required]],
       stockAlert: [this.editCache1[key].data.stockAlert, [Validators.required]], */

      switup: [null],
      proprietaire: [this.editCache2[key].data.proprietaire],

      id: [this.editCache2[key].data.proprietaire.id, [Validators.required]],
      nomGroupe: [this.editCache2[key].data.proprietaire.nomGroupe, [Validators.required]],
      appUser: [null],
      partmn: [null],
      partvl: [null],
    });

    this.idbien = this.editCache2[key].data.id;
    this.idprop = this.editCache2[key].data.proprietaire.id;

    this.loadGrouper(this.idprop);


  }


  loadGrouper(id: string) {
    console.log(id);
    this.grouperService.getGrouper(id)
      .subscribe((data: Array<Grouper>) => {
        this.dataSet = data;
        console.log(data);

        this.dataSet.forEach(item => {
          this.sommemn = this.sommemn + item.partmn * 1;
        });

        this.dataSet.forEach(item => {
          this.sommevl = this.sommevl + item.partvl * 1;
        });

        this.updateEditCache();
        console.log(this.dataSet);
      }, (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }


  /* loadBien(){
   this.bienService.getBienT()
   .subscribe((data: Array<Bien>) => {
     this.dataSet1 = data;
     this.dat=data;
     this.updateEditCache1();
     console.log(this.dataSet1);
 
   }, (error: HttpErrorResponse) => {
      console.log('Echec !');
   });
 } */

  /* Début ==== listes des produits non activer ==== */

  loadProduitNonActiver() {
    this.produitsService.getProduitPasActiver()
      .subscribe((data: Array<Produit>) => {
        this.produitsNonActiverList = data;
        this.dat = data;
        console.log('=================== loadProduitNonActiver ');
        this.updateEditCache1();
        console.log(this.produitsNonActiverList);

      }, (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  /* Fin ==== listes des produits non activer ==== */

  /* Début ==== listes des produits activer ==== */

  loadProduitActiver() {
    this.produitsService.getProduitsActiver()
      .subscribe((data: Array<Produit>) => {
        this.produitsActiverList = data;
        this.dat = data;
        console.log('=================== loadProduitActiver ');
        this.updateEditCache1();
        console.log(this.produitsActiverList);

      }, (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  /* Fin ==== listes des produits activer ==== */

  /* Début ==== méthode produits activer ==== */

  activeProduit(produit: Produit) {
    this.produitsService.activerProduit(produit)
      .subscribe((data: Produit) => {
        console.log(this.produitsNonActiverList);
        const key = produit.id;
        console.log('key');
        console.log(key);
        const index = this.produitsNonActiverList.findIndex(item => item.id === key);

        console.log(index);
        console.log('index');
        this.produitsNonActiverList.splice(index, 1);

        /*  this.produitsNonActiverList.splice(this.indexOfElementProduit(produit.id), 1);
         console.log('produit.id');
         console.log(produit.id); */
        /* console.log('produit');
        console.log(produit);
        console.log('this.produitsNonActiverList');
        console.log(this.produitsNonActiverList);
        const index = this.produitsNonActiverList.findIndex(produit => produit.id === produit.id);
        console.log('index');
        console.log(index);
        this.produitsNonActiverList.splice(index, 1); */
        this.produitsActiverList.unshift(data);
      }, (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  /* Fin ==== méthode produits activer ==== */

  /* Début ==== listes des services non activer ==== */

  loadServiceNonActiver() {
    this.servicesService.getServicePasActiver()
      .subscribe((data: Array<Services>) => {
        this.servicesNonActiverList = data;
        console.log('=================== loadServiceNonActiver');
        this.dat1 = data;
        this.updateEditCache2();
        console.log(this.servicesNonActiverList);

      }, (error: HttpErrorResponse) => {
        console.log('Echec !');
      });

  }
  /* Fin ==== listes des services non activer ==== */

  /* Début ==== listes des services non activer ==== */

  loadServiceActiver() {
    this.servicesService.getServiceActiver()
      .subscribe((data: Array<Services>) => {
        this.servicesActiverList = data;
        console.log('=================== loadServiceActiver ');
        this.dat1 = data;
        this.updateEditCache2();
        console.log(this.servicesActiverList);

      }, (error: HttpErrorResponse) => {
        console.log('Echec !');
      });

  }
  /* Fin ==== listes des services non activer ==== */
  /* Début ==== méthode produits activer ==== */

  activeService(services: Services) {
    this.servicesService.activerService(services)
      .subscribe((data: Services) => {
        const key = services.id;
        const index = this.servicesNonActiverList.findIndex(item => item.id === key);
        this.servicesNonActiverList.splice(index, 1);

        this.servicesActiverList.unshift(data);
      }, (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  /* Fin ==== méthode produits activer ==== */


  /*  loadBienDesactives() {
     this.bienService.getBienDesactives()
       .subscribe((data: Array<Bien>) => {
         this.dataSet3 = data;
         this.dat2 = data;
         this.updateEditCache3();
         console.log(this.dataSet3);
 
       }, (error: HttpErrorResponse) => {
         console.log('Echec !');
       });
 
   } */





  sort(sortName: string, value: boolean): void {
    this.sortName = sortName;
    this.sortValue = value;
    for (const key in this.sortMap) {
      this.sortMap[key] = (key === sortName ? value : null);
    }
    this.search();
  }


  filterAdddatasChange(value: string[]): void {
    this.searchAdddatas = value;
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


  filterAdddatasChange1(value: string[]): void {
    this.searchAdddatas1 = value;
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


  filterAdddatasChange2(value: string[]): void {
    this.searchAdddatas2 = value;
    this.search2();
  }


  search(): void {
    const filterFunc = (item) => {
      return (this.searchAdddatas.length ? this.searchAdddatas.some(nom => item.nom.indexOf(nom) !== -1) : true) &&
        (item.nom.indexOf(this.searchValue) !== -1);
    };
    const data = this.dat.filter(item => filterFunc(item));
    this.dataSet1 = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1 : -1) :

      (b[this.sortName] > a[this.sortName] ? 1 : -1));
  }

  search1(): void {
    const filterFunc = (item) => {
      return (this.searchAdddatas1.length ? this.searchAdddatas1.some(nom => item.nom.indexOf(nom) !== -1) : true) &&
        (item.nom.indexOf(this.searchValue1) !== -1);
    };
    const data = this.dat1.filter(item => filterFunc(item));
    this.dataSet2 = data.sort((a, b) => (this.sortValue1 === 'ascend') ? (a[this.sortName1] > b[this.sortName1] ? 1 : -1) :

      (b[this.sortName1] > a[this.sortName1] ? 1 : -1));
  }

  search2(): void {
    const filterFunc = (item) => {
      return (this.searchAdddatas2.length ? this.searchAdddatas2.some(nom => item.nom.indexOf(nom) !== -1) : true) &&
        (item.nom.indexOf(this.searchValue2) !== -1);
    };
    const data = this.dat2.filter(item => filterFunc(item));
    this.dataSet3 = data.sort((a, b) => (this.sortValue2 === 'ascend') ? (a[this.sortName2] > b[this.sortName2] ? 1 : -1) :

      (b[this.sortName2] > a[this.sortName2] ? 1 : -1));
  }

  indexOfElementProduit(id: number): number {
    let index = - 1;
    let rep: boolean = false;
    let i = 0;
    while (i < this.produitsNonActiverList.length && rep === false) {
      if (this.produitsNonActiverList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    console.log('index');
    console.log(index);
    return index;
  }

  indexOfElementService(id: number): number {
    let index = - 1;
    let rep: boolean = false;
    let i = 0;
    while (i < this.servicesNonActiverList.length && rep === false) {
      if (this.servicesNonActiverList[i].id === id) {
        index = i;
        rep = true;
      }
      i++;
    }
    console.log('index');
    console.log(index);
    return index;
  }

  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }
  resetbien() { }

}




























