import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";

import * as fromData from  "./data.reducer";
import * as fromRanges from  "./ranges.reducer";

export interface StatisticsState {
    data: fromData.DataState,
    ranges: fromRanges.RangesState
}

export const reducers: ActionReducerMap<StatisticsState> = {
    data: fromData.reducer,
    ranges: fromRanges.reducer
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

// ranges state
export const getRangesState = createSelector(
    getStatisticsState,
    (state: StatisticsState) => state.ranges
);

export const getRanges = createSelector(getRangesState, fromRanges.getRanges);
export const getActiveRange = createSelector(getRangesState, fromRanges.getActiveRange);
