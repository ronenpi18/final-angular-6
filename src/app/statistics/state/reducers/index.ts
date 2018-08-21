import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";

import * as fromData from  "./data.reducer";

export interface StatisticsState {
    data: fromData.DataState
}

export const reducers: ActionReducerMap<StatisticsState> = {
    data: fromData.reducer
};

export const getStatisticsState = createFeatureSelector<StatisticsState>(
    'statistics'
);

// data state
export const getDataState = createSelector(
    getStatisticsState,
    (state: StatisticsState) => state.data
);

export const getDataLoaded = createSelector(getDataState, fromData.getDataLoaded);
export const getDataLoading = createSelector(getDataState, fromData.getDataLoading);
export const getDataEntities = createSelector(getDataState, fromData.getDataEntities);

export const getAllData = createSelector(getDataEntities, (entities) => {
    return Object.keys(entities).map(id => entities[id]);
});
