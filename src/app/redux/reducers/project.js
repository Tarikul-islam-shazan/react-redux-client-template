
const initialState = {
    selectedFromAction : {},
    numberOfStyles : '1',
    project_type:'FULL_FLEDGED_PRODUCTION', //only this type is making available to users on first release. other types works are also done
    title:'',
    shippingAddress:'',
    deadline:'',
    paymentTerms:'',
    note:'',
    manuName:'',
    conName:'',
    conNum:'',
    manuAddress:'',
    summaryFile:{},
    authorizationLetter:{},
    styles:[{
      myDesignList:[],
      nitexDesignList:[],
      developmentType:'',
      developmentTypeError:'',
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
      case "SET_PROJECT_DATA": {
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
