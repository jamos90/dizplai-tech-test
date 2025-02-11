import { Component } from '@angular/core';
import { PollOptionComponent } from '../../shared/components/poll-option/poll-option.component';
import { PollsService } from '../../core/services/polls-service/polls.service';
import { CommonModule } from '@angular/common';
import { VoteSubmit } from '../../models/polls/vote-submit.model';
import { Poll } from '../../models/polls/poll.model';
import { Option } from '../../models/polls/option.model';
import { DataService } from '../../core/services/data-service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-voting-view',
  imports: [PollOptionComponent, CommonModule],
  providers: [PollsService],
  templateUrl: './voting-view.component.html',
  styleUrl: './voting-view.component.scss'
})
export class VotingViewComponent {
  constructor(
    private pollService: PollsService,
    private dataService: DataService,
    private router: Router
  ) {}
  poll: Poll;
  selectedOption: Option;
  selectedIndex: number;

  ngOnInit(): void {
    this.pollService.getAllPolls().subscribe(
      (data: Poll) => this.showData(data),
      (err: any) => console.error(err),
      () => console.log('finished getting data')
    );
  }

  updateSelectedEntry(index: number): void {
    if (index === this.selectedIndex) {
      this.selectedIndex = undefined;
    } else {
      this.selectedOption = this.poll.options[index];
      this.selectedIndex = index;
    }
  }

  showData(data: Poll): void {
    this.poll = data[0];
  }

  submitVote(): void {
    const voteData: VoteSubmit = {
      pollId: this.poll.id,
      optionId: this.selectedOption.id
    };
    this.pollService.updatePollVotesById(voteData).subscribe(
      (UpdatedPoll: Poll) => this.navigateToResults(UpdatedPoll),
      err => console.log('error getting updated poll', err),
      () => console.log('Observable complete')
    );
  }

  navigateToResults(updatedPoll: Poll): void {
    this.router.navigate([`/polls/${updatedPoll.id}/result`]);
  }
}
