import { createSelector } from "@ngrx/store";

import * as fromRoot from '../../../state';
import * as fromFeature from '../reducers';
import * as fromRanges from '../reducers/ranges.reducer';

export const getRangesState = createSelector(
    fromFeature.getStatisticsState,
    (state: fromFeature.StatisticsState) => state.ranges
);

export const getRanges = createSelector(getRangesState, fromRanges.getRanges);
export const getActiveRange = createSelector(getRangesState, fromRanges.getActiveRange);
