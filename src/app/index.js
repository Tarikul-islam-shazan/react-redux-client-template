import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import AuthLayout from "./layouts/AuthLayout";
import { getToken } from "./services/Util";
import Login from "./pages/auth/Login";
import Logout from "./pages/auth/Logout";
import Register from "./pages/auth/Register";
import ForgetPassword from "./pages/auth/ForgetPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import OAuth2RedirectHandler from "./pages/auth/OAuth2RedirectHandler";
import MyProfile from "./pages/auth/MyProfile";
import TaskDashboard from "./pages/task/TaskDashboard";
import InsertPhoneNumber from "./pages/questionairre/InsertPhoneNumber";
import VerifyOtp from "./pages/questionairre/VerifyOtp";
import PickDesignV2 from "./pages/design/PickDesignV2";
import ShowProductCollection from "./pages/design/ShowProductCollection";
import OurDesignDetails from "./pages/design/OurDesignDetails";
import OurDesignDetailsV2 from "./pages/design/OurDesignDetailsV2";
import QuoteNowCart from "./pages/design/QuoteNowCart";
import MyOrder from "./pages/project/MyOrder";
import MyProjectDetailsV2 from "./pages/project/MyProjectDetailsV2";
import MyProduct from "./pages/product/MyProduct";
import MyRFQsV2 from "./pages/rfo/MyRFQsV2";
import RfoNegotiation from "./pages/rfo/RfoNegotiation";
import ConfirmOrder from "./pages/order/ConfirmOrder";
import ConfirmPayment from "./pages/order/ConfirmPayment";
import PaymentSuccess from "./pages/order/PaymentSuccess";
import CollectionList from "./pages/collection/CollectionList";
import CollectionDetails from "./pages/collection/CollectionDetails";
import InvoiceList from "./pages/invoice/InvoiceList";
import InvoiceDetails from "./pages/invoice/InvoiceDetails";
import PayInvoice from "./pages/invoice/PayInvoice";
import ShareDesign from "./pages/design/ShareDesign";
import EditShareDesign from "./pages/design/EditShareDesign";
import Dashboard from "./pages/dashboard/Dashboard";
import BuyerLoginPopup from "./buyerLogin/BuyerLoginPopup";
import BrandCreation from "./pages/questionairre/BrandCreation";
import NotificationAll from "./pages/notification/NotificationAll";
import VerifyEmail from "./buyerLogin/VerifyEmail";
import MyOrderList from "./modules/timeline/MyOrderList";
import Timeline from "./modules/timeline/Timeline";

const AuthRoute = ({ component: Component, ...rest }) => {
    let token = getToken();
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
        <Redirect to="/dashboard" />
    );
};

const AuthRouteWithoutLayout = ({ component: Component, ...rest }) => {
    const token = getToken();
    return token == null ? (
        <Route {...rest} render={(matchProps) => <Component {...matchProps} />} />
    ) : (
        <Redirect to="/dashboard" />
    );
};

const PublicRoute = ({ component: Component, ...rest }) => {
    const token = getToken();
    const redirectRoute = window.location.pathname;

    let data = JSON.parse(localStorage.getItem("userInfo"))

    if(data.status === "ACTIVE"){
        const url =
            "/login" + (redirectRoute && redirectRoute !== "/" ? "?redirect=" + redirectRoute : "");
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
            <Redirect to={url} />
        );
    } else if (data.status === "DISABLED") {
        localStorage.clear();
        sessionStorage.clear()
        return <Redirect to="/login"/>
    } else if (data.emailVerified === false) {
        return <Redirect to="/verifyEmail"/>
    }else if (data.businessInfoGiven === false) {
        return <Redirect to="/verify/email"/>
    } else if (data.status === "PENDING") {
        return <Redirect to="/loginPopup"/>
    }
};

const QuestionairreRoute = ({ component: Component, ...rest }) => {
    const token = getToken();
    return token ? (
        <Route {...rest} render={(matchProps) => <Component {...matchProps} />} />
    ) : (
        <Redirect to="/login" />
    );
};

