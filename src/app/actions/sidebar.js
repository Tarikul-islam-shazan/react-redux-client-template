import { COLLAPSE_SIDEBAR } from './types';

export const toggle = isCollapsed => dispatch => {
    dispatch({
        type: COLLAPSE_SIDEBAR,
        payload: {
            isCollapsed: !isCollapsed
        }
    });
};

export const setActiveTab = tab => dispatch => {
  console.log("tab",tab)
    dispatch({
        type: 'SET_ACTIVE_TAB',
        payload: tab
    });
};
