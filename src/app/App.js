import React, { Component } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../assets/scss/App.scss'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './modules/login-journey/Login'
import Dashboard from './modules/dashboard/Dashboard'

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route exact path='/dashboard' element={<Dashboard />} />
                    <Route path='/' element={<Login />} />
                </Routes>
            </Router>
            <ToastContainer
                autoClose={3500}
                position='top-right'
                hideProgressBar={true}
            />
        </>
    )
}
export default App
