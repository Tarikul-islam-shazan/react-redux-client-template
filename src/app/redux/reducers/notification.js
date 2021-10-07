// // import { COLLAPSE_SIDEBAR } from '../actions/types';

// const initialState = {
//     notifications : {},
//     notificationIconActive : false,
//     sort : 'createdAt,desc',
//     dataLoadedOnce : false,
//     page : 0,
//     size : 10,
//     hasNext : true
// };

// export default (state = initialState, action) => {
//     switch (action.type) {
//       case "SET_NOTIFICATION_DATA": {
//         console.log("action",action)
//         return {
//           ...state,
//           [action.payload.key]: action.payload.data
//         };
//       }
//       default:
//         return state;
//   }
// }

// import { COLLAPSE_SIDEBAR } from '../actions/types';

const initialState = {
    notifications: [],
    notificationIconActive: true,
    sort: "id,desc",
    dataLoadedOnce: false,
    page: 0,
    size: 10,
    hasNext: true,
    unseenCount: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "SET_NOTIFICATION_DATA": {
            return {
                ...state,
                [action.payload.key]: action.payload.data,
            };
        }
        default:
            return state;
    }
};
