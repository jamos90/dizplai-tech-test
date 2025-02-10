import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-poll-result',
  imports: [],
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
    return this.totalVotes === 0 || this.option.totalVotes === 0
      ? 0
      : Math.round((this.option.totalVotes / this.totalVotes) * 100);
  }
}
