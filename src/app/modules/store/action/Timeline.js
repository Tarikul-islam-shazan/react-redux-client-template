import {ActionTypes} from "../ActionTypes";
import Http from "../../../services/Http";
import {toastError} from "../../../commonComponents/Toast";

export const storeTimeline = (data, merge) => {
    return {
        type: ActionTypes.FETCH_TIMELINE_LIST,
        payload: {response: data, merge: merge}
    }
}

const generateTimeLineParams = (getState, params) => {
    if (getState().timelineStore.selectedDesignList.length > 0) {
        params += `&productIds=${getState().timelineStore.selectedDesignList.join(",")}`
    }
    return params;
}

export const clearDesignSelection = (params) => async (dispatch, getState) => {
    await dispatch({
        type: ActionTypes.CLEAR_DESIGN_SELECTION,
        payload: []
    })
    await dispatch(fetchTimeline(generateTimeLineParams(getState, params), false))
}

export const selectAllDesign = (data, params) => async (dispatch, getState) => {
    await dispatch({
        type: ActionTypes.SELECT_ALL_DESIGN,
        payload: data
    })
    await dispatch(fetchTimeline(generateTimeLineParams(getState, params), false))
}

export const toggleDesignSelection = (data, params, orderId) => async (dispatch, getState) => {
    await dispatch({
        type: ActionTypes.TOGGLE_DESIGN_SELECTION,
        payload: data
    })
    await dispatch(fetchTimeline(generateTimeLineParams(getState, params), false))
    await dispatch(fetchProductionDetailsByDesignNumber(orderId, getState().timelineStore.selectedDesignList[0]))
}

export const fetchTimeline = (params, merge) => async (dispatch) => {
    params += "&sort=createdAt,desc"
    await Http.GET('getTimeLineData', params).then((response) => {
        dispatch(storeTimeline(response.data, merge));
    });
}


export const fetchOrderInfo = (orderId, params) => async (dispatch, getState) => {
    await Http.GET('getTimeLineOrderInfo', orderId).then(async (response) => {
        await dispatch({
            type: ActionTypes.FETCH_ORDER_INFO_LIST,
            payload: response.data
        })
        await dispatch(fetchTimeline(generateTimeLineParams(getState, params), false));
        await dispatch(fetchProductionDetailsByDesignNumber(orderId, getState().timelineStore.selectedDesignList[0]))
    });
}

export const storeDesignWiseStepList = (data, designNumber) => {
    return {
        type: ActionTypes.FETCH_STEP_INFO,
        payload: {"data": data, "selectedDesignNumber": designNumber}
    }
}

export const fetchProductionDetailsByDesignNumber = (orderNumber, designNumber) => async (dispatch) => {
    await Http.GET('getTimeLineStepInfo', `${orderNumber}/${designNumber}`).then((response) => {
        dispatch(storeDesignWiseStepList(response.data, designNumber));
    });
}

export const storeAddNewComment = (data) => {
    return {
        type: ActionTypes.ADD_NEW_COMMENT,
        payload: data
    }
}

export const addNewCommentOnTimeline = (data) => async (dispatch) => {
    await dispatch(storeAddNewComment(data))
}

export const clearTimelineData = () => async (dispatch) => {
    await dispatch({
        type: ActionTypes.CLEAR_TIMELINE_DATA,
        payload: {}
    })
}

export const downloadInvoice = async (invoiceId) => {
    await Http.GET("downloadInvoice", invoiceId)
        .then((response) => {
            window.open(response.data, "_parent");
        })
        .catch((error) => toastError(error.response.data.message))
}

export const addCommentIndexWise = (data, index) => async (dispatch) => {
    await dispatch({
        type: ActionTypes.ADD_TIMELINE_DATA_BY_INDEX,
        payload: {data: data, index: index}
    })
}