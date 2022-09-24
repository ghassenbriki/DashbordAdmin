import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './shared/authentication/auth.guard';
import {LoginGuard} from './shared/authentication/login.guard';

const routes: Routes = [
  {path: '', loadChildren: './modules/analytics/analytics.module#AnalyticsModule', pathMatch: 'full' , canActivate : [AuthGuard]},
  {path: 'news', loadChildren: './modules/events/events.module#EventsModule' , canActivate : [AuthGuard]},
  {path: 'accessories', loadChildren: './modules/accessories/accessories.module#AccessoriesModule' , canActivate : [AuthGuard]},
  {path: 'moovobrain', loadChildren: './modules/moovobrain/moovobrain.module#MoovobrainModule', canActivate : [AuthGuard]},
  {path: 'partners', loadChildren: './modules/partners/partners.module#PartnersModule', canActivate : [AuthGuard]},
  {path: 'join-us', loadChildren: './modules/job-internship/job-internship.module#JobInternshipModule', canActivate : [AuthGuard]},
  {path: 'clients', loadChildren: './modules/clients/clients.module#ClientsModule' , canActivate : [AuthGuard]},
  {path: 'team', loadChildren: './modules/team-members/team-members.module#TeamMembersModule', canActivate : [AuthGuard]},
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
