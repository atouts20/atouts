import { Component, OnInit } from '@angular/core';
import { Compte } from 'src/app/model/model.compte';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { CompteService } from './../../../../service/compte.service';
import { TokenStorage } from './../../../../utils/token.storage';
import { AppUser } from './../../../../model/model.AppUser';
import { CompteFavori } from './../../../../model/model.compte-favori';
import { RecepteCompte } from 'src/app/model/model.recepte-compte';
import { HttpErrorResponse } from '@angular/common/http';
import { CompteFavoriService } from './../../../../service/compte-favori.service';

@Component({
  selector: 'app-mes-comptes-favoris',
  templateUrl: './mes-comptes-favoris.component.html',
  styleUrls: ['./mes-comptes-favoris.component.css']
})
export class MesComptesFavorisComponent implements OnInit {
  compteValeurList: Array<Compte> = [];
  user: AppUser;
  validateForm: FormGroup;
  selectedIndex = 0;
  visible = false;
  childrenVisible = false;
  compteRechercher: RecepteCompte = null;
  numCompte: string;
  mesComptesFavoriList: Array<CompteFavori> = [];

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private modalService: NzModalService,
    private compteService: CompteService,
    private tokenStorage: TokenStorage,
    private compteFavoriService: CompteFavoriService,
  ) {
    this.user = JSON.parse(this.tokenStorage.getCurrentUser());
    console.log(this.user);
  }

  ngOnInit() {
    // this.initialiseFormulaire(null);
    this.getLisCompteFavoris();
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  resetForm(){}
  enregistrerFavori() {
    const compteFavori = new CompteFavori(
      null,
      this.compteRechercher.numCompte,
      this.compteRechercher.appUserCompte.nom,
      this.compteRechercher.appUserCompte.prenom,
      this.compteRechercher.appUserCompte.residance,
      this.compteRechercher.appUserCompte.phoneNumber,
      this.compteRechercher.appUserCompte.email,
      this.user
    );
    console.log(compteFavori);
    this.compteFavoriService.save(compteFavori).subscribe(
      (data: CompteFavori) => {
        this.mesComptesFavoriList.unshift(data);
      }, (error: HttpErrorResponse) => {
        this.createMessage('warning', 'Echec de l\'enregistrement de operation ! ');
      });
  }

  rechercherCompte() {
    this.compteService.getComptesValeursPourFavori(this.numCompte).subscribe(
      (data: Compte) => {
        this.compteRechercher = data;
        console.log(this.compteRechercher);
      },
      (error: HttpErrorResponse) => {
        this.createMessage('warning', 'Echec de l\'enregistrement de operation ! ');
      });
  }
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
  delete(compteFavori) {
    this.compteFavoriService.delete(compteFavori).subscribe(data => {

      this.mesComptesFavoriList = this.mesComptesFavoriList.filter(d => d.id !== compteFavori.id);
    },
      (error: HttpErrorResponse) => {
        this.createMessage('warning', 'Echec de l\'enregistrement de operation ! ');
      });
  }

  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }

}
