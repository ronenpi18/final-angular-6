import { createSelector } from "@ngrx/store";

import * as fromFeature from '../reducers';
import * as fromTraces from '../reducers/traces.reducer';

export const getTracesState = createSelector(
    fromFeature.getRealTimeState,
    (state: fromFeature.RealTimeState) => state.traces
);

export const getTracesLoaded = createSelector(getTracesState, fromTraces.getTracesLoaded);
export const getTracesLoading = createSelector(getTracesState, fromTraces.getTracesLoading);
export const getTracesEntities = createSelector(getTracesState, fromTraces.getTracesEntities);

export const getAllTraces = createSelector(getTracesEntities, (entities) => {
    return Object.keys(entities).map(id => entities[id]);
});