import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

export const BASE_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login (data) {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const path = BASE_URL + 'auth/login';
    return this.http.post<{}>(path, data, { headers: reqHeader });
  }

  getUserLogin (token, email) {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token

    });
    const path = BASE_URL + 'api/users/username/' + email;
    return this.http.get<{}>(path, { headers: reqHeader });
  }

  logout(): void {
    let user = JSON.parse(localStorage.getItem('session')) || null;
    if (user){
      const reqHeader = getHeaders();
      const path = BASE_URL + 'logout/';
      this.http.get<{}>(path, { headers: reqHeader }).toPromise().then(response => {});
      localStorage.removeItem('session');
    }
    let url = '/login';
    this.router.navigate([url]);
  }
}

export function getHeaders(opt?){
  let user = JSON.parse(localStorage.getItem('session')) || null;
  let reqHeader;
  if (!opt){
    reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token
    });
  } else {
    reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + user.token
    });
  }
  return reqHeader;
}
