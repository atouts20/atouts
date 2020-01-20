import { AppUser } from './model.AppUser';
export class SousCompte {
    numCompte: string;
    solde: number;
    type: string; 
    narrative: string;   
    appUserSousCompte: AppUser;
    createBy: string;
    deleteBy: string;



    constructor(
        numCompte: string, 
        solde: number, 
        type: string,
        narrative: string, 
        appUserSousCompte: AppUser,
        createBy: string,
        deleteBy: string,
        ) {
        this.numCompte = numCompte;
        this.solde = solde;
        this.type = type;
        this.narrative = narrative;
        this.appUserSousCompte = appUserSousCompte;
        this.createBy = createBy;
        this.deleteBy = deleteBy;
    }

}
