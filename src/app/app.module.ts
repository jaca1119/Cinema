import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material.module';
import { MovieComponent } from './movie/movie.component';
import { TicketsViewComponent } from './tickets-view/tickets-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AcceptViewComponent } from './accept-view/accept-view.component';
import { LoginViewComponent } from './login-view/login-view.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AddMovieComponent } from './admin-panel/add-movie/add-movie.component';
import { AdminMenuComponent } from './admin-panel/admin-menu/admin-menu.component';
import { HallConfigViewComponent } from './admin-panel/hall-config-view/hall-config-view.component';
import { TokenInterceptor } from './core/services/token.interceptor';
import { SnackComponent } from './snack/snack.component';
import { MovieConfigComponent } from './admin-panel/movie-config/movie-config.component';
import { MovieListConfigComponent } from './admin-panel/movie-config/movie-list-config/movie-list-config.component';
import { MovieConfigViewComponent } from './admin-panel/movie-config/movie-list-config/movie-config-view/movie-config-view.component';
import { UpdateMovieComponent } from './admin-panel/update-movie/update-movie.component';
import { PaymentPopupComponent } from './accept-view/payment-popup/payment-popup.component';

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
    HallConfigViewComponent,
    SnackComponent,
    MovieConfigComponent,
    MovieListConfigComponent,
    MovieConfigViewComponent,
    UpdateMovieComponent,
    PaymentPopupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
