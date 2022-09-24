import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamMembersRoutingModule } from './team-members-routing.module';
import {TeamMembersComponent} from '../../team-members/team-members.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxDropzoneModule} from 'ngx-dropzone';


@NgModule({
  declarations: [
    TeamMembersComponent,
  ],
  imports: [
    CommonModule,
    TeamMembersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDropzoneModule
  ]
})
export class TeamMembersModule { }
