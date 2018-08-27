import * as fromTraces from '../actions/traces.action';
import { ITrace } from '../../models/trace.model';
import { convertToEntities } from '../../../utils/ngrx.util';

export interface TracesState {
    entities: { [id: number]: ITrace };
    loaded: boolean;
    loading: boolean;
}

export const initialState: TracesState = {
    entities: {},
    loaded: false,
    loading: false
};

export function reducer(
    state = initialState,
    action: fromTraces.TracesAction
): TracesState {

    switch(action.type) {
        case fromTraces.LOAD_TRACES: {
            return {
                ...state,
                loading: true
            }
        }

        case fromTraces.LOAD_TRACES_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false
            }
        }

        case fromTraces.LOAD_TRACES_SUCCESS: {
            const instances = action.payload;
            const entities = convertToEntities<ITrace>('fullId', instances, state.entities);

            return {
                ...state,
                loading: false,
                loaded: true,
                entities
            }
        }
    }
    return state;
}

export const getTracesEntities = (state: TracesState) => state.entities;
export const getTracesLoading = (state: TracesState) => state.loading;
export const getTracesLoaded = (state: TracesState) => state.loaded;