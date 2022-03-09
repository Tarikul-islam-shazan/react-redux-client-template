import {ActionTypes} from "../ActionTypes";

const initialState = {};

const TimelineReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_ORDER_MEMBER_LIST:
            return {...state, memberList: action.payload}
        case ActionTypes.FETCH_TIMELINE_LIST:
            let {payload} = action
            if (payload.merge === false) {
                return {...payload.response, memberList: state.memberList}
            } else {
                return {
                    ...payload.response,
                    data: [...state.data, ...payload.response.data],
                    memberList: state.memberList
                }
            }
        default:
            return state;
    }
}

export default TimelineReducer