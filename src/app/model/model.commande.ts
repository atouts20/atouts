import { ProduitItems } from './model.produitItems';
import { Client } from './model.client';
import { Commander } from './model.commander';

export class Commande {

  public id: number;
  public client: Client = { nom: "", prenom: "", email: "", phoneNumber: "", addresse: "", username: "", livraison: "",detail:"", pin: 0 };
  public produits: Array<ProduitItems> = [];
  public commanders: Array<Commander> = [];
  public totalAmount: number;
  public livraison: string;
  public date: Date;
  public pin: Boolean;
  public compteClientOk: Boolean;
  public soldeOk: Boolean;
  public stockOk: Boolean;
  public verifieCompteClientOK: Boolean;

}