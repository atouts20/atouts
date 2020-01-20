import { AppUser } from "./model.AppUser";
import { Groupe } from './model.groupe';

export class Produit {
    id: number;
    nom: string;
    description: string;
    prix: number;
    tBCCV: string;
    stock: number;
    stockAlert: number;
    quantite: number;
    cat: string;
    photo: string;
    proprietaire: Groupe;
    constructor(nom: string, description: string, prix: number, tBCCV: string, stock: number,
      stockAlert: number, quantite: number, cat: string, proprietaire: Groupe) {
      this.nom = nom;
      this.description = description;
      this.prix = prix;
      this.tBCCV = tBCCV;
      this.stock = stock;
      this.stockAlert = stockAlert;
      this.quantite = quantite;
      this.cat = cat;
      this.proprietaire = proprietaire;
    }
}
