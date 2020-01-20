import { AppUser } from './model.AppUser';

export class Facture {
  id: number;
  nom: string;
  description: string;
  prix: string;
  tBCCV: string;
  stock: string;
  stockAlert: string;
  cat: string;
  proprietaire: Array<AppUser>;
  constructor(nom: string, description: string, prix: string, tBCCV: string, stock: string,
    stockAlert: string, cat: string, proprietaire: Array<AppUser>) {
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
