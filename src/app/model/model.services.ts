import { Groupe } from './model.groupe';
export class Services {
  id: number;
  nom: string;
  description: string;
  prix: number;
  tBCCV: string;
  stock: number;
  stockAlert: number;
  cat: string;
  photo: string;
  proprietaire: Groupe;
  constructor(nom: string, description: string, prix: number, tBCCV: string, stock: number,
    stockAlert: number, cat: string, proprietaire: Groupe) {
    this.nom = nom;
    this.description = description;
    this.prix = prix;
    this.tBCCV = tBCCV;
    this.stock = stock;
    this.stockAlert = stockAlert;
    this.cat = cat;
    this.proprietaire = proprietaire;
  }
}
