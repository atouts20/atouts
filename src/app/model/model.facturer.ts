import { AppUser } from './model.AppUser';
import { CleFacturer } from './model.cleFacturer';
import { Bien } from './model.bien';
import { Facture } from './model.facture';

export class Facturer {
  pkFacturer: CleFacturer;
  quantite: number;
  facture: Facture;
  bien: Bien;

  constructor(pkFacturer: CleFacturer, quantite: number, facture: Facture, bien: Bien) {
    this.pkFacturer = pkFacturer;
    this.quantite = quantite;
    this.facture = facture;
    this.bien = bien;
  }
}
