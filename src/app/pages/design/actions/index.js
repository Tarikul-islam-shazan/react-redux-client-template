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

export const validateShareDesign = (state, withName = true) => {
    let {
      name, fabricType, fabricTypeId, fabricDetails, productTypeId, tableJson, note, colors, documentIds, productDesignDoc
    } = state;
    let errors = {};
    let reqBody = {};
    let isValid = true;
    if (withName) {
      if (!name) {
          errors.nameError = 'Name is required.';
          isValid = false;
      } else {
          errors.nameError = '';
      }
    }

    if (!fabricType) {
        errors.fabricTypeError = 'Fabric type is required.';
        isValid = false;
    } else {
        errors.fabricTypeError = '';
    }
    if (!fabricDetails) {
        errors.fabricDetailsError = 'Fabric details is required.';
        isValid = false;
    } else {
        errors.fabricDetailsError = '';
    }
    if (!productTypeId) {
        errors.productTypeIdError = 'Product type is required.';
        isValid = false;
    } else {
        errors.productTypeIdError = '';
    }

    if (colors.length) {
        errors.colors = colors.map((color) => {
            if (!color.hexCode) {
                isValid = false;
                color.hexCodeError = 'Required!';
            }
            if (!color.name) {
                isValid = false;
                color.nameError = 'Required!';
            }
            return color;
        })
    }

    if (isValid) {
        reqBody = {
            fabricType,
            // fabricTypeId: 2, //need to make dynamic
            fabricDetails,
            productTypeId,
            // tableJson, //need details
            note,
            colors,
            documentIds
        };
        if (withName) {
          reqBody.name = name;
        }
    }

    return {
      isValid,
      errors,
      reqBody
    }
}


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
