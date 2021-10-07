import * as actionTypes from "./action-types";
import Http from "../../services/Http";

export const fetchPomAndSize = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.FETCH_POM_AND_SIZE_REQUEST });
        const response = await Http.GET("getPomAndSize");
        dispatch({
            type: actionTypes.FETCH_POM_AND_SIZE_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({ type: actionTypes.FETCH_POM_AND_SIZE_FAILURE });
    }
};

export const fetchProductMeasurement = (id, unitType) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.FETCH_PRODUCT_MEASUREMENT_REQUEST });
        let params = `${id}?unit=${unitType}`;
        const response = await Http.GET("getProductMeasurement", params);
        dispatch({
            type: actionTypes.FETCH_PRODUCT_MEASUREMENT_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({ type: actionTypes.FETCH_PRODUCT_MEASUREMENT_FAILURE });
    }
};

export const fetchAllTemplate = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.FETCH_ALL_TEMPLATE_REQUEST });
        const response = await Http.GET("getAllTemplate");
        dispatch({
            type: actionTypes.FETCH_ALL_TEMPLATE_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({ type: actionTypes.FETCH_ALL_TEMPLATE_FAILURE });
    }
};

// export const fetchDocResponse = (id) => async (dispatch) => {
// 	try {
// 		dispatch({ type: actionTypes.FETCH_DOC_RESPONSE_REQUEST });
// 		const response = await Http.GET('getDocumentResponse', id);
// 		dispatch({
// 			type: actionTypes.FETCH_DOC_RESPONSE_SUCCESS,
// 			payload: response.data
// 		});
// 	} catch (error) {
// 		dispatch({ type: actionTypes.FETCH_DOC_RESPONSE_FAILURE });
// 	}
// };
