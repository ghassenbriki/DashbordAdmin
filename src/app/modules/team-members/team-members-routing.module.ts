import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TeamMembersComponent} from '../../team-members/team-members.component';


const routes: Routes = [
  {path: '', component: TeamMembersComponent, pathMatch: 'full'},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamMembersRoutingModule {
}
