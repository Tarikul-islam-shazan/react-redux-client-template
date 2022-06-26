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

{/*Design UI Route*/}
import Ui from '../assets/designs/Ui'
import Home from '../assets/designs/home'

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

                    {/*Design UI Route*/}
                    <Route path='/ui' element={<Ui />} />
                    <Route path='/Home' element={<Home />} />

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
