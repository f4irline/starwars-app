import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: {} },
        { provide: HttpClient, useValue: {} }
      ]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    pending();
    expect(guard).toBeTruthy();
  }));
});
