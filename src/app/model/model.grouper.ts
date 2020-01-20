import { Role } from './Role';
import { Groupe } from './model.groupe';
import { AppUser } from './model.AppUser';
import { CleGrouper } from './model.cleGrouper';

export class Grouper {
  pkGrouper: CleGrouper;
  partmn: string;
  partvl: string;
  groupe: Groupe;
  appUser: AppUser;

  constructor(pkGrouper: CleGrouper, partmn: string, partvl: string, groupe: Groupe, appUser: AppUser) {
    this.pkGrouper = pkGrouper;
    this.partmn = partmn;
    this.partvl = partvl;
    this.groupe = groupe;
    this.appUser = appUser;
  }
}
