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

export const validateShareDesign = (state, withName = true, withProductDesign = true) => {
    let {
      name, categoryId, fabricType, fabricTypeId, fabricDetails, productTypeId, tableJson, note, colors, documentIds, productDesignDoc
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

    if (!categoryId) {
        errors.categoryIdError = 'Category is required.';
        isValid = false;
    } else {
        errors.categoryIdError = '';
    }

    if (!fabricTypeId) {
        errors.fabricTypeIdError = 'Fabric type is required.';
        isValid = false;
    } else {
        errors.fabricTypeIdError = '';
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

    if (withProductDesign && (!documentIds || !documentIds.length)) {
        errors.documentIdsError = 'Product design is required.';
        isValid = false;
    } else {
        errors.documentIdsError = '';
    }

    if (colors.length) {
        errors.colors = colors.map((color) => {
            if (!color.hexCode) {
                isValid = false;
                color.hexCodeError = 'Required.';
            } else {
                color.hexCodeError = '';
            }

            if (!color.name) {
                isValid = false;
                color.nameError = 'Required.';
            } else {
                color.nameError = '';
            }
            return color;
        })
    }

    if (isValid) {
        reqBody = {
            // fabricType,
            categoryId,
            fabricTypeId, //need to make dynamic
            fabricDetails,
            productTypeId,
            // tableJson, //need details
            note: note.toString('html'),
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

export const  getTotal = (sizeQuantityPairList) => {
    let total = 0;
   sizeQuantityPairList.map((pair, key) => {
     if (pair.quantity) {
       total += parseInt(pair.quantity);
     }
   })
   return total;
 }

