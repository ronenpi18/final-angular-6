import * as fromAlerts from '../actions/alerts.action';
import { IAlertInstance } from '../../models/alert.model';

export interface AlertsState {
    instances: IAlertInstance[];
    loaded: boolean;
    loading: boolean;
}

export const initialState: AlertsState = {
    instances: [],
    loaded: false,
    loading: false
};

export function reducer(
    state = initialState,
    action: fromAlerts.AlertsAction
): AlertsState {

    switch(action.type) {
        case fromAlerts.LOAD_ALERTS: {
            return {
                ...state,
                loading: true
            }
        }

        case fromAlerts.LOAD_ALERTS_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false
            }
        }

        case fromAlerts.LOAD_ALERTS_SUCCESS: {
            return {
                ...state,
                loading: false,
                loaded: true,
                instances: action.payload
            }
        }
    }
    return state;
}

export const getAlerts = (state: AlertsState) => state.instances;
export const getAlertsLoading = (state: AlertsState) => state.loading;
export const getAlertsLoaded = (state: AlertsState) => state.loaded;