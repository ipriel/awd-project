import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataPoint } from '../shared/types';
import { SelectOption } from '../shared/types';
import { Product } from '../shared/types';
import { ProductMeta } from '../shared/types';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // get today's income
  getTodaysIncome(): Observable<number> {
    return this.http.get<number>('/api/order/analytics/income/today');
  };

  // get products sum
  getProductsSum(): Observable<number> {
    return this.http.get<number>('/api/product/count');
  };

// get registered users
getRegisteredUsers(): Observable<number> {
  return this.http.get<number>('/api/user/count/registered');
};

// get people online
getPeopleOnline(): Observable<number> {
  return this.http.get<number>('/api/user/count/visitors');
};

// get recent daily income
getDailyIncome(): Observable<DataPoint[]> {
  return this.http.get<DataPoint[]>('/api/order/analytics/income/daily');
};

// get shop products (id and name only)
getProducts(): Observable<SelectOption[]> {
  return this.http.get<SelectOption[]>('/api/product/select');
};

// get meta products (id and name only)
getMetaProducts(): Observable<SelectOption[]> {
  return this.http.get<SelectOption[]>('/api/product-meta/select');
};

// get product by id
getProductById(objectId): Observable<Product> {
  return this.http.get<Product>(`/api/product/${objectId}`);
};

// get meta product by id
getMetaProductById(objectId): Observable<ProductMeta> {
  return this.http.get<ProductMeta>(`/api/product-meta/${objectId}`);
};

// delete product from
deleteProduct(objectId) {
  return this.http.delete(`/api/product/delete/${objectId}`);
};

// update product
updateProduct(product: Product) {
  return this.http.post(`/api/product/update/${product._id}`, product);
};

// save new product
saveNewProduct(product: Product) {
  return this.http.post(`/api/product/save`, product);
};

constructor(private http: HttpClient) { }

}
