import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentStatusComponent } from './current-status.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LogInComponent } from '../log-in/log-in.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { NestedDataComponent } from '../nested-data/nested-data.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('CurrentStatusComponent', () => {
  let component: CurrentStatusComponent;
  let fixture: ComponentFixture<CurrentStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentStatusComponent, LogInComponent, SignInComponent, NestedDataComponent ],
      imports: [RouterTestingModule, HttpClientModule, AppRoutingModule, FormsModule, ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
