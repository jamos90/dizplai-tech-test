import { Routes } from '@angular/router';
import { VotingViewComponent } from './features/voting-view/voting-view.component';
import { ResultsViewComponent } from './features/results-view/results-view.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/polls/active', pathMatch: 'full' },
  { path: 'polls/active', component: VotingViewComponent },
  { path: 'polls/:pollId/result', component: ResultsViewComponent },
  { path: '**', component: PageNotFoundComponent }
];
