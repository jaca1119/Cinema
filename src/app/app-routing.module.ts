import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {TicketsViewComponent} from './tickets-view/tickets-view.component';
import {AcceptViewComponent} from './accept-view/accept-view.component';


const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'tickets', component: TicketsViewComponent},
  {path: 'accepted', component: AcceptViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
