import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState, login } from '../store/auth.store';
import { selectIsAuthenticated } from '../store/auth.store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const store = inject(Store<AuthState>);
  const router = inject(Router);

  return store.select(selectIsAuthenticated).pipe(
    map(isAuthenticated => {
      const user = JSON.parse(
        localStorage.getItem('userPreferences') || 'null'
      );
      if (!isAuthenticated && !user) {
        router.navigate(['']);
        return true;
      }
      
      store.dispatch(login({ user }));
      return true;
    })
  );
};