import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {JobInternshipRequestComponent} from '../../job-internship-request/job-internship-request.component';


const routes: Routes = [
  {path : '' , component : JobInternshipRequestComponent , pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobInternshipRoutingModule { }
