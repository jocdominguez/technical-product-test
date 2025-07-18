import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe, LowerCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { deleteProduct, loadProductsSuccess, selectProducts } from '../../../shared/store/product.store';
import { first, map } from 'rxjs';

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
  private route = inject(ActivatedRoute);
  router = inject(Router);
  store = inject(Store);
  reload = false;

  data: WritableSignal<Product[]> = signal([]);

  openDialog(): void {
    this.router.navigate(['/create-product']);
  }

  ngOnInit() {
    this.reload = this.route.snapshot.queryParams['reload']; 
    if(!this.reload) {
      this.productService.getProducts().subscribe(data => {
        this.data.set(data);
        this.store.dispatch(loadProductsSuccess({ products: data }));
      });
    } else {
      this.store.select(selectProducts).pipe(
        map(products => products),
        first()
      ).subscribe((data: any) => {
        console.log('products', data);
        this.data.set(data);
      });
    }
  }

  deleteItem(item: any) {
    this.store.dispatch(deleteProduct({ product: item }));
    this.store.select(selectProducts).pipe(
        map(products => products),
        first()
      ).subscribe((data: any) => {
        console.log('products', data);
        this.data.set(data);
      });
  }

}
