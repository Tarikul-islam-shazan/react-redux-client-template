import { COLLAPSE_SIDEBAR } from '../actions/types';

const initialState = {
    isCollapsed: false,
    activeTab: window.location.pathname
};

export default (state = initialState, action) => {
    switch (action.type) {
        case COLLAPSE_SIDEBAR:
            return {isCollapsed: action.payload.isCollapsed};
        case 'SET_ACTIVE_TAB':
            return {activeTab: action.payload};
        default:
            return state;
    }
}
