import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ResultsViewComponent } from './results-view.component';
import { PollsService } from '../../core/services/polls-service/polls.service';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Poll } from '../../models/polls/poll.model';

describe('ResultsViewComponent', () => {
  let component: ResultsViewComponent;
  let fixture: ComponentFixture<ResultsViewComponent>;
  let pollService: jasmine.SpyObj<PollsService>;

  beforeEach(async () => {
    pollService = jasmine.createSpyObj<PollsService>('PollsService', [
      'getActivePoll',
      'updatePollVotesById',
      'getPollById'
    ]);

    await TestBed.configureTestingModule({
      imports: [ResultsViewComponent, RouterTestingModule],
      providers: [
        { provide: PollsService, useValue: pollService },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => {
                if (key === 'pollId') return '1';
                return null;
              }
            })
          }
        },
        provideHttpClient()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make a request to the poll service', fakeAsync(() => {
    const mockData = [
      {
        id: 1,
        name: 'test',
        status: 'active',
        description: 'test',
        totalVotes: 0,
        options: []
      }
    ];
    pollService.getPollById.and.returnValue(of(mockData));
    component.ngOnInit();
    tick();
    expect(pollService.getPollById).toHaveBeenCalledWith('1');
    expect(component.poll).toEqual(mockData[0]);
  }));

  it('should create result elements that match the number of options', fakeAsync(() => {
    const mockData: Poll[] = [
      {
        id: 1,
        name: 'test',
        status: 'active',
        description: 'test',
        totalVotes: 0,
        options: [
          {
            id: 1,
            name: 'test-1',
            voteCount: 0,
            votes: []
          },
          {
            id: 2,
            name: 'test-2',
            voteCount: 0,
            votes: []
          }
        ]
      }
    ];
    pollService.getPollById.and.returnValue(of(mockData));
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    const resultContainers = withPollResultOptions();

    expect(resultContainers.length).toBe(mockData[0].options.length);
    expect(pollService.getPollById).toHaveBeenCalledWith('1');
  }));

  it('should not add data to poll if error thrown', fakeAsync(() => {
    const error = {
      status: 404,
      message: 'Poll not found'
    };
    pollService.getPollById.and.returnValue(throwError(error));
    component.ngOnInit();
    tick();

    const resultContainers = withPollResultOptions();
    expect(pollService.getPollById).toHaveBeenCalledWith('1');
    expect(component.poll).toEqual(undefined);
    expect(resultContainers.length).toBe(0);
  }));

  function withPollResultOptions() {
    return fixture.debugElement.queryAll(
      By.css('.results-container app-poll-result')
    );
  }
});
