import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../shared/authentication/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {

  form: FormGroup;
  isLoading = false;
  loginSubscription: Subscription;

  constructor(private authService: AuthService, private toaster: ToastrService) {
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email]),
      password: new FormControl(null, [Validators.minLength(8)])
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }

  signIn(emailElement: HTMLInputElement, passwordElement: HTMLInputElement) {

    const toastParams = {
      positionClass: 'toast-bottom-right',
      disableTimeOut: false 
    };

    this.isLoading = true;
    this.loginSubscription = this.authService.signIn(emailElement.value, passwordElement.value).subscribe(authResponse => {
      console.log('test done');
      this.isLoading = false;
      this.authService.createAdmin(authResponse);
      this.authService.redirectToHome();
      
      
    }, () => {
      this.isLoading = false;
      this.toaster.error('Unable to login', 'Error', toastParams);
    });
  }

}
/* dhiadhia123 */