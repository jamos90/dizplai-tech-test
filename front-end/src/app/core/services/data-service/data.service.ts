import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSource = new BehaviorSubject<any>();
  private currentData = this.dataSource.asObservable();

  constructor() {}

  getData(): Observable {
    return this.currentData;
  }

  updateData(data: any) {
    this.dataSource.next(data);
  }
}
