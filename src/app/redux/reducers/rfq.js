// import { COLLAPSE_SIDEBAR } from '../actions/types';

const initialState = {
    selectedFromAction : {},
    numberOfStyles : '1',
    title:'',
    styles:[{
      myDesignList:0,
      nitexDesignList:0,
      fileError:'',
      noteError:'',
      note:'',
      designInspirationsFiles:[],
      otherFiles:[],
      colorList:[
        {
          id : '',
          quantity : ''
        }
      ],
      colorError:[
        {
          idError : '',
          quantityError : ''
        }
      ]
    }]
};

export default (state = initialState, action) => {
    switch (action.type) {
      case "SET_RFQ_DATA": {
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
