// import { COLLAPSE_SIDEBAR } from '../actions/types';

const initialState = {
    profession:'',
    area:'',
    purpose:'',
    professionText:'',
    areaText:'',
    purposeText:''
};

export default (state = initialState, action) => {
    switch (action.type) {
      case "SET_DATA": {
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
