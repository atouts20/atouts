export class Publication {
    id: String;
    
    categorie: String;

    description: String;

    nom: String;

    prix: String;

    photo: String;

    tel: String;


    constructor(id: String, categorie: String, description: String, nom: String, prix: String, photo: String, tel: String ) {
        this.id = id;
        this.categorie = categorie;
        this.description = description;
        this.nom = nom;
        this.photo = photo;
        this.prix = prix;
        this.tel = tel;
    }
}