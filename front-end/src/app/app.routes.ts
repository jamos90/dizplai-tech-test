import { Routes } from '@angular/router';
import { VotingViewComponent } from './features/voting-view/voting-view.component';
import { ResultsViewComponent } from './features/results-view/results-view.component';

export const routes: Routes = [
  { path: 'polls/active', component: VotingViewComponent },
  { path: 'polls/:pollId/result', component: ResultsViewComponent }
];
