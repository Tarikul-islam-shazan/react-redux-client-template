import * as actionTypes from "./action-types";
import Http from "../../services/Http";
import { toastError } from "../../commonComponents/Toast";

export const fetchDashboardQuotes =
    (page = 0, size = 15, sort = "id,asc") =>
    async (dispatch) => {
        try {
            const params = { page, size, sort };
            const response = await Http.GET("getDashboardQuotes", params);
            dispatch({
                type: actionTypes.FETCH_DASHBOARD_QUOTES_SUCCESS,
                payload: response.data,
            });

            dispatch({
                type:
                    page > 0
                        ? actionTypes.FETCH_MORE_DASHBOARD_QUOTES_SUCCESS
                        : actionTypes.FETCH_DASHBOARD_QUOTES_SUCCESS,
                payload: {
                    // ...response.data,
                    data: response.data,
                    hasNext:
                        // response?.data.currentPage + 1 >= response?.data.totalPages ? false : true,
                        response.data?.length < 15 ? false : true,
                },
            });
        } catch (error) {
            dispatch({ type: actionTypes.FETCH_DASHBOARD_QUOTES_FAILURE });
            if (error.message) {
                toastError(error.message);
            } else {
                toastError("Something went wrong! Please try again.");
            }
        }
    };

const todaysDate = () => {
    let today = new Date();
    let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    // let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date;
};

export const fetchDashboardAllTasks =
    (page = 0, size = 15, sort = "id,desc") =>
    async (dispatch) => {
        try {
            const params = { page, size, sort, taskStatus: "PENDING", fromDate: todaysDate() };
            const response = await Http.GET("getDashboardAllTasks", params);
            dispatch({
                type: actionTypes.FETCH_DASHBOARD_ALL_TASKS_SUCCESS,
                payload: response.data,
            });

            dispatch({
                type:
                    page > 0
                        ? actionTypes.FETCH_MORE_DASHBOARD_ALL_TASKS_SUCCESS
                        : actionTypes.FETCH_DASHBOARD_ALL_TASKS_SUCCESS,
                payload: {
                    // ...response.data,
                    data: response.data,
                    hasNext:
                        // response?.data.currentPage + 1 >= response?.data.totalPages ? false : true,
                        response.data?.length < 15 ? false : true,
                },
            });
        } catch (error) {
            dispatch({ type: actionTypes.FETCH_DASHBOARD_ALL_TASKS_FAILURE });
            if (error.message) {
                toastError(error.message);
            } else {
                toastError("Something went wrong! Please try again.");
            }
        }
    };
