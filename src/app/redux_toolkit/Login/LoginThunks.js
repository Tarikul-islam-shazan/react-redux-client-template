import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS
} from '../action.types'

import { LOGIN_REQUEST, LOGOUT_REQUEST } from '../thunk.types'

export const LoginThunks = {
  LOGIN_REQUEST: (email, password) => async (dispatch) => {
      dispatch({ type: LOGIN_REQUEST })
      try {
          const response = await fetch('/api/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email, password })
          })
          const data = await response.json()
          dispatch({ type: LOGIN_SUCCESS, payload: data })
      } catch (error) {
          dispatch({ type: LOGIN_FAILURE, payload: error.message })
      }
  },
  LOGOUT_REQUEST: () => async (dispatch) => {
      dispatch({ type: LOGOUT_REQUEST })
      try {
          const response = await fetch('/api/logout', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              }
          })
          const data = await response.json()
          dispatch({ type: LOGOUT_SUCCESS, payload: data })
      } catch (error) {
          dispatch({ type: LOGOUT_FAILURE, payload: error.message })
      }
  }
}