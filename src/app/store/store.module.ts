import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AngularMaterialModel } from "../angular-material.module";

import { StoreRoutingModule } from "./store-routing.module";
import { ShoppingCartComponent } from "./user-profile/shopping-cart/shopping-cart.component";
import { ProductComponent } from "./product/product.component";
import { ProductListComponent } from "./product/product-list/product-list.component";
import { ProductDetailComponent } from "./product/product-detail/product-detail.component";
import { CartProductsComponent } from "./product/shopping-cart/cart-products/cart-products.component";
import { CartCalcComponent } from "./product/shopping-cart/cart-calc/cart-calc.component";
import { CheckoutComponent } from "./product/shopping-cart/checkout/checkout.component";

// import { StoreComponent } from './store.component';

@NgModule({
  // declarations: [StoreComponent],
  imports: [
    CommonModule, 
    StoreRoutingModule,
    AngularMaterialModel],
  declarations: [
    ShoppingCartComponent,
    ProductComponent,
    ProductListComponent,
    ProductDetailComponent,
    CartProductsComponent,
    CartCalcComponent,
    CheckoutComponent,
    ProductDetailComponent,
    
  ],
})
export class StoreModule {}
