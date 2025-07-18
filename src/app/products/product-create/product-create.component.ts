import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { loadProducts, loadProductsSuccess, ProductState, selectProducts } from '../../../shared/store/product.store';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-create',
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss'
})
export class ProductCreateComponent {
  router = inject(Router);
  store = inject(Store<ProductState>);
  private _snackBar = inject(MatSnackBar);

  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  ngOnInit() {
  this.firstFormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    category: new FormControl(null, [Validators.required]),
  });

  this.secondFormGroup = new FormGroup({
    price: new FormControl(null, [Validators.required]),
  });

  }

  onSave() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      const productData = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value
      };
      console.log('Product Data:', productData);
      this._snackBar.open('Product has been created', 'Close', {
        duration: 2000,
      });
      this.router.navigate(['/products']);
    } else {
      console.error('Form is invalid');
    }
  }
 
}
