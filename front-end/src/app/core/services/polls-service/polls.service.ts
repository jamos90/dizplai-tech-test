import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PollsService {
  constructor(private httpService: HttpService) {}

  getAllPolls(): Observable<any> {
    const data = this.httpService.get('polls');
    console.log(data);
    return data;
  }
}
