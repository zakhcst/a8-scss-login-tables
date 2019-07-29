import { Injectable } from '@angular/core';

import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})

export class LoggedOutGuard implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.currentUserValue) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
