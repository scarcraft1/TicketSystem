import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuardService implements CanActivate {

  constructor(private authService: AuthService, private readonly router: Router) { }
  canActivate(): boolean | UrlTree {
    return this.authService.isLogged || this.router.createUrlTree(['/login']);
  }
}
