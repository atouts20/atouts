import { AppUser } from './model.AppUser';
export class CompteFavori {
    public id: number;
    public numCompte: string;
    public nom: string;
    public prenom: string;
    public adresse: string;
    public tel: string;
    public email: string;
    public appUserCompte: AppUser;
    createBy: string;
    deleteBy: string;

    constructor(
        id: number, numCompte: string, nom: string,
        prenom: string, adresse: string, tel: string,
        email: string, appUserCompte: AppUser) {

        this.id = id;
        this.numCompte = numCompte;
        this.nom = nom;
        this.prenom = prenom;
        this.adresse = adresse;
        this.tel = tel;
        this.email = email;
        this.appUserCompte = appUserCompte;
    }
}