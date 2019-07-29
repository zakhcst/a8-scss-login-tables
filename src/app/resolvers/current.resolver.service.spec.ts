import { TestBed } from '@angular/core/testing';

import { CurrentResolverService } from './current.resolver.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from '../app-routing.module';
import { LogInComponent } from '../pages/log-in/log-in.component';
import { SignInComponent } from '../pages/sign-in/sign-in.component';
import { CurrentStatusComponent } from '../pages/current-status/current-status.component';
import { NestedDataComponent } from '../pages/nested-data/nested-data.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('Current.ResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
    declarations: [LogInComponent, SignInComponent, CurrentStatusComponent, NestedDataComponent]
  }));

  it('should be created', () => {
    const service: CurrentResolverService = TestBed.get(CurrentResolverService);
    expect(service).toBeTruthy();
  });
});
