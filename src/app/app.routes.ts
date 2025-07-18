import { Routes } from '@angular/router';
import { authGuard } from '../shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./auth/login/login.component').then(m => m.Login),
  },
  {
    path: 'products',
    loadComponent: () => import('./products/products/products.component').then(m => m.Products),
    canActivate: [authGuard]
  },
  {
    path: 'create-product',
    loadComponent: () => import('./products/product-create/product-create.component').then(m => m.ProductCreateComponent),
    canActivate: [authGuard]
  }
];
