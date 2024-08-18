import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckLoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const user = JSON.parse(localStorage.getItem('session')) || null;
    if (user) {
      return of(true);
    } else {
      localStorage.removeItem('session');
      this.router.navigateByUrl('/login');
      return of(false);
    }
  }
}
