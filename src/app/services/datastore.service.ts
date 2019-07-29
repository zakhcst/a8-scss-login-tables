import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { authI, policiesI, policiesDetailsI } from '../app.models';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatastoreService {
  private SERVER_URL = 'http://localhost:8080/api/';

  constructor(private router: Router, private http: HttpClient) {}

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }

  public getUser(): Observable<authI[]> {
    return this.http.get<authI[]>(this.SERVER_URL + 'auth');
  }

  public getPolicies(): Observable<policiesI[]> {
    return this.http.get<policiesI[]>(this.SERVER_URL + 'policies');
  }

  public getPoliciesDetails(): Observable<policiesDetailsI[]> {
    return this.http.get<policiesDetailsI[]>(
      this.SERVER_URL + 'policiesDetails'
    );
  }

  // Only for Demo purposes
  public apiData(): Observable<any[]> {
    const response1 = this.getUser();
    const response2 = this.getPolicies();
    const response3 = this.getPoliciesDetails();
    return forkJoin([response1, response2, response3]);
  }

  public createUser(email, password): Observable<any> {
    const timeStamp = new Date().valueOf();
    const body = {
      email,
      password,
      userId: timeStamp,
      username: email + ':' + timeStamp
    };
    return this.http.post<any>(this.SERVER_URL + 'auth', body);
  }

  hasEmail(email: string): Observable<any> {
    return this.getUser().pipe(
      switchMap((users: authI[]) => {
        const foundUser = users.find(user => user.email === email);
        return of(!!foundUser);
      })
    );
  }

  public getPolicyDetails(polId): Observable<policiesDetailsI[]> {
    return this.http.get<policiesDetailsI[]>(
      this.SERVER_URL + 'policiesDetails/?polId=^' + polId + '$'
    );
  }

  // public getPolicyDetails(polId: number): Observable<policiesDetailsI[]> {
  //   return this.http.get<policiesDetailsI[]>(
  //     this.SERVER_URL + 'policiesDetails?polId=' + polId;
  //   );
  // }

}
