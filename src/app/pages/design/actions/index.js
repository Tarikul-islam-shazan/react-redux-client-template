import axios from "axios";
import Http from '../../../services/Http';

const SAMPLE_SIZE_DATA = [
    {
        "code": "XS", //size code
        "quantity": null //quantity
    },
    {
        "code": "S",
        "quantity": null
    },
		{
        "code": "M", //size code
        "quantity": null //quantity
    },
    {
        "code": "L",
        "quantity": null
    },
		{
        "code": "XL", //size code
        "quantity": null //quantity
    }
];


export const _storeData = (key,value) => {
	console.log(key,value)
	return dispatch => {
		dispatch({ type: "SET_PRODUCT_DATA", payload: {key:key,data:value} });
	};
};

export const _getProductForQuote = async(productIds) => {
		let params = '';
		let result = [];
		productIds.map((id, index) => params += ('id=' + id + (productIds.length - 1 === index ? '' : '&')))
		await Http.GET('getProductsForRfq', '?' + params)
			.then(({data}) => {
						if (data.length) {
								data.map((product) => {
                  if (product.colors) {
                    product.colorWiseSizeQuantityPairList = product.colors.map((color) => {
                      if (product.sizeQuantityPairList) {
                        color.sizeQuantityPairList = product.sizeQuantityPairList;
                      } else {
                        color.sizeQuantityPairList = SAMPLE_SIZE_DATA;
                      }
                      return color;
                    })
                  }
                  result.push(product);
								})
						}
			})
			.catch(({response}) => {
			});
      return result;
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
