/* eslint-disable @angular-eslint/component-selector */
import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
//import { provideComponentStore } from '@ngrx/component-store';
//import { SchoolStore } from './school.store';
import { Store } from '@ngrx/store';
import { SchoolSelectors } from './store/school.selectors';
import { Subscription, filter } from 'rxjs';
import { PushService } from 'src/backend/push.service';
import { Push } from 'src/model/push.model';
import { isSchool } from 'src/model/school.model';
import { schoolActions } from './store/school.actions';

@Component({
  standalone: true,
  imports: [NgFor, AsyncPipe],
  providers: [], // provideComponentStore(SchoolStore)
  selector: 'school',
  template: `
    <h3>SCHOOL</h3>
    <div *ngFor="let school of school$ | async">
      {{ school.name }} - {{ school.version }}
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: fit-content;
        height: fit-content;
        border: 1px solid red;
        padding: 4px;
      }
    `,
  ],
})
export class SchoolComponent implements OnInit, OnDestroy {
  // private store = inject(SchoolStore);
  // school$ = this.store.schools$;
  private store = inject(Store);
  school$ = this.store.select(SchoolSelectors.selectSchools);

  private pushService = inject(PushService);
  subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.pushService.notification$
      .pipe(filter(Boolean))
      .subscribe((notification: Push) => {
        if (isSchool(notification)) {
          this.store.dispatch(
            schoolActions.addOneSchool({ school: notification })
          );
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}