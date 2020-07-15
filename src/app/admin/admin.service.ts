import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataPoint } from '../shared/types';

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

constructor(private http: HttpClient) { }

}
