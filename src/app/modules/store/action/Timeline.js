import {ActionTypes} from "../ActionTypes";
import Http from "../../../services/Http";

export const storeTimeline = (data, merge) => {
    return {
        type: ActionTypes.FETCH_TIMELINE_LIST,
        payload: {response: data, merge: merge}
    }
}

export const storeOrderInfo = (data) => {
    return {
        type: ActionTypes.FETCH_ORDER_INFO_LIST,
        payload: data
    }
}

export const clearDesignSelection = () => {
    return{
        type: ActionTypes.CLEAR_DESIGN_SELECTION,
        payload: []
    }
}

export const selectAllDesign = (data) => {
    return{
        type: ActionTypes.SELECT_ALL_DESIGN,
        payload: data
    }
}

export const toggleDesignSelection = (data) => {
    return{
        type: ActionTypes.TOGGLE_DESIGN_SELECTION,
        payload: data
    }
}

export const fetchTimeline = (params, merge) => async (dispatch) => {
    await Http.GET('getTimeLineData', params).then((response) => {
        dispatch(storeTimeline(response.data, merge));
    });
}


export const fetchOrderInfo = (orderId) => async (dispatch) => {
    await Http.GET('getTimeLineOrderInfo', orderId).then((response) => {
        dispatch(storeOrderInfo(response.data));
    });
}