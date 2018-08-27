import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import * as fromFamilies from '../actions/families.action';
import { IFamilyInstance } from '../../models/family.model';

export interface FamiliesState extends EntityState<IFamilyInstance> {
    loading: boolean;
    loaded: boolean;
}

export const familiesAdapter: EntityAdapter<IFamilyInstance> = createEntityAdapter({
    selectId: (entity: IFamilyInstance) => entity.fullId
});

export const initialState: FamiliesState = familiesAdapter.getInitialState({
    loading: false,
    loaded: false
});

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
            return familiesAdapter.addAll(action.payload, {
                ...state,
                loading: false,
                loaded: true
            });
        }
    }
    return state;
}

export const selectLoading = (state: FamiliesState) => state.loading;
export const selectLoaded = (state: FamiliesState) => state.loaded;
export const { selectEntities, selectAll } = familiesAdapter.getSelectors();