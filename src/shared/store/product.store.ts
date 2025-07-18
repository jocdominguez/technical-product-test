import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from '@ngrx/store';

export interface ProductState {
  products: any; // Replace `any` with your product model
  loading: boolean;
}

export const initialProductState: ProductState = {
  products: [],
  loading: false,
};

// Define an action for loading products
export const loadProducts = createAction(
  '[Products] Load Products'
);

// Define an action for loading products success
export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: any[] }>() // Replace `any[]` with your product model
);

// Define an action for loading products failure
export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: any }>()
);

export const deleteProduct = createAction(
  '[Products] Delete product',
  props<{ product: any }>()
);

// Create the reducer
export const productReducer = createReducer(
  initialProductState,
  on(loadProductsSuccess, (state: ProductState, { products }) => ({
    ...state,
    loading: true,
    products: state.products.concat(products) 
  })),
  on(loadProducts, (state: ProductState) => ({
    ...state,
    loading: false,
    products: [],
  })),
  on(deleteProduct, (state: ProductState, { product }) => ({
    ...state,
    loading: true,
    products: state.products.filter((p: any) => p.id !== product.id),
  }))
);

export const selectProductState = createFeatureSelector<ProductState>('products');

// Selector to check if the user is authenticated
export const selectProducts = createSelector(
  selectProductState,
  (state: ProductState) => state.products
);