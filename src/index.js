import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './app/App.js'
import Store from './app/redux/Store'
// import { toast } from "react-toastify";
import * as serviceWorker from './serviceWorker'

// toast.configure();

ReactDOM.render(
    <Provider store={Store}>
        <App />
    </Provider>,
    document.getElementById('root')
)

serviceWorker.unregister()
