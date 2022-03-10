import {ActionTypes} from "../ActionTypes";

const initialState = {activeTab: "RUNNING", orderResponse: {}, countResponse: {}}
const OrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_ORDER_LIST:
            let {payload} = action
            if (payload.merge === false) {
                return {
                    activeTab: payload.activeTab,
                    countResponse: payload.countResponse,
                    orderResponse: payload.response
                }
            } else {
                let prevOrderResponse = []
                if (state.orderResponse.data) {
                    prevOrderResponse = state.orderResponse.data
                }
                if (payload.response.data) {
                    prevOrderResponse = [...prevOrderResponse, ...payload.response.data]
                }
                return {
                    activeTab: payload.activeTab,
                    countResponse: payload.countResponse,
                    orderResponse: {...payload.response, data: prevOrderResponse}
                }
            }
        default:
            return state
    }
}

export default OrderReducer