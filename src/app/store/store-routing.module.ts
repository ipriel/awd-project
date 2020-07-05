import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CartProductsComponent } from './product/shopping-cart/cart-products/cart-products.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { CheckoutComponent } from './product/shopping-cart/checkout/checkout.component';

const routes: Routes = [
  /* { path: '', component: StoreComponent } */
  { path: "products", children:[
    {path:'shopping-cart',component: CartProductsComponent},
    {path: 'product-details',component: ProductDetailComponent},
  ] },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreRoutingModule {}
