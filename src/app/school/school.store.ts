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

  //private readonly effectOnSchools = this.effect(_ => this.schools$.pipe(tap(school => this.store.dispatch(appActions.showAlert({message: 'Schools added', component: 'School'})))));

  // can inject store to dispatch an action
  constructor(private httpService: HttpService) {
    super({ schools: [] });
  }

  // change the updater function to an effect and update the state inside the effect
  addSchool = this.updater((state, school: School) => ({
    ...state,
    schools: [...state.schools, school],
  }));

  updateSchool = this.updater((state, school: School) => ({
    ...state,
    schools: state.schools.map((t) => (t.id === school.id ? school : t)),
  }));

  private readonly loadSchools = this.effect<void>(
    pipe(
      switchMap(() =>
        this.httpService.getAllSchools().pipe(
          tapResponse(
            (schools) => this.patchState({ schools }),
            (_) => _
          )
        )
      )
    )
  );

  ngrxOnStoreInit() {
    this.loadSchools();
  }

  /*
  callEffect(){
    this.store.dispatch(appActions.showAlert({message: 'Loaded schools', component: 'School'}))
  }
  */

}