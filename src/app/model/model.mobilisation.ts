import { AppUser } from './model.AppUser';

export class Mobilisation {
    id: number;

    identifiant: string;

    description: string;

    nom: string;

    prix: string;

    photo: string;

    tel: string;

    proprietaire: AppUser;


    constructor(
        id: number, identifiant: string, description: string, nom: string, prix: string,
        photo: string, tel: string, proprietaire: AppUser) {
        this.id = id;
        this.identifiant = identifiant;
        this.description = description;
        this.nom = nom;
        this.photo = photo;
        this.prix = prix;
        this.tel = tel;
        this.proprietaire = proprietaire;
    }
}