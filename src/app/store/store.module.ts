import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AngularMaterialModel } from "../angular-material.module";

import { StoreRoutingModule } from "./store-routing.module";
import { ProductComponent } from "./product/product.component";
import { ProductListComponent } from "./product/product-list/product-list.component";
import { ProductDetailComponent } from "./product/product-detail/product-detail.component";
import { CartProductsComponent } from "./product/shopping-cart/cart-products/cart-products.component";
import { CartCalcComponent } from "./product/shopping-cart/cart-calc/cart-calc.component";
import { CheckoutComponent } from "./product/shopping-cart/checkout/checkout.component";
import { ShippingDetailsComponent } from './product/shopping-cart/checkout/shipping-details/shipping-details.component';
import {SharedModule} from '../shared/shared.module'
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';

// import { StoreComponent } from './store.component';

@NgModule({
  // declarations: [StoreComponent],
  imports: [
    CommonModule, 
    StoreRoutingModule,
    AngularMaterialModel,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductDetailComponent,
    CartProductsComponent,
    CartCalcComponent,
    CheckoutComponent,
    ProductDetailComponent,
    ShippingDetailsComponent,
    
  ],
})
export class StoreModule {}
