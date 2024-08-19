import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL, getHeaders } from './site.service';

@Injectable({
  providedIn: 'root'
})
export class BuyService {

  constructor(private http: HttpClient) { }

  view() {
    const reqHeader = getHeaders();
    const path = BASE_URL + 'api/buys';
    return this.http.get<[]>(path, { headers: reqHeader });
  }

  user_view(id) {
    const reqHeader = getHeaders();
    const path = BASE_URL + 'api/buys/user/' + id;
    return this.http.get<[]>(path, { headers: reqHeader });
  }

  create(user_data: {}) {
    const reqHeader = getHeaders();
    const path = BASE_URL + 'api/buys';
    return this.http.post<{}>(path, user_data, { headers: reqHeader });
  }
}
