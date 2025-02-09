import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';
import { Observable } from 'rxjs';
import { VoteSubmit } from '../../../models/polls/vote-submit.model';

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

  updatePollVotesById(requestBody: VoteSubmit): Observable<any> {
    return this.httpService.put(`polls/${requestBody.pollId}`, requestBody);
  }
}
