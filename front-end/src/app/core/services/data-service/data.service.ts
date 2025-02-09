import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Poll } from '../../../models/polls/poll.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSource = new BehaviorSubject<any>('');
  private currentData = this.dataSource.asObservable();
  constructor() {}

  getData(): Observable<Poll> {
    return this.currentData;
  }
  updateData(data: Poll) {
    this.dataSource.next(data);
  }
}
