// import {
//     LOGIN_FAILURE,
//     // LOGIN_SUCCESS,
//     LOGOUT_FAILURE,
//     // LOGOUT_SUCCESS
// } from '../action.types'

// import { LOGIN_REQUEST, LOGOUT_REQUEST } from '../thunk.types'

export const LoginReducers = {
    LOGIN_FAILURE: (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
    },
    LOGIN_SUCCESS: (state, action) => {
        state.isLoading = false
        state.isError = false
        state.errorMessage = ''
        state.user = action.payload.user
        state.token = action.payload.token
        alert('clicked')
    },
    LOGOUT_FAILURE: (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
    },
    LOGOUT_SUCCESS: (state, action) => {
        state.isLoading = false
        state.isError = false
        state.errorMessage = ''
        state.user = {}
        state.token = ''
    }
}

// export const LoginThunks = {
//     LOGIN_REQUEST: (email, password) => async (dispatch) => {
//         dispatch({ type: LOGIN_REQUEST })
//         try {
//             const response = await fetch('/api/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ email, password })
//             })
//             const data = await response.json()
//             dispatch({ type: LOGIN_SUCCESS, payload: data })
//         } catch (error) {
//             dispatch({ type: LOGIN_FAILURE, payload: error.message })
//         }
//     },
//     LOGOUT_REQUEST: () => async (dispatch) => {
//         // dispatch({ type: LOGOUT_REQUEST })
//         try {
//             const response = await fetch('/api/logout', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//             const data = await response.json()
//             dispatch({ type: LOGOUT_SUCCESS, payload: data })
//         } catch (error) {
//             dispatch({ type: LOGOUT_FAILURE, payload: error.message })
//         }
//     }
// }
