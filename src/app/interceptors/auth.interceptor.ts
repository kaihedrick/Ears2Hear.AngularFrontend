import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

/**
 * This file defines the AuthInterceptor class, which is an Angular HTTP interceptor.
 * The purpose of this interceptor is to attach an Authorization header containing
 * a Bearer token to outgoing HTTP requests if a token is available. This ensures
 * that API requests include the necessary authentication credentials.
 */

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private apiService: ApiService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.apiService.getToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request);
  }
}
