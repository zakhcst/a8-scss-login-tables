import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { authI, UserI } from '../app.models';
import { DatastoreService } from './datastore.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<UserI>;
  public currentUser: Observable<UserI>;

  constructor(private http: HttpClient, private datastore: DatastoreService) {
    this.currentUserSubject = new BehaviorSubject<UserI>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserI {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.datastore.getUser()
      .pipe(map((users: authI[]) => {
        const foundUser = users.find(user => (user.password === password && user.email === email));
        if (foundUser) {
          this.currentUserSubject.next(foundUser);
          return foundUser;
        } else {
          return null;
        }
      }));
  }

  logout() {
    this.currentUserSubject.next(null);
    this.datastore.navigateTo('login');
  }
}
