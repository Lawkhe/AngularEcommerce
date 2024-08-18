import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL, getHeaders } from './site.service';

@Injectable({
  providedIn: 'root'
})
export class PlataformService {

  constructor(private http: HttpClient) { }

  list() {
    const reqHeader = getHeaders(1);
    const path = `${BASE_URL}plataform/`;
    return this.http.get<[]>(path, { headers: reqHeader });
  }

  updateData(id, data: {}) {
    const reqHeader = getHeaders(1);
    const path = BASE_URL + 'plataform/' + id + '/';
    return this.http.put<{}>(path, data, { headers: reqHeader });
  }

}
