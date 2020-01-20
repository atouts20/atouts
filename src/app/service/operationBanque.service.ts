
import { Retrait } from '../model/model.retrait';
import { Depot } from '../model/model.depot';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Operation } from '../model/model.operation';

@Injectable({
  providedIn: 'root'
})
export class OperationBanqueService {
  host: string = environment.backend + '/operation';
  private newCompteMonnaie = new Subject<string>();
  newCompteMonnaieStream = this.newCompteMonnaie.asObservable();


  constructor(public httpClient: HttpClient) { }
  newCompteMonnaieCom() {
    this.newCompteMonnaie.next('ok');
  }
  // toutes les Operation 
  getAllOperation(): Observable<object> {
    return this.httpClient.get(this.host + '/list',
    );
  }

  getDepotTrByCommandeId(id: any) {
    return this.httpClient.get(this.host + '/list-depotTr-by-commande/' + id,
    );
  }


  getRetraitTrByCommandeId(id: any) {
    return this.httpClient.get(this.host + '/list-retraitTr-by-commande/' + id,
    );
  }

  getRetraitTrByCommandeServiceId(id: any) {
    return this.httpClient.get(this.host + '/list-retraitTr-by-commande-service/' + id,
    );
  }
  //


  // les opération de depot retrait et virement sur le compte Valeur
  postOperationCompteValeur(foutou: any): Observable<Object> {
    console.log(foutou);
    return this.httpClient.post(this.host + '/saveOperationValeur', foutou,
    );
  }

  save(operation: Operation): Observable<object> {
    console.log(operation);
    return this.httpClient.post(this.host + '/save-operation', operation);
  }

  saveEn(operation: Operation): Observable<object> {
    console.log(operation);
    return this.httpClient.post(this.host + '/save-operation-autorisation', operation);
  }
  accepterOperation(operation: Operation): Observable<object> {
    return this.httpClient.post(this.host + '/accepter-operation', operation);
  }
  rejeterOperation(operation: Operation): Observable<object> {
    return this.httpClient.post(this.host + '/rejeter-operation', operation);
  }
  validerOperation(operation: Operation): Observable<object> {
    return this.httpClient.post(this.host + '/valide-operation', operation);
  }

  // toutes les Operation 
  getAllOperationEn(): Observable<object> {
    return this.httpClient.get(this.host + '/list-en');
  }
  // get mes opération
  getMesOperations(username: string): Observable<object> {
    return this.httpClient.get(this.host + '/mes-operation/' + username);
  }

  putCompteValeur(id: any, compteMonnaie: any) {
    return this.httpClient.put(this.host + '/compteMonnaie/' + id, compteMonnaie,
    );
  }

  deleteCompteValeur(id: any) {
    return this.httpClient.delete(this.host + '/compteMonnaie/' + id,
    );
  }

  //@@@@@@ Recupération des opérations par Date @@@@//

  getMesOperationByDateBetween(dateOp: Date[]): Observable<object> {
    return this.httpClient.get(this.host + '/mes-operation-by-date-between/' + dateOp);
  }

  getMesOperationByDate(dateOp: Date): Observable<object> {
    return this.httpClient.get(this.host + '/mes-operation-by-date/' + dateOp);
  }


  getMesOperationByDateGreaterThan(dateOp: Date): Observable<object> {
    return this.httpClient.get(this.host + '/mes-operation-by-date-greater-than/' + dateOp);
  }

  getMesOperationByDateLessThan(dateOp: Date): Observable<object> {
    return this.httpClient.get(this.host + '/mes-operation-by-date-less-than/' + dateOp);
  }



}
