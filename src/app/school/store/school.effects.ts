import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { appActions } from '../../app.actions';
import { HttpService } from '../../data-access/http.service';
import { schoolActions } from './school.actions';

@Injectable()
export class SchoolEffects {
  private actions$ = inject(Actions);
  private httpService = inject(HttpService);

  loadSchools$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.initApp),
      switchMap(() =>
        this.httpService
          .getAllSchools()
          .pipe(map((schools) => schoolActions.addAllSchools({ schools })))
      )
    )
  );

  addSchool$ = createEffect(() =>
  this.actions$.pipe(
    ofType(schoolActions.addOneSchool),
    map(action =>
      appActions.showAlert({
        message: "Add 1 School",
        component: "School"
      })
    )
  )
);


}