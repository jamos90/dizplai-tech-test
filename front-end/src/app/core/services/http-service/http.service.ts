import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  private apiBase = 'http://localhost:3100/api';

  get(endPoint: string): Observable<any> {
    return this.httpClient.get(`${this.apiBase}/${endPoint}`);
  }
}
