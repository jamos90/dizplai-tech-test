import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VoteSubmit } from '../../../models/polls/vote-submit.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  private apiBase = 'http://localhost:3100/api';

  get(endPoint: string): Observable<any> {
    return this.httpClient.get(`${this.apiBase}/${endPoint}`);
  }

  put(endPoint: string, body: VoteSubmit) {
    return this.httpClient.put(`${this.apiBase}/${endPoint}`, body);
  }
}
