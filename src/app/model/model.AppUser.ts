import { Role } from './Role';

export class AppUser {
  id: number;
  username: string;
  password: string;
  nom: string;
  prenom: string;
  dateNaissance: string;
  lieu: string;
  sexe: string;
  departement: string;
  phoneNumber: string;
  phoneNumber1: string;
  phoneNumber2: string;
  residance: string;
  categorie: string;
  nationalite: string;
  naturePiece: string;
  nci: string;
  // dateEmission                 :  string;
  dateExpiration: string;
  metier: string;
  metiers: Array<any>;
  nomPere: string;
  nomMere: string;
  contactPere: string;
  contactMere: string;
  matrimoniale: string;
  nomEtPrenomConjoint: string;
  nbrEnfant: Number;
  personneContacter: string;
  contactPersonneContacter: string;
  relationPersonne: string;
  email: string;
  //profession: string;
  roles: Array<Role>;
  repassword: string;


  /* 
    constructor(
      username                     :  string, password                 :  string,       nom                  :  string,     id                      : number,
      prenom                       :  string, dateNaissance            :  string,       lieu                 :  string,     sexe                    :  string,
      departement                  :  string, phoneNumber              :  string,       phoneNumber1         :  string,     phoneNumber2            :  string,
      residance                    :  string, categorie                :  string,       nationalite          :  string,     naturePiece             :  string, 
      nci                          :  string, dateEmission             :  string,       dateExpiration       :  string,
      nomPere                      :  string, nomMere                  :  string,       contactPere          :  string,     contactMere             :  string,
      matrimoniale                 :  string, nomEtPrenomConjoint      :  string,       nbrEnfant            :  Number,     personneContacter       :  string,
      contactPersonneContacter     :  string, relationPersonne         :  string,       email                :  string,
      profession                   :  string, roles                :  Array<Role>,      repassword           :  string, ) {
  
      this.id                    = id;
      this.username              = username;
      this.password              = password;
      this.nom                   = nom;
      this.prenom                = prenom;
      this.dateNaissance         = dateNaissance;
      this.departement           = departement;
      this.lieu                  = lieu;
      this.email                 = email;
      this.residance             = residance;
      this.categorie             = categorie;
      this.nationalite           = nationalite;
      this.naturePiece           = naturePiece;
      this.nci                   = nci;
      this.dateEmission          = dateEmission;
      this.dateExpiration        = dateExpiration;
      this.nomPere               = nomPere;
      this.nomMere               = nomMere;
      this.contactPere           = contactPere;
      this.contactMere           = contactMere;
      this.matrimoniale          = matrimoniale;
      this.nomEtPrenomConjoint   = nomEtPrenomConjoint;
      this.nbrEnfant             = nbrEnfant;
      this.personneContacter     = personneContacter;
      this.contactPersonneContacter = contactPersonneContacter;
      this.relationPersonne      = relationPersonne;
      this.profession            = profession;
      this.phoneNumber           = phoneNumber;
      this.phoneNumber1          = phoneNumber1;
      this.phoneNumber2          = phoneNumber2;
      this.sexe                  = sexe;
      this.roles                 = roles;
      this.repassword            = repassword;
     
    }
   */

}
