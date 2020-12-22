import axios from "axios";

export const _storeData = (key,value) => {
	console.log(key,value)
	return dispatch => {
		dispatch({ type: "SET_SHARE_DESIGN_PRODUCT_DATA", payload: {key:key,data:value} });
	};
};


// export const _storeData = (key,value) => {
// 	console.log(key,value)
//     dispatch({
//         type: "SET_DATA",
//         payload: {
// 					key:key,
// 					data:value
// 				}
//     });
// };
