import {ActionTypes} from "../ActionTypes";
import Http from "../../../services/Http";

export const storeTimeline = (data, merge) => {
    return {
        type: ActionTypes.FETCH_TIMELINE_LIST,
        payload: {response: data, merge: merge}
    }
}

export const storeMemberList = (data) => {
    return {
        type: ActionTypes.FETCH_ORDER_MEMBER_LIST,
        payload: data
    }
}


export const fetchTimeline = (params, merge) => async (dispatch) => {
    await Http.GET('getTimeLineData', params).then((response) => {
        dispatch(storeTimeline(response.data, merge));
    });
}


export const fetchMemberList = (orderId) => async (dispatch) => {
    await Http.GET('getProjectMembers', orderId).then((response) => {
        dispatch(storeMemberList(response.data));
    });
}