import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.getUserRole().pipe(
      map((role) => {
        if (role === 'admin') {
          return true;
        } else {
          this.router.navigate(['/productos']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/productos']);
        return of(false);
      })
    );
  }
}
