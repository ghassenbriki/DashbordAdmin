import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ScriptsLoaderService} from '../../scripts-loader.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ClientRequestsHttpService} from '../client-requests-http.service';
import {ToastService} from '../../shared/services/toast.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  isLoading = false;

  constructor(private scriptsLoaderService: ScriptsLoaderService,
              private httpRequest: ClientRequestsHttpService,
              private toaster: ToastService) {
    this.loadStylesheets();
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngAfterViewInit() {
    this.loadScripts();
  }


  loadStylesheets(): void {
    this.scriptsLoaderService.addStylesheets(
      '/assets/vendors/css/tables/ag-grid/ag-grid.css',
      '/assets/vendors/css/tables/ag-grid/ag-theme-material.css',
      '/assets/css/pages/app-user.css',
      '/assets/css/pages/aggrid.css');
  }

  loadScripts(): void {
    this.scriptsLoaderService.addManyScriptsAsync(
      '/assets/vendors/js/tables/ag-grid/ag-grid-community.min.noStyle.js',
      '/assets/js/scripts/pages/app-user.js').then();
  }

  initForm(): void {
    this.form = new FormGroup(
      {email: new FormControl(null, [Validators.required, Validators.email])}
    );
  }


  banClient(element: HTMLInputElement): void {
    this.isLoading = true;
    this.httpRequest.banClient(element.value).subscribe(() => {
      this.isLoading = false;
      this.toaster.success('Client banned successfully', 'Done');
    }, () => {
      this.isLoading = false;
      this.toaster.error('Unable to ban client , please verify the email', 'Error :');
    });
  }

}
