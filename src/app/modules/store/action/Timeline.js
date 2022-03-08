import {ActionTypes} from "../ActionTypes";
import Http from "../../../services/Http";

export const storeTimeline = (data, merge) => {
    return {
        type: ActionTypes.FETCH_TIMELINE_LIST,
        payload: {response: data, merge: merge}
    }
}

export const fetchTimeline = (params, merge) => async (dispatch) => {
    await Http.GET('getTimeLineData', params).then((response) => {
        dispatch(storeTimeline(response.data, merge));
    });
}
