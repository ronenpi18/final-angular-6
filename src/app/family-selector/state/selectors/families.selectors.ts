import { createFeatureSelector, createSelector } from "@ngrx/store";

import * as fromRoot from '../../../state';
import * as fromFeature from '../reducers';
import * as fromFamilies from '../reducers/families.reducer';
import { IFamilyInstance, IProcessInstance } from "../../models/family.model";

export const getFamiliesState = createFeatureSelector<fromFeature.FamiliesState>(
    'families'
);

export const getFamiliesLoaded = createSelector(getFamiliesState, fromFamilies.selectLoaded);
export const getFamiliesLoading = createSelector(getFamiliesState, fromFamilies.selectLoading);
export const getFamiliesEntities = createSelector(getFamiliesState, fromFamilies.selectEntities);
export const getAllFamilies = createSelector(getFamiliesState, fromFamilies.selectAll);

export const getSelectedFamiliy = createSelector(
    getFamiliesEntities,
    fromRoot.getRouterState,
    (entities, router): IFamilyInstance => {
        return router.state && entities[router.state.params.familyId];
    }
)

export const getSelectedProcess = createSelector(
    getSelectedFamiliy,
    fromRoot.getRouterState,
    (family, router): IProcessInstance => {
        const selectedId = router.state.params.processId;
        return router.state &&
               family &&
               family.processes.find(process => process.fullId === selectedId);
    }
)