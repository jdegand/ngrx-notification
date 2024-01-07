import { Push } from '../model/push.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// change notificationSubject to signal?
// No real difference as you would have to convert to an Observable anyway i.e. `toObservable` 
// You need an Observable stream to attach an effect to 
@Injectable({ providedIn: 'root' })
export class PushService {
  private notificationSubject = new BehaviorSubject<Push | undefined>(
    undefined
  );
  notification$ = this.notificationSubject.asObservable();

  pushData(data: Push) {
    this.notificationSubject.next(data);
  }
}