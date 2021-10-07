import * as actionTypes from "./action-types";
import { combineReducers } from "redux";

const getPomAndSize = (state = [], { type, payload }) => {
    switch (type) {
        case actionTypes.FETCH_POM_AND_SIZE_REQUEST:
        case actionTypes.FETCH_POM_AND_SIZE_FAILURE:
            return state;
        case actionTypes.FETCH_POM_AND_SIZE_SUCCESS:
            return payload;
        default:
            return state;
    }
};

const getProductMeasurement = (state = [], { type, payload }) => {
    switch (type) {
        case actionTypes.FETCH_PRODUCT_MEASUREMENT_REQUEST:
        case actionTypes.FETCH_PRODUCT_MEASUREMENT_FAILURE:
            return state;
        case actionTypes.FETCH_PRODUCT_MEASUREMENT_SUCCESS:
            return payload;
        default:
            return state;
    }
};

const getAllTemplate = (state = [], { type, payload }) => {
    switch (type) {
        case actionTypes.FETCH_ALL_TEMPLATE_REQUEST:
        case actionTypes.FETCH_ALL_TEMPLATE_FAILURE:
            return state;
        case actionTypes.FETCH_ALL_TEMPLATE_SUCCESS:
            return payload;
        default:
            return state;
    }
};

const designReducer = combineReducers({
    pomAndSize: getPomAndSize,
    productMeasurement: getProductMeasurement,
    allTemplate: getAllTemplate,
});

export default designReducer;
