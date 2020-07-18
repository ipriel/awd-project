import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { Product } from "../product.model";
import { Observable } from "rxjs";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(public productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.productService
      .getProducts()
  }

  addProduct(product: Product) {
    this.productService.addItemToShoppingCart(product);
  }
}
