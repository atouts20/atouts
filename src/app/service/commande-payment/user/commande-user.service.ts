import { AppUser } from '../../../model/model.AppUser';
import { TokenStorage } from '../../../utils/token.storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeUserService {
  private host: string = environment.backend + '/commande';
  
  

  constructor(private httpClient:HttpClient,
    private tokenStorage: TokenStorage,){}

    getCommandesUserPayer(client : number): Observable<object> {
      return this.httpClient.get(this.host + '/list-user-payer/' + client);
  }
  
  getCommandesUserNonPayer(client : number): Observable<object> {
    return this.httpClient.get(this.host + '/list-user-non-payer/' + client);
  }

  deleteCommandeUser(id: number) {
    return this.httpClient.delete(this.host + '/supprimer-user/' + id);
  }



 

    

}
