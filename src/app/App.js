import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../assets/scss/App.scss'
import {
    BrowserRouter as Router,
    Navigate,
    Outlet,
    Route,
    Routes,
    useNavigate
} from 'react-router-dom'
import Login from './modules/login-journey/Login'
import ActivationPopup from './modules/login-journey/ActivationPopup'
import Dashboard from './modules/dashboard/Dashboard'
import DefaultLayout from './layouts/DefaultLayout'

{
    /*Design UI Route*/
}
import Ui from '../assets/designs/Ui'
import Home from '../assets/designs/home'
import moodboardTemplate from '../assets/designs/moodboard/moodboardTemplate'
import ReduxComp from './modules/redux_test_module/ReduxComp'

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
                    <Route path='login' element={<Login />} />

                    <Route path='redux' element={<ReduxComp />} />

                    <Route path='/' element={<DefaultLayout />}>
                        <Route element={<ProtectedRoutes />}>
                            <Route
                                path='/'
                                element={<Navigate replace to='dashboard' />}
                            />
                            <Route path='dashboard' element={<Dashboard />} />
                            <Route
                                path='activation'
                                element={<ActivationPopup />}
                            />
                        </Route>
                    </Route>

                    {/*Design UI Route*/}
                    <Route path='/ui' element={<Ui />} />
                    <Route path='/Home' element={<Home />} />
                    <Route path='/moodboard' element={<moodboardTemplate />} />
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
