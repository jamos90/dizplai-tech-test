import { Component } from '@angular/core';
import { PollOptionComponent } from '../../shared/components/poll-option/poll-option.component';
import { PollsService } from '../../core/services/polls-service/polls.service';
import { CommonModule } from '@angular/common';
import { DataService } from '../../core/services/data-service/data.service';

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
  poll;
  selectedEntry;
  selectedId;

  ngOnInit() {
    this.pollService.getAllPolls().subscribe(
      (data: any) => this.showData(data),
      (err: any) => console.error(err)
    );
  }

  updateSelectedEntry(index: number) {
    console.log('selected entry', this.poll.entries[index]);
    this.selectedEntry = this.poll.entries[index];
    this.selectedId = index;
    // this.updateDataService(this.selectedEntry);
  }

  showData(data: any) {
    console.log(data.mockData.polls[0]);
    this.poll = data.mockData.polls[0];
  }

  // updateDataService(data: any) {
  //   this.dataService.updateData(this.selectedEntry);
  // }
}
