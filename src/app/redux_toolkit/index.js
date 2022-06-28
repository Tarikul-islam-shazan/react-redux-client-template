import { configureStore } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import LoginSliceReducer from './Login'

const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
    reducer: {
        login: LoginSliceReducer
    }
})

export default store

export const useStoreSelector = () => useSelector((state) => state)
