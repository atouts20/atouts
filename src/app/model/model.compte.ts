import { AppUser } from './model.AppUser';
export abstract class Compte {
    numCompte: string;
    solde: string;
    provision: string;
    appUserCompte: AppUser;



    constructor(numCompte: string, solde: string, provision: string, appUserCompte: AppUser) {

        this.appUserCompte = appUserCompte;
        this.numCompte = numCompte;
        this.solde = solde;
        this.provision = provision;

    }

}
