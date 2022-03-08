import { combineReducers } from "redux";
import sidebarReducer from "./sidebar";
import redirectToReducer from "./redirect-to";
import questionairreReducer from "./questionairre";
import projectReducer from "./project";
import productReducer from "./product";
import shareDesignProductReducer from "./shareDesignProduct";
import rfqReducer from "./rfq";
import notificationReducer from "./notification";
import designReducer from "../design/reducer";
import dashboardReducer from "../dashboard/reducer";
import OrderReducer from "../../modules/store/reducer/OrderReducer";
import TimelineReducer from "../../modules/store/reducer/TimelineReducer";

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
    shareDesignProduct: shareDesignProductReducer,
    rfq: rfqReducer,
    notification: notificationReducer,
    design: designReducer,
    dashboard: dashboardReducer,
    orderStore: OrderReducer,
    timelineStore: TimelineReducer
});

// design selectors
export const getPomAndSize = (state) => state.design.pomAndSize;
export const getProductMeasurement = (state) => state.design.productMeasurement;
export const getAllTemplate = (state) => state.design.allTemplate;

// dashboard selectors
export const getDashboardQuotes = (state) => state.dashboard.allDashboardQuotes;
export const getDashboardAllTasks = (state) => state.dashboard.allDashboardTasks;