class Root extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    {/* <PublicRoute exact path="/" component={Dashboard} /> */}
                    <PublicRoute exact path="/dashboard" component={Dashboard} />
                    {/* <PublicRoute exact path="/dashboard" component={TaskDashboard} /> */}
                    <PublicRoute exact path="/tasks" component={TaskDashboard} />
                    <QuestionairreRoute exact path="/loginPopup" component={BuyerLoginPopup} />
                    <QuestionairreRoute exact path="/info" component={InsertPhoneNumber} />
                    <QuestionairreRoute exact path="/verify-otp" component={VerifyOtp} />
                    <QuestionairreRoute exact path="/verify/email" component={BrandCreation} />
                    {/*<QuestionairreRoute exact path="/brandCreation" component={BrandCreation} />*/}
                    <QuestionairreRoute exact path="/verifyEmail" component={VerifyEmail} />
                    {/*<QuestionairreRoute exact path="/questionairre-step-1" component={ Questionairre_1 }/>
                  <QuestionairreRoute exact path="/questionairre-step-2" component={ Questionairre_2 }/>
                  <QuestionairreRoute exact path="/questionairre-step-3" component={ Questionairre_3 }/>
                  <QuestionairreRoute exact path="/questionairre-final" component={ Questionairre_final }/>*/}
                    <AuthRoute exact path="/login" component={Login} />
                    <AuthRoute exact path="/" component={Login} />
                    <AuthRoute exact path="/oauth2/redirect" component={OAuth2RedirectHandler} />
                    <Route exact path="/logout" component={Logout} />
                    <AuthRoute exact path="/register" component={Register} />
                    <AuthRouteWithoutLayout
                        exact
                        path="/forget-password"
                        component={ForgetPassword}
                    />
                    <AuthRouteWithoutLayout
                        exact
                        path="/reset-password"
                        component={ResetPassword}
                    />
                    <PublicRoute exact path="/my-profile" component={MyProfile} />

                    <PublicRoute exact path="/designs/add" component={ShareDesign} />
                    {/*<PublicRoute exact path="/designs/explore" component={ PickDesign }/>*/}
                    <PublicRoute exact path="/designs/explore" component={PickDesignV2} />
                    <PublicRoute exact path="/designs/view/:id" component={OurDesignDetailsV2} />
                    <PublicRoute
                        exact
                        path="/designs/collections/view/:id"
                        component={ShowProductCollection}
                    />
                    <PublicRoute exact path="/notifications/all" component={NotificationAll} />
                    <PublicRoute exact path="/quote-now" component={QuoteNowCart} />
                    <PublicRoute exact path="/our-design-details" component={OurDesignDetails} />
                    <PublicRoute exact path="/my-products" component={MyProduct} />
                    <PublicRoute exact path="/my-products/:id" component={OurDesignDetails} />
                    <PublicRoute exact path="/quotes/list" component={MyRFQsV2} />

                    <PublicRoute exact path="/designs/edit/:id" component={EditShareDesign} />

                    {/*<PublicRoute exact path="/v2/quotes/list" component={ MyRFQsV2 }/>*/}
                    <PublicRoute exact path="/negotiation/:id" component={RfoNegotiation} />

                    {/*<PublicRoute exact path="/orders/my-orders" component={MyOrder} />*/}

                    <PublicRoute exact path="/orders/view/:id" component={MyProjectDetailsV2} />

                    <PublicRoute exact path="/orders/confirm-order" component={ConfirmOrder} />
                    <PublicRoute exact path="/orders/confirm-order/:id" component={ConfirmOrder} />
                    <PublicRoute
                        exact
                        path="/orders/confirm-payment/:id"
                        component={ConfirmPayment}
                    />
                    <PublicRoute exact path="/payment/confirm" component={PaymentSuccess} />
                    <PublicRoute exact path="/collections/list" component={CollectionList} />
                    <PublicRoute exact path="/collections/view/:id" component={CollectionDetails} />

                    <PublicRoute exact path="/invoices/list" component={InvoiceList} />
                    <PublicRoute exact path="/invoices/view/:id" component={InvoiceDetails} />
                    <PublicRoute exact path="/invoices/pay/:id" component={PayInvoice} />
                    <PublicRoute exact path="/orders/my-orders" component={MyOrderList} />
                    <PublicRoute exact path="/timeline/:orderId" component={Timeline} />
                </Switch>
            </Router>
        );
    }
}

export default Root;
