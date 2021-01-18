import axios from "axios";
import Http from '../../../services/Http';

const DUMMY = [
    {
        "fabricComposition": "60% Cotton 40% Polyester (CVC)",
        "fabricWeight": "270",
        "documentResponseList": [
            {
                "id": 5792,
                "docType": "REFERENCE_IMAGE",
                "docUrl": "https://d2939dhdpmjcbe.cloudfront.net/product/reference_image/2020/9/1599315684669_HOODIE_WITH_BACK_PRINT-(MT346-SS-21-BACK).png",
                "name": "1599315684669_HOODIE_WITH_BACK_PRINT-(MT346-SS-21-BACK).png",
                "print": false
            },
            {
                "id": 5793,
                "docType": "PRODUCT_DESIGN",
                "docUrl": "https://d2939dhdpmjcbe.cloudfront.net/product/design/2020/9/1599315684559_HOODIE_WITH_BACK_PRINT-(MT346-SS-21-FRONT).png",
                "name": "1599315684559_HOODIE_WITH_BACK_PRINT-(MT346-SS-21-FRONT).png",
                "print": false
            }
        ],
        "productType": "Hoodie",
        "productGroup": "Men"
    },
    {
        "fabricComposition": "100% Cotton Pique",
        "fabricWeight": "190",
        "documentResponseList": [
            {
                "id": 5787,
                "docType": "PRODUCT_DESIGN",
                "docUrl": "https://d2939dhdpmjcbe.cloudfront.net/product/design/2020/9/1599315596789_FLARED_CROP_TOP-(WT267-SS-21-FRONT).png",
                "name": "1599315596789_FLARED_CROP_TOP-(WT267-SS-21-FRONT).png",
                "print": false
            },
            {
                "id": 5786,
                "docType": "REFERENCE_IMAGE",
                "docUrl": "https://d2939dhdpmjcbe.cloudfront.net/product/reference_image/2020/9/1599315596914_FLARED_CROP_TOP-(WT267-SS-21-BACK).png",
                "name": "1599315596914_FLARED_CROP_TOP-(WT267-SS-21-BACK).png",
                "print": false
            }
        ],
        "productType": "Crop top",
        "productGroup": "Women"
    }
];

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
									if (!product.sizeQuantityPairList) {
										product.sizeQuantityPairList = SAMPLE_SIZE_DATA;
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
