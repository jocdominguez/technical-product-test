import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe, LowerCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadProductsSuccess } from '../../../shared/store/product.store';

interface Product {
 id: number;
 name: string;
 category: string;
 price: number;
}

@Component({
  selector: 'app-products',
  imports: [MatButtonModule, MatMenuModule,MatIconModule,LowerCasePipe, CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class Products implements OnInit {
  private productService = inject(ProductService);
  router = inject(Router);
  store = inject(Store);

  data: WritableSignal<Product[]> = signal([]);

  openDialog(): void {
    this.router.navigate(['/create-product']);
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.data.set(data);
      this.store.dispatch(loadProductsSuccess({ products: data }));
    });
  }

}
