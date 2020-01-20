import { Mobilisation } from './model.mobilisation';
export class Reponse {
    id: number;

    prix: number;

    observation: string;

    mobilisationReponse: Mobilisation;

    constructor(id: number, prix: number, observation: string, mobilisationReponse: Mobilisation) {
        this.id = id;
        this.prix = prix;
        this.observation = observation;
        this.mobilisationReponse = mobilisationReponse;
    }
}