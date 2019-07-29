import { Component, OnInit } from '@angular/core';
import { DatastoreService } from 'src/app/services/datastore.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { single } from 'rxjs/operators';
import { matchPasswordsValidator } from '../../form-validators/match-passwords.validator';
import { Subscription } from 'rxjs';
import { DuplicateEmailValidator } from 'src/app/form-validators/duplicate-email.validator';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers: [DuplicateEmailValidator]
})
export class SignInComponent implements OnInit {
  signinForm: FormGroup;
  submitted = false;
  responseErrorMessage: string | null = null;
  valueChangesSubscription: Subscription;
  valueChangesSubscription1: Subscription;

  constructor(
    private datastore: DatastoreService,
    private formBuilder: FormBuilder,
    private authentication: AuthenticationService,
    private duplicateEmailValidator: DuplicateEmailValidator
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
    this.signinForm = this.formBuilder.group(
      {
        email: [
          '',
          [Validators.required, Validators.email],
          this.duplicateEmailValidator.validate.bind(
            this.duplicateEmailValidator
          )
        ],
        password: ['', [Validators.required, Validators.minLength(5)]],
        passwordConfirm: ['', [Validators.required]]
      },
      { updateOn: 'change', validators: matchPasswordsValidator }
    );
  }

  get email() {
    return this.signinForm.get('email');
  }
  get password() {
    return this.signinForm.get('password');
  }
  get passwordConfirm() {
    return this.signinForm.get('passwordConfirm');
  }

  onSubmit() {
    this.submitted = true;
    if (this.signinForm.invalid) {
      return;
    }

    this.datastore
      .createUser(this.email.value, this.password.value)
      .pipe(single())
      .subscribe(
        data => {
          this.navigateTo('');
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
    this.valueChangesSubscription = this.signinForm.valueChanges.subscribe(
      _ => {
        this.responseErrorMessage = null;
        this.valueChangesSubscription.unsubscribe();
      }
    );
  }

  showErrorMessagePopUp() {
    setTimeout(_ => {
      this.responseErrorMessage = null;
    }, 5000);
  }
}
