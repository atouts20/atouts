import { Compte } from './model.compte';

export class Bon {
    id: number;
    numeroBon: string;
    description: string;
    secret: number;
    montant: number;
    compteValeurs: Compte;
    encaisseBy: string;
    liquideBy: string;
    createBy: string;
    deleteBy: string;

    constructor(id: number, numeroBon: string, description: string, secret: number, montant: number, compteValeurs: Compte,
        encaisseBy: string, liquideBy: string, createBy: string,
        deleteBy: string) {
        this.id = id;
        this.numeroBon = numeroBon;
        this.description = description;
        this.secret = secret;
        this.montant = montant;
        this.compteValeurs = compteValeurs;
        this.encaisseBy = encaisseBy;
        this.liquideBy = liquideBy;
        this.createBy = createBy;
        this.deleteBy = deleteBy;

    }
}
