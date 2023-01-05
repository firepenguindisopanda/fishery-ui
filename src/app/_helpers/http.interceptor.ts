import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  private readonly token: string = '';
  constructor(){
    // token is located in sessionStorage
    this.token = sessionStorage.getItem('accessToken') || '';
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.token){
      const modReq = req.clone({
        // headers for postgresql nodejs expressjs
        headers: req.headers.append('x-access-token', `${this.token}`)
      });
      return next.handle(modReq);
    }

    return next.handle(req);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }, HttpClient
];
