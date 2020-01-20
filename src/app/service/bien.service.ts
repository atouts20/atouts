import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';



@Injectable({
    providedIn: 'root'
})
export class BienService {
    host: string = environment.backend;
    private newBien = new Subject<string>();
    newUserStream = this.newBien.asObservable();

    constructor(public http: HttpClient, public httpC: HttpClient, private authService: AuthenticationService) { }

    newUserCom() {
        this.newBien.next('ok');
    }


    getBienT(): Observable<object> {
        return this.httpC.get(this.host + '/biens');
    }

    getListProduit(): Observable<object> {
        return this.httpC.get(this.host + '/listProduits');
    }

    getListService(): Observable<object> {
        return this.httpC.get(this.host + '/listServices');
    }


    getBienDesactives(): Observable<object> {
        return this.httpC.get(this.host + '/biensDesactives');
    }


    getBiens(mc: string, pg: number, sz: number) {
        return this.httpC.get(this.host + '/chercherBiens?mc=' + mc + '&page=' + pg + '&size=' + sz)

    }

    getListProInter(id): Observable<object> {
        return this.httpC.get(this.host + '/list-produits-internaute/' + id);
    }

    getListServInter(id): Observable<object> {
        return this.httpC.get(this.host + '/list-service-internaute/' + id);
    }



    getProduits(pg: number) {
        return this.httpC.get(this.host + '/chercherProduit?page=' + pg + '&size=' + 5);
    }


    getServices(pg: number) {
        return this.httpC.get(this.host + '/chercherService?page=' + pg + '&size=' + 5);
    }


    getBiensG(mc: string, pg: number, sz: number) {
        return this.httpC.get(this.host + '/chercherBiensG?mc=' + mc + '&page=' + pg + '&size=' + sz);

    }
    /* ,{headers:new HttpHeaders({'Authorization':this.authService.loadToken()})} */

    getBienP() {
        return this.httpC.get(this.host + '/chercherProduits?page=0&size=8');

    }

    getBienS() {
        return this.httpC.get(this.host + '/chercherServices?page=0&size=6');

    }

    getBien(id: number) {
        return this.httpC.get(this.host + '/biens/' + id);
    }

    postBiens(formData: FormData): Observable<any> {
        return this.httpC.post(this.host + '/postbiens', formData);
    }




    //sans modif tof
    putBien(id: any, bien: any) {
        return this.httpC.put(this.host + '/bienE/' + id, bien);
    }


    putProduit(id: any, produit: any) {
        return this.httpC.put(this.host + '/produitE/' + id, produit);
    }
    putService(id: any, service: any) {
        return this.httpC.put(this.host + '/serviceE/' + id, service);
    }



    //avec modif tof
    putBienF(id: number, formData: any) {
        return this.httpC.put(this.host + '/bienImg/' + id, formData);
    }




    deleteBien(id: any) {
        return this.httpC.delete(this.host + '/biens/' + id);
    }


}
