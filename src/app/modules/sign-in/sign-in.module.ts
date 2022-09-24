import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignInRoutingModule } from './sign-in-routing.module';
import {SignInComponent} from '../../sign-in/sign-in.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedComponentsModule} from '../shared-components/shared-components.module';



@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    SignInRoutingModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ]
})
export class SignInModule {
}
