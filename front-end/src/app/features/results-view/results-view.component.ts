import { Component } from '@angular/core';
import { PollResultComponent } from '../../shared/components/poll-result/poll-result.component';

@Component({
  selector: 'app-results-view',
  imports: [PollResultComponent],
  templateUrl: './results-view.component.html',
  styleUrl: './results-view.component.scss'
})
export class ResultsViewComponent {
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
}
