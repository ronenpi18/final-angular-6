import { createSelector } from "@ngrx/store";

import * as fromRoot from '../../../state';
import * as fromFeature from '../reducers';
import * as fromData from '../reducers/data.reducer';

export const getDataState = createSelector(
    fromFeature.getStatisticsState,
    (state: fromFeature.StatisticsState) => state.data
);

export const getDataLoaded = createSelector(getDataState, fromData.getDataLoaded);
export const getDataLoading = createSelector(getDataState, fromData.getDataLoading);
export const getDataEntities = createSelector(getDataState, fromData.getDataEntities);

export const getAllData = createSelector(getDataEntities, (entities) => {
    return Object.keys(entities).map(id => entities[id]);
});