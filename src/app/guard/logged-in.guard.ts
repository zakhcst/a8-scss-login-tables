import { Injectable } from '@angular/core';

import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})

export class LoggedInGuard implements CanActivate {
  constructor(private auth: AuthenticationService) {}

  canActivate(): boolean {
    return this.auth.currentUserValue ? false : true;
  }
}
