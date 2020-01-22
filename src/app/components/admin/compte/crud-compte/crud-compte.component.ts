import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Role } from '../../../../model/Role';
import { AppUser } from '../../../../model/model.AppUser';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../service/authentication.service';
import { Compte } from '../../../../model/model.compte';
import { UtilisateurService } from '../../../../service/UtilisateurService';
import { CompteService } from '../../../../service/compte.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { HttpErrorResponse } from '@angular/common/http';
import { RecepteCompte } from 'src/app/model/model.recepte-compte';
import { OperationBanqueService } from './../../../../service/operationBanque.service';
import { Operation } from './../../../../model/model.operation';

@Component({
  selector: 'app-crud-compte',
  templateUrl: './crud-compte.component.html',
  styleUrls: ['./crud-compte.component.css']
})
export class CrudCompteComponent implements OnInit {

  // input numric
  value = '';
  provision = '';
  title = 'Input a number';
  title1 = 'Input a number';
  ajouter = false;
  consulte = false;


  //randomUserUrl = 'http://localhost:8080/listUtilisateurs';
  optionList;
  selectedUser;
  isLoading = false;
  // tslint:disable-next-line:no-any

  imageUrl: string = 'assets/asRach/images/default.jpg';
  selectedFiles: FileList;
  fileToUpload: File = null;
  i = 1;
  editCache = {};
  validateForm: FormGroup;

  compte: Compte;

  edit: boolean = false;

  idcompte: any;
  selectedValue;
  //selectedValueBis = { label: 'Les deux comptes', value: 'compte'};
  selectedValueBis = 'compte';
  childrenVisible = false;

  sortName = null;
  sortValue = null;
  searchValue = '';
  searchAddress = [];
  currentPgG: number = 0;

  sizeG: number = 5;

  options;


  sortMap = {
    username: null,
    nom: null,
    prenom: null
  };
  data;
  dataSet = [];
  dataSetG = [];
  dataSetV = [];
  dataSetM = [];

