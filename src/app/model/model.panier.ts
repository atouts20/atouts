 import { ProduitItems } from './model.produitItems';
import { Client } from './model.client';
export class Panier {
     nom: string;
     items: Array<ProduitItems> = new Array();
     client: Client={nom:"", prenom: "",email:"",phoneNumber:"",addresse:"",username:"",livraison:"",detail:"",pin:0};

    constructor(nom: string){
        this.nom = nom;
    }
    
} 



/* import { ProduitItems } from './model.produitItems';
import { Client } from './model.client';
import { AppUser } from './model.AppUser';
export class Panier {
     nom: string;
     items: Array<ProduitItems> = new Array();
     appUser : AppUser;
    constructor(nom: string){
        this.nom = nom;
    }
    
}

 */

