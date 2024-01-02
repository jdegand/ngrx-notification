import { School } from '../../../model/school.model';
import { createActionGroup, props } from '@ngrx/store';

export const schoolActions = createActionGroup({
  source: 'School API',
  events: {
    'Add One School': props<{ school: School }>(),
    'Add All Schools': props<{ schools: School[] }>(),
  },
});