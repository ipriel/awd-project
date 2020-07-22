import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

export interface Coordinates {
  longitude: number;
  latitude: number;
}

@Injectable({
  providedIn: "root",
})
export class ShopService {
  constructor(private http: HttpClient) {}

  public getAddresses() {
    return this.http.get<{ shopAddresses: Coordinates[] }>(
      "/api/shop/addresses"
    );
  }
}
