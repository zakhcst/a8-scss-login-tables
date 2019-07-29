import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedDataComponent } from './nested-data.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LogInComponent } from '../log-in/log-in.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { CurrentStatusComponent } from '../current-status/current-status.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('NestedDataComponent', () => {
  let component: NestedDataComponent;
  let fixture: ComponentFixture<NestedDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NestedDataComponent,
        LogInComponent,
        SignInComponent,
        CurrentStatusComponent
      ],
      imports: [AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
