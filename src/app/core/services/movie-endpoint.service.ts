import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Hall } from 'src/app/admin-panel/hall-config-view/hall-config-view.component';
import { CreateMovieDTO } from 'src/app/admin-panel/add-movie/add-movie.component';
import { UpdateMovieDTO } from '../../admin-panel/update-movie/update-movie.component';

@Injectable({
  providedIn: 'root'
})
export class MovieEndpointService {
  private URL = environment.API + '/api/';

  constructor(private httpClient: HttpClient) {
  }

  async get(url: string) {
    return await this.httpClient.get(this.URL + url)
      .pipe(
        catchError(this.handleError)
      ).toPromise();
  }

  async createHall(url: string, hall: Hall) {
    return await this.httpClient.post(this.URL + url, hall)
      .pipe(
        catchError(this.handleError)
      ).toPromise();
  }

  async createMovie(url: string, createMovie: CreateMovieDTO) {
    return await this.httpClient.post(this.URL + url, createMovie)
      .pipe(
        catchError(this.handleError)
      ).toPromise();
  }

  async updateHall(url: string, hall: Hall) {
    return await this.httpClient.put(this.URL + url, hall)
      .pipe(
        catchError(this.handleError)
      ).toPromise();
  }

  async updateMovie(url: string, updateMovie: UpdateMovieDTO) {
    return await this.httpClient.put(this.URL + url, updateMovie)
      .pipe(
        catchError(this.handleError)
      ).toPromise();
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred: ', error.error.message);
    return throwError(error);
  }
}
