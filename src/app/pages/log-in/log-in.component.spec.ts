import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';

import { LogInComponent } from './log-in.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { of } from 'rxjs';
import { DatastoreService } from 'src/app/services/datastore.service';

describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;
  const fakeUser = {
    userId: 100,
    username: 'test',
    password: 'test',
    email: 'test@test.com'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogInComponent],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset form', fakeAsync(() => {
    const email = component.loginForm.controls.email.value;
    const password = component.loginForm.controls.password.value;
    tick();
    fixture.detectChanges();
    expect(email).toBe('');
    expect(password).toBe('');
    expect(component.loginForm.status).toBe('INVALID');
  }));

  it('should validate form', fakeAsync(() => {
    component.loginForm.controls.email.setValue('fakeEmail');
    component.loginForm.controls.password.setValue('fakePassword');
    tick();
    fixture.detectChanges();
    expect(component.loginForm.status).toBe('VALID');
  }));

  it('should on submit, call login and navigate', fakeAsync(() => {
    component.loginForm.controls.email.setValue('fakeEmail');
    component.loginForm.controls.password.setValue('fakePassword');
    const serviceAuth = TestBed.get(AuthenticationService);
    const serviceDatastore = TestBed.get(DatastoreService);

    spyOn(serviceAuth, 'login').and.returnValue(of(fakeUser));
    const navigated = spyOn(serviceDatastore, 'navigateTo');

    component.onSubmit();
    tick();
    fixture.detectChanges();

    expect(component.loggedIn).toBe(true);
    expect(navigated).toHaveBeenCalledWith(
      component.onLogInSuccessNavigateToPath
    );
  }));

  it('should on submit, show error message when user not found', fakeAsync(() => {
    component.loginForm.controls.email.setValue('fakeEmail');
    component.loginForm.controls.password.setValue('fakePassword');
    const serviceAuth = TestBed.get(AuthenticationService);

    spyOn(serviceAuth, 'login').and.returnValue(of(null));
    const showErrorMessageUntilFormValueChanged = spyOn(
      component,
      'showErrorMessageUntilFormValueChanged'
    );

    component.onSubmit();
    tick();
    fixture.detectChanges();

    expect(component.loggedIn).toBe(false);
    expect(component.responseErrorMessage).toBeTruthy();
    expect(showErrorMessageUntilFormValueChanged).toHaveBeenCalledTimes(1);
  }));

  it('should on submit, throw an error when api error', fakeAsync(() => {
    component.loginForm.controls.email.setValue('fakeEmail');
    component.loginForm.controls.password.setValue('fakePassword');
    const serviceAuth = TestBed.get(AuthenticationService);

    const errorMessage = 'Api Error';
    spyOn(serviceAuth, 'login').and.throwError(errorMessage);

    expect(() => {
      component.onSubmit();
      tick();
      fixture.detectChanges();
      expect(component.loggedIn).toBe(false);
    }).toThrow(new Error(errorMessage));
  }));
});
