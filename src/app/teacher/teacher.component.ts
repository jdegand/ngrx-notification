/* eslint-disable @angular-eslint/component-selector */
import { AsyncPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TeacherSelectors } from './store/teacher.selectors';

@Component({
  standalone: true,
  imports: [NgFor, AsyncPipe],
  selector: 'teacher',
  template: `
    <h3>TEACHERS</h3>
    <div *ngFor="let teacher of teacher$ | async">
      {{ teacher.firstname }} {{ teacher.lastname }} - {{ teacher.version }}
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
export class TeacherComponent {
  teacher$ = this.store.select(TeacherSelectors.selectTeachers);

  constructor(private store: Store) {}
}

/*

// This solution is insufficient to have the component only add & notify users when on the teacher page

// You can prevent the start but once you navigate to a route that route will generate notifications until the app is reset

// remove notification service in app.config & use ngOnInit to start 
// need replicate for the other routes as well

  {
    provide: APP_INITIALIZER,
    multi: true,
    useFactory: () => {
      const service = inject(NotificationService);
      return () => service.init();
    },
  },
*/

/*
import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TeacherSelectors } from './store/teacher.selectors';
import { PushService } from 'src/backend/push.service';
import { filter } from 'rxjs';
import { Push } from 'src/model/push.model';
import { isTeacher } from 'src/model/teacher.model';
import { teacherActions } from './store/teacher.actions';

@Component({
  standalone: true,
  imports: [NgFor, AsyncPipe],
  selector: 'teacher',
  template: `
    <h3>TEACHERS</h3>
    <div *ngFor="let teacher of teacher$ | async">
      {{ teacher.firstname }} {{ teacher.lastname }} - {{ teacher.version }}
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
export class TeacherComponent implements OnInit {
  teacher$ = this.store.select(TeacherSelectors.selectTeachers);

  constructor(private store: Store, private pushService: PushService) {}


  // when you switch to new route 
  // you still will see teacher notification
  ngOnInit() {
    this.pushService.notification$
    .pipe(filter(Boolean))
    .subscribe((notification: Push) => {
      if (isTeacher(notification)) {
        console.log('teacher');
        this.store.dispatch(
          teacherActions.addOneTeacher({ teacher: notification })
        );
        }
      })
  }

}
*/