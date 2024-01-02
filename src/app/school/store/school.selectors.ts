import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SchoolAdapter,
  schoolsFeatureKey,
  SchoolState,
} from './school.reducer';

const selectSchoolState =
  createFeatureSelector<SchoolState>(schoolsFeatureKey);

export const { selectAll } = SchoolAdapter.getSelectors();

const selectSchools = createSelector(selectSchoolState, selectAll);

export const SchoolSelectors = {
  selectSchools,
};