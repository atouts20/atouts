import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { TokenStorage } from '../../../../utils/token.storage';
import { AppUser } from '../../../../model/model.AppUser';
import { SousCompteService } from '../../../../service/sous-compte.service';
import { SousCompte } from '../../../../model/model.sousCompte';
import { AuthenticationService } from '../../../../service/authentication.service';


@Component({
  selector: 'app-sous-comptes',
  templateUrl: './sous-comptes.component.html',
  styleUrls: ['./sous-comptes.component.css']
})
export class SousComptesComponent implements OnInit {
  visible = false;
  validateFormSousCompte: FormGroup;
  user: AppUser = null;
  selectedUser: string;
  isLoading = true;
  isLoadingType = true;
  sousCompteList: Array<SousCompte> = [];
  optionList: Array<AppUser> = [];
  sousCompte: SousCompte = null;
  childrenVisible = false;
  typeList = [
    'AUTRE_COMPTE_D_IMPEYER',
    'AUTRE_COMPTE_ET',
    'AUTRE_TRESOR',
    'AVANCE_SUR_ED',
    'COMPTE_DE_PROVISIONS',
    'COMPTE_D_IMPEYER_AVANCE_ED',
    'COMPTE_D_IMPEYER_ET',
    'COMPTE_ECHANGE_A_TERME',
    'COMPTE_TRESOR'
  ];
  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private modalService: NzModalService,
    private httpClient: HttpClient,
    private tokenStorage: TokenStorage,
    private sousCompteService: SousCompteService,
    private authenService: AuthenticationService,
  ) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
  }

  ngOnInit() {
    this.getListUtilisateur();
    this.makeFormSousCompte();
    this.getList();
  }
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  makeFormSousCompte() {
    this.validateFormSousCompte = this.fb.group({
      numCompte: ['', [Validators.required]],
      solde: [null, [Validators.required, Validators.min(0)]],
      type: ['', [Validators.required]],
      narrative: ['', [Validators.required]],
      appUserSousCompte: [null, [Validators.required]]
    });
  }

  getList(): void {
    this.sousCompteService.list().subscribe(
      (data: Array<SousCompte>) => {
        this.sousCompteList = data;
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
      }
    );
  }
  deleteElement(data) {
    this.sousCompte.deleteBy = this.user.username;
    this.sousCompteService.delete(this.sousCompte).subscribe(
      (data: SousCompte) => {
        this.createMessage('info', 'Suppression effectuée avec succès !');
      },
      (error: HttpErrorResponse) => {
        console.log('Echec !');
        this.createMessage('danger', 'Echec de la suppression !');
      }
    );
  }
  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }

  getListUtilisateur(): void {
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

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateFormSousCompte.reset();
    for (const key in this.validateFormSousCompte.controls) {
      this.validateFormSousCompte.controls[key].markAsPristine();
      this.validateFormSousCompte.controls[key].updateValueAndValidity();
    }
  }
  /* enregistrement d'un sous compte*/
  enregistreSousCompte() {
    if (this.validateFormSousCompte.valid) {
      const formData = this.validateFormSousCompte.value;

      const sousCompte = new SousCompte(
        formData.numCompte,
        formData.solde,
        formData.type,
        formData.narrative,
        formData.appUserCompte,
        this.user.username,
        null
      );
      console.log(sousCompte);
      this.sousCompteService.save(sousCompte).subscribe(
        (data: SousCompte) => {
          this.sousCompteList.unshift(data);
          this.modalService.info({
            nzTitle: 'Information',
            nzContent: '<p> Le sous compte de Numero. <strong>' + data.numCompte +
              '</strong> a été enregistré avec succès.</p>',
            nzOkText: null,
            nzCancelText: 'Ok',
            nzOnCancel: () => console.log('test') //this.validateFormSousCompte.reset()
          });
        },
        (error: HttpErrorResponse) => {
          //   this.router.navigate(['dashboard']);
          this.createMessage('danger', 'Echec de l\'enregistrement de sous compte !');
        });
    } else {

    }
  }
  /* fin enregistrement d'un sous compte*/
  loadMore() {

  }
  repondre(id) { }
  reponse(id) { }
  inspecterMobilisation(data) { }

}
