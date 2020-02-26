import { Compte } from './model.compte';

export class Bloquer {
    id: number;
    dateBloquage: Date;
    motif: string;

    constructor(id: number, dateBloquage: Date, motif: string) {
        this.id = id;
        this.dateBloquage = dateBloquage;
        this.motif = motif;
    }
}
