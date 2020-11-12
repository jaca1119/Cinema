import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieEndpointService {
  private URL = environment.API + '/api/';

  constructor(private httpClient: HttpClient) {
  }

  async getAll(url: string) {
    return await this.httpClient.get(this.URL + url)
      .pipe(
        catchError(this.handleError)
      ).toPromise();
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred: ', error.error.message);
    return throwError(error);
  }
}
