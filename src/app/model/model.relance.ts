import { Mobilisation } from './model.mobilisation';
export class Relance {
    id: number;

    prix: number;

    observation: string;

    mobilisationRelance: Mobilisation;

    constructor(id: number, prix: number, observation: string,  mobilisationRelance: Mobilisation) {
        this.id = id;
        this.prix = prix;
        this.observation = observation;
        this.mobilisationRelance = mobilisationRelance;
    }
}