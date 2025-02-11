import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService]
    });
    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    //verify no outstanding requests
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a get request to a passed endpoint', () => {
    const endPoint = 'api/test';
    const mockResponse = { id: 1, text: 'test' };
    service.get(endPoint).subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['apiBase']}/${endPoint}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    req.flush(mockResponse);
  });

  it('shouldReturnDataFromAPassedEndpoint', () => {
    const endPoint = 'api/test';
    const mockResponse = { id: 1, text: 'test' };
    service.put(endPoint, mockResponse).subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['apiBase']}/${endPoint}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    req.flush(mockResponse);
  });
});
