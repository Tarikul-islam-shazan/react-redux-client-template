import {ActionTypes} from "../ActionTypes";
import Http from "../../../services/Http";

export const storeOrderList = (data, merge) => {
    return {
        type: ActionTypes.FETCH_ORDER_LIST,
        data: {...data, merge: merge}
    }
}

export const fetchOrderList = (params, merge) => async (dispatch) => {
    await Http.GET('getOrderList', params).then((response) => {
        dispatch(storeOrderList(response.data, merge));
    });
}