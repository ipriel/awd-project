import { Component, OnInit } from "@angular/core";
import { Product } from "../../product.model";
import { ProductService } from "../../product.service";

@Component({
  selector: "app-cart-products",
  templateUrl: "./cart-products.component.html",
  styleUrls: ["./cart-products.component.css"],
})
export class CartProductsComponent implements OnInit {
  constructor(public productService: ProductService) {}

  ngOnInit(): void {}

  removeCartProd(product) {
    console.log("remove prod");
  }
}
