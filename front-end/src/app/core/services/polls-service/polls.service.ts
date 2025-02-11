import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';
import { Observable } from 'rxjs';
import { VoteSubmit } from '../../../models/polls/vote-submit.model';
import { Poll } from '../../../models/polls/poll.model';

@Injectable({
  providedIn: 'root'
})
export class PollsService {
  constructor(private httpService: HttpService) {}

  public getAllPolls(): Observable<Poll> {
    const data = this.httpService.get('polls');
    return data;
  }

  public getPollById(pollId): Observable<Poll> {
    return this.httpService.get(`polls/${pollId}`);
  }

  public updatePollVotesById(requestBody: VoteSubmit): Observable<Object> {
    const updatedPoll: Observable<Object> = this.httpService.put(
      `polls/${requestBody.pollId}/${requestBody.optionId}/vote`,
      requestBody
    );
    console.log('updated poll', updatedPoll);
    return updatedPoll;
  }
}
