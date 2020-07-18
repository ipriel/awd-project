import { Component, OnInit } from "@angular/core";
import { Product } from "../../product.model";
import { ProductService } from "../../product.service";
import { Observable } from 'rxjs';

@Component({
  selector: "app-cart-products",
  templateUrl: "./cart-products.component.html",
  styleUrls: ["./cart-products.component.css"],
})
export class CartProductsComponent implements OnInit {
  shoppingCart$: Observable<Product[]>;


  constructor(public productService: ProductService) {}

  ngOnInit(): void {
    this.shoppingCart$ = this.productService.getShoppingCart();
  }

  removeCartProd(product) {
    console.log("remove prod");
  }
}
