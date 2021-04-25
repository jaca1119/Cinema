import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {TicketsViewComponent} from './tickets-view/tickets-view.component';
import {AcceptViewComponent} from './accept-view/accept-view.component';
import {LoginViewComponent} from './login-view/login-view.component';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {AuthGuard} from './auth/auth.guard';
import {AddMovieComponent} from './admin-panel/add-movie/add-movie.component';
import {AdminMenuComponent} from './admin-panel/admin-menu/admin-menu.component';
import {HallConfigViewComponent} from './admin-panel/hall-config-view/hall-config-view.component';


const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'tickets', component: TicketsViewComponent},
  {path: 'accepted', component: AcceptViewComponent},
  {path: 'login', component: LoginViewComponent},
  {
    path: 'admin', component: AdminPanelComponent, canActivate: [AuthGuard], children: [
      {path: '', component: AdminMenuComponent},
      {path: 'add-movie', component: AddMovieComponent},
      {path: 'hall', component: HallConfigViewComponent}
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
