import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  authenticate(username: string, password: string) {
    sessionStorage.setItem('isLoggedIn', 'true');
    return true;

    const json = JSON.stringify({username, password});

    return this.http.post(environment.API + '/authenticate', json, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: 'response',
      withCredentials: true,
      responseType: 'text'
    }).pipe(
      tap(response => {
        if (response.status === 200) {
          sessionStorage.setItem('isLoggedIn', 'true');
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
  }
}
