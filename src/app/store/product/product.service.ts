import { Product } from "./product.model";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  shoppingCart: Product[];
  constructor() {
    const lsCart = localStorage.getItem("shoppingCart");
    this.shoppingCart = lsCart ? JSON.parse(lsCart) : [];
  }

  getProducts(): Observable<Product[]> {
    return of(
      [1, 2, 3, 4, 5, 6, 7, 8].map((id) => ({
        productId: id,
        productName: "samsung some",
        productPrice: 100,
        productDescription: "some",
        productDiscount: 20,
        productQuantity: 15 - id,
        productCategory: "phone",
        productSeller: "sam",
        productImage:
          "https://d3m9l0v76dty0.cloudfront.net/system/photos/3712313/large/24b5d2d1e40056808b90b20416697270.jpg",
      }))
    );
  }

  getShoppingCart() {
    return this.shoppingCart;
  }

  addItemToShoppingCart(product: Product) {
    if (
      this.shoppingCart
        .map((product) => product.productId)
        .includes(product.productId)
    ) {
      return;
    }

    this.shoppingCart.push(product);
    localStorage.setItem("shoppingCart", JSON.stringify(this.shoppingCart));
  }

  removeProductFromShoppingCart(id: number) {
    this.shoppingCart = this.shoppingCart.filter(
      (product) => product.productId !== id
    );
    localStorage.setItem("shoppingCart", JSON.stringify(this.shoppingCart));
  }
}
