import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductService } from "../product.service";
import { Product } from "../product.model";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products$: Subscription;

  selectedCategory: string;

  products: Product[];
  categories$: Observable<{ categories: string[] }>;

  constructor(public productService: ProductService) {}
  ngOnDestroy(): void {
    this.products$.unsubscribe();
  }

  ngOnInit(): void {
    this.categories$ = this.productService.getProductCategories();
    this.products$ = this.productService
      .getProducts()
      .subscribe((products) => (this.products = products));
  }

  addProduct(product: Product) {
    this.productService.addItemToShoppingCart(product);
  }

  public categorySelected() {
    this.products$.unsubscribe();
    this.products$ = this.productService
      .getProductsByCategory(this.selectedCategory)
      .subscribe((products) => (this.products = products));
  }
}
