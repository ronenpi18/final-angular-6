import { ActionReducer } from "@ngrx/store";

import * as fromFamilies from  "./families.reducer";

export type FamiliesState = fromFamilies.FamiliesState;

export const reducers: ActionReducer<FamiliesState> = fromFamilies.reducer;