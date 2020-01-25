import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { ApiService } from '../api/api.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private apiService: ApiService,
  ) {}

  canActivate(): Observable<boolean> {
    return this.checkLogin();
  }

  checkLogin(): Observable<boolean> {
    return this.apiService.profile().pipe(
      map(
        res => {
          return this.profileSuccess(res);
        },
      ),
      catchError((err) => {
        return of(this.profileError(err));
      })
    );

  }

  profileSuccess(res: User): boolean {
    localStorage.setItem('user', JSON.stringify(res));
    return true;
  }

  profileError(err: any): boolean {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
    return false;
  }
}
