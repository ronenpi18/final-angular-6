import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

import * as fromData from  "./data.reducer";
import * as fromRanges from  "./ranges.reducer";
import { localStorageMiddleware } from "../../../utils/ngrx.util";

export interface StatisticsState {
    data: fromData.DataState,
    ranges: fromRanges.RangesState
}

export const reducers: ActionReducerMap<StatisticsState> = {
    data: fromData.reducer,
    ranges: localStorageMiddleware('statistics-ranges', fromRanges.reducer, fromRanges.localParser)
};

export const getStatisticsState = createFeatureSelector<StatisticsState>(
    'statistics'
);
