import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ConnectionService {
  private connEvents: Subject<boolean>;

  constructor() {
    this.connEvents = new Subject<boolean>();
    window.addEventListener('online', this.handleConnectionChange);
    window.addEventListener('offline', this.handleConnectionChange);
  }

  public get connected(): boolean {
    return window.navigator.onLine;
  }

  get changes(): Observable<boolean> {
    return this.connEvents;
  }

  private handleConnectionChange(event: Event) {
    this.connEvents.next(this.connected);
  }
}
