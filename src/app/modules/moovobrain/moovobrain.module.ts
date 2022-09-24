import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MoovobrainRoutingModule} from './moovobrain-routing.module';
import {MoovobrainComponent} from '../../moovobrain/moovobrain.component';
import {MoovobrainOrdersComponent} from '../../moovobrain/moovobrain-orders/moovobrain-orders.component';
import {MoovobrainTestsComponent} from '../../moovobrain/moovobrain-tests/moovobrain-tests.component';
import {SharedComponentsModule} from '../shared-components/shared-components.module';


@NgModule({
  declarations: [
    MoovobrainComponent,
    MoovobrainOrdersComponent,
    MoovobrainTestsComponent
  ],
    imports: [
        CommonModule,
        MoovobrainRoutingModule,
        SharedComponentsModule
    ]
})
export class MoovobrainModule {
}
