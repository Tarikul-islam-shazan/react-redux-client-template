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
import ReduxComp from './modules/redux_test_module/ReduxComp'
import MoodboardTemplate from '../assets/designs/moodboard'
import MoodboardView from '../assets/designs/moodboard/moodboardView'
import VerifyEmail from './modules/login-journey/VerifyEmail'
import MoodboardHome from '../assets/designs/moodboard/moodboard-home.js'
import Collections from '../assets/designs/collections'
import MyCollection from '../assets/designs/collections/my-collection.js'
import RequestedCollection from '../assets/designs/collections/requested-collection.js'
import CollectionDetails from '../assets/designs/collections/collection-details.js'
import Quote from '../assets/designs/quote'
import QuoteDetails from '../assets/designs/quote/quote-details'
import StyleDetail from '../assets/designs/collections/style-detail.js'
import PlaceOrder from '../assets/designs/place-order/place-order.js'
import Team from '../assets/designs/team'
import Faq from '../assets/designs/faq'
import Report from '../assets/designs/report'
import Favorite from '../assets/designs/favorite'

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
                    <Route path='/moodboard' element={<MoodboardTemplate />} />
                    <Route path='/moodboardView' element={<MoodboardView />} />
                    <Route
                        path='/moodboard/moodboard-home'
                        element={<MoodboardHome />}
                    />
                    <Route path='/collections' element={<Collections />} />
                    <Route path='/my-collection' element={<MyCollection />} />
                    <Route
                        path='/requested-collection'
                        element={<RequestedCollection />}
                    />
                    <Route
                        path='/requested-collection'
                        element={<RequestedCollection />}
                    />
                    <Route
                        path='/collection-details'
                        element={<CollectionDetails />}
                    />
                    <Route path='/quote' element={<Quote />} />
                    <Route path='/quote-details' element={<QuoteDetails />} />
                    <Route path='/style-detail' element={<StyleDetail />} />
                    <Route path='/place-order' element={<PlaceOrder />} />
                    <Route path='/team' element={<Team />} />
                    <Route path='/faq' element={<Faq />} />
                    <Route path='/report' element={<Report />} />
                    <Route path='/favorite' element={<Favorite />} />
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
