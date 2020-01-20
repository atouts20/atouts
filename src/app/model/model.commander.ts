import { Produit } from './model.produit';
import { Commande } from './model.commande';
export class Commander {
  public id: number;
  public produit: Produit;
  public quantite: number;
  public prix: number;
  public commande: Commande;
}