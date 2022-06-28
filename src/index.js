import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './app/App.js'
import Store from './app/redux/Store'
import storeWithToolkit from './app/redux_toolkit'
import * as serviceWorker from './serviceWorker'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    // <Provider store={Store}>
    <Provider store={storeWithToolkit}>
        <App />
    </Provider>
    // </Provider>
)

serviceWorker.unregister()
