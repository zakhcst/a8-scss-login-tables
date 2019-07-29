import { Injectable } from '@angular/core';

import { DatastoreService } from '../services/datastore.service';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors
} from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DuplicateEmailValidator implements AsyncValidator {
  constructor(private datastore: DatastoreService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return timer(500).pipe(
      switchMap(() => {
        return this.datastore.hasEmail(control.value);
      }),
      switchMap((found: boolean) => {
        return of(found ? { duplicateEmail: true } : null);
      })
    );
  }
}
