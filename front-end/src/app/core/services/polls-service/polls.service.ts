import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';
import { Observable } from 'rxjs';
import { VoteSubmit } from '../../../models/polls/vote-submit.model';
import { Router } from '@angular/router';
import { DataService } from '../data-service/data.service';
import { Poll } from '../../../models/polls/poll.model';

@Injectable({
  providedIn: 'root'
})
export class PollsService {
  constructor(
    private httpService: HttpService,
    private router: Router,
    private dataService: DataService
  ) {}

  public getAllPolls(): Observable<Poll> {
    const data = this.httpService.get('polls');
    console.log(data);
    return data;
  }

  public updatePollVotesById(requestBody: VoteSubmit): void {
    const updateRequest = this.httpService.put(
      `polls/${requestBody.pollId}/${requestBody.optionId}/vote`,
      requestBody
    );
    updateRequest.subscribe(
      (data: Poll) => this.dataService.updateData(data),
      err => console.log(err),
      () => this.router.navigate(['/polls/active/result'])
    );
  }
}
