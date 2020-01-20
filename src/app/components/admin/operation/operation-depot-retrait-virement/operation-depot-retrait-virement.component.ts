import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from './../../../../service/authentication.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Compte } from 'src/app/model/model.compte';
import { OperationBanqueService } from './../../../../service/operationBanque.service';
import { Operation } from './../../../../model/model.operation';
import { CompteService } from './../../../../service/compte.service';
import { AppUser } from './../../../../model/model.AppUser';
import { TokenStorage } from './../../../../utils/token.storage';

@Component({
  selector: 'app-operation-depot-retrait-virement',
  templateUrl: './operation-depot-retrait-virement.component.html',
  styleUrls: ['./operation-depot-retrait-virement.component.css']
})
export class OperationDepotRetraitVirementComponent implements OnInit {
  deadline = Date.now() + 1000 * 60;
  //widthConfig = ['300px', '210px', '230px', '230px', '230px'];
  filter: any;
  validateForm: FormGroup;
  selectedIndex = 0;
  visible = false;
  isLoading = false;
  optionList: Array<Compte> = [];
  optionListBis;
  selectedValueBis;
  selectedUserBiss;
  searchValue;
  childrenVisible = false;
  selectedUser;
  selectedValue = 'CPTS';
  radioValue = 'DEPO';
  compteOperant: Compte;
  compteList: Array<Compte> = [];
  compteValeurList: Array<Compte> = [];
  compteMonaieList: Array<Compte> = [];
  compteSystemeList: Array<Compte> = [];
  opererationEnList: Array<Operation> = [];
  dataSetV;
  dataSetM;
  edit: boolean = false;
  Property: string = 'AUTORISATEUR';
  i = 1;
  editCache = {};
  dataSet = [];
  user: AppUser = null;
  uneOperation: Operation = null;
  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private http: HttpClient,
    private message: NzMessageService,
    private modalService: NzModalService,
    private compteService: CompteService,
    private operationBanqueService: OperationBanqueService,
    private tokenStorage: TokenStorage,
  ) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    console.log(this.user);
  }

  ngOnInit() {
    this.initialiseFormulaire(null);
    this.listOperationEn();
    this.loadMore();
    this.loadOperation();
    this.loadCompte();
    this.loadCompteSysteme();
    console.log(this.dataSet);
    // console.log( this.getRandomLong());

  }

  log(value) {
    this.ngOnInit();
    this.selectedValue = value;
    console.log(value);
  }

  initialiseFormulaire(operation: Operation): void {
    this.validateForm = this.fb.group({
      id: [(operation != null) ? operation.id : null, [Validators.required]],
      numCompte: [(operation != null) ? operation.numCompte : null, [Validators.required]],
      numCompte2: [(operation != null) ? operation.numCompte2 : null, [Validators.required]],
      montantOp: [(operation != null) ? operation.montantOp : null, [Validators.required]],
      narrative: [(operation != null) ? operation.narrative : null, [Validators.required]],
      type: [''],
      typeOperation: [''],
    });
  }
  removet(): void {
    console.log('======je suis test de deadline ******');

  }

  /* enregistrement d'une operation */
  enregistrerOperationEn(): void {
    const formData = this.validateForm.value;
    const operation = new Operation(
      null,
      formData.numCompte,
      formData.numCompte2,
      formData.montantOp,
      formData.narrative,
      null,
      formData.typeOperation,
      this.user.username,
      null,
      null
    );
    console.log(formData);
    console.log('formData');
    if (formData.typeOperation !== null) {
      this.operationBanqueService.saveEn(operation).subscribe(
        (data: Operation) => {
          console.log(data);
          this.modalService.info({
            nzTitle: 'Information',
            nzContent: '<b> L\'opération de montant. <strong>' + data.montantOp +
              '</strong> a été enregistré avec succès.</b>',
            nzOkText: null,
            nzCancelText: 'Ok',
            nzOnCancel: () => this.validateForm.reset()
          });
        },
        (error: HttpErrorResponse) => {
          this.createMessage('warning', 'Echec de l\'enregistrement de operation ! ');
        });
    } else {
      this.createMessage('warning', 'Solde insufisant ! <strong>' + formData.montantOp + '</strong> supérieur à <strong>' + this.compteOperant.solde + '</strong>');
    }

  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }
  choix(value) {

    this.radioValue = value;
    console.log(value);
  }



  /* Methode de chargement des Depots valeurs Uniquements  */
  loadCompteValeur() {
    this.compteService.getComptesValeurs()
      .subscribe((data: Array<any>) => {
        console.log(data);
        this.optionList = data;
        this.optionListBis = data;
        console.log(this.optionList);
        console.log(this.optionListBis);
        this.isLoading = false;
        this.updateEditCache();

      }, err => {
        console.log(err);
      });
  }
  /* Methode de chargement des Comptes Monnaie Uniquements  */
  loadCompteMonnaie() {
    this.compteService.getComptesMonnaies()
      .subscribe((data: Array<any>) => {
        console.log(data);
        this.optionList = data;
        this.optionListBis = data;
        console.log(this.optionList);
        this.isLoading = false;
        this.updateEditCache();
      }, err => {
        console.log(err);
      });

  }
  postOperationtValeurs(foutou: any) {
    this.operationBanqueService.postOperationCompteValeur(foutou)
      .subscribe(
        res => {
          console.log(res);
          this.validateForm.reset();
          this.ngOnInit();
          //this.close();
        },
        err => {
          console.log(err);
        });
  }

  getUnCompt() {
    let num = this.validateForm.get('numCompte').value;
    console.log(num);
    this.compteService.unCompte(num).subscribe(
      (data: Compte) => {
        this.compteOperant = data;
        console.log(this.compteOperant);
      }
    )
  }
  search() { }
  resetForm() { }



  updateEditCache(): void {

    this.dataSet.forEach(item => {
      // console.log(this.editCache[item.id]);
      if (!this.editCache[item.id]) {
        this.editCache[item.id] = {
          edit: false,
          data: { ...item }
        };
      }
    });
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
    const index = this.dataSet.findIndex(item => item.id === key);

    console.log('11111111');
    console.log(this.dataSet[index]);
    console.log('11111111');

    console.log('22222222');
    console.log(this.editCache[key].data);
    console.log('22222222');
    //this.authService.putUtilisateur(this.editCache[key].data);
    Object.assign(this.dataSet[index], this.editCache[key].data);
    // this.dataSet[ index ] = this.editCache[ key ].data;
    this.editCache[key].edit = false;

  }
  loadMore(): void {
    this.isLoading = true;
    switch (this.selectedValue) {
      case 'CPTS': {
        this.loadCompte();
        break;
      }
      case 'CPVL': {
        this.loadCompteValeur();
        break;
      }
      case 'CPMN': {
        this.loadCompteMonnaie();
        break;
      }
      /* default:
        this.loadCompte(); */
    }
  }
  /* Méthode de chargement des 2 comptes */
  private loadCompte() {
    this.compteService.getComptes()
      .subscribe((data: Array<Compte>) => {
        console.log(data);
        this.compteList = data;
        this.updateEditCache();
        console.log(this.dataSet);
        this.dataSet = [...this.dataSet];
      }, err => {
        console.log('Echec de chargements des Comptes !!!');
      });
  }
  inspecterMobilisation(data) {

  }
  deleteMobilisation(data) { }
  reponse(id: number) { }
  repondre(data) { }
  private loadOperation() {
    this.operationBanqueService.getAllOperation()
      .subscribe((data: Array<Operation>) => {
        console.log(data);
        this.dataSet = data;
        this.updateEditCache();
        // this.dataSet = [ ...this.dataSet, data ];
        //console.log(this.dataSet);
        /* console.log(this.data2); */
      }, err => {
        console.log(err);
      });
  }

  /* Méthode de chargement des 2 comptes */
  private loadCompteSysteme() {
    this.compteService.getCompteSysteme()
      .subscribe((data: Array<Compte>) => {
        console.log(data);
        this.compteSystemeList = data;
        this.updateEditCache();
        console.log(this.dataSet);
        this.dataSet = [...this.dataSet];
      }, err => {
        console.log('Echec de chargements des Comptes !!!');
      });
  }
  listOperationEn() {
    this.operationBanqueService.getAllOperationEn().subscribe(
      (data: Array<Operation>) => {
        this.opererationEnList = data;
        console.log(this.opererationEnList);
      });
  }
  // Debut méthode format monnetaire
  formatNumber(num: number): string {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }

  // Fin méthode format monnetaire

  deleteEn(data) {
  }
  modifieEn(data: Operation) {
    this.initialiseFormulaire(data);
    this.open();
  }
  enregistrerOperation(data) {
    //const formData = this.validateForm.value;
    console.log(data);
    if (data.type === 'RETR_EN') {
      this.uneOperation = new Operation(
        data.id,
        data.compte.numCompte,
        data.numCompteSysteme,
        data.montantOp,
        data.narrative,
        data.badge,
        data.type = 'RETR',
        data.createBy = this.user.username,
        null,
        data.autorisedBy
      );
    }
    if (data.type === 'DEPO_EN') {
      this.uneOperation = new Operation(
        data.id,
        data.compte.numCompte,
        data.numCompteSysteme,
        data.montantOp,
        data.narrative,
        data.badge,
        data.type = 'DEPO',
        data.createBy = this.user.username,
        null,
        data.autorisedBy
      );
    }

    console.log(this.uneOperation);
    if (data != null) {
      this.operationBanqueService.save(this.uneOperation).subscribe(
        (data: Operation) => {
          this.modalService.info({
            nzTitle: 'Information',
            nzContent: '<p> L\'opération de montant. <strong>' + data.montantOp +
              '</strong> a été enregistré avec succès.</p>',
            nzOkText: null,
            nzCancelText: 'Ok',
            nzOnCancel: () => this.validation(this.uneOperation)
          });
        },
        (error: HttpErrorResponse) => {
          this.createMessage('warning', 'Echec de l\'enregistrement de operation ! ');
        });
    } else {
      this.createMessage('warning', 'Solde insufisant ! <strong>' + data.montantOp + '</strong> supérieur à <strong>' + this.compteOperant.solde + '</strong>');
    }

  }
  validation(data) {
    this.operationBanqueService.validerOperation(data).subscribe(
      (res: Operation) => {
        console.log(res);
      }, (error: HttpErrorResponse) => {
        this.createMessage('warning', 'Echec de l\'enregistrement de operation ! ');
      });
    this.validateForm.reset();
  }


}
