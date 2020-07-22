import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CartProductsComponent } from "./product/shopping-cart/cart-products/cart-products.component";
import { ProductDetailComponent } from "./product/product-detail/product-detail.component";
import { CheckoutComponent } from "./product/shopping-cart/checkout/checkout.component";
import { ProductListComponent } from "./product/product-list/product-list.component";
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  /* { path: '', component: StoreComponent } */
  {
    path: "products",
    children: [
      { path: "", component: ProductListComponent },
      { path: "shopping-cart", component: CartProductsComponent },
      { path: "product-details/:id", component: ProductDetailComponent },
    ],
    }, { path: "user" ,component: UserProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreRoutingModule {}
