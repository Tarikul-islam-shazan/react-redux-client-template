import React, { Component } from 'react'
import '../assets/scss/App.scss'
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes
} from 'react-router-dom'
import DefaultLayout from './layouts/DefaultLayout'
import AuthLayout from './layouts/AuthLayout'
import { getToken } from './services/Util'
import Login from '../assets/designs/login-journey/Login'

const AuthRoute = ({ component: Component, ...rest }) => {
    let token = getToken()
    return token == null ? (
        <Route
            {...rest}
            render={(matchProps) => (
                <AuthLayout {...matchProps}>
                    <Component {...matchProps} />
                </AuthLayout>
            )}
        />
    ) : (
        <Navigate to='/dashboard' />
    )
}

const PublicRoute = ({ component: Component, ...rest }) => {
    const token = getToken()
    const redirectRoute = window.location.pathname
    let data = JSON.parse(localStorage.getItem('userInfo'))

    if (data.status === 'ACTIVE') {
        const url =
            '/login' +
            (redirectRoute && redirectRoute !== '/'
                ? '?Navigate=' + redirectRoute
                : '')
        return token ? (
            <Route
                {...rest}
                render={(matchProps) => (
                    <DefaultLayout {...matchProps}>
                        <Component {...matchProps} />
                    </DefaultLayout>
                )}
            />
        ) : (
            <Navigate to={url} />
        )
    }
}

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login />} />
                {/*<AuthRoute exact path="/login" component=""/>*/}
                {/*<PublicRoute exact path="/purchaseDetails/:orderId" component=""/>*/}
            </Routes>
        </Router>
    )
}
export default App
