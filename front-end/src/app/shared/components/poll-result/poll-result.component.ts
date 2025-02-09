import { Component, Input } from '@angular/core';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

@Component({
  selector: 'app-poll-result',
  imports: [ProgressBarComponent],
  templateUrl: './poll-result.component.html',
  styleUrl: './poll-result.component.scss'
})
export class PollResultComponent {
  @Input() option: any;
  @Input() totalVotes: number;

  percentageOfTotalVotes: number;

  ngOnInit() {
    const percentageOfVote = this.calculatePercentageOfVote();
    this.percentageOfTotalVotes = percentageOfVote;
  }

  calculatePercentageOfVote() {
    console.log(Math.round((this.option.voteCount / this.totalVotes) * 100));
    return Math.round((this.option.voteCount / this.totalVotes) * 100);
  }
}
