import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { login } from '../../../shared/store/auth.store';
import { Store } from '@ngrx/store';
import { LoginService } from '../../../shared/services/login.service';

@Component({
  selector: 'app-login',
  imports: [  ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class Login {
  router = inject(Router);
  loginService = inject(LoginService);
  store = inject(Store);


  profileForm!: FormGroup;


  ngOnInit() {
    this.profileForm = new FormGroup({
      user: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    const params = this.profileForm.value;
    this.loginService.login(params).subscribe((user:any) => {
      // Save the authenticated user in the store
      console.log(user)
      this.store.dispatch(login({ user }));
      localStorage.setItem('userPreferences', JSON.stringify(user));
      this.router.navigate(['/products']);
    });
    
  }

}
