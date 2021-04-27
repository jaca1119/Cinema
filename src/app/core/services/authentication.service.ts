import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  token: string = '';

  private URL = environment.API + '/api/';
  constructor(private http: HttpClient) {
  }

  authenticate(username: string, password: string) {

    const json = JSON.stringify({ username, password });

    return this.http.post(this.URL + 'users/authenticate', json, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response',
      responseType: 'text'
    }).pipe(
      tap(response => {
        if (response.status === 200) {
          sessionStorage.setItem('isLoggedIn', 'true');
          this.token = JSON.parse(response.body).token
        }
      }),
      catchError(() => {
        sessionStorage.setItem('isLoggedIn', 'false');

        return of(null);
      }));
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  }

  logout() {
    sessionStorage.setItem('isLoggedIn', 'false');
    this.token = '';
  }

  getToken() {
    return this.token;
  }
}
