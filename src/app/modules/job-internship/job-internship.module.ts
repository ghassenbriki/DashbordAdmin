import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobInternshipRoutingModule } from './job-internship-routing.module';
import {JobInternshipRequestComponent} from '../../job-internship-request/job-internship-request.component';


@NgModule({
  declarations: [
    JobInternshipRequestComponent
  ],
  imports: [
    CommonModule,
    JobInternshipRoutingModule
  ]
})
export class JobInternshipModule { }
