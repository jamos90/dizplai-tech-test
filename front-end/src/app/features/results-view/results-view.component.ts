import { Component } from '@angular/core';
import { PollResultComponent } from '../../shared/components/poll-result/poll-result.component';
import { DataService } from '../../core/services/data-service/data.service';
import { Poll } from '../../models/polls/poll.model';

@Component({
  selector: 'app-results-view',
  imports: [PollResultComponent],
  templateUrl: './results-view.component.html',
  styleUrl: './results-view.component.scss'
})
export class ResultsViewComponent {
  constructor(private dataService: DataService) {}
  poll: Poll;
  data = {
    name: 'premier-league-pool',
    totalVotes: 7,
    options: [
      {
        name: 'Man City',
        voteCount: 4,
        votes: [
          {
            id: '1',
            timeStamp: new Date().toISOString()
          },
          {
            id: '2',
            timeStamp: new Date().toISOString()
          },
          {
            id: '3',
            timeStamp: new Date().toISOString()
          },
          {
            id: '4',
            timeStamp: new Date().toISOString()
          }
        ]
      },
      {
        name: 'Man U',
        voteCount: 3,
        votes: [
          {
            id: '1',
            timeStamp: new Date().toISOString()
          },
          {
            id: '2',
            timeStamp: new Date().toISOString()
          },
          {
            id: '3',
            timeStamp: new Date().toISOString()
          }
        ]
      }
    ]
  };

  ngOnInit(): void {
    this.dataService.getData().subscribe(
      (data: Poll) => this.handleSuccessCase(data),
      (err: Error) => this.handleErrorCase(err),
      () => console.log('Data fetched')
    );
  }

  handleErrorCase(err: Error): void {
    console.error('Error fetching updated poll from service', err.message);
  }

  handleSuccessCase(data: Poll): void {
    console.log(data);
    this.poll = data;
  }
}