  visible = false;
  dateBetwen: Array<Date> = [];
  numeroCompte: string ;
  comptConsulter: RecepteCompte = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private utilisateurService: UtilisateurService,
    private message: NzMessageService,
    private modalService: NzModalService,
    private compteService: CompteService,
    private operationBanqueService: OperationBanqueService,
    private authenService: AuthenticationService,
  ) { }

  /* le selecteur */
  /*  optionListBis = [
     { label: 'Les deux comptes', value: 'compte'},
     { label: 'Les deux valeurs', value: 'valeur'},
     { label: 'Les comptes monnaies', value: 'monnaie'}
   ]; */
  log(value: string) {
    this.selectedValueBis = value;
    console.log(value);
    /*  if (this.selectedValueBis === 'compte') {
       this.dataSet = this.dataSet;
     } else if (this.selectedValueBis === 'valeur') {
       this.dataSet = this.dataSetV;
     } else {
       this.dataSet = this.dataSetM;
     } */

    switch (this.selectedValueBis) {
      case 'compte': {
        this.loadCompte();
        break;
      }
      case 'valeur': {
        this.loadCompteValeur();
        break;
      }
      case 'monnaie': {
        this.loadCompteMonnaie();
        //this.dataSet = this.dataSetM;
        break;
      }

    }


    //this.dataSet = this.dataSetG;
    console.log(this.dataSet);
  }

  inputValue;
  /*  log(selectedValueBis): void {
     console.log(this.selectedValueBis);
     return selectedValueBis;
   } */
  /* ajout() {
    this.edit = false;
    this.ngOnInit();
    this.open();
  } */

  ngOnInit(): void {
    //this.loadCompteGenerale();  
    console.log(this.selectedValueBis);
    this.loadMore();
    console.log(this.edit);


    this.validateForm = this.fb.group({

      numCompte: [null, [Validators.required]],
      dateCreation: [null, [Validators.required]],
      solde: [null, [Validators.required]],
      valeur: [null, [Validators.required]],
      //debit: [null, [Validators.required]],
      provision: [null, [Validators.required]],
      type: [''],
      appUserCompte: [null, [Validators.required]],

    });

    /* if (this.selectedValueBis === 'compte') {
      this.dataSet = this.dataSet;
      this.loadCompte();
 
    } else if (this.selectedValueBis === 'valeur') {
      this.dataSet = this.dataSetV;
      this.loadCompteValeur();
    } else {
      this.dataSet = this.dataSetM;
      this.loadCompteMonnaie();
    } */
    //this.loadCompte();
    /* this.loadCompteMonnaie(); */
    //this.loadCompte();
    console.log(this.selectedValueBis);
    /*   switch (this.selectedValueBis) {
        case 'compte': {
          this.loadCompte();
          break;
        }
        case 'valeur': {
          this.loadCompteValeur();
          break;
        }
        case 'monnaie': {
          this.loadCompteMonnaie();
          this.dataSet = this.dataSetM;
          break;
        }
       
      } */
  }

  open(): void {
    this.visible = true;
    this.ajouter = true;
    this.consulte = false;
  }

  consulter(): void {
    this.visible = true;
    this.consulte = true;
    this.ajouter = false;
  }

  close(): void {
    this.visible = false;
  }
  consulteCompter() {
    console.log(this.numeroCompte);
    if (this.numeroCompte != null) {
      this.compteService.consulterUnCompte(this.numeroCompte)
        .subscribe(  (data: Compte) => {
          this.comptConsulter = data;
          console.log(this.comptConsulter);
           
          },
          (error: HttpErrorResponse) => {
            this.message.error('Erreur de numero de compte');
          });
    }
  }

  submitForm(): void {
    console.log(this.inputValue);
    let k = 0;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
      k++;
    }
    console.log(k);


    if (!this.edit) {

      this.compte = this.validateForm.value;
      this.compte = this.validateForm.value;
      console.log(this.validateForm.value);

      if (k !== 0) {

        this.compte = this.validateForm.value;
        console.log(this.compte);
        if (this.validateForm.value.type === 'CPMN') {
          this.postCompte(this.compte);
          console.log(this.compte);
        } else {
          this.postCompte(this.compte);
        }
      }
    } else {

      console.log(this.validateForm.value);
      /*  if (k !== 0) {
         this.compte = this.validateForm.value;
 
         this.compteService.putCompte(this.idcompte, this.compte)
           .subscribe(
             res => {
               this.imageUrl = 'assets/asRach/images/default.jpg';
               console.log(res);
               this.validateForm.reset();
               this.ngOnInit();
               this.close();
             },
             err => {
               console.log(err);
             });
       } */

    }
  }
  /* avance(key: string) {
    this.edit = true;
    console.log(this.edit);
    this.editCache[key].edit = false;
    this.ngOnInitUpdate(key);
    this.open();
  }
 */

  startEdit(key: string): void {
    this.editCache[key].edit = true;
    console.log(this.editCache[key].data);
  }

  cancelEdit(key: string): void {
    this.editCache[key].edit = false;
    console.log(this.editCache[key].data);
  }


  saveEdit(key: string): void {
    const index = this.dataSet.findIndex(item => item.numCompte === key);

    console.log('11111111');
    console.log(this.dataSet[index]);
    console.log('11111111');

    console.log('22222222');
    console.log(this.editCache[key].data);
    console.log('22222222');


    /* this.compteService.putCompte(key, this.editCache[key].data)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log('Error occured');
        }); */

    Object.assign(this.dataSet[index], this.editCache[key].data);
    this.editCache[key].edit = false;
  }




  activer(key: string): void {

    this.compteService.activerCompte(key)
      .subscribe(
        res => {
          console.log(res);
          this.ngOnInit();
        },
        err => {
          console.log("Error occured");
        });

  }


  desactiver(key: string): void {

    this.compteService.desactiverCompte(key)
      .subscribe(
        res => {
          console.log(res);
          this.ngOnInit();
        },
        err => {
          console.log("Error occured");
        });

  }





  delete(key: string) {
    this.compteService.deleteCompte(key)
      .subscribe(data => {
        console.log(data);
        this.ngOnInit();
      }, err => {
        console.log(err);
      });
  }



  updateEditCache(): void {
    this.dataSet.forEach(item => {
      if (!this.editCache[item.numCompte]) {
        this.editCache[item.numCompte] = {
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



  ngOnInitUpdate(key: string) {
    console.log(this.edit);
    this.validateForm = this.fb.group({
      numCompte: [this.editCache[key].data.numCompte, [Validators.required]],
      //dateCreation:    [this.editCache[key].data.dateCreation, [Validators.required]],
      solde: [this.editCache[key].data.solde, [Validators.required]],
      valeur: [this.editCache[key].data.valeur, [Validators.required]],
      // debit:       [this.editCache[key].data.debit, [Validators.required]],
      provision: [this.editCache[key].data.provision, [Validators.required]],
      type: [this.editCache[key].data.type],
      appUsermon: [this.editCache[key].data.utilisateur.appUser],
      appUserValeur: [this.editCache[key].data.utilisateur.appUser],
    });

    this.idcompte = this.editCache[key].data.numCompte;

  }




  /*  private loadCompteGenerale() {
     console.log(this.data1);
     console.log("#************* data1 *****");
     this.data1.forEach(element => {
       this.data2 = element
       console.log("#####################");
       this.dataSet = [ ...this.dataSet, element ];
     console.log(element);
     console.log("#####################");
     console.log(this.dataSet);
 
     });
     console.log(this.dataSet);
     this.data2.forEach(element => {
       this.dataSet = [ ...this.dataSet, element ];
 
       console.log(element);
     });
     console.log("#####################");
     console.log(this.dataSet);
     console.log("#####################");
   } */


  /* Méthode de chargement des 2 comptes */
  private loadCompte() {
    this.compteService.getComptes()
      .subscribe((data: Array<Compte>) => {
        console.log(data);
        this.dataSet = data;
        this.updateEditCache();
        console.log(this.dataSet);
        this.dataSet = [...this.dataSet];
      }, err => {
        console.log('Echec de chargements des Comptes !!!');
      });
  }

  /* Methode de chargement des Comptes valeurs Uniquements  */
  private loadCompteValeur() {
    this.compteService.getComptesValeurs()
      .subscribe((data: Array<Compte>) => {
        console.log(data);
        this.dataSet = data;
        this.dataSet = [...this.dataSet];
        this.updateEditCache();
      }, err => {
        console.log('Echec de chargements des Comptes valeurs !!!');
      });
  }


  /* Methode de chargement des Comptes Monnaie Uniquements  */
  private loadCompteMonnaie() {
    this.compteService.getComptesMonnaies()
      .subscribe((data: Array<Compte>) => {
        console.log(data);
        this.dataSet = data;
        this.dataSet = [...this.dataSet];
        this.updateEditCache();
      }, err => {
        console.log('Echec de chargements des Comptes Monnaie !!!');
      });
  }


  private postCompte(compte: Compte) {
    this.compteService.postCompte(compte)
      .subscribe(
        data => {
          this.modalService.info({
            nzTitle: 'Information',
            nzContent: '<p> L\'opération numéro. <strong>' + data.id +
              '</strong> a été enregistré avec succès.</p>',
            nzOkText: null,
            nzCancelText: 'Ok',
            nzOnCancel: () => this.validateForm.reset()
          });
          console.log(data);
          this.dataSet.unshift(data);

        },
        err => {
          console.log(err);
        });
  }


  /* Methode de Post de Compte valeurs Uniquement  */
  /*  private postValeurs(compteValeur: CompteValeurs) {
     this.valeursService.postComptesValeurs(compteValeur)
       .subscribe(
         res => {
           console.log(this.compteValeurs);
           console.log(res);
           this.validateForm.reset();
           this.ngOnInit();
           //this.close();
         },
         err => {
           console.log(err);
         });
   } */
  /* Methode de Post de Compte monnaie Uniquement  */
  /*  private postMonnaie(compteMonnaie: CompteMonnaies) {
     this.monnaieService.postCompteMonnaie(compteMonnaie)
       .subscribe(
         res => {
           console.log(this.compteMonnaies);
           console.log(res);
           this.validateForm.reset();
           this.ngOnInit();
           // this.close();
         },
         err => {
           console.log(err);
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


  filterAddressChange(value: string[]): void {
    this.searchAddress = value;
    this.search();
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    const filterFunc = (item) => {
      return (this.searchAddress.length ? this.searchAddress.some(numCompte => item.numCompte.indexOf(numCompte) !== -1) : true) &&
        (item.numCompte.indexOf(this.searchValue) !== -1);
    };
    const data = this.data.filter(item => filterFunc(item));
    this.dataSet = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1
      : -1) : (b[this.sortName] > a[this.sortName] ? 1 : -1));
  }
  loadMore(): void {
    this.isLoading = true;
    this.authenService.getUtilisateur().subscribe((data: Array<AppUser>) => {
      console.log(data);
      this.optionList = data;
      console.log(this.optionList);
      this.isLoading = false;
    },
      err => {
        console.log(this.optionList);
      });
  }
  // input numeric
  onChange(value: string): void {
    this.updateValue(value);
  }
  onChangess(value: string): void {
    this.updateValues(value);
  }

  // '.' at the end or only '-' in the input box.
  onBlur(): void {
    if (this.value.charAt(this.value.length - 1) === '.' || this.value === '-') {
      this.updateValue(this.value.slice(0, -1));
    }
  }
  onBlurProvision(): void {
    console.log(this.provision);
    console.log(this.value);
    if (this.provision.charAt(this.provision.length - 1) === '.' || this.provision === '-') {
      this.updateValues(this.provision.slice(0, -1));
    }
  }

  updateValue(value: string): void {
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(+value) && reg.test(value)) || value === '' || value === '-') {
      this.value = value;

    }
    //this.inputElement.nativeElement.value = this.value;

    this.updateTitle();
  }
  updateValues(value: string): void {
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(+value) && reg.test(value)) || value === '' || value === '-') {
      this.provision = value;
    }

    // this.inputElements.nativeElement.value = this.provision;
    this.updateTitle();
  }

  updateTitle(): void {
    this.title = (this.value !== '-' ? this.formatNumber(this.value) : '-') || 'Input a number';
    this.title1 = (this.provision !== '-' ? this.formatNumber(this.provision) : '-') || 'Input a number';
  }

  formatNumber(value: string): string {
    const string = `${value}`;
    const list = string.split('.');
    const prefix = list[0].charAt(0) === '-' ? '-' : '';
    let num = prefix ? list[0].slice(1) : list[0];
    let result = '';
    while (num.length > 3) {
      result = ` ${num.slice(-3)}${result}`;
      num = num.slice(0, num.length - 3);
    }
    if (num) {
      result = num + result;
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
  }
  startDelete(id: number) {

  }

  /*  startDelete(compte: Compte) {
     if (this.Compte) {
       this.deleteMonnaie(this.Compte);
     } else {
       this.deleteValeur(this.Compte);
     }
 
 
   } */
  private deleteMonnaie(compte: Compte) {
    this.compteService.deleteCompte(compte).subscribe(response => this.loadCompte);

  }


  betwen() {
    this.operationBanqueService.geOp2Date(this.dateBetwen, this.comptConsulter.numCompte)
      .subscribe((data: Array<Operation>) => {
        this.dataSet = data;
        console.log(this.dataSet);
      }, (err: HttpErrorResponse) => {
        console.log(err);
      });
  }

}
