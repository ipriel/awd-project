import { Component, OnInit, Input } from "@angular/core";
import { Product } from "../product.model";
import { ProductService } from "../product.service";
import { Route, ActivatedRoute } from "@angular/router";
import { switchMap, map } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"],
})
export class ProductDetailComponent implements OnInit {
  public product$: Observable<Product>;

  constructor(
    public productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.product$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get("id")),
      switchMap((id) => this.productService.getProductById(id))
    );
  }

  addToCart(product: Product) {
    this.productService.addItemToShoppingCart(product);
  }

  stringifySpecs(product: Product) {
    return JSON.stringify(product.specs, null, 4);
  }
}
