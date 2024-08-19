import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL, getHeaders } from './site.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(
    private datePipe: DatePipe,
    private http: HttpClient
  ) { }

  view() {
    const reqHeader = getHeaders();
    const path = BASE_URL + 'api/discounts';
    return this.http.get<[]>(path, { headers: reqHeader });
  }

  getDate() {
    const reqHeader = getHeaders();
    let date = this.datePipe.transform(new Date(), "yyyy-MM-dd")
    console.log(date)
    const path = BASE_URL + 'api/discounts/for-date?date=' + date;
    return this.http.get<[]>(path, { headers: reqHeader });
  }

  create(user_data: {}) {
    const reqHeader = getHeaders();
    const path = BASE_URL + 'api/discounts';
    return this.http.post<{}>(path, user_data, { headers: reqHeader });
  }

  update(user_data: {}) {
    const reqHeader = getHeaders();
    const path = BASE_URL + 'api/discounts/' + user_data['id'];
    return this.http.put<{}>(path, user_data, { headers: reqHeader });
  }

  delete(id: number) {
    const reqHeader = getHeaders();
    const path = BASE_URL + 'api/discounts/' + id;
    return this.http.delete<{}>(path, { headers: reqHeader });
  }
}
