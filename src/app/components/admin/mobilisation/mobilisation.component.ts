import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { NzModalService } from 'ng-zorro-antd';
import { Mobilisation } from '../../../model/model.mobilisation';
import { MobilisationService } from '../../../service/mobilisation.service';
import { AuthenticationService } from '../../../service/authentication.service';
import { TokenStorage } from '../../../utils/token.storage';
import { AppUser } from '../../../model/model.AppUser';
import { Reponse } from '../../../model/model.reponse';
import { Relance } from '../../../model/model.relance';
import { ReponseService } from '../../../service/reponse.service';
import { RelanceService } from '../../../service/relance.service';

@Component({
  selector: 'app-mobilisation',
  templateUrl: './mobilisation.component.html',
  styleUrls: ['./mobilisation.component.css']
})
export class MobilisationComponent implements OnInit {
  visible = false;
  isVisibleReponse = false;
  isVisibleRelance = false;
  isVisibleFormReponse = false;
  isVisibleFormRelance = false;
  selectedIndex = 0;
  searchValue;
  childrenVisible;
  btnFermerText: string = '';
  uneReponse: Reponse = null;
  uneRelance: Relance = null;
  demandeMobilisationList: Array<Mobilisation> = [];
  reponseList: Array<Reponse> = [];
  relanceList: Array<Relance> = [];

  validateFormMobilisation: FormGroup;
  validateFormReponse: FormGroup;
  validateFormRelance: FormGroup;;
  mobilisation: Mobilisation = null;
  maReponse: Reponse = null;
  maRelance: Relance = null;

