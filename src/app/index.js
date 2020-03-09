import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import AuthLayout from './layouts/AuthLayout';

import  {isTokenExpired} from "./services/Util";

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import Dashboard from './pages/dashboard/Dashboard';

import Questionairre_1 from './pages/questionairre/Questionairre_1';
import Questionairre_2 from './pages/questionairre/Questionairre_2';
import Questionairre_3 from './pages/questionairre/Questionairre_3';
import Questionairre_final from './pages/questionairre/Questionairre_final';

import AddResource from './pages/resources/AddResource';
import ResourceList from './pages/resources/ResourceList';
import EditResource from './pages/resources/EditResource';

import ResourceListTest from './pages/resources/ResourceListTest';

// import Login from './components/Login';
// import Logout from './components/Logout';
// import RedirectTo from './components/RedirectTo';
// import NotFound from './components/NotFound';

// const PrivateRoute = ({component: Component, ...rest}) => {
//     const token = JSON.parse(localStorage.getItem('token'));
//     return token ? (
//         <Route { ...rest } render={ matchProps => (
//             <PrivateLayout>
//                 <RedirectTo/>
//                 <Component { ...matchProps } />
//             </PrivateLayout>
//         ) }/>
//     ) : <Redirect to="/login"/>;
// };

// const QuestionairreRoute = ({component: Component, ...rest}) => {
//     return (
//         <Route { ...rest } render={ matchProps => (
//             <QuestionairreLayout>
//                 <Component { ...matchProps } />
//             </QuestionairreLayout>
//         ) }/>
//     );
// };

const AuthRoute = ({component: Component, ...rest}) => {
    return (
        <Route { ...rest } render={ matchProps => (
            <AuthLayout>
                <Component { ...matchProps } />
            </AuthLayout>
        ) }/>
    );
};

const PublicRoute = ({component: Component, ...rest}) => {
    return (
        <Route { ...rest } render={ matchProps => (
            <DefaultLayout>
                <Component { ...matchProps } />
            </DefaultLayout>
        ) }/>
    );
};

class Root extends Component {
    render() {
        // const token = JSON.parse(localStorage.getItem('token'));
        return (
            <Router>
                <Switch>
                  <AuthRoute exact path="/" component={ Login }/>
                  <Route exact path="/questionairre-step-1" component={ Questionairre_1 }/>
                  <Route exact path="/questionairre-step-2" component={ Questionairre_2 }/>
                  <Route exact path="/questionairre-step-3" component={ Questionairre_3 }/>
                  <Route exact path="/questionairre-final" component={ Questionairre_final }/>
                  <AuthRoute exact path="/login" component={ Login }/>
                  <AuthRoute exact path="/register" component={ Register }/>
                  <PublicRoute exact path="/list" component={ ResourceListTest }/>
                  <PublicRoute exact path="/dashboard" component={ Dashboard }/>
                  {/*<PublicRoute exact path="/upload-resource" component={ AddResource }/>
                  <PublicRoute exact path="/resource-list" component={ ResourceList }/>
                  <PublicRoute path="/resource-list/:resourceId" component={ EditResource }/>
                  <PublicRoute exact path="/" component={ AddResource }/>*/}
                </Switch>
            </Router>
        );
    }
}

export default Root;
