import { createSelector } from "@ngrx/store";

import * as fromRoot from '../../../state';
import * as fromFeature from '../reducers';
import * as fromData from '../reducers/data.reducer';

export const getDataState = createSelector(
    fromFeature.getStatisticsState,
    (state: fromFeature.StatisticsState) => state.data
);

export const getDataLoaded = createSelector(getDataState, fromData.selectLoaded);
export const getDataLoading = createSelector(getDataState, fromData.selectLoading);
export const getDataEntities = createSelector(getDataState, fromData.selectEntities);
export const getAllData = createSelector(getDataState, fromData.selectAll);