import React, { Component, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
// import loadjs from 'loadjs';

import DefaultLayout from './layouts/DefaultLayout';
import AuthLayout from './layouts/AuthLayout';

import  { isTokenExpired, getToken } from "./services/Util";

import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import Register from './pages/auth/Register';
import ForgetPassword from './pages/auth/ForgetPassword';
import ResetPassword from './pages/auth/ResetPassword';
import OAuth2RedirectHandler from './pages/auth/OAuth2RedirectHandler';
import MyProfile from './pages/auth/MyProfile';

import Dashboard from './pages/dashboard/Dashboard';

import InsertPhoneNumber from './pages/questionairre/InsertPhoneNumber';
import VerifyOtp from './pages/questionairre/VerifyOtp';

import Questionairre_1 from './pages/questionairre/Questionairre_1';
import Questionairre_2 from './pages/questionairre/Questionairre_2';
import Questionairre_3 from './pages/questionairre/Questionairre_3';
import Questionairre_final from './pages/questionairre/Questionairre_final';

import RequestForQuotation from './pages/quotation/RequestForQuotation';
import PickDesign from './pages/design/PickDesign';

import OurDesignDetails from './pages/design/OurDesignDetails';
import MyProject from './pages/project/MyProject';
import MyProjectDetails from './pages/project/MyProjectDetails';
import MyProduct from './pages/product/MyProduct';
import MyRFQs from './pages/rfo/MyRFQs';
import RfoNegotiation from './pages/rfo/RfoNegotiation';


const AuthRoute = ({component: Component, ...rest}) => {
    let token = getToken()
    return token==null ? (
        <Route { ...rest } render={ matchProps => (
            <AuthLayout { ...matchProps }>
                <Component { ...matchProps } />
            </AuthLayout>
        ) }/>
    ) : <Redirect to="/dashboard"/>;
};

const AuthRouteWithoutLayout = ({component: Component, ...rest}) => {
    const token = getToken();
    return token==null ? (
        <Route { ...rest } render={ matchProps => (
            <Component { ...matchProps } />
        ) }/>
    ) : <Redirect to="/dashboard"/>;
};

const PublicRoute = ({component: Component, ...rest}) => {
    const token = getToken();
    const redirectRoute = window.location.pathname;
    const url = '/login' + (redirectRoute && redirectRoute !== '/' ? '?redirect=' + redirectRoute : '')
    return token ? (
        <Route { ...rest } render={ matchProps => (
            <DefaultLayout>
                <Component { ...matchProps } />
            </DefaultLayout>
        ) }/>
    ) : <Redirect to={url}/>;
};

const QuestionairreRoute = ({component: Component, ...rest}) => {
    const token = getToken();
    return token ? (
        <Route { ...rest } render={ matchProps => (
            <Component { ...matchProps } />
        ) }/>
    ) : <Redirect to="/login"/>;
};

class Root extends Component {

    render() {
        return (
            <Router>
                <Switch>
                  <PublicRoute exact path="/" component={ PickDesign }/>
                  <QuestionairreRoute exact path="/info" component={ InsertPhoneNumber }/>
                  <QuestionairreRoute exact path="/verify-otp" component={ VerifyOtp }/>
                  {/*<QuestionairreRoute exact path="/questionairre-step-1" component={ Questionairre_1 }/>
                  <QuestionairreRoute exact path="/questionairre-step-2" component={ Questionairre_2 }/>
                  <QuestionairreRoute exact path="/questionairre-step-3" component={ Questionairre_3 }/>
                  <QuestionairreRoute exact path="/questionairre-final" component={ Questionairre_final }/>*/}
                  <AuthRoute exact path="/login" component={ Login }/>
                  <AuthRoute exact path="/oauth2/redirect" component={ OAuth2RedirectHandler }/>
                  <Route exact path="/logout" component={ Logout }/>
                  <AuthRoute exact path="/register" component={ Register }/>
                  <AuthRouteWithoutLayout exact path="/forget-password" component={ ForgetPassword }/>
                  <AuthRouteWithoutLayout exact path="/reset-password" component={ ResetPassword }/>
                  <PublicRoute exact path="/my-profile" component={ MyProfile }/>
                  <PublicRoute exact path="/dashboard" component={ Dashboard }/>
                  <PublicRoute exact path="/quote-request" component={ RequestForQuotation }/>
                  <PublicRoute exact path="/pick-design" component={ PickDesign }/>
                  <PublicRoute exact path="/our-design-details" component={ OurDesignDetails }/>
                  <PublicRoute exact path="/my-project" component={ MyProject }/>
                  <PublicRoute exact path="/my-project-details/:id" component={ MyProjectDetails }/>
                  <PublicRoute exact path="/my-products" component={ MyProduct }/>
                  <PublicRoute exact path="/my-products/:id" component={ OurDesignDetails }/>
                  <PublicRoute exact path="/my-rfqs" component={ MyRFQs }/>
                  <PublicRoute exact path="/negotiation/:id" component={ RfoNegotiation }/>
                </Switch>
            </Router>
        );
    }
}

export default Root;
