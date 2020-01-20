import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Operation } from './../../../../../model/model.operation';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Compte } from 'src/app/model/model.compte';
import { TokenStorage } from './../../../../../utils/token.storage';
import { OperationBanqueService } from './../../../../../service/operationBanque.service';
import { CompteFavori } from './../../../../../model/model.compte-favori';
import { NzMessageService } from 'ng-zorro-antd';
import { NzModalService } from 'ng-zorro-antd';
import { CompteFavoriService } from 'src/app/service/compte-favori.service';
import { CompteService } from './../../../../../service/compte.service';
import { AppUser } from './../../../../../model/model.AppUser';

@Component({
  selector: 'app-tresor-ou-ed',
  templateUrl: './tresor-ou-ed.component.html',
  styleUrls: ['./tresor-ou-ed.component.css']
})
export class TresorOuEdComponent implements OnInit {

  filter: any;
  validateForm: FormGroup;
  selectedIndex = 0;
  visible = false;
  isLoading = false;
  optionList: Array<Compte> = [];
  childrenVisible = false;

  compteOperant: Compte;
  compteList: Array<Compte> = [];
  compteValeurList: Array<Compte> = [];
  dataSetV;
  dataSetM;
  edit: boolean = false;
  virement: string = 'VIRE';
  i = 1;
  editCache = {};
  dataSet = [];
  mesCompte: Compte;
  user: AppUser = null;
  uneOperation: Operation = null;
  mesComptesFavoriList: Array<CompteFavori> = [];
  dateBetwen: Array<Date> = [];
  dateLessGreaterThan: Date = new Date();
  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private modalService: NzModalService,
    private compteService: CompteService,
    private operationBanqueService: OperationBanqueService,
    private tokenStorage: TokenStorage,
    private compteFavoriService: CompteFavoriService,
  ) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.initialiseFormulaire(null);
    //this.loadOperation();
    this.getLisCompteFavoris();
    this.getMonCompte();

    console.log(this.dataSet);
    // console.log( this.getRandomLong());

  }
  getMonCompte(): void {
    this.compteService.getMonComptevaleur(this.user.id).subscribe(
      (data: Compte) => {
        this.mesCompte = data;
        console.log(this.mesCompte);
        console.log('****** this.mesCompte ******');
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  delete(id){}

  submitForm(){}

  resetForm(){}

  getLisCompteFavoris(): void {
    this.compteFavoriService.list(this.user.id).subscribe(
      (data: Array<CompteFavori>) => {
        this.mesComptesFavoriList = data;
        console.log(this.mesComptesFavoriList);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      });
  }

  initialiseFormulaire(operation: Operation): void {
    this.validateForm = this.fb.group({
      id: [(operation != null) ? operation.id : null, [Validators.required]],
      numCompte: [(operation != null) ? operation.numCompte : null, [Validators.required]],
      numCompte2: [(operation != null) ? operation.numCompte2 : null, [Validators.required]],
      montantOp: [(operation != null) ? operation.montantOp : null, [Validators.required, Validators.min(0)]],
      narrative: [(operation != null) ? operation.narrative : null, [Validators.required]],
      type: [this.virement],

    });
  }

  /* enregistrement d'une operation */
  virer(): void {
    const formData = this.validateForm.value;
    const operation = new Operation(
      null,
      this.mesCompte.numCompte,
      formData.numCompte2,
      formData.montantOp,
      formData.narrative,
      null,
      this.virement,
      this.user.username,
      null,
      null
    );
    console.log(formData);
    console.log('formData');
    if (formData.type != null && formData.type === 'VIRE') {
      this.operationBanqueService.save(operation).subscribe(
        (data: Operation) => {
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


  /*  loadOperation() {
     this.operationBanqueService.getMesOperations(this.user.username)
       .subscribe((data: Array<Operation>) => {
         console.log(data);
         console.log('tset test test');
         this.dataSet = data;
       }, (err: HttpErrorResponse) => {
         console.log(err);
       });
   } */

  betwen() {
    this.operationBanqueService.getMesOperationByDateBetween(this.dateBetwen)
      .subscribe((data: Array<Operation>) => {
        this.dataSet = data;
        console.log(this.dataSet);
      }, (err: HttpErrorResponse) => {
        console.log(err);
      });
  }

  ///////////////////////
  lessOp() {
    this.operationBanqueService.getMesOperationByDateLessThan(this.dateLessGreaterThan)
      .subscribe((data: Array<Operation>) => {
        this.dataSet = data;
        console.log(this.dataSet);
      }, (err: HttpErrorResponse) => {
        console.log(err);
      });
  }

  /////////////////////
  greaterOp() {
    this.operationBanqueService.getMesOperationByDateGreaterThan(this.dateLessGreaterThan)
      .subscribe((data: Array<Operation>) => {
        this.dataSet = data;
        console.log(this.dataSet);
      }, (err: HttpErrorResponse) => {
        console.log(err);
      });
  }

  // Debut méthode format monnetaire
  formatNumber(num: number): string {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }
}
