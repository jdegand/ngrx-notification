import { School, isSchool } from '../../model/school.model';
import { Injectable, inject } from '@angular/core';
import {
  ComponentStore,
  OnStoreInit,
  tapResponse,
} from '@ngrx/component-store';
import { pipe, switchMap } from 'rxjs';
import { HttpService } from '../data-access/http.service';
import { TOKEN } from '../token';

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

  private notification$ = inject(TOKEN);

  ngrxOnStateInit() {
    this.addSchools();
  }

  // this adds schools to the list 
  // need to the snackbar alert
  private readonly addSchools = this.effect<void>(
    pipe(
      switchMap(() =>
        this.notification$.pipe(
          tapResponse(
            (data) => { if (data && isSchool(data)) { this.addSchool(data) } },
            (_) => _ // not handling the error
          )
        )
      )
    )
  );

}