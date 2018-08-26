import { createFeatureSelector, createSelector } from "@ngrx/store";

import * as fromRoot from '../../../state';
import * as fromFeature from '../reducers';
import * as fromFamilies from '../reducers/families.reducer';
import { IEntityFamilyInstance, IProcessInstance, IFamilyInstance } from "../../models/family.model";

export const getFamiliesState = createFeatureSelector<fromFeature.FamiliesState>(
    'families'
);

export const getFamiliesLoaded = createSelector(getFamiliesState, fromFamilies.getFamiliesLoaded);
export const getFamiliesLoading = createSelector(getFamiliesState, fromFamilies.getFamiliesLoading);
export const getFamiliesEntities = createSelector(getFamiliesState, fromFamilies.getFamiliesEntities);

export const getAllFamilies = createSelector(getFamiliesEntities, (entities): IFamilyInstance[] => {
    return Object.keys(entities).map(id => {
        const entity: IEntityFamilyInstance = entities[id];
        const processes: IProcessInstance[] = Object.keys(entity.processes).map(processId => entity.processes[processId])
        return {
            ...entity,
            processes
        };
    });
});

export const getSelectedFamiliy = createSelector(
    getFamiliesEntities,
    fromRoot.getRouterState,
    (entities, router): IEntityFamilyInstance => {
        return router.state && entities[router.state.params.familyId];
    }
)

export const getSelectedProcess = createSelector(
    getSelectedFamiliy,
    fromRoot.getRouterState,
    (family, router): IProcessInstance => {
        return router.state && family && family.processes[router.state.params.processId];
    }
)