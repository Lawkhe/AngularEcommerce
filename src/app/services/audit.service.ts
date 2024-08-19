import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL, getHeaders } from './site.service';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  constructor(private http: HttpClient) { }

  view() {
    const reqHeader = getHeaders();
    const path = BASE_URL + 'api/audits';
    return this.http.get<[]>(path, { headers: reqHeader });
  }

  create(data: {}) {
    const reqHeader = getHeaders();
    const path = BASE_URL + 'api/audits';
    return this.http.post<{}>(path, data, { headers: reqHeader });
  }
}
