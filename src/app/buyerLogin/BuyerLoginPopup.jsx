import React, {useEffect, useState} from "react";
import Http from "../services/Http";
import {toastError, toastSuccess} from "../commonComponents/Toast";
import LoaderComponent from "../commonComponents/Loader";
import {useHistory} from "react-router-dom";
import IntlTelInput from "react-intl-tel-input";

const BuyerLoginPopup = ({}) => {
    const [loading, setLoading] = useState(true);
    const [managerInfo, setManagerInfo] = useState({});
    const [buyerDetailsInfo, setBuyerDetailsInfo] = useState({});
    const [phoneNumberError, setPhoneNumberError] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [state, setState] = useState({iso2: "us", countryCode: "1"})
    const history = useHistory();

    useEffect(() => {
        Http.GET("userInfo")
            .then(async (response) => {
                let refreshToken = localStorage.getItem("refreshToken");
                localStorage.setItem("userInfo", JSON.stringify(response.data));
                let isTokenUpdateRequired = response.data.updatedTokenRequired;
                if (isTokenUpdateRequired === true) {
                    await Http.POST("refreshUserToken", {refreshToken: refreshToken})
                        .then(async (tokenResponse) => {
                            await localStorage.setItem(
                                "token",
                                `${tokenResponse.data.tokenType} ${tokenResponse.data.accessToken}`
                            );
                            await redirectPage(response);
                            setLoading(false);
                        })
                        .catch((error) => {
                            setLoading(false);
                            toastError(error.response.data.message);
                        });
                } else {
                    await redirectPage(response);
                }
            })
            .catch(({response}) => {
                setLoading(false);
                toastError(response.data.message);
            });
    }, []);

    const redirectPage = async (response) => {
        if (response.data.status === "ACTIVE") {
            await history.push("/dashboard");
        } else if (response.data.status === "DISABLED") {
            await history.push("/login");
        }
    };

    useEffect(() => {
        Http.GET("accManagerInfo")
            .then((response) => {
                let buyerInfo = JSON.parse(localStorage.getItem("userInfo"));
                setManagerInfo(response.data);
                setBuyerDetailsInfo(buyerInfo);
                setLoading(false);
            })
            .catch(({response}) => {
                setLoading(false);
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Couldn't fetch user info.");
                }
            });
    }, []);

    const handleSubmit = () => {
        if (phoneNumber === "") {
            setPhoneNumberError("Phone Number Required!")
            return false
        }
        let userInfo = JSON.parse(localStorage.getItem("userInfo"))
        let body = {
            email: userInfo.email,
            phoneNumber: "+" + state.countryCode + phoneNumber,
            countryCode: state.countryCode,
            iso2: state.iso2
        };
        setLoading(true)
        Http.POST('updateBusinessInfo', body)
            .then((response) => {
                Http.GET("userInfo")
                    .then(async (response) => {
                        localStorage.setItem("userInfo", JSON.stringify(response.data));
                        toastSuccess("Information updated successful!");
                        setLoading(false)
                    })
                    .catch(({response}) => {
                        setLoading(false);
                        toastError(response.data.message);
                    });
            })
            .catch(({response}) => {
                setLoading(false)
                toastError("Request wasn't successful.");
            });
    }

    const onChangeFlag = (e, f) => {
        console.log(f)
        setState({
            iso2: f.iso2,
            countryCode: f.dialCode
        })
    }

    const onChangeNumber = async (numberValidation, phoneNumber) => {
        await setPhoneNumber(phoneNumber)
        await setPhoneNumberError("");
    }


    const renderWelcomeMessage = () => {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo.reason === "WRONG_NUMBER") {
            return (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="wrong-number-worning-text">
                            <p>We are unable to reach you over the phone Please recheck your phone number, and update if
                                necessary</p>
                        </div>
                        <div className="form-group questionnaire">
                            <div className="questionnaire-form">
                                <div className="country-phone-code">
                                    <IntlTelInput
                                        containerClassName="intl-tel-input"
                                        inputClassName={`form-control ${phoneNumberError ? 'error' : ''}`}
                                        onSelectFlag={onChangeFlag}
                                        onPhoneNumberChange={onChangeNumber}
                                        separateDialCode={true}
                                    />
                                </div>
                            </div>
                            
                            {
                                phoneNumberError &&
                                <div
                                    className="error"
                                >
                                    {phoneNumberError}
                                </div>
                            }
                            <button className="btn-brand" onClick={handleSubmit}>Update</button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <>
                    <p>
                        Thanks for signing up to the Nitex and joining our creative
                        community!
                    </p>
                    <p>
                        This is <span>{managerInfo?.name}</span>, a Business
                        Evangelist dedicated to you and your brand. I’m really
                        looking forward to knowing more about you and how Nitex can
                        help grow your brand. I will contact you within 24 hours to
                        show you our product capabilities, understand your business
                        goals, and of course help you achieve them.
                    </p>
                    <p className="mb-0">
                        While waiting, you can check out how we’re empowering +50
                        brands from across the world.
                    </p>
                </>
            )
        }
    }

    return (
        <>
            <aside className="left-panel" id="side-menu">
                <div className="logo">
                    <a href="#" className="logo-expanded">
                        <img
                            src={require("../assets/images/logo_final.png")}
                            alt="logo"
                            className="img-fluid d-block mx-auto img_logo_expand"
                        />
                    </a>
                </div>
                <nav className="navigation">
                    <ul className="list-unstyled list_sidebar">
                        <li className="active">
                            <a href="#">
                                <div className="sidbar-icon">
                                    <img
                                        src={require("../assets/icons/Dashboard-active.svg")}
                                        alt=""
                                    />
                                </div>
                                <span className="nav-label">Dashboard</span>
                            </a>
                        </li>
                        <li className="">
                            <a href="#">
                                <div className="sidbar-icon">
                                    <img
                                        src={require("../assets/icons/collections-default.svg")}
                                        alt=""
                                    />
                                </div>
                                <span className="nav-label">Collections</span>
                            </a>
                        </li>
                        <li className="">
                            <a href="#">
                                <div className="sidbar-icon">
                                    <img
                                        src={require("../assets/icons/quotes-default.svg")}
                                        alt=""
                                    />
                                </div>
                                <span className="nav-label">Quotes</span>
                            </a>
                        </li>
                        <li className="">
                            <a href="#">
                                <div className="sidbar-icon">
                                    <img
                                        src={require("../assets/icons/orders-default.svg")}
                                        alt=""
                                    />
                                </div>
                                <span className="nav-label">Orders</span>
                            </a>
                        </li>
                        <li className="">
                            <a href="#">
                                <div className="sidbar-icon">
                                    <img
                                        src={require("../assets/icons/payments-deafult.svg")}
                                        alt=""
                                    />
                                </div>
                                <span className="nav-label">Payments</span>
                            </a>
                        </li>
                        <li className="">
                            <a href="#">
                                <div className="sidbar-icon">
                                    <img
                                        src={require("../assets/icons/explore-design-default.svg")}
                                        alt=""
                                    />
                                </div>
                                <span className="nav-label">Explore Designs</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>
            <div className="content overflow-hidden vh-100">
                <nav className="navbar navbar-expand navbar-light bg-white topbar static-top">
                    <button
                        id="sidebarToggleTop"
                        className="btn btn-link d-md-none rounded-circle mr-3"
                    >
                        <svg
                            className="svg-inline--fa fa-bars fa-w-14"
                            aria-hidden="true"
                            data-prefix="fa"
                            data-icon="bars"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            data-fa-i2svg=""
                        >
                            <path
                                fill="currentColor"
                                d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
                            ></path>
                        </svg>
                    </button>
                    <ul className="navbar-nav ml-auto align-items-center">
                        <li className="">
                            <button className="btn my-task-btn">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                >
                                    <path
                                        d="M5 5H15.8333"
                                        stroke="#21242B"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></path>
                                    <path
                                        d="M5 10H15.8333"
                                        stroke="#21242B"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></path>
                                    <path
                                        d="M5 15H15.8333"
                                        stroke="#21242B"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></path>
                                    <path
                                        d="M2.5 5H2.50833"
                                        stroke="white"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></path>
                                    <path
                                        d="M2.5 15H2.50833"
                                        stroke="white"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></path>
                                </svg>
                                <span>My tasks</span>
                            </button>
                        </li>
                        <li
                            className="nav-item quote-cart dropdown no-arrow"
                            data-toggle="tooltip"
                            data-placement="top"
                            title=""
                            data-original-title="Request quote"
                        >
                            <button className="btn btn-outline-default nav-link" type="button">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                                        stroke="#21242B"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></path>
                                    <path
                                        d="M20.9999 20.9999L16.6499 16.6499"
                                        stroke="#21242B"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></path>
                                    <path
                                        d="M13.1776 8.81279C13.0367 8.58373 12.832 8.39488 12.5854 8.26648C12.3388 8.13807 12.0596 8.07494 11.7776 8.08383H10.2221C9.8095 8.08383 9.41384 8.23744 9.12212 8.51085C8.83039 8.78426 8.6665 9.15509 8.6665 9.54175C8.6665 9.92842 8.83039 10.2992 9.12212 10.5727C9.41384 10.8461 9.8095 10.9997 10.2221 10.9997H11.7776C12.1902 10.9997 12.5858 11.1533 12.8776 11.4267C13.1693 11.7001 13.3332 12.0709 13.3332 12.4576C13.3332 12.8443 13.1693 13.2151 12.8776 13.4885C12.5858 13.7619 12.1902 13.9155 11.7776 13.9155H10.2221C9.94011 13.9244 9.66088 13.8613 9.41427 13.7329C9.16766 13.6045 8.96296 13.4156 8.82206 13.1866"
                                        stroke="#21242B"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></path>
                                    <path
                                        d="M11 14.1113V15.6668M11 6.3335V7.88905V6.3335Z"
                                        stroke="#21242B"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></path>
                                </svg>
                                <span>RFQ</span>
                            </button>
                        </li>
                        <li
                            className="nav-item notification-bell dropdown no-arrow mx-3"
                            data-toggle="tooltip"
                            data-placement="top"
                            title=""
                            data-original-title="Notification"
                        >
                            <button
                                className="btn btn-outline-default nav-link"
                                type="button"
                                id="dropdownNotification"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14.187"
                                    height="18.302"
                                    viewBox="0 0 14.187 18.302"
                                >
                                    <path
                                        id="bell"
                                        d="M14.829,19a3,3,0,0,1-5.658,0H7.578a2.5,2.5,0,0,1-2.285-3.515L6,13.894V11a6,6,0,0,1,4-5.659V5a2,2,0,1,1,4,0v.341A6,6,0,0,1,18,11v2.894l.707,1.591A2.5,2.5,0,0,1,16.423,19Zm-1.1,0H10.267a2,2,0,0,0,3.466,0ZM13,5.083V5a1,1,0,0,0-2,0v.083A6.068,6.068,0,0,1,13,5.083ZM12,6a5,5,0,0,0-5,5v3l-.043.2-.75,1.688A1.5,1.5,0,0,0,7.578,18h8.845a1.5,1.5,0,0,0,1.371-2.109l-.75-1.688L17,14V11A5,5,0,0,0,12,6Z"
                                        transform="translate(-4.907 -2.85)"
                                        fill="#21242b"
                                        stroke="#21242b"
                                        stroke-width="0.3"
                                    ></path>
                                </svg>
                                <span className="unread-notification"></span>
                            </button>
                        </li>
                        <li className="nav-item dropdown no-arrow">
                            <button
                                className="btn btn-outline-default nav-link dropdown-toggle"
                                type="button"
                                id="dropdownProfileButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <img
                                    className="img-profile rounded-circle"
                                    src={process.env.PUBLIC_URL + "/icons/buyerDefault.png"}
                                    alt="profile-pic"
                                />
                                <span className="mr-2 d-none d-lg-inline">
                                    {buyerDetailsInfo?.name}
                                </span>
                            </button>
                            <div
                                className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="dropdownProfileButton"
                            >
                                <a className="dropdown-item" href="#">
                                    <svg
                                        className="svg-inline--fa fa-tachometer-alt fa-w-18 mr-2 text-gray-400 font-12"
                                        aria-hidden="true"
                                        data-prefix="fas"
                                        data-icon="tachometer-alt"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 576 512"
                                        data-fa-i2svg=""
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M75.694 480a48.02 48.02 0 0 1-42.448-25.571C12.023 414.3 0 368.556 0 320 0 160.942 128.942 32 288 32s288 128.942 288 288c0 48.556-12.023 94.3-33.246 134.429A48.018 48.018 0 0 1 500.306 480H75.694zM512 288c-17.673 0-32 14.327-32 32 0 17.673 14.327 32 32 32s32-14.327 32-32c0-17.673-14.327-32-32-32zM288 128c17.673 0 32-14.327 32-32 0-17.673-14.327-32-32-32s-32 14.327-32 32c0 17.673 14.327 32 32 32zM64 288c-17.673 0-32 14.327-32 32 0 17.673 14.327 32 32 32s32-14.327 32-32c0-17.673-14.327-32-32-32zm65.608-158.392c-17.673 0-32 14.327-32 32 0 17.673 14.327 32 32 32s32-14.327 32-32c0-17.673-14.327-32-32-32zm316.784 0c-17.673 0-32 14.327-32 32 0 17.673 14.327 32 32 32s32-14.327 32-32c0-17.673-14.327-32-32-32zm-87.078 31.534c-12.627-4.04-26.133 2.92-30.173 15.544l-45.923 143.511C250.108 322.645 224 350.264 224 384c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-19.773-8.971-37.447-23.061-49.187l45.919-143.498c4.039-12.625-2.92-26.133-15.544-30.173z"
                                        ></path>
                                    </svg>
                                    My task
                                </a>
                                <a className="dropdown-item" href="#">
                                    <svg
                                        className="svg-inline--fa fa-user fa-w-14 fa-sm fa-fw mr-2 text-gray-400"
                                        aria-hidden="true"
                                        data-prefix="fas"
                                        data-icon="user"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                        data-fa-i2svg=""
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                                        ></path>
                                    </svg>
                                    My profile
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item">
                                    <svg
                                        className="svg-inline--fa fa-sign-out-alt fa-w-16 fa-sm fa-fw mr-2 text-gray-400"
                                        aria-hidden="true"
                                        data-prefix="fas"
                                        data-icon="sign-out-alt"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                        data-fa-i2svg=""
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"
                                        ></path>
                                    </svg>
                                    Logout
                                </a>
                            </div>
                        </li>
                    </ul>
                </nav>
                <div className="wraper container-fluid dashboard-container">
                    <div data-testid="wrapper" className="_loading_overlay_wrapper css-79elbk">
                        <div className="buyer-dashboard-container">
                            <div className="welcome-message">
                                <h3>
                                    Hi <span>{buyerDetailsInfo?.name}</span>, Good Afternoon!
                                </h3>
                            </div>
                            <div className="full-journey-status">
                                <div className="one-sixth sustainable-box">
                                    <div className="status-details">
                                        <h3>0%</h3>
                                        <span>Sustainable</span>
                                    </div>
                                    <div className="status-icon">
                                        <img src="/icons/sustainable.svg" alt="sustainable"/>
                                    </div>
                                </div>
                                <div className="one-sixth quote-order-box">
                                    <div className="status-details">
                                        <h3>0%</h3>
                                        <span>Quote to order</span>
                                    </div>
                                    <div className="status-icon">
                                        <img src="/icons/quote-order.svg" alt="quote"/>
                                    </div>
                                </div>
                                <div className="one-sixth design-box">
                                    <div className="status-details">
                                        <h3>
                                            0<span>/0</span>
                                        </h3>
                                        <span>Designs accepted</span>
                                    </div>
                                    <div className="status-icon">
                                        <img src="/icons/Design.svg" alt="Design"/>
                                    </div>
                                </div>
                                <div className="one-sixth delivered-box">
                                    <div className="status-details">
                                        <h3>
                                            0<span>/0</span>
                                        </h3>
                                        <span>Orders deliverd</span>
                                    </div>
                                    <div className="status-icon">
                                        <img src="/icons/shipment.svg" alt="shipment"/>
                                    </div>
                                </div>
                                <div className="one-sixth order-value-box">
                                    <div className="status-details">
                                        <h3>$</h3>
                                        <span>Order value</span>
                                    </div>
                                    <div className="status-icon">
                                        <img src="/icons/order-value.svg" alt="order-value"/>
                                    </div>
                                </div>
                                <div className="one-sixth supplier-box">
                                    <div className="status-details">
                                        <h3>0</h3>
                                        <span>Manufacturing units</span>
                                    </div>
                                    <div className="status-icon">
                                        <img src="/icons/Supplier.svg" alt="Supplier"/>
                                    </div>
                                </div>
                            </div>
                            <div className="orders-and-quotes-status">
                                <div className="one-half my-orders">
                                    <div className="state-title d-flex align-items-center">
                                        <h3>
                                            My orders <span className="count">(0)</span>
                                        </h3>
                                        <a href="#"> View all</a>
                                    </div>
                                    <div className="running-orders-info-section progress-info-team-brand">
                                        <div className="container-fluid">
                                            <div className="row">
                                                <div className="col-12 px-0">
                                                    <div className="team-performance-top">
                                                        <div className="status-filter">
                                                            <div className="performence-status">
                                                                <ul className="order-status d-flex">
                                                                    <li className="mini-fonts">
                                                                        <span
                                                                            className="progress-identifier green"></span>
                                                                        Completed on time
                                                                    </li>
                                                                    <li className="mini-fonts">
                                                                        <span
                                                                            className="progress-identifier blue"></span>
                                                                        Pending
                                                                    </li>
                                                                    <li className="mini-fonts">
                                                                        <span
                                                                            className="progress-identifier red"></span>
                                                                        Overdue
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="progress-section">
                                                        <div className="nothing-found text-center">
                                                            <img
                                                                src="/icons/Nothing found.svg"
                                                                alt="nothing found"
                                                            />
                                                            <p>No order created yet</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="one-half my-quotes">
                                    <div className="state-title d-flex align-items-center">
                                        <h3>My quotes</h3>
                                        <a href="#">View all</a>
                                    </div>
                                    <div className="orders-table">
                                        <table className="table table-responsive-sm">
                                            <thead>
                                            <tr>
                                                <th>Design</th>
                                                <th>Quanity</th>
                                                <th>Status</th>
                                                <th>Price/ Unit</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td colSpan="4">
                                                    <div className="nothing-found text-center">
                                                        <img
                                                            src="/icons/Nothing found.svg"
                                                            alt="nothing found"
                                                        />
                                                        <p>No qoutes added yet</p>
                                                    </div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="quick-actions">
                                <div className="state-title d-flex align-items-center">
                                    <h3>Quick actions</h3>
                                    <a href="#">View all</a>
                                </div>
                                <div className="quick-actions-table">
                                    <table className="table table-responsive-sm">
                                        <thead>
                                        <tr>
                                            <th>Task</th>
                                            <th>
                                                    <span>
                                                        Style{" "}
                                                        <img
                                                            src="/icons/down-arrow.svg"
                                                            alt="arrow"
                                                        />
                                                    </span>
                                            </th>
                                            <th>
                                                    <span>
                                                        Order title{" "}
                                                        <img
                                                            src="/icons/down-arrow.svg"
                                                            alt="arrow"
                                                        />
                                                    </span>
                                            </th>
                                            <th>
                                                    <span>
                                                        Order number{" "}
                                                        <img
                                                            src="/icons/down-arrow.svg"
                                                            alt="arrow"
                                                        />
                                                    </span>
                                            </th>
                                            <th>
                                                <span>Status </span>
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td colSpan="5">
                                                <div className="nothing-found text-center">
                                                    <img
                                                        src="/icons/Nothing found.svg"
                                                        alt="nothing found"
                                                    />
                                                    <p>
                                                        You have completed all tasks. Great job!
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="buyer-login-popup-message">
                <div className="popup-full-contents">
                    <div className="popup-message-contents">
                        <div className="message-top-content">
                            <h2 className="message-title">Your account will be activated soon</h2>
                            <div className="welcome-message-section">
                                <div className="left-half">
                                    <div className="ac-manager-details">
                                        <img
                                            src={
                                                managerInfo?.profilePicDocument?.docUrl
                                                    ? managerInfo?.profilePicDocument?.docUrl
                                                    : process.env.PUBLIC_URL +
                                                    "/icons/buyerDefault.png"
                                            }
                                            alt="profile"
                                        />
                                        <h3 className="semibold-16 mb-0">{managerInfo?.name}</h3>
                                        <p className="designatgion">
                                            {managerInfo?.designation}{" "}
                                            <a href={managerInfo?.linkedInUrl} target="_blank">
                                                LinkedIn
                                            </a>
                                        </p>
                                        <p className="d-flex">
                                            <span>{managerInfo?.phone} </span> |{" "}
                                            <span>{managerInfo?.email}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="right-half">
                                    <h3>Hi, {buyerDetailsInfo?.name}!</h3>
                                    {renderWelcomeMessage()}
                                </div>
                            </div>
                        </div>
                        <div className="how-we-help-section">
                            <h4 className="title mb-5">How we help you grow</h4>
                            <div className="one-third-row">
                                <div className="single-item">
                                    <img src="/icons/100-designs.png" alt="100 designs"/>
                                    <h3>100s of designs every week</h3>
                                    <p>
                                        We offer you curated collections from our Design Studio
                                        based on your brand DNA
                                    </p>
                                </div>
                                <div className="single-item">
                                    <img
                                        src="/icons/4-6-wsks-production.png"
                                        alt="4-6-wsks-production"
                                    />
                                    <h3>4-6 wks production lead time</h3>
                                    <p>
                                        We reduced the production lead time by 50% from our robust
                                        supply chain network
                                    </p>
                                </div>
                                <div className="single-item">
                                    <img src="/icons/100-sustainable.png" alt="100% sustainable"/>
                                    <h3>100% Sustainable materials</h3>
                                    <p>
                                        We source, innovate and offer value added organic, recycled,
                                        & eco-vero materials
                                    </p>
                                </div>
                                <div className="single-item">
                                    <img src="/icons/upto-150-cd.png" alt="100 designs"/>
                                    <h3>Up to 150 days Credit line</h3>
                                    <p>
                                        Our ‘Buy now, pay later’ credit line keeps you sane while
                                        you manage the cash flow
                                    </p>
                                </div>
                                <div className="single-item">
                                    <img src="/icons/order-low-as-250.png" alt="100 designs"/>
                                    <h3>Order as low as 250 units</h3>
                                    <p>
                                        There is no MOQ limit while doing productions with us. Feel
                                        free to order anything
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <LoaderComponent loading={loading}/>
                </div>
            </div>
        </>
    );
};
export default BuyerLoginPopup;
