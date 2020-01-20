import { ProduitItems } from './model.produitItems';
import { Client } from './model.client';
import { Commande } from './model.commande';
export class Payment {
  public id: number;
  public datePayment: Date;
  public montant: number;
  public contrepartieFcfa: number;
  public badgeLivreur: String;
  public codePayment: String;
  public observation: String;
  public supr: Boolean;
  public commande: Commande;


}