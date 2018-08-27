import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

import * as fromAlerts from  "./alerts.reducer";
import * as fromTraces from  "./traces.reducer";

export interface RealTimeState {
    alerts: fromAlerts.AlertsState,
    traces: fromTraces.TracesState
}

export const reducers: ActionReducerMap<RealTimeState> = {
    alerts: fromAlerts.reducer,
    traces: fromTraces.reducer
};

export const getRealTimeState = createFeatureSelector<RealTimeState>(
    'realTime'
);
