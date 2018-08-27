import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import * as fromData from '../actions/data.action';
import { IStatisticsInstance } from '../../models/data.model';

export interface DataState extends EntityState<IStatisticsInstance> {
    loading: boolean;
    loaded: boolean;
}
export const dataAdapter: EntityAdapter<IStatisticsInstance> = createEntityAdapter({
    selectId: (entity: IStatisticsInstance) => entity.fullId
});

export const initialState: DataState = dataAdapter.getInitialState({
    loading: false,
    loaded: false
});

export function reducer(
    state = initialState,
    action: fromData.DataAction
): DataState {

    switch(action.type) {
        case fromData.LOAD_DATA: {
            return {
                ...state,
                loading: true
            }
        }

        case fromData.LOAD_DATA_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false
            }
        }

        case fromData.LOAD_DATA_SUCCESS: {
            return dataAdapter.addAll(action.payload, {
                ...state,
                loading: false,
                loaded: true
            });
        }
    }
    return state;
}

export const selectLoading = (state: DataState) => state.entities;
export const selectLoaded = (state: DataState) => state.loading;
export const { selectEntities, selectAll } = dataAdapter.getSelectors();