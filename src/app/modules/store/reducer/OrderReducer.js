import {ActionTypes} from "../ActionTypes";

const initialState = {activeTab: "RUNNING", orderResponse: {}}
const OrderReducer = (state = initialState, action) => {
    switch (action.type){
        case ActionTypes.FETCH_ORDER_LIST:

    }
    return state;
}

export default OrderReducer