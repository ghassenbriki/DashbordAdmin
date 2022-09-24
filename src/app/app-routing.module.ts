import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './shared/authentication/auth.guard';
import {LoginGuard} from './shared/authentication/login.guard';
import {FeedbacksComponent} from './feedbacks/feedbacks.component';
import {MissionsComponent} from './missions/missions.component';

const routes: Routes = [
  {path: 'feedbacks', component: FeedbacksComponent , canActivate : [AuthGuard]},
  {path: '', component: MissionsComponent , canActivate : [AuthGuard]},
  {path: 'login', loadChildren: './modules/sign-in/sign-in.module#SignInModule', canActivate : [LoginGuard]},
  {path : '**' , redirectTo : ''}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled', preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
