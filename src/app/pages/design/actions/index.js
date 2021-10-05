import axios from "axios";
import Http from "../../../services/Http";

const SAMPLE_SIZE_DATA = [
    {
        code: "XS", //size code
        quantity: null, //quantity
    },
    {
        code: "S",
        quantity: null,
    },
    {
        code: "M", //size code
        quantity: null, //quantity
    },
    {
        code: "L",
        quantity: null,
    },
    {
        code: "XL", //size code
        quantity: null, //quantity
    },
];

export const _storeData = (key, value) => {
    return (dispatch) => {
        dispatch({ type: "SET_PRODUCT_DATA", payload: { key: key, data: value } });
    };
};

export const _getProductForQuote = async (productIds) => {
    let params = "";
    let result = [];
    productIds.map(
        (id, index) => (params += "id=" + id + (productIds.length - 1 === index ? "" : "&"))
    );
    await Http.GET("getProductsForRfq", "?" + params)
        .then(({ data }) => {
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
                        });
                    }
                    result.push(product);
                });
            }
        })
        .catch(({ response }) => {});
    return result;
};

export const validateShareDesign = (state, withName = true, withProductDesign = true) => {
    let {
        name,
        productCategoryId,
        fabricType,
        fabricCompositionDetails,
        productGroupId,
        tableJson,
        note,
        pantoneColorIdList,
        documentId,
        productDesignDoc,
    } = state;
    let errors = {};
    let reqBody = {};
    let isValid = true;
    if (withName) {
        if (!name) {
            errors.nameError = "Name is required.";
            isValid = false;
        } else {
            errors.nameError = "";
        }
    }

    if (!productCategoryId) {
        errors.productCategoryIdError = "Category is required.";
        isValid = false;
    } else {
        errors.productCategoryIdError = "";
    }

    if (!fabricType) {
        errors.fabricTypeError = "Fabric type is required.";
        isValid = false;
    } else {
        errors.fabricTypeError = "";
    }
    if (!fabricCompositionDetails) {
        errors.fabricCompositionDetailsError = "Fabric details is required.";
        isValid = false;
    } else {
        errors.fabricCompositionDetailsError = "";
    }
    if (!productGroupId) {
        errors.productGroupIdError = "Product type is required.";
        isValid = false;
    } else {
        errors.productGroupIdError = "";
    }

    if (withProductDesign && documentId === "") {
        errors.documentIdError = "Product design is required.";
        isValid = false;
    } else {
        errors.documentIdError = "";
    }

    if (pantoneColorIdList.length === 0) {
        isValid = false;
    }

    if (isValid) {
        reqBody = {
            // fabricType,
            productCategoryId,
            fabricType, //need to make dynamic
            fabricCompositionDetails,
            productGroupId,
            // tableJson, //need details
            note: note.toString("html"),
            pantoneColorIdList,
            documentId,
            isNitexProduct: false,
        };
        if (withName) {
            reqBody.name = name;
        }
    }

    return {
        isValid,
        errors,
        reqBody,
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

export const getTotal = (sizeQuantityPairList) => {
    let total = 0;
    sizeQuantityPairList.map((pair, key) => {
        if (pair.quantity) {
            total += parseInt(pair.quantity);
        }
    });
    return total;
};
