// import { COLLAPSE_SIDEBAR } from '../actions/types';

const initialState = {
    name : '',
    techPackName : '',
    productType : '',
    fabricComposition : '',
    fabricWeight : '',
    colorList : [
      {
        id : '',
        quantity : ''
      }
    ],
    // documentList : [],
    productImage : {},
    referenceImages : [],
    referenceProduct1 : [],
    referenceProduct2 : [],
    accessoriesImages : [],
    accessoriesList : [],
    measurementChart : [],
    tempColorId : '',
    tempQuantity : '',
    //tech pack objects
    techPackFile : {},
    productImageList : [],
    referenceImageList : [],
    colorListTP : [
      {
        id : '',
        quantity : ''
      }
    ],
    choosenIdsForQuick : [],
    fromRfq: false,
    selectedRfqId: '',
    selectedProductIds: [],
    quoteObj: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
      case "SET_PRODUCT_DATA": {
        console.log("action",action)
        return {
          ...state,
          [action.payload.key]: action.payload.data
        };
      }
      default:
        return state;
  }
}
