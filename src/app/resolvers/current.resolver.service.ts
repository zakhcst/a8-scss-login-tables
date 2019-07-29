import { Injectable } from '@angular/core';
import { DatastoreService } from 'src/app/services/datastore.service';

import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { policiesI, UserI } from '../app.models';
import { AuthenticationService } from '../services/authentication.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrentResolverService implements Resolve<policiesI[]> {
  user: UserI;
  policies$: Observable<policiesI[]>;

  constructor(
    private api: DatastoreService,
    private auth: AuthenticationService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<policiesI[]> | Observable<never> {
    this.user = this.auth.currentUserValue;
    if (!this.user) {
      throw Error('Invalid user data')
    }
    return this.api.getPolicies().pipe(
      switchMap((data: policiesI[]) => {
        const filteredData = data.filter(
          policy => policy.userId === this.user.userId
          );
        return of(filteredData);
      })
    );
  }
}
