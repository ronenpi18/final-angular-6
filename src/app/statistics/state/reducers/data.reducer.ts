import * as fromData from '../actions/data.action';
import { IStatisticsInstance } from '../../models/data.model';

export interface DataState {
    entities: { [id: number]: IStatisticsInstance };
    loaded: boolean;
    loading: boolean;
}

export const initialState: DataState = {
    entities: {},
    loaded: false,
    loading: false
};

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
            const instances = action.payload;
            const entities = instances.reduce(
                (entities: { [id: number]: IStatisticsInstance }, instance: IStatisticsInstance) => {
                    return {
                        ...entities,
                        [instance.fullId]: instance
                    }
                },
                {
                    ...state.entities
                }
            );

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

export const getDataEntities = (state: DataState) => state.entities;
export const getDataLoading = (state: DataState) => state.loading;
export const getDataLoaded = (state: DataState) => state.loaded;