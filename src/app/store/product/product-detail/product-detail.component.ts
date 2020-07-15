import { Component, OnInit, Input } from "@angular/core";
import { Product } from "../product.model";
import { ProductService } from "../product.service";
import { Route, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"],
})
export class ProductDetailComponent implements OnInit {
  public product: Product;

  constructor(
    public productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const productId = paramMap.get("id");

      this.productService.getProducts().subscribe((products) => {
        this.product = products.find((p) => `${p.productId}` === productId);
      });
    });
  }

  addToCart() {
    this.productService.addItemToShoppingCart(this.product);
  }
}
