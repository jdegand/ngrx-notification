import { createActionGroup, emptyProps, props } from '@ngrx/store';

// This is the global actions
// add the snackBarAlert here ?
export const appActions = createActionGroup({
  source: 'App Component',
  events: {
    'Init App': emptyProps(),
    'Show Alert': props<{ message: string, component: string }>(),
    'Empty Alert': emptyProps()
  },
});