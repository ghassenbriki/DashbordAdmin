import {Injectable} from '@angular/core';
import {Admin} from './admin.model';
import {HttpClient} from '@angular/common/http';
import {HostUrlService} from '../services/host-url.service';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import { removeSummaryDuplicates } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private urlService: HostUrlService, private router: Router) {
  }

  adminSubject = new BehaviorSubject<any>(null);
  url = this.urlService.url;

  // return a subscription to the sign in
  signIn(username: string, password: string) {
    console.log(username);
    console.log(password);
    const result = this.http.post(this.url + 'AdminAuth/Login', {username, password});
    console.log(result);
    return result;
  }

  createAdmin(authResponse: any) {
    const admin: any = authResponse;
    this.storeAdmin(admin);
    this.adminSubject.next(admin);
  }

  redirectToHome() {
    this.router.navigate(['']).then();
  }

  redirectToSignIn() {
    this.router.navigate(['/login']).then();
  }

  autoLogin() {
    const admin: Admin = JSON.parse(localStorage.getItem('adminData'));
    if (!admin) {
      return;
    }
    this.adminSubject.next(admin);
  }

  logout() {
    this.http.post(this.url + '/admin/logout', {}).subscribe();
    localStorage.removeItem('adminData');
    this.adminSubject.next(null);
    this.redirectToSignIn();
  }

  storeAdmin(admin: any) {
    localStorage.setItem('adminData', JSON.stringify(admin));
  }
}
