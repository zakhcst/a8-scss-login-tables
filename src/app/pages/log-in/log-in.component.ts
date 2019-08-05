import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatastoreService } from 'src/app/services/datastore.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { single } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  responseErrorMessage: string | null = null;
  valueChangesSubscription: Subscription;
  loggedIn = false;
  onLogInSuccessNavigateToPath = 'nested-data';

  constructor(
    private datastore: DatastoreService,
    private formBuilder: FormBuilder,
    private authentication: AuthenticationService
  ) {}

  /* Page Tasks:
   *
   *  1) Take and validate the user input fields
   *  2) Connect with API
   *  3) Display the necessary error messages
   *  4) Style the page
   *  5) Header should`t be vissible for this page
   *
   */

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required]],
        password: ['', [Validators.required]]
      },
      { updateOn: 'change' }
    );
  }

  ngOnDestroy() {
    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authentication
      .login(this.email.value, this.password.value)
      .pipe(single())
      .subscribe(
        data => {
          if (data) {
            this.loggedIn = true;
            this.navigateTo(this.onLogInSuccessNavigateToPath);
          } else {
            this.responseErrorMessage = 'Non existing user or invalid email';
            this.showErrorMessageUntilFormValueChanged();
          }
        },
        error => {
          throw new Error(error);
        }
      );
  }

  navigateTo(page: string) {
    this.datastore.navigateTo(page);
  }

  showErrorMessageUntilFormValueChanged() {
    this.valueChangesSubscription = this.loginForm.valueChanges.subscribe(
      () => {
        this.responseErrorMessage = null;
        this.valueChangesSubscription.unsubscribe();
      }
    );
  }
}
