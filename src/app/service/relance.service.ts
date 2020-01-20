import { Injectable } from '@angular/core';
import { Relance } from '../model/model.relance';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RelanceService {

    url: string = environment.backend + '/relance';

    constructor(
        public httpClient: HttpClient,
    ) { }
    // Enregistrement des Relance
    save(relance: Relance): Observable<object> {
        return this.httpClient.post(`${this.url}/save`, relance);
    }

    // Suppression  d'une Relance
    delete(relance: Relance): Observable<object> {
        return this.httpClient.post(`${this.url}/delete`, relance);
    }

    // Suppression  d'une Relance
    deleteByUser(relance: Relance): Observable<object> {
        return this.httpClient.post(`${this.url}/delete-by-user`, relance);
    }

    // liste  des Relance
    list(): Observable<object> {
        return this.httpClient.get(`${this.url}/list`);
    }

    // liste  des Relance
    getById(id: number): Observable<object> {
        return this.httpClient.get(`${this.url}/list-by-mobilisation/` + id);
    }
}
