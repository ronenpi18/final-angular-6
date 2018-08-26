import { Action } from '@ngrx/store';

import { IFamilyInstance } from '../../models/family.model';

// load families
export const LOAD_FAMILIES = '[Families] Load Families';
export const LOAD_FAMILIES_FAIL = '[Families] Load Families Fail';
export const LOAD_FAMILIES_SUCCESS = '[Families] Load Families Success';

export class LoadFamilies implements Action {
    readonly type = LOAD_FAMILIES;
}

export class LoadFamiliesFail implements Action {
    readonly type = LOAD_FAMILIES_FAIL;
    constructor(public payload: any) {}
}

export class LoadFamiliesSuccess implements Action {
    readonly type = LOAD_FAMILIES_SUCCESS;
    constructor(public payload: IFamilyInstance[]) {}
}

// action types
export type FamiliesAction = LoadFamilies | LoadFamiliesFail | LoadFamiliesSuccess;