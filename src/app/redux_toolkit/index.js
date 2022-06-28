import { configureStore } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import LoginSliceReducer from './Login'

console.log(LoginSliceReducer)

const store = configureStore({
    reducer: {
        login: LoginSliceReducer
    }
})

export default store

export const useStoreSelector = () => useSelector((state) => state)
