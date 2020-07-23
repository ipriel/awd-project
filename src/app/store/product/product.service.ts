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

  getProductsByCategory(category: string = ""): Observable<Product[]> {
    return this.http.get<Product[]>(`/api/product/byCategory/${category}`);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`/api/product/${id}`);
  }

  getProductCategories() {
    return this.http.get<{ categories: string[] }>(
      "/api/product-meta/categories"
    );
  }

  getShoppingCart(): Observable<Product[]> {
    const ids = [...this.shoppingCart];

    return this.http.post<Product[]>("/api/product/search", {
      ids,
    });
  }

  addItemToShoppingCart(product: Product) {
    this.shoppingCart.add(product._id);

    localStorage.setItem(
      "shoppingCart",
      JSON.stringify([...this.shoppingCart.values()])
    );
  }

  public removeProductFromShoppingCart(id: string) {
    this.shoppingCart.delete(id);
    localStorage.setItem(
      "shoppingCart",
      JSON.stringify([...this.shoppingCart.values()])
    );
  }
}
