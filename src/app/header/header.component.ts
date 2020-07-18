import { Component, OnInit, ViewChild } from "@angular/core";
import { MatMenuTrigger } from "@angular/material/menu";
import { RouterLink } from "@angular/router";
import { ProductService } from "../store/product/product.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  isLogedIn: boolean = false;

  onLogIn() {
    this.isLogedIn = true;
  }

  onLogOut() {
    this.isLogedIn = false;
  }

  numOfProd() {
    if (this.productService.shoppingCart.size > 0)
      return this.productService.shoppingCart.size;
  }

  constructor(public productService: ProductService) {}

  ngOnInit(): void {}
}
