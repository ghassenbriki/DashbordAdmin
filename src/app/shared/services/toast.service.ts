import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toastParams = {
    positionClass: 'toast-bottom-right',
    disableTimeOut: false,
    closeButton: true
  };

  /*=============================
  this service was created to be called instead of ToastrService
  so we don't have to write params every time we use a toast
    ============================= */


  constructor(private toaster: ToastrService) {
  }

  success(message: string, title: string): void {
    this.toaster.success(message, title, this.toastParams);
  }

  error(message: string, title: string): void {
    this.toaster.error(message, title, this.toastParams);
  }

}
