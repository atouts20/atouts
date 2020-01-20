import { Compte } from './model.compte';

export class Bon {
    id: string;
    description: string;
    montant: number;
    compteValeurs: Compte;
    encaisseBy: string;
    liquideBy: string;
    createBy: string;
    deleteBy: string;

    constructor(id: string, description: string, montant: number, compteValeurs: Compte,
        encaisseBy: string, liquideBy: string, createBy: string,
        deleteBy: string) {

        this.id = id;
        this.description = description;
        this.montant = montant;
        this.compteValeurs = compteValeurs;
        this.encaisseBy = encaisseBy;
        this.liquideBy = liquideBy;
        this.createBy = createBy;
        this.deleteBy = deleteBy;

    }
}
