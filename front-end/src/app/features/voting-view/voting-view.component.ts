import { Component } from '@angular/core';
import { PollOptionComponent } from '../../shared/components/poll-option/poll-option.component';
import { PollsService } from '../../core/services/polls-service/polls.service';

@Component({
  selector: 'app-voting-view',
  imports: [PollOptionComponent],
  providers: [PollsService],
  templateUrl: './voting-view.component.html',
  styleUrl: './voting-view.component.scss'
})
export class VotingViewComponent {
  constructor(private pollService: PollsService) {}
  poll = {
    name: 'test-poll',
    entries: [
      {
        name: 'test-entry-1',
        votes: 0
      },
      {
        name: 'test-entry-2',
        votes: 0
      }
    ]
  };

  ngOnInit() {
    this.pollService.getAllPolls().subscribe(
      (data: any) => this.showData(data),
      (err: any) => console.error(err)
    );
  }

  updateSelectedEntry(index: number) {
    console.log('selected entry', this.poll.entries[index]);
  }

  showData(data: any) {
    console.log(data.mockData.polls[0]);
    this.poll = data.mockData.polls[0];
  }
}
