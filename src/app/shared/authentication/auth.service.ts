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

  adminSubject = new BehaviorSubject<Admin>(null);
  url = this.urlService.url;

  // return a subscription to the sign in
  signIn(email: string, password: string) {
    console.log(email);
    console.log(password);
    const resultat = this.http.post(this.url + '/admin/login', {email, password});
    console.log(resultat);    
    return resultat;
  }

  createAdmin(authResponse: any) {
    const a = authResponse.admin;
    const token = authResponse.token;
    const admin: Admin = {...a, token};
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

  storeAdmin(admin: Admin) {
    localStorage.setItem('adminData', JSON.stringify(admin));
  }
}
