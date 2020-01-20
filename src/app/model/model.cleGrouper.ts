import { Role } from './Role';

export class CleGrouper {
  appUser_id: number;
  groupe_id: string;

  constructor(appUser_id: number, groupe_id: string) {
    this.appUser_id = appUser_id;
    this.groupe_id = groupe_id;
  }

}
