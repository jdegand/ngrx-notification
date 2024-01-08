import { School } from '../../model/school.model';
import { Injectable } from '@angular/core';
import {
  ComponentStore,
  OnStoreInit,
  tapResponse,
} from '@ngrx/component-store';
import { pipe, switchMap } from 'rxjs';
import { HttpService } from '../data-access/http.service';

// Component Store has no actions 
// can't have an effect that listens to an action
@Injectable()
export class SchoolStore
  extends ComponentStore<{ schools: School[] }>
  implements OnStoreInit {
  readonly schools$ = this.select((state) => state.schools);

  constructor(private httpService: HttpService) {
    super({ schools: [] });
  }

  addSchool = this.updater((state, school: School): { schools: School[] } => ({
    ...state,
    schools: [...state.schools, school],
  }));

  updateSchool = this.updater((state, school: School): { schools: School[] } => ({
    ...state,
    schools: state.schools.map((t) => (t.id === school.id ? school : t)),
  }));

  private readonly loadSchools = this.effect<void>(
    pipe(
      switchMap(() =>
        this.httpService.getAllSchools().pipe(
          tapResponse(
            (schools) => this.patchState({ schools }),
            (_) => _ // not handling the error
          )
        )
      )
    )
  );

  ngrxOnStoreInit() {
    this.loadSchools();
  }

  /*
  // use inject for the injection token

  ngrxOnStateInit(){
    // use the injection token here -> read the notification stream and call addSchool when isSchool ?
    this.addSchool();
  }

  private readonly addSchool = this.effect<void>(
    pipe(
      switchMap(() =>
        notification$.pipe(
          tapResponse(
            (data) => {
              if(isSchool(data)){
                this.addSchool(data),
              }
            },
            (_) => _ // not handling the error
          )
        )
      )
    )
  );


  */

}