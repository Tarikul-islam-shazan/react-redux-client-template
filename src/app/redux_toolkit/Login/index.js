import { createSlice, createReducer } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import { LoginReducers, LoginThunks } from './LoginReducers'

const initialState = {
    isLoggedIn: false,
    isActivated: false,
    isLoading: false,
    isError: false,
    errorMessage: '',
    user: {},
    token: '',
    activationCode: '',
    activationCodeError: false,
    activationCodeErrorMessage: '',
    activationCodeSuccess: false,
    activationCodeSuccessMessage: ''
}

const LoginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: LoginReducers
})

export const loginActions = LoginSlice.actions

export const useLoginSelector = () => useSelector((state) => state)

export default LoginSlice.reducer
