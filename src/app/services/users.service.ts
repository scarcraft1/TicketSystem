import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';

const API_URL = environment.endpoint + '/users';
type User = { _id: string, username: string, password: string };

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _users$ = new BehaviorSubject<User[]>([]);
  public get users$() { return this._users$.asObservable(); }

  constructor(private readonly http: HttpClient) { }

  public add(username: string, password: string): Observable<User> {
    password = btoa(password);
    return this.http.post<User>(API_URL, { username, password })
      .pipe(tap(user => this._users$.next(this._users$.getValue().concat(user))),);
  }

  public loadUsers(): Observable<User[]> {
    return this.http.get<User[]>(API_URL).pipe(tap(users => this._users$.next(users)));
  }
}
