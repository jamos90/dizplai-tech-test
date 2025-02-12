import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync
} from '@angular/core/testing';

import { VotingViewComponent } from './voting-view.component';
import { PollsService } from '../../core/services/polls-service/polls.service';
import { Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { Poll } from '../../models/polls/poll.model';
import { of } from 'rxjs';

describe('VotingViewComponent', () => {
  let component: VotingViewComponent;
  let fixture: ComponentFixture<VotingViewComponent>;
  let pollService: jasmine.SpyObj<PollsService>;
  let routingService: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    pollService = jasmine.createSpyObj<PollsService>('PollsService', [
      'getActivePoll',
      'updatePollVotesById'
    ]);

    routingService = jasmine.createSpyObj<Router>('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [VotingViewComponent],
      providers: [
        { provide: PollsService, useValue: pollService },
        { provide: Router, useValue: routingService },
        provideHttpClient(),
        provideRouter([])
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(VotingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
