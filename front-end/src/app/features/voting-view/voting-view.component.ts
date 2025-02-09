import { Component } from '@angular/core';
import { PollOptionComponent } from '../../shared/components/poll-option/poll-option.component';
import { PollsService } from '../../core/services/polls-service/polls.service';
import { CommonModule } from '@angular/common';
import { DataService } from '../../core/services/data-service/data.service';
import { VoteSubmit } from '../../models/polls/vote-submit.model';
import { Poll } from '../../models/polls/poll.model';
import { Option } from '../../models/polls/option.model';

@Component({
  selector: 'app-voting-view',
  imports: [PollOptionComponent, CommonModule],
  providers: [PollsService, DataService],
  templateUrl: './voting-view.component.html',
  styleUrl: './voting-view.component.scss'
})
export class VotingViewComponent {
  constructor(
    private pollService: PollsService,
    private dataService: DataService
  ) {}
  poll: Poll;
  selectedOption: Option;
  selectedOptionId: number;

  ngOnInit() {
    this.pollService.getAllPolls().subscribe(
      (data: any) => this.showData(data),
      (err: any) => console.error(err)
    );
  }

  updateSelectedEntry(index: number) {
    console.log('selected entry', this.poll.options[index]);
    this.selectedOption = this.poll.options[index];
    this.selectedOptionId = this.poll.options[index].id;
  }

  showData(data: any) {
    console.log(data.mockData.polls[0]);
    this.poll = data.mockData.polls[0];
  }

  submitVote() {
    console.log('submitting vote', this.selectedOption);
    const voteData: VoteSubmit = {
      pollId: this.selectedOption.id,
      optionId: this.selectedOptionId
    };
    this.pollService.updatePollVotesById(voteData);
  }
}
