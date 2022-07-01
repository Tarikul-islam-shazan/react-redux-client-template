import { configureStore } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import LoginSliceReducer from './Login'
import MoodboardSliceReducer from './Moodboard'

// this is the configure store portion of the redux + redux-toolkit setup
// applied a middleware to supress the serialized data warning
// you can add more slices to the store here
const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
    reducer: {
        login: LoginSliceReducer,
        moodboard: MoodboardSliceReducer
    }
})

export default store

// we wont call andy selector from compoennt, we will call this hook instead
export const useStoreSelector = () => useSelector((state) => state)
