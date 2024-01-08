/* eslint-disable @angular-eslint/component-selector */
import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { StudentSelectors } from './store/student.selectors';
import { Subscription, filter } from 'rxjs';
import { PushService } from 'src/backend/push.service';
import { Push } from 'src/model/push.model';
import { isStudent } from 'src/model/student.model';
import { studentActions } from './store/student.actions';

@Component({
  standalone: true,
  imports: [NgFor, AsyncPipe],
  selector: 'student',
  template: `
    <h3>STUDENTS</h3>
    <div *ngFor="let student of students$ | async">
      {{ student.firstname }} {{ student.lastname }} - {{ student.version }}
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
export class StudentComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  students$ = this.store.select(StudentSelectors.selectStudents);

  private pushService = inject(PushService);
  subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.pushService.notification$
      .pipe(filter(Boolean))
      .subscribe((notification: Push) => {
        if (isStudent(notification)) {
          this.store.dispatch(
            studentActions.addOneStudent({ student: notification })
          );
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

/*

import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { StudentSelectors } from './store/student.selectors';
import { PushService } from 'src/backend/push.service';
import { filter } from 'rxjs';
import { Push } from 'src/model/push.model';
import { isStudent } from 'src/model/student.model';
import { studentActions } from './store/student.actions';

@Component({
  standalone: true,
  imports: [NgFor, AsyncPipe],
  selector: 'student',
  template: `
    <h3>STUDENTS</h3>
    <div *ngFor="let student of students$ | async">
      {{ student.firstname }} {{ student.lastname }} - {{ student.version }}
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
export class StudentComponent implements OnInit {
  private store = inject(Store);
  students$ = this.store.select(StudentSelectors.selectStudents);

  private pushService = inject(PushService)

  ngOnInit() {
    this.pushService.notification$
      .pipe(filter(Boolean))
      .subscribe((notification: Push) => {
        if (isStudent(notification)) {
          console.log('student');
          this.store.dispatch(
            studentActions.addOneStudent({ student: notification })
          );
        }
      })
  }
}
*/
