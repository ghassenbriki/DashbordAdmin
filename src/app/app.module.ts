import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MenuComponent} from './menu/menu.component';

import {HeaderComponent} from './header/header.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {FooterComponent} from './footer/footer.component';

import {SignInModule} from './modules/sign-in/sign-in.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthInterceptor} from './shared/authentication/auth.interceptor';
import {SharedComponentsModule} from './modules/shared-components/shared-components.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { MissionsComponent } from './missions/missions.component';
import { FeedbacksComponent } from './feedbacks/feedbacks.component';
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    MissionsComponent,
    FeedbacksComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    SignInModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
