import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../assets/scss/App.scss'
import {
    BrowserRouter as Router,
    Navigate,
    Outlet,
    Route,
    Routes
} from 'react-router-dom'
import Login from './modules/login-journey/Login'
import Dashboard from './modules/dashboard/Dashboard'
import DefaultLayout from './layouts/DefaultLayout'
import Ui from '../assets/designs/Ui'

const useAuth = () => {
    const token = localStorage.getItem('token')
    return !!token
}

const ProtectedRoutes = (props) => {
    const auth = useAuth()
    return auth ? <Outlet /> : <Navigate to='/login' />
}

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<ProtectedRoutes />}>
                        <Route element={<DefaultLayout />}>
                            <Route path='dashboard' element={<Dashboard />} />
                        </Route>
                    </Route>
                    <Route path='/login' element={<Login />} />
                    <Route path='/ui' element={<Ui />} />
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