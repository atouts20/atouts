import { AppUser } from './model.AppUser';

export class CleFacturer {
  bien_id: number;
  facture_id: string;

  constructor(bien_id: number, facture_id: string) {
    this.bien_id = bien_id;
    this.facture_id = facture_id;
  }
}
