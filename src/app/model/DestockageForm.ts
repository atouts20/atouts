import { ProduitItems } from './model.produitItems';
import { Client } from './model.client';
export class DestockageForm {
    id: number;
    quantite: number;
    constructor(id: number, quantite: number){
        this.id = id;
        this.quantite = quantite;
    }
    
}