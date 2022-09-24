import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const admin = this.authService.adminSubject.getValue();
    if (!admin) {
      return next.handle(request);
    }
    const modifiedRequest = request.clone({headers: request.headers.append('Authorization', 'Bearer ' + admin.token)});
    return next.handle(modifiedRequest);
  }
}
