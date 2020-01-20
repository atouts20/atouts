export class Client {
    nom: string;
    prenom: string;
    email: string;
    phoneNumber: string;
    addresse: string;
    username: string;
    livraison: string;
    detail: string;
    pin: number;

    constructor(nom: string, prenom: string, email: string, phoneNumber: string, addresse: string, username: string, livraison: string, pin: number) {
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.addresse = addresse;
        this.username = username;
        this.livraison = livraison;
        this.pin = pin;
    }
}