import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-poll-option',
  imports: [],
  templateUrl: './poll-option.component.html',
  styleUrl: './poll-option.component.scss'
})
export class PollOptionComponent {
  @Input({ required: true }) entryTitle: string | undefined;
  @Output() countVote = new EventEmitter<string>();

  vote() {
    console.log('voting');
    this.countVote.emit(this.entryTitle);
  }
}
