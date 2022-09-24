import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientsListComponent} from '../../clients/clients-list/clients-list.component';
import {ClientsRequestsComponent} from '../../clients/clients-requests/clients-requests.component';


const routes: Routes = [
  {path : 'list' , component : ClientsListComponent},
  {path : 'requests' , component : ClientsRequestsComponent},
  {path : '' , redirectTo : 'list' , pathMatch : 'full'},
  {path : '**' , redirectTo : 'list'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
