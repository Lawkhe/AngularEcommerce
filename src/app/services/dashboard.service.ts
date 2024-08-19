import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL, getHeaders } from './site.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getActiveProducts() {
    const reqHeader = getHeaders();
    const path = BASE_URL + 'api/dashboard/active-products';
    return this.http.get<[]>(path, { headers: reqHeader });
  }

  getProductsCount() {
    const reqHeader = getHeaders();
    const path = BASE_URL + 'api/dashboard/product-counts';
    return this.http.get<[]>(path, { headers: reqHeader });
  }

  getTopProducts() {
    const reqHeader = getHeaders();
    const path = BASE_URL + 'api/dashboard/top-selling-products';
    return this.http.get<[]>(path, { headers: reqHeader });
  }

  getTopUsers() {
    const reqHeader = getHeaders();
    const path = BASE_URL + 'api/dashboard/top-frequent-users';
    return this.http.get<[]>(path, { headers: reqHeader });
  }
}
