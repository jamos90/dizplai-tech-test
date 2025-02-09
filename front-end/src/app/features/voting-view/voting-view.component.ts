import { Component } from '@angular/core';
import { PollOptionComponent } from '../../shared/components/poll-option/poll-option.component';
import { PollsService } from '../../core/services/polls-service/polls.service';
import { CommonModule } from '@angular/common';
import { VoteSubmit } from '../../models/polls/vote-submit.model';
import { Poll } from '../../models/polls/poll.model';
import { Option } from '../../models/polls/option.model';

@Component({
  selector: 'app-voting-view',
  imports: [PollOptionComponent, CommonModule],
  providers: [PollsService],
  templateUrl: './voting-view.component.html',
  styleUrl: './voting-view.component.scss'
})
export class VotingViewComponent {
  constructor(private pollService: PollsService) {}
  poll: Poll;
  selectedOption: Option;
  selectedOptionId: number;

  ngOnInit(): void {
    this.pollService.getAllPolls().subscribe(
      (data: Poll) => this.showData(data),
      (err: any) => console.error(err),
      () => console.log('finished getting data')
    );
  }

  updateSelectedEntry(index: number): void {
    this.selectedOption = this.poll.options[index];
    this.selectedOptionId = this.poll.options[index].id;
  }

  showData(data: Poll): void {
    this.poll = data[0];
  }

  submitVote(): void {
    const voteData: VoteSubmit = {
      pollId: this.poll.id,
      optionId: this.selectedOptionId
    };
    this.pollService.updatePollVotesById(voteData);
  }
}
