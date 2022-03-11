import {ActionTypes} from "../ActionTypes";

const initialState = {};

const TimelineReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_STEP_INFO:
            return {...state, stepList: action.payload};
        case ActionTypes.TOGGLE_DESIGN_SELECTION:
            let designList = [...state.selectedDesignList];
            let designObj = designList.find(item => item === action.payload);
            if (designObj !== undefined) {
                designList = designList.filter(design => design !== action.payload)
            } else {
                designList.push(action.payload)
            }
            return {
                ...state,
                selectedDesignList: designList
            }
        case ActionTypes.SELECT_ALL_DESIGN:
        case ActionTypes.CLEAR_DESIGN_SELECTION:
            return {
                ...state,
                selectedDesignList: action.payload
            }
        case ActionTypes.FETCH_ORDER_INFO_LIST:
            let productList = action.payload?.orderProductList;
            let selectedDesignList = [];
            if (productList.length > 0) {
                productList.forEach((design) => selectedDesignList.push(design.id))
            }
            return {
                ...state,
                orderInfo: action.payload,
                selectedDesignList: selectedDesignList
            }
        case ActionTypes.FETCH_TIMELINE_LIST:
            let {payload} = action
            if (payload.merge === false) {
                return {
                    ...payload.response,
                    orderInfo: state.orderInfo,
                    selectedDesignList: state.selectedDesignList,
                    stepList: state.stepList
                }
            } else {
                return {
                    ...payload.response,
                    data: [...state.data, ...payload.response.data],
                    orderInfo: state.orderInfo,
                    selectedDesignList: state.selectedDesignList,
                    stepList: state.stepList
                }
            }
        default:
            return state;
    }
}

export default TimelineReducer