import { School } from '../../../model/school.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { schoolActions } from './school.actions';

export const schoolsFeatureKey = 'Schools';

export type SchoolState = EntityState<School>;

export const SchoolAdapter: EntityAdapter<School> =
    createEntityAdapter<School>();

export const schoolReducer = createReducer(
    SchoolAdapter.getInitialState(),
    on(schoolActions.addOneSchool, (state, { school }) =>
        SchoolAdapter.upsertOne(school, state)
    ),
    on(schoolActions.addAllSchools, (state, { schools }) =>
        SchoolAdapter.setAll(schools, state)
    )
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
    SchoolAdapter.getSelectors();