import { createSelector } from "@ngrx/store";

import * as fromFeature from '../reducers';
import * as fromAlerts from '../reducers/alerts.reducer';

export const getAlertsState = createSelector(
    fromFeature.getRealTimeState,
    (state: fromFeature.RealTimeState) => state.alerts
);

export const getAlertsLoaded = createSelector(getAlertsState, fromAlerts.getAlertsLoaded);
export const getAlertsLoading = createSelector(getAlertsState, fromAlerts.getAlertsLoading);
export const getAllAlerts = createSelector(getAlertsState, fromAlerts.getAlerts);