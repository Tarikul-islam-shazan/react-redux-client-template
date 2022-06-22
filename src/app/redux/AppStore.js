import { combineReducers, compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const appReducer = combineReducers({})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const appStore = createStore(
    appReducer,
    composeEnhancers(applyMiddleware(thunk))
)

export default appStore
