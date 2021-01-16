import axios from "axios";
import Http from '../../../services/Http';

export const _storeData = (key,value) => {
	console.log(key,value)
	return dispatch => {
		dispatch({ type: "SET_PRODUCT_DATA", payload: {key:key,data:value} });
	};
};

export const _getProductForQuote = async(productIds) => {
		let params = '';
		productIds.map((id) => params += ('ids=' + id + '&'))
		await Http.GET_WITH_BODY('getProductsForRfq', '?' + params)
			.then(({data}) => {
						return data;
			})
			.catch(({response}) => {
			});
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
