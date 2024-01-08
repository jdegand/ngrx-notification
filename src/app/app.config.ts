import { ApplicationConfig } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { TeacherEffects } from './teacher/store/teacher.effects';
import { StudentEffects } from './student/store/student.effects';
import { provideRouter } from '@angular/router';
import { ROUTES } from './routes';
import { APP_INITIALIZER, inject } from '@angular/core';
import { FakeBackendService } from '../backend/fake-backend.service';
import {
  teacherReducer,
  teachersFeatureKey,
} from './teacher/store/teacher.reducer';
import {
  studentReducer,
  studentsFeatureKey,
} from './student/store/student.reducer';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppEffects } from './app.effects';

const REDUCERS = {
  [teachersFeatureKey]: teacherReducer,
  [studentsFeatureKey]: studentReducer,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(REDUCERS),
    provideEffects([TeacherEffects, StudentEffects, AppEffects]),
    provideRouter(ROUTES),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => {
        const service = inject(FakeBackendService);
        return () => service.start();
      },
    },
    provideAnimations() // for Angular Material
  ],
};

// the same notification service was shared by all components 
/*
{
  provide: APP_INITIALIZER,
  multi: true,
  useFactory: () => {
      const service = inject(NotificationService);
      return () => service.init();
    },
  },
*/

// you can dispatch actions inside the providers array.
// https://ngserve.io/ngrx-tutorial-handling-user-notifications-with/

/*
  {
    provide: APP_INITIALIZER,
    multi: true,
    deps: [ Store ],
    useFactory: (store: Store<any>) => {
      return () => new Promise(resolve => {
        store.dispatch(new NotificationActions.WatchNotificationsAction());
        resolve();
      });
    }
  }
*/