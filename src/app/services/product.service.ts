import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL, getHeaders } from './site.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  view() {
    const reqHeader = getHeaders();
    const path = BASE_URL + 'api/products';
    return this.http.get<[]>(path, { headers: reqHeader });
  }

  create(user_data: {}) {
    const reqHeader = getHeaders();
    const path = BASE_URL + 'api/products';
    return this.http.post<{}>(path, user_data, { headers: reqHeader });
  }

  update(user_data: {}) {
    const reqHeader = getHeaders();
    const path = BASE_URL + 'api/products/' + user_data['id'];
    return this.http.put<{}>(path, user_data, { headers: reqHeader });
  }

  delete(id: number) {
    const reqHeader = getHeaders();
    const path = BASE_URL + 'api/products/' + id;
    return this.http.delete<{}>(path, { headers: reqHeader });
  }
}
