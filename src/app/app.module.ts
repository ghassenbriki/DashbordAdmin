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
import { FormMissionComponent } from './form-mission/form-mission.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    MissionsComponent,
    FeedbacksComponent,
    FormMissionComponent,

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
    MatSortModule,
    MatGridListModule,
    MatFormFieldModule,
    MatRadioModule,
    MatInputModule ,
    MatIconModule,

    

    
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
