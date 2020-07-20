import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "./product.model";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  shoppingCart: Set<string>; // product ids

  constructor(private http: HttpClient) {
    const lsCart = localStorage.getItem("shoppingCart");
    this.shoppingCart = lsCart ? new Set(JSON.parse(lsCart)) : new Set();
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>("/api/product/");
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`/api/product/${id}`);
  }

  getShoppingCart(): Observable<Product[]> {
    const ids = [...this.shoppingCart];

    return this.http.post<Product[]>("/api/product/search", {
      ids,
    });
  }

  addItemToShoppingCart(product: Product) {
    this.shoppingCart.add(product.productID);

    localStorage.setItem(
      "shoppingCart",
      JSON.stringify([...this.shoppingCart.values()])
    );
  }

  removeProductFromShoppingCart(id: string) {
    this.shoppingCart.delete(id);
    localStorage.setItem(
      "shoppingCart",
      JSON.stringify([...this.shoppingCart.values()])
    );
  }
}
