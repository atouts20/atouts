import { ProduitItems } from './model.produitItems';
import { Client } from './model.client';
import { Commander } from './model.commander';
import { Services } from './model.services';
export class CommandeService {
  public id: number;
  public client: Client = { nom: "", prenom: "", email: "", phoneNumber: "", addresse: "", username: "", livraison: "",detail:"", pin: 0 };
  public service: Services;
  public livraison: string;
  public detail: string;
  public date: Date;
  public pin: Boolean;
  public compteClientOk: Boolean;
  public soldeOk: Boolean;
  public verifieCompteClientOK: Boolean;
}