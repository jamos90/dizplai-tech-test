import { Component } from '@angular/core';
import { PollResultComponent } from '../../shared/components/poll-result/poll-result.component';
import { Poll } from '../../models/polls/poll.model';
import { PollsService } from '../../core/services/polls-service/polls.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-results-view',
  imports: [PollResultComponent],
  templateUrl: './results-view.component.html',
  styleUrl: './results-view.component.scss'
})
export class ResultsViewComponent {
  constructor(
    private pollService: PollsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  poll: Poll;
  pollId: String;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.pollId = params.get('pollId');
      this.fetchData(this.pollId);
    });
  }

  fetchData(pollId) {
    console.log(pollId);
    this.pollService.getPollById(pollId).subscribe(
      (poll: Poll) => (this.poll = poll[0]),
      err => console.log(`Error fetching poll with id ${pollId}`, err),
      () => 'Finished fetching poll by id'
    );
  }

  returnToVoteScreen() {
    this.router.navigate(['polls/active']);
  }
}
