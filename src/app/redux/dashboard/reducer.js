import * as actionTypes from "./action-types";
import { combineReducers } from "redux";

const initialQuotes = {
    data: [],
    currentPage: 0,
    totalPages: 1,
};

const getAllDashboardQuotes = (state = initialQuotes, { type, payload }) => {
    switch (type) {
        case actionTypes.FETCH_DASHBOARD_QUOTES_FAILURE:
            return state;
        case actionTypes.FETCH_DASHBOARD_QUOTES_SUCCESS:
            return {
                ...payload,
            };
        case actionTypes.FETCH_MORE_DASHBOARD_QUOTES_SUCCESS:
            return {
                ...state,
                ...payload,
                data: [...state.data, ...payload.data],
            };
        default:
            return state;
    }
};

const initialTasks = {
    data: [],
    currentPage: 0,
    totalPages: 1,
};

const getDashboardAllTasks = (state = initialTasks, { type, payload }) => {
    // console.log("State===", state?.data);
    console.log("Payload===", payload);
    switch (type) {
        case actionTypes.FETCH_DASHBOARD_ALL_TASKS_FAILURE:
            return state;
        case actionTypes.FETCH_DASHBOARD_ALL_TASKS_SUCCESS:
            return {
                ...payload,
            };
        case actionTypes.FETCH_MORE_DASHBOARD_ALL_TASKS_SUCCESS:
            return {
                ...state,
                ...payload,
                data: [...state.data, ...payload.data],
            };
        default:
            return state;
    }
};

const dashboardReducer = combineReducers({
    allDashboardQuotes: getAllDashboardQuotes,
    allDashboardTasks: getDashboardAllTasks,
});

export default dashboardReducer;
