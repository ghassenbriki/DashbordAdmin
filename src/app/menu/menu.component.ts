import {AfterViewInit, Component, OnInit, Renderer2} from '@angular/core';
import {ScriptsLoaderService} from '../scripts-loader.service';
import {HttpClient} from '@angular/common/http';
import {HostUrlService} from '../shared/services/host-url.service';
import {ToastService} from '../shared/services/toast.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit {

  isLoading = false;

  constructor(private scriptsLoaderService: ScriptsLoaderService,
              private renderer2: Renderer2, private http: HttpClient,
              private urlService: HostUrlService, private toaster: ToastService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.loadScripts();
  }

  loadScripts() {
    this.scriptsLoaderService.addScripts(this.renderer2, '/assets/js/core/app.js');
    this.scriptsLoaderService.addOneScriptAsync('/assets/js/core/app-menu.js').then();
  }

  addClientId(addedIdElement: HTMLInputElement): void {

    this.isLoading = true;
    this.http.post(this.urlService.url + '/clientID',
      {clientID: addedIdElement.value.toString()})
      .subscribe(res => {
        this.isLoading = false;
        this.toaster.success('Client ID added', 'Success');
      }, () => {
        this.isLoading = false;
        this.toaster.error('Client ID cannot be added', 'Error');
      });
  }
}
