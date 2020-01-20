import { AppUser } from '../../../model/model.AppUser';
import { TokenStorage } from '../../../utils/token.storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Payment } from '../../../model/model.payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentAdminService {
  private host: string = environment.backend + '/payment';



  constructor(private httpClient: HttpClient,
    private tokenStorage: TokenStorage, ) { }

  getPayment(codePayement: String): Observable<object> {
    return this.httpClient.get(this.host + '/list/' + codePayement);
  }

  getPaymentsAdmin(): Observable<object> {
    return this.httpClient.get(this.host + '/list/');
  }

  postPayment(payment: Payment): Observable<object> {
    return this.httpClient.post(this.host + '/save/', payment);
  }




  
  deletePaymentAdmin(payment: Payment) {
    return this.httpClient.post(this.host + '/delete/', payment);
  }




}
