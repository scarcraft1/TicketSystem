import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, take, tap } from 'rxjs';
import { User } from '../models';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public get isLogged(): boolean { return Boolean(this.currentUser); }
  private currentUser?: User;

  public get curentUserID() { return this.currentUser?._id; }

  constructor(private readonly service: UsersService) { }

  public logIn(username: string, password: string): Observable<boolean> {
    return this.service.users$.pipe(
      take(1),
      switchMap(users => users.length ? of(users) : this.service.loadUsers()),
      map(users => users.find(user => user.username === username && user.password === btoa(password))),
      tap(user => this.currentUser = user),
      map(user => !!user));
  }

  public register(username: string, password: string): Observable<boolean> {
    return this.service.add(username, password).pipe(
      tap(user => this.currentUser == user),
      map(user => !!user));
  }

  public usernameIsTaken(username: string): Observable<boolean> {
    return this.service.loadUsers().pipe(map(users => users.some(user => user.username === username)));
  }

}
