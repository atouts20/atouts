import { AppUser } from './model.AppUser';
import { Groupe } from './model.groupe';

export class Bien {
  // id: number;
  nom: string;
  description: string;
  photo: string;
  prix: string;
  tBCCV: string;
  stock: string;
  stockAlert: string;
  type: string;
  proprietaire: Groupe;
  //proprietaire: Array<AppUser>; 
  /*  groupe: Groupe;
   user: AppUser; */


  constructor(
    nom: string, description: string,
    photo: string, prix: string, tBCCV: string, stock: string,
    stockAlert: string, type: string, proprietaire: Groupe) {

    this.nom = nom;
    this.description = description;
    this.prix = prix;
    this.tBCCV = tBCCV;
    this.stock = stock;
    this.stockAlert = stockAlert;
    this.type = type;
    this.proprietaire = proprietaire;
  }

}
