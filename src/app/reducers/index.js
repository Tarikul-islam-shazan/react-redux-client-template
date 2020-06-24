import { combineReducers } from 'redux';
import sidebarReducer from './sidebar';
import redirectToReducer from './redirect-to';
import questionairreReducer from './questionairre';
import projectReducer from './project';
import productReducer from './product';
import rfqReducer from './rfq';
import notificationReducer from './notification';

// const appReducers = combineReducers({
//     sidebar: sidebarReducer,
//     resources: resourceReducer,
//     questionairre: questionairreReducer
//
// });

// const reducers = (state,action) =>{
//   return appReducers(state, action)
// }

// export default reducers;


export default combineReducers({
  sidebar: sidebarReducer,
  questionairre: questionairreReducer,
  project: projectReducer,
  product: productReducer,
  rfq: rfqReducer,
  notification: notificationReducer
});
