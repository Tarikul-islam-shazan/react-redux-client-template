import {
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT_FAILURE,
    LOGOUT_SUCCESS
} from '../action.types'

// import { LOGIN_REQUEST, LOGOUT_REQUEST } from '../thunk.types'

export const LoginReducers = {
    [LOGIN_FAILURE]: (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
    },
    [LOGIN_SUCCESS]: (state, action) => {
        state.isLoading = false
        state.isError = false
        state.errorMessage = ''
        state.user = action.payload.user
        state.token = action.payload.token
    },
    [LOGOUT_FAILURE]: (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
    },
    [LOGOUT_SUCCESS]: (state, action) => {
        state.isLoading = false
        state.isError = false
        state.errorMessage = ''
        state.user = {}
        state.token = ''
    }
}


