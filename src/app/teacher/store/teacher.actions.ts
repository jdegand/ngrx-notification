import { Teacher } from '../../../model/teacher.model';
import { createActionGroup, props } from '@ngrx/store';

export const teacherActions = createActionGroup({
  source: 'Teacher API',
  events: {
    'Add One Teacher': props<{ teacher: Teacher }>(),
    'Add All Teachers': props<{ teachers: Teacher[] }>(),
  },
});