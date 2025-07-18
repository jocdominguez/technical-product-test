import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getProducts() {
    return of([
      { id: 1, name: 'Laptop', category: 'Electronics', price: 1200 },
      { id: 2, name: 'Tablet', category: 'Electronics', price: 600 },
      { id: 3, name: 'Smart tv', category: 'Electronics', price: 800 },
      { id: 4, name: 'Smart watch', category: 'Electronics', price: 200 }
    ])
    .pipe(delay(500));
  }

}
