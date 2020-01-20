import { Compte } from './model.compte';

export class Operation {
    id: number;
    numCompte: string;
    numCompte2: string;
    montantOp: number;
    narrative: string;
    badge: string;
    type: string;
    createBy: string;
    deleteBy: string;
    autorisedBy: string;

    constructor(

        id: number,
        numCompte: string,
        numCompte2: string,
        montantOp: number,
        narrative: string,
        badge: string,
        type: string,
        createBy: string,
        deleteBy: string,
        autorisedBy: string,
    ) {

        this.id = id;
        this.numCompte = numCompte;
        this.numCompte2 = numCompte2;
        this.montantOp = montantOp;
        this.narrative = narrative;
        this.badge = badge;
        this.type = type;
        this.createBy = createBy;
        this.deleteBy = deleteBy;
        this.autorisedBy = autorisedBy;

    }
}
