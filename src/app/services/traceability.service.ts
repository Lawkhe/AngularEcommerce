import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL, getHeaders } from './site.service';

@Injectable({
  providedIn: 'root'
})
export class TraceabilityService {

  constructor(private http: HttpClient) { }
}
