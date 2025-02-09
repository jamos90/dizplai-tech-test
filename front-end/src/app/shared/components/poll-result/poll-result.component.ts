import { Component } from '@angular/core';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

@Component({
  selector: 'app-poll-result',
  imports: [ProgressBarComponent],
  templateUrl: './poll-result.component.html',
  styleUrl: './poll-result.component.sass'
})
export class PollResultComponent {}
