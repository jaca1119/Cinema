import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './home/home.component';
import {MaterialModule} from './material.module';
import {MovieComponent} from './movie/movie.component';
import {TicketsViewComponent} from './tickets-view/tickets-view.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AcceptViewComponent} from './accept-view/accept-view.component';
import {LoginViewComponent} from './login-view/login-view.component';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {AddMovieComponent} from './admin-panel/add-movie/add-movie.component';
import {AdminMenuComponent} from './admin-panel/admin-menu/admin-menu.component';
import {HallConfigViewComponent} from './admin-panel/hall-config-view/hall-config-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieComponent,
    TicketsViewComponent,
    AcceptViewComponent,
    LoginViewComponent,
    AdminPanelComponent,
    AdminMenuComponent,
    AddMovieComponent,
    HallConfigViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