  mobilisationList: Array<Mobilisation> = [];
  imageUrl: String = 'assets/asRach/images/iws_c.png';
  selectedFiles: FileList;
  fileToUpload: File = null;
  formData = new FormData();
  user: AppUser;
  mobilisationCourente: Mobilisation = null;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService,
    private modalService: NzModalService,
    private authService: AuthenticationService,
    private tokenStorage: TokenStorage,
    private mobilisationService: MobilisationService,
    private reponseService: ReponseService,
    private relanceService: RelanceService,
  ) {
  }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    console.log(JSON.parse(this.tokenStorage.getCurrentUser()));
    this.makeFormMobilisation(null);
    this.makeFormReponse();
    this.makeFormRelance();
    console.log(this.user.id);

    this.mobilisationService.getMobilisationUser(this.user.id).subscribe((data: Array<Mobilisation>) => {
      this.demandeMobilisationList = data;
      console.log(this.user.id);
      this.demandeMobilisationList = data;
    },
      (error: HttpErrorResponse) => {
        this.createMessage('danger', 'Echec de chargement !');
      });


  }
  log(index: number): void {
    console.log(index);
    console.log(this.selectedIndex);
    switch (this.selectedIndex) {
      case 0:

        {
          //this.loadEchanges();

          break;
        }
      case 1:

        {
          // this.loadEchangesAactiver();

          break;
        }
      case 2:

        {
          //this.loadEchangesAaccepter();

          break;
        }

      default:
        {
          //this.loadEchanges();

          break;
        }

    }
  }
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  makeFormMobilisation(mobilisation: Mobilisation): void {
    this.validateFormMobilisation = this.fb.group({
      description: [(mobilisation != null) ? mobilisation.description : null, [Validators.required]],
      nom: [(mobilisation != null) ? mobilisation.nom : null, [Validators.required]],
      prix: [(mobilisation != null) ? mobilisation.prix : null, [Validators.required, Validators.min(0)]],
      tel: [(mobilisation != null) ? mobilisation.tel : null, [Validators.required]],
      //photo: [(mobilisation != null) ? mobilisation.photo : null,],

      // proprietaire: [(mobilisation != null) ? mobilisation.libelle : null,],
    });
  }

  makeFormReponse(): void {
    this.validateFormReponse = this.fb.group({
      observation: [null, [Validators.required]],
      prix: [null, [Validators.required, Validators.min(0)]],
    });
  }
  makeFormRelance(): void {
    this.validateFormRelance = this.fb.group({
      observation: [null, [Validators.required]],
      prix: [null, [Validators.required, Validators.min(0)]],
    });
  }

  enregistrerMobilisation() {
    //const formData = new FormData();
    this.mobilisation = {
      id: null,
      identifiant: null,
      description: this.validateFormMobilisation.value.description,
      nom: this.validateFormMobilisation.value.nom,
      photo: null,
      prix: this.validateFormMobilisation.value.prix,
      tel: this.validateFormMobilisation.value.tel,
      proprietaire: this.user,
    };
    console.log(this.mobilisation);

    this.formData.append('bien', JSON.stringify(this.mobilisation));
    this.formData.append('file', this.fileToUpload);
    console.log(this.formData);
    this.mobilisationService.save(this.formData).subscribe((data: Mobilisation) => {
      console.log(data);
      this.mobilisationList.unshift(data);
      this.mobilisationList.push(data);
      this.createMessage('success', '<p> la demande de mobilisation enregistré avec succès.</p>');
      this.validateFormMobilisation.reset();
    },
      (error: HttpErrorResponse) => {
        this.createMessage('danger', 'Echec de l\'enregistrement de la mobilisation !');
      });
  }

  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }
  startAccepter(id: number) {

  }
  avance(key: string) {
    this.open();
  }
  inspecterMobilisation(mobilisation: Mobilisation) {
    this.makeFormMobilisation(mobilisation);
    this.open();
  }
  deleteMobilisation(mobilisation: Mobilisation) {
    this.mobilisationService.deleteByUser(mobilisation).subscribe((data: Mobilisation) => {
      console.log(data);
      this.createMessage('success', 'Mobilisation supprimer avec succès !');

      // let position = this.demandeMobilisationList.findIndex(item => item.id === mobilisation.id);
      this.demandeMobilisationList = this.demandeMobilisationList.filter(d => d.id !== mobilisation.id);
    },
      (error: HttpErrorResponse) => {
        this.createMessage('danger', 'Echec de suppression !');
      });
  }
  deleteReponse(reponse: Reponse) {
    this.reponseService.deleteByUser(reponse).subscribe((data: Reponse) => {
      this.reponseList = this.reponseList.filter(d => d.id !== reponse.id);
      this.createMessage('success', 'Reponse supprimer avec succès !');
      //this.ngOnInit();
    },
      (error: HttpErrorResponse) => {
        this.createMessage('danger', 'Echec de suppression !');
      });
  }

  deleteRelance(relance: Relance) {
    this.relanceService.deleteByUser(relance).subscribe((data: Reponse) => {
      this.relanceList = this.relanceList.filter(d => d.id !== relance.id);
      this.createMessage('success', 'Relance supprimer avec succès !');
    },
      (error: HttpErrorResponse) => {
        this.createMessage('danger', 'Echec de suppression !');
      });
  }
  search() { }
  relance(id: number) {
    console.log(id);
    this.relanceService.getById(id).subscribe((data: Array<Relance>) => {
      console.log(data);
      this.relanceList = data;
      console.log(this.relanceList);
      this.selectedIndex == 2;
    },
      (error: HttpErrorResponse) => {
        this.createMessage('danger', 'Echec de changement de la reponse !');
      });
  }
  reponse(id: number) {
    console.log(id);
    this.reponseService.getById(id).subscribe((data: Array<Reponse>) => {
      console.log(data);
      this.reponseList = data;
      console.log(this.reponseList);
      this.selectedIndex == 1;
    },
      (error: HttpErrorResponse) => {
        this.createMessage('danger', 'Echec de changement de la reponse !');
      });
  }

  inspecterReponse(reponse: Reponse) {
    this.isVisibleReponse = true;
    this.uneReponse = reponse;
    this.btnFermerText = 'FERMER'
  }
  inspecterRelance(relance: Relance) {
    this.isVisibleRelance = true;
    this.uneRelance = relance;
    this.btnFermerText = 'FERMER'
  }

  delete() {

  }
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateFormMobilisation.reset();
    for (const key in this.validateFormMobilisation.controls) {
      this.validateFormMobilisation.controls[key].markAsPristine();
      this.validateFormMobilisation.controls[key].updateValueAndValidity();
    }
  }

  onSelectFile(event) {
    this.selectedFiles = event.target.files;
    console.log(event.target.files);
    this.fileToUpload = <File>event.target.files[0];
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  // Debut méthode format monnetaire
  formatNumber(num: number): string {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }
  // Fin méthode format monnetaire

  handleCancel() {
    this.isVisibleReponse = false;
  }

  handleCancelReponse() {
    this.validateFormReponse.reset();
    this.isVisibleFormReponse = false;
  }
  handleCancelRelance() {
    this.validateFormRelance.reset();
    this.isVisibleFormRelance = false;
  }
  repondre(mobilisation: Mobilisation) {
    this.isVisibleFormReponse = true;
    this.mobilisationCourente = mobilisation;

  }
  relancer(mobilisation: Mobilisation) {
    this.isVisibleFormRelance = true;
    this.mobilisationCourente = mobilisation;
  }
  enregistrerReponse() {
    this.maReponse = {
      id: null,
      prix: this.validateFormReponse.value.prix,
      observation: this.validateFormReponse.value.observation,
      mobilisationReponse: this.mobilisationCourente,
    };
    console.log(this.maReponse);
    this.reponseService.save(this.maReponse).subscribe((data: Reponse) => {
      this.modalService.info({
        nzTitle: 'Information',
        nzContent: '<p> Vous avez répondu avec succès.</p>',
        nzOkText: null,
        nzCancelText: 'Ok',
        nzOnCancel: () => this.handleCancelReponse()
      });
      this.reponseList.unshift(data);
    },
      (error: HttpErrorResponse) => {
        this.createMessage('danger', 'Echec de reponse !');
      });
  }

  enregistrerRelance() {
    this.maRelance = {
      id: null,
      prix: this.validateFormRelance.value.prix,
      observation: this.validateFormRelance.value.observation,
      mobilisationRelance: this.mobilisationCourente,
    };
    this.relanceService.save(this.maRelance).subscribe((data: Relance) => {
      this.modalService.info({
        nzTitle: 'Information',
        nzContent: '<p> Vous avez relancé avec succès.</p>',
        nzOkText: null,
        nzCancelText: 'Ok',
        nzOnCancel: () => this.handleCancelRelance()
      });
      this.relanceList.unshift(data);
      this.isVisibleFormReponse = false;
    },
      (error: HttpErrorResponse) => {
        this.createMessage('danger', 'Echec de reponse !');
      });
  }

}
