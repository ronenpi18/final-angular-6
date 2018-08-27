import { createSelector } from "@ngrx/store";

import * as fromFeature from '../reducers';
import * as fromTraces from '../reducers/traces.reducer';

export const getTracesState = createSelector(
    fromFeature.getRealTimeState,
    (state: fromFeature.RealTimeState) => state.traces
);

export const getTracesLoaded = createSelector(getTracesState, fromTraces.selectLoaded);
export const getTracesLoading = createSelector(getTracesState, fromTraces.selectLoading);
export const getTracesEntities = createSelector(getTracesState, fromTraces.selectEntities);
export const getAllTraces = createSelector(getTracesState, fromTraces.selectAll);