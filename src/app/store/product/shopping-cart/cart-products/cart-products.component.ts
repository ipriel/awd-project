import { Component, OnInit, OnDestroy } from "@angular/core";
import { Product } from "../../product.model";
import { ProductService } from "../../product.service";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "app-cart-products",
  templateUrl: "./cart-products.component.html",
  styleUrls: ["./cart-products.component.css"],
})
export class CartProductsComponent implements OnInit, OnDestroy {
  shoppingCart$: Subscription;
  shoppingCart: Product[];

  constructor(public productService: ProductService) {}
  ngOnDestroy(): void {
    this.shoppingCart$.unsubscribe();
  }

  ngOnInit(): void {
    this.shoppingCart$ = this.productService
      .getShoppingCart()
      .subscribe((products) => {
        this.shoppingCart = products;
      });
  }

  removeCartProd(product: Product) {
    this.productService.removeProductFromShoppingCart(product._id);

    this.shoppingCart = this.shoppingCart.filter(
      ({ _id }) => _id !== product._id
    );
  }
}
