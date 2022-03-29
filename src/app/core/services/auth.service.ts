import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '@environments/environment';
import { Models } from '@core';

const API_URL  = `${environment.endpoint}/users`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient) { }

  public login(username: string, password: string): Observable<boolean> {
    return this.http.get<Models.Login>(`${API_URL}/${username}`)
    .pipe(
      map(user => user.password === password),
      tap(isLogged => isLogged ? this.registerUserAsLoggedIn() : null))
  }

  public register(login: Models.Login): Observable<void> {
    return this.http.put<void>(`${API_URL}/${login.username}`, login).pipe(tap(this.registerUserAsLoggedIn))
  }

  private registerUserAsLoggedIn() {
    localStorage.setItem('isLogged', 'true');
  }
}
