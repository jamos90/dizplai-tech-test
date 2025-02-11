import { TestBed } from '@angular/core/testing';
import { PollsService } from './polls.service';
import { HttpService } from '../http-service/http.service';
import { of, throwError } from 'rxjs';

describe('PollsService', () => {
  let service: PollsService;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpService', ['get', 'post']);

    TestBed.configureTestingModule({
      providers: [PollsService, { provide: HttpService, useValue: spy }]
    });
    service = TestBed.inject(PollsService);
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get data from http service', () => {
    const mockPoll = {
      id: 1,
      name: 'test',
      description: 'est-poll',
      totalVotes: 0,
      options: []
    };
    httpServiceSpy.get.and.returnValue(of(mockPoll));

    service.getAllPolls().subscribe(data => expect(data).toEqual(mockPoll));
    expect(httpServiceSpy.get).toHaveBeenCalled();
  });

  it('should post data to http service put request', () => {
    const mockPoll = {
      id: 1,
      name: 'test',
      description: 'est-poll',
      totalVotes: 0,
      options: []
    };
    httpServiceSpy.put.and.returnValue(of(mockPoll));

    service.updatePollVotesById({ optionId: 1, pollId: 1 }).subscribe();
    // expect(httpServiceSpy.get).toHaveBeenCalledOnceWith({});
  });
});
