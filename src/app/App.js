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

// compoennts
import Login from './modules/login-journey/Login'
import ActivationPopup from './modules/login-journey/ActivationPopup'
import Dashboard from './modules/dashboard/Dashboard'
import DefaultLayout from './layouts/DefaultLayout'
import Moodboard from './modules/moodboard/Moodboard'

// {
/*Design UI Route*/
// }
import Ui from '../assets/designs/Ui'
import Home from '../assets/designs/home'
// we dont need this compoennt as we have completed the redux set up
// import ReduxComp from './modules/redux_test_module/ReduxComp'
import MoodboardTemplate from '../assets/designs/moodboard'
import MoodboardView from '../assets/designs/moodboard/moodboardView'
import VerifyEmail from './modules/login-journey/VerifyEmail'
import MoodboardHome from '../assets/designs/moodboard/moodboard-home.js'

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
                    <Route path='verify/email' element={<VerifyEmail />} />

                    {/* <Route path='redux' element={<ReduxComp />} /> */}

                    <Route path='/' element={<DefaultLayout />}>
                        <Route element={<ProtectedRoutes />}>
                            {/* <Route
                                path='/'
                                element={<Navigate replace to='dashboard' />}
                            /> */}
                            <Route path='dashboard' element={<Dashboard />} />
                            <Route
                                path='activation'
                                element={<ActivationPopup />}
                            />
                            <Route path='moodboard' element={<Moodboard />} />
                        </Route>
                    </Route>

                    {/*Design UI Route*/}
                    <Route path='/ui' element={<Ui />} />
                    <Route path='/Home' element={<Home />} />
                    <Route path='/moodboard' element={<MoodboardTemplate />} />
                    <Route path='/moodboardView' element={<MoodboardView />} />
                    <Route path='/moodboard/moodboard-home' element={<MoodboardHome />} />
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
