import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { setActiveTab } from "../redux/actions/sidebar";
import { getUrlParameter } from "../services/Util";

class AuthLayout extends React.Component {
    componentDidMount() {
        this.props.setActiveTab(window.location.pathname);
    }

    render() {
        let { activeTab } = this.props;
        let redirect = getUrlParameter("redirect", this.props.location.search);
        return (
            <>
                <div className="bg_color_custom">
                    <div className="auth-page container">
                        <div className="layout_headers">
                            <a
                                href="https://nitex.com"
                                className="back-link back-link-override custom_l_a"
                            >
                                <span>
                                    <img src={require("../assets/icons/home.png")} alt="back" />
                                </span>{" "}
                                Back to website
                            </a>

                            {activeTab.includes("register") && (
                                <p>
                                    {" "}
                                    Already have an account?
                                    <Link
                                        to={`/login${redirect ? "?redirect=" + redirect : ""}`}
                                        onClick={() => this.props.setActiveTab("/login")}
                                        className="text-active text-color_orange"
                                        style={{ textDecoration: "underline" }}
                                    >
                                        Sign in
                                    </Link>
                                </p>
                            )}

                            {activeTab.includes("login") && (
                                <p>
                                    Don't have an account?
                                    <Link
                                        to={`/register${redirect ? "?redirect=" + redirect : ""}`}
                                        onClick={() => this.props.setActiveTab("/register")}
                                        className="text-active text-color_orange"
                                        style={{ textDecoration: "underline" }}
                                    >
                                        Sign up
                                    </Link>
                                </p>
                            )}
                        </div>
                        <div className="row fullscreen">
                            <div
                                className="col-lg-7 col-sm-12 col-md-12 bg_white_auth d-none d-xl-block"
                                style={{ padding: 0 }}
                            >
                                <div className="bg-wrapper">
                                    <div className="logo-wrapper">
                                        <img
                                            src={require("../assets/images/logo.png")}
                                            alt="logo"
                                            className="img-fluid d-block mx-auto"
                                            width="125px"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div
                                className="col-lg-5 col-sm-12 col-md-12 bg_white_auth"
                                style={{ padding: 0 }}
                            >
                                <div className="content-wrapper content-wrapper-override">
                                    {this.props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (store) => ({
    activeTab: store.sidebar.activeTab,
});

export default connect(mapStateToProps, { setActiveTab })(AuthLayout);
