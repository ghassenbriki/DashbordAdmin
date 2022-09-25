import {AfterViewInit, Component, OnInit, Renderer2} from '@angular/core';
import {ScriptsLoaderService} from '../scripts-loader.service';
import {HttpClient} from '@angular/common/http';
import {HostUrlService} from '../shared/services/host-url.service';
import {ToastService} from '../shared/services/toast.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit {



  constructor(private scriptsLoaderService: ScriptsLoaderService,
              private renderer2: Renderer2, private http: HttpClient,
              private urlService: HostUrlService, private toaster: ToastService,
              private route:Router) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.loadScripts();
  }

  redirection()
  {
    this.route.navigate(['form']);

  }

  loadScripts() {
    this.scriptsLoaderService.addScripts(this.renderer2, '/assets/js/core/app.js');
    this.scriptsLoaderService.addOneScriptAsync('/assets/js/core/app-menu.js').then();
  }

       // this.toaster.success('Client ID added', 'Success');
    
}
