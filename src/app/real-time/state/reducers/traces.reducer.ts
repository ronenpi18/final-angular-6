import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import * as fromTraces from '../actions/traces.action';
import { ITrace } from '../../models/trace.model';

export interface TracesState extends EntityState<ITrace> {
    loading: boolean;
    loaded: boolean;
}

export const tracesAdapter: EntityAdapter<ITrace> = createEntityAdapter({
    selectId: (entity: ITrace) => entity.fullId
});

export const initialState: TracesState = tracesAdapter.getInitialState({
    loading: false,
    loaded: false
});

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
            return tracesAdapter.addAll(action.payload, {
                ...state,
                loading: false,
                loaded: true
            });
        }
    }
    return state;
}

export const selectLoading = (state: TracesState) => state.loading;
export const selectLoaded = (state: TracesState) => state.loaded;
export const { selectEntities, selectAll } = tracesAdapter.getSelectors();