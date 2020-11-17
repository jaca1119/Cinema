import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketEndpointService {
  private URL = environment.API + '/api/';

  constructor(private httpClient: HttpClient) {
  }

  async acceptTicket(url: string, ticketDTO) {
    return await this.httpClient.post(this.URL + url, ticketDTO)
      .pipe(
        catchError(this.handleError)
      ).toPromise();
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred: ', error.error.message);
    return throwError(error);
  }

}
