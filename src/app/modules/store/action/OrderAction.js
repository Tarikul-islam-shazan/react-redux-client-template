import {ActionTypes} from "../ActionTypes";
import Http from "../../../services/Http";

export const storeOrderList = (data, merge, activeTab, countResponse) => {
    return {
        type: ActionTypes.FETCH_ORDER_LIST,
        payload: {response: data, merge: merge, activeTab: activeTab, countResponse: countResponse}
    }
}


export const fetchOrderList = (params, merge, activeTab) => async (dispatch) => {

    await Http.GET('statusWiseCount').then(async (countResponse) => {
        await Http.GET('getOrderList', params).then((response) => {
            dispatch(storeOrderList(response.data, merge, activeTab, countResponse.data));
        });
    });


}