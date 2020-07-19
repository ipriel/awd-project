import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataPoint, Product, ProductMeta, SelectOption } from '../shared/types';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // get today's income
  getTodaysIncome(): Observable<{data: number}> {
    return this.http.get<{data: number}>('/api/order/analytics/income/today');
  };

  // get products sum
  getProductsSum(): Observable<{data: number}> {
    return this.http.get<{data: number}>('/api/product/count');
  };

// get registered users
getRegisteredUsers(): Observable<{data: number}> {
  return this.http.get<{data: number}>('/api/user/count/registered');
};

// get people online
getPeopleOnline(): Observable<{data: number}> {
  return this.http.get<{data: number}>('/api/user/count/visitors');
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
  return this.http.delete(`/api/product/${objectId}`);
};

// update product
updateProduct(product: Product) {
  return this.http.put(`/api/product/${product._id}`, product);
};

// save new product
saveNewProduct(product: Product) {
  return this.http.post(`/api/product`, product);
};

constructor(private http: HttpClient) { }

}
