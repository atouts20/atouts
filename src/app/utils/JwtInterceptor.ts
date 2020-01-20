import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenStorage} from './token.storage';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private tokenStorage: TokenStorage) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
// add authorization header with jwt token if available
    if (this.tokenStorage.getToken()) {
      const cloneRequest = request.clone({
        setHeaders: {
          Authorization: `${this.tokenStorage.getToken()}`
        }
      });
      return next.handle(cloneRequest);
    }
      return next.handle(request);
    

  }
}
