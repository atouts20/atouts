import { AppUser } from '../../../model/model.AppUser';
import { TokenStorage } from '../../../utils/token.storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeServiceUserService {
  private host: string = environment.backend + '/commande-service';
  
  

  constructor(private httpClient:HttpClient,
    private tokenStorage: TokenStorage,){}

    getCommandesServiceUserAccepter(client : number): Observable<object> {
      return this.httpClient.get(this.host + '/list-user-accepter/' + client);
  }
  
  getCommandesServiceUserNonAccepter(client : number): Observable<object> {
    return this.httpClient.get(this.host + '/list-user-non-accepter/' + client);
  }

  deleteCommandeServiceUser(id: number) {
    return this.httpClient.delete(this.host + '/supprimer-user/' + id);
  }
    

}
