import * as fromRanges from '../actions/ranges.action';
import { IRangeInstance } from '../../models/range.model';

export type RangesState = {
    instances: IRangeInstance[];
    activeRangeIndex: number;
}

export const initialState: RangesState = {
    instances: [{
        from: new Date(Date.now() - 1000 * 60 * 10)
    }],
    activeRangeIndex: 0
};

export function reducer(
    state = initialState,
    action: fromRanges.RangesAction
): RangesState {

    switch(action.type) {
        case fromRanges.ACTIVE_RANGE_CHANGE: {
            const activeRangeIndex = state.instances.findIndex(range => range === action.payload);
            return {
                ...state,
                activeRangeIndex
            }
        }

        case fromRanges.RANGE_ADD: {
            return {
                ...state,
                instances: [...state.instances, action.payload],
                activeRangeIndex: state.instances.length
            }
        }

        case fromRanges.RANGE_REMOVE: {
            const targetInstanceIndex = state.instances.findIndex(range => range === action.payload);

            let activeRangeIndex;
            if (targetInstanceIndex > state.activeRangeIndex) {
                // if removing tab after selected tab, nothing changes
                activeRangeIndex = state.activeRangeIndex;
            } else if (targetInstanceIndex !== state.activeRangeIndex) {
                // if removing tab before selected tab, move the active index to -1
                activeRangeIndex = state.activeRangeIndex - 1;
            } else {
                // if removing selected tab, select previous tab
                activeRangeIndex = targetInstanceIndex - 1;
            }

            return {
                ...state,
                instances: [
                    ...state.instances.slice(0, targetInstanceIndex), 
                    ...state.instances.slice(targetInstanceIndex + 1)
                ],
                activeRangeIndex
            }
        }
    }
    return state;
}

export const getRanges = (state: RangesState) => state.instances;
export const getActiveRange = (state: RangesState) => state.instances[state.activeRangeIndex];