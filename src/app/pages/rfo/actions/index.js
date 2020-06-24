import axios from "axios";

export const _storeData = (key,value) => {
	// console.log(key,value)
	return dispatch => {
		dispatch({ type: "SET_RFQ_DATA", payload: {key:key,data:value} });
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
