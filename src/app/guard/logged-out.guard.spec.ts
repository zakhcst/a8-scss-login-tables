import { TestBed, async, inject } from '@angular/core/testing';

import { LoggedOutGuard } from './logged-out.guard';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoggedOutGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggedOutGuard],
      imports: [RouterTestingModule, HttpClientModule ]
    });
  });

  it('should ...', inject([LoggedOutGuard], (guard: LoggedOutGuard) => {
    expect(guard).toBeTruthy();
  }));
});
