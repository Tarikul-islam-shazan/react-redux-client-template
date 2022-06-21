import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./app/App.js";
// import store from "./app/redux/store";
// import { toast } from "react-toastify";
// import withClearCache from "./ClearCache";


import * as serviceWorker from "./serviceWorker";
import {imp} from "yarn/lib/cli";

// toast.configure();

// const ClearCacheComponent = withClearCache(Root);

// function App() {
//     return <ClearCacheComponent />;
// }

ReactDOM.render(
    // <Provider store={store}>
        <App />,
    // </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
// serviceWorker.register();
