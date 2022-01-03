import axios from "axios";

export const _storeData = (key, value) => {
    console.log("..store data...",key, value);
    return (dispatch) => {
        dispatch({ type: "SET_NOTIFICATION_DATA", payload: { key: key, data: value } });
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
