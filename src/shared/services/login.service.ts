import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
    login(params:any) {
      return of({ id: 1, fullName: 'Jose Ricardo', email: params.user})
      .pipe(delay(500));
    }
}
