import { AppUser } from '../../../model/model.AppUser';
import { TokenStorage } from '../../../utils/token.storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeAdminService {
  private host: string = environment.backend + '/commande';
  
  

  constructor(private httpClient:HttpClient,
    private tokenStorage: TokenStorage,){}

    getCommandesAdminPayer(): Observable<object> {
      return this.httpClient.get(this.host + '/list-admin-payer/');
  }
  
  getCommandesAdminNonPayer(): Observable<object> {
    return this.httpClient.get(this.host + '/list-admin-non-payer/');
}



deleteCommandeAdmin(id: number) {
return this.httpClient.delete(this.host + '/supprimer-admin/' + id);
}

    

}
