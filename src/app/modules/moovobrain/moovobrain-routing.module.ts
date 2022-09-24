import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MoovobrainOrdersComponent} from '../../moovobrain/moovobrain-orders/moovobrain-orders.component';
import {MoovobrainTestsComponent} from '../../moovobrain/moovobrain-tests/moovobrain-tests.component';


const routes: Routes = [
  {path: 'orders', component: MoovobrainOrdersComponent},
  {path: 'tests', component: MoovobrainTestsComponent},
  {path: '**' , redirectTo : 'orders'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoovobrainRoutingModule {
}
