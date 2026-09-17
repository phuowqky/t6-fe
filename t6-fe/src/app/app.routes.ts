import { Routes } from '@angular/router';
import { ProductComponent } from './features/product/product.component';
import { ProductDetailComponent } from './features/product-detail/product-detail.component';
import { ProductFormComponent } from './features/product-form/product-form.component';


export const routes: Routes = [
  {
    path: 'product',
    component: ProductComponent
  },

  {
    path: 'products/:id',
    component: ProductDetailComponent
  },

  {
  path: 'products/create',
  component: ProductFormComponent
 }
];
