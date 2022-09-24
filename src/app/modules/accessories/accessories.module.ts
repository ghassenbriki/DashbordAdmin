import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AccessoriesRoutingModule} from './accessories-routing.module';
import {AccessoriesComponent} from '../../accessories/accessories.component';
import {AccessoriesProductsComponent} from '../../accessories/accessories-products/accessories-products.component';
import {AccessoriesOrdersComponent} from '../../accessories/accessories-orders/accessories-orders.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import {SharedComponentsModule} from '../shared-components/shared-components.module';


@NgModule({
  declarations: [
    AccessoriesComponent,
    AccessoriesProductsComponent,
    AccessoriesOrdersComponent
  ],
    imports: [
        CommonModule,
        AccessoriesRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgxDropzoneModule,
        SharedComponentsModule
    ]
})
export class AccessoriesModule {
}
