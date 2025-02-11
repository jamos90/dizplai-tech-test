import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-poll-option',
  imports: [CommonModule],
  templateUrl: './poll-option.component.html',
  styleUrl: './poll-option.component.scss'
})
export class PollOptionComponent {
  @Input({ required: true }) entryTitle: string | undefined;
  @Input() selectedClass: string;
  @Output() countVote = new EventEmitter<string>();

  isActive: boolean = false;

  vote() {
    if (this.entryTitle) {
      this.countVote.emit(this.entryTitle);
    }
  }
}
