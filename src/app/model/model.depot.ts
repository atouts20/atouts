
export class Depot {
    numCompte: string;
    montantOp: string;
    type: string;
   

    constructor(numCompte: string, montantOp: string,
        type: string) {

        this.numCompte          = numCompte;
        this.montantOp          = montantOp;
        this.type               = type;
    
    }
}
