import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const stringToken: string = localStorage.getItem("access_token");

    const url = request.url;

    if (stringToken && !url.endsWith('/oauth/token')) {
      const token: any = JSON.parse(stringToken);
      const jwt: any = token.access_token;
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + jwt
        }
      })
    }

    return next.handle(request);
  }
}
