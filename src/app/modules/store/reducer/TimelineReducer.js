import {ActionTypes} from "../ActionTypes";

const initialState = {};

const TimelineReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_TIMELINE_LIST:
            let {payload} = action
            if (payload.merge === false) {
                return {...payload.response}
            } else {
                return {
                    ...payload.response,
                    data: [...state.data, ...payload.response.data]
                }
            }
        default:
            return state;
    }
}

export default TimelineReducer