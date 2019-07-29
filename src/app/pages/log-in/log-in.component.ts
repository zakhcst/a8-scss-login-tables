import { Component, OnInit } from '@angular/core';
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
export class LogInComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  responseErrorMessage: string | null = null;
  valueChangesSubscription: Subscription;

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
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      },
      { updateOn: 'change' }
    );
    this.onSubmit();
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.authentication
      .login(this.email.value, this.password.value)
      .pipe(single())
      .subscribe(
        data => {
          if (data) {
            this.navigateTo('current-status');
          } else {
            this.responseErrorMessage = 'Non existing user or invalid email';
            this.showErrorMessageUntilChanged();
          }
        },
        error => {
          this.responseErrorMessage =
            'Check server or connection and resubmit.';
          this.showErrorMessagePopUp();
          const message = 'Error: Contact support with the following message:';
          console.log(message);
          console.log(error);
          window.alert(message + error);
          this.navigateTo('login');
        }
      );
  }

  navigateTo(page: string) {
    this.datastore.navigateTo(page);
  }

  showErrorMessageUntilChanged() {
    this.valueChangesSubscription = this.loginForm.valueChanges.subscribe(_ => {
      this.responseErrorMessage = null;
      this.valueChangesSubscription.unsubscribe();
    });
  }
  showErrorMessagePopUp() {
    setTimeout(_ => {
      this.responseErrorMessage = null;
    }, 3000);
  }
}
