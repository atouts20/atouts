import { AppUser } from './model.AppUser';

export class Echange {
  id: number;
  nom: string;
  tel: string;
  description: string;
  photo: string;
  proprietaires: AppUser;
  constructor(nom: string, description: string, tel: string, proprietaires: AppUser) {
    this.nom = nom;
    this.tel = tel;
    this.description = description;
    this.proprietaires = proprietaires;
  }
}
