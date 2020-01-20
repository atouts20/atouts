import { AppUser } from '../../../model/model.AppUser';
import { TokenStorage } from '../../../utils/token.storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeServiceAdminService {
  private host: string = environment.backend + '/commande-service';



  constructor(private httpClient: HttpClient,
    private tokenStorage: TokenStorage, ) { }

  getCommandesServiceAdminAccepter(): Observable<object> {
    return this.httpClient.get(this.host + '/list-admin-accepter/');
  }

  getCommandesServiceAdminNonAccepter(): Observable<object> {
    return this.httpClient.get(this.host + '/list-admin-non-accepter/');
  }





  getCommandesServiceAdminAnnuler(): Observable<object> {
    return this.httpClient.get(this.host + '/list-admin-annuler/');
  }








  deleteCommandeServiceAdmin(id: number) {
    return this.httpClient.delete(this.host + '/supprimer-admin/' + id);
  }

  accepterCommandeServiceAdmin(id: number) {
    return this.httpClient.get(this.host + '/accepter-admin/' + id);
  }

  annulerCommandeServiceAdmin(id: number) {
    return this.httpClient.get(this.host + '/annuler-admin/' + id);
  }


}
