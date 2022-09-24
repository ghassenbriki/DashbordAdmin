import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/authentication/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private toaster: ToastrService) {
  }

  ngOnInit(): void {
    /*=============================
     Uncomment this on demo version
     ==============================*/
    // this.showDemoToaster();
  }

  logout() {
    this.authService.logout();
  }

  showDemoToaster(): void {
    // tslint:disable-next-line:max-line-length
    this.toaster.info('<p>This version is only for <strong>demo</strong> purposes so feel free to perform updates.<br>PS: the dashboard is not yet responsive so do not try it on mobile. Orders confirmation emails, notifications and analytics are not yet implemented</p>', 'Note :', {
      positionClass: 'toast-top-full-width',
      disableTimeOut: true,
      enableHtml: true,
      closeButton: true
    });
  }
}
