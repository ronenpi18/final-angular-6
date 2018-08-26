import * as fromFamilies from '../actions/families.action';
import { IEntityFamilyInstance, IProcessInstance } from '../../models/family.model';
import { convertToEntities } from '../../../utils/ngrx.util';

export interface FamiliesState {
    entities: { [id: number]: IEntityFamilyInstance };
    loaded: boolean;
    loading: boolean;
}

export const initialState: FamiliesState = {
    entities: {},
    loaded: false,
    loading: false
};

export function reducer(
    state = initialState,
    action: fromFamilies.FamiliesAction
): FamiliesState {

    switch(action.type) {
        case fromFamilies.LOAD_FAMILIES: {
            return {
                ...state,
                loading: true
            }
        }

        case fromFamilies.LOAD_FAMILIES_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false
            }
        }

        case fromFamilies.LOAD_FAMILIES_SUCCESS: {
            const instances = action.payload.map(instance => ({
                ...instance,
                processes: convertToEntities<IProcessInstance>('fullId', instance.processes)
            }));
            const entities = convertToEntities<IEntityFamilyInstance>('fullId', instances, state.entities);

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

export const getFamiliesEntities = (state: FamiliesState) => state.entities;
export const getFamiliesLoading = (state: FamiliesState) => state.loading;
export const getFamiliesLoaded = (state: FamiliesState) => state.loaded;