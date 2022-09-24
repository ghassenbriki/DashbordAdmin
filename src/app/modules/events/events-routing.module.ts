import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ComingEventsComponent} from '../../coming-events/coming-events.component';
import {ArticlesComponent} from '../../articles/articles.component';


const routes: Routes = [
  {path: '', component: ComingEventsComponent, pathMatch: 'full'},
  {path: 'articles', component: ArticlesComponent},
  {path: 'events', component: ComingEventsComponent},
  {path : '**' , redirectTo: 'articles'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {
}
