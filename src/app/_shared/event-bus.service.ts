import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EventClass } from '../models/event-class.model';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private subject$ = new Subject<EventClass>();

  constructor() { }

  emit(event: EventClass){
    this.subject$.next(event);
  }
  on(eventName: string, action: any): Subscription{
    return this.subject$.pipe(
      filter((event: EventClass) => event.name === eventName),
      map((event: EventClass) => event["value"])
    ).subscribe(action);
  }
}
