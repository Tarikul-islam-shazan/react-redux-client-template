import React, { useState, useEffect, useCallback, useRef } from "react";
import { useHistory } from "react-router-dom";
import AddTeamMember from "../../../commonComponents/AddTeamMember";
import AllStyles from "./AllStyles";
import Http from "../../../services/Http";
import {
    getNumberUnit,
    changeDateFormat,
    capitalizeFirstLetter,
    doCommaSeparationWithIntegers,
    getShortName,
} from "../../../services/Util";
import { toastSuccess, toastError } from "../../../commonComponents/Toast";
import BACK_ICON from "../../../assets/images/icons/order-back-icon.svg";
import PRO_PIC_DEFAULT from "../../../assets/images/pro_pic_default.svg";
import MORE_ICON from "../../../assets/images/icons/down-arrow-bottom.png";
import DELIVERY_ICON from "../../../assets/images/icons/delivery-status-icon.svg";
import { Tooltip } from "@material-ui/core";

const TopBar = ({ details, orderId, getProjectDetails }) => {
    const [userResponseList, setUserResponseList] = useState([]);
    const [usersByTypeList, setUsersByTypeList] = useState([]);
    const [searchUserSuggestions, setSearchUserSuggestions] = useState([]);
    const [searchUserText, setSearchUserText] = useState("");
    const [loading, setLoading] = useState(false);
    const [showAddMemberModal, setShowAddMemberModal] = useState(false);
    const [showAllStyles, setShowAllStyles] = useState(false);
    let history = useHistory();

    const AddNewMemberButton = useRef(null);
    const AddNewMemberModal = useRef(null);
    const AllStylesModal = useRef(null);

    const memberData = {
        usersByTypeList,
        searchUserText,
        searchUserSuggestions,
        memberList: userResponseList && userResponseList,
    };

    const getUsersByTypes = useCallback(async () => {
        setLoading(true);
        let params = `?userTypes=MERCHANDISER&userTypes=QA`;
        await Http.GET("getUsersByTypes", params)
            .then(({ data }) => {
                setLoading(false);
                if (data) {
                    setUsersByTypeList(data);
                }
            })
            .catch((response) => {
                setLoading(false);
                toastError("Something went wrong! Please try again.");
            });
    }, []);

    const getSearchSuggestions = async () => {
        setLoading(true);
        let params = `?email=${searchUserText}`;
        await Http.GET("getUserSuggestions", params)
            .then(({ data }) => {
                setLoading(false);
                if (data) {
                    setSearchUserSuggestions(data);
                }
            })
            .catch((response) => {
                setLoading(false);
                toastError("Something went wrong! Please try again.");
            });
    };

    const onChange = (e) => {
        setSearchUserText(e.target.value);
        getSearchSuggestions(searchUserText);
    };

    const handleClickOutside = (event) => {
        if (
            AddNewMemberModal.current &&
            !AddNewMemberModal.current.contains(event.target) &&
            AddNewMemberButton.current &&
            !AddNewMemberButton.current.contains(event.target)
        ) {
            setShowAddMemberModal(false);
        }
        if (AllStylesModal.current && !AllStylesModal.current.contains(event.target)) {
            setShowAllStyles(false);
        }
    };

    useEffect(() => {
        setUserResponseList(details?.projectMemberResponseList);
        getUsersByTypes();
        document.addEventListener("click", handleClickOutside, { capture: true });
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [details, details.projectMemberResponseList, getUsersByTypes]);

    const moreMember = 4;
    const renderIcon = (user) => {
        if (user.profilePicDocument && user.profilePicDocument.docUrl) {
            return (
                <img
                    onClick={() => setShowAddMemberModal(!showAddMemberModal)}
                    src={user.profilePicDocument.docUrl}
                    alt=""
                    data-toggle="tooltip"
                    data-placement="top"
                    title={user.name}
                />
            );
        }
        return (
            <img
                onClick={() => setShowAddMemberModal(!showAddMemberModal)}
                src={PRO_PIC_DEFAULT}
                alt=""
                data-toggle="tooltip"
                data-placement="top"
                title={user.name}
            />
        );
    };

    const renderMemberIcon = (userResponseList) => {
        if (userResponseList.length > moreMember) {
            return userResponseList.slice(0, moreMember).map((user, i) => {
                return renderIcon(user);
            });
        } else {
            return userResponseList.map((user, i) => {
                return renderIcon(user);
            });
        }
    };

    const addUserToOrder = async (user) => {
        const body = user.id;
        let newUserResponseList = [...userResponseList];
        await Http.POST("addMemberToOrder", [body], "/" + orderId)
            .then(({ data }) => {
                if (data && data.success) {
                    if (userResponseList && userResponseList.length) {
                        let flag = true;
                        userResponseList.forEach((item) => {
                            if (item.id === user.id) {
                                flag = false;
                            }
                        });
                        if (flag) {
                            toastSuccess(data.message);
                            newUserResponseList = [...userResponseList, user];
                        } else {
                            toastSuccess("Collection already shared");
                        }
                    } else {
                        newUserResponseList = [user];
                    }
                    setUserResponseList(newUserResponseList);
                }
            })
            .catch(({ response }) => {
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Request was unsuccessful.");
                }
            });
    };

    const removeUserFromOrder = async (user) => {
        const body = user.id;
        let newUserResponseList = [...userResponseList];
        await Http.POST("removeMemberFromOrder", [body], "/" + orderId)
            .then(({ data }) => {
                if (data && data.success) {
                    if (userResponseList && userResponseList.length) {
                        newUserResponseList = userResponseList.filter(
                            (item) => item.id !== user.id
                        );
                    }

                    setUserResponseList(newUserResponseList);
                    toastSuccess(data.message);
                }
            })
            .catch(({ response }) => {
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Request was unsuccessful.");
                }
            });
    };

    const onStyleClick = () => {
        setShowAllStyles(true);
    };

    const onStyleClose = () => {
        setShowAllStyles(false);
    };

    return (
        <div>
            <section className="order-details-section px-3" style={{ position: "relative" }}>
                <div className="container-fluid">
                    <div className="row align-items-center py-3">
                        <div className="col-5 pl-0">
                            <div className="order-title">
                                <button>
                                    <img
                                        src={BACK_ICON}
                                        alt="Back"
                                        onClick={() => history.push(`/orders/my-orders`)}
                                    />
                                </button>
                                <Tooltip title={details.name} placement={"top"}>
                                    <h3 className>
                                        {getShortName(details.name, 35)}{" "}
                                        <span className="order-number">
                                            ({details.orderRefNumber})
                                        </span>
                                    </h3>
                                </Tooltip>
                            </div>
                        </div>
                        <div className="col-3">
                            {/*<span className="brand-logo">*/}
                            {/*   {details.brandResponse && details.brandResponse.name && (*/}
                            {/*      <img*/}
                            {/*         src={addImageSuffix(*/}
                            {/*            details.brandResponse?.brandLogoDocResponse.docUrl,*/}
                            {/*            "_xicon"*/}
                            {/*         )}*/}
                            {/*         alt={details.brandResponse?.name}*/}
                            {/*      />*/}
                            {/*   )}*/}
                            {/*</span>*/}
                            <span className="order-status">
                                {capitalizeFirstLetter(details?.status)}
                            </span>
                        </div>
                        <div class="col-2 px-0 add-buyer d-flex flex-column flex-sm-row align-items-center justify-content-end flex-grow-1 flex-grow-1">
                            <div className="position-relative">
                                <div class="added-members">
                                    <div
                                        id="AddNewMember"
                                        ref={AddNewMemberButton}
                                        className={`add-new-member ${
                                            showAddMemberModal ? `show` : ``
                                        }`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="39"
                                            height="39"
                                            viewBox="0 0 39 39"
                                            onClick={() =>
                                                setShowAddMemberModal(!showAddMemberModal)
                                            }
                                        >
                                            <g
                                                id="Group_22785"
                                                data-name="Group 22785"
                                                transform="translate(-1471 -119)"
                                            >
                                                <circle
                                                    id="Ellipse_122"
                                                    data-name="Ellipse 122"
                                                    cx="18.5"
                                                    cy="18.5"
                                                    r="18.5"
                                                    transform="translate(1472 120)"
                                                    fill="#ebe8e8"
                                                    stroke="#fff"
                                                    strokeWidth="2"
                                                />
                                                <text
                                                    id="_"
                                                    data-name="+"
                                                    transform="translate(1484 148)"
                                                    fill="#21242b"
                                                    font-size="24"
                                                    font-family="OpenSans-Semibold, Open Sans"
                                                    font-weight="600"
                                                >
                                                    <tspan x="0" y="0">
                                                        +
                                                    </tspan>
                                                </text>
                                            </g>
                                        </svg>
                                    </div>

                                    {userResponseList && userResponseList ? (
                                        <>
                                            {renderMemberIcon(userResponseList)}
                                            {userResponseList.length > moreMember ? (
                                                <div className="more-people">
                                                    <a
                                                        href="#"
                                                        onClick={() =>
                                                            setShowAddMemberModal(
                                                                !showAddMemberModal
                                                            )
                                                        }
                                                    >
                                                        +{userResponseList.length - moreMember}
                                                    </a>
                                                </div>
                                            ) : (
                                                <></>
                                            )}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                <div
                                    class={`add-people-popup no-padding-popup shadow ${
                                        showAddMemberModal ? `show` : ``
                                    }`}
                                    ref={AddNewMemberModal}
                                >
                                    <div class="close-add-people mb-3 d-block d-sm-none">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20.941"
                                            height="20.941"
                                            viewBox="0 0 20.941 20.941"
                                        >
                                            <g
                                                id="Group_22803"
                                                data-name="Group 22803"
                                                transform="translate(2489.29 -478.941)"
                                            >
                                                <line
                                                    id="Line_153"
                                                    data-name="Line 153"
                                                    x2="25.615"
                                                    transform="translate(-2487.875 480.355) rotate(45)"
                                                    fill="none"
                                                    stroke="#21242b"
                                                    stroke-linecap="round"
                                                    strokeWidth="2"
                                                />
                                                <line
                                                    id="Line_154"
                                                    data-name="Line 154"
                                                    x2="25.615"
                                                    transform="translate(-2469.763 480.355) rotate(135)"
                                                    fill="none"
                                                    stroke="#21242b"
                                                    stroke-linecap="round"
                                                    strokeWidth="2"
                                                />
                                            </g>
                                        </svg>
                                    </div>
                                    <AddTeamMember
                                        memberData={memberData}
                                        onAddMember={addUserToOrder}
                                        onRemoveMember={removeUserFromOrder}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-2 text-right pr-0">
                            <div className="delivery-status">
                                <button>
                                    {" "}
                                    Delivery in{" "}
                                    <span>
                                        {details.timeLeft} days <img src={DELIVERY_ICON} alt="" />
                                    </span>
                                </button>
                                <div className="date-details delivery-date-details text-left">
                                    <ul className="start">
                                        <li>Start:</li>
                                        <li>
                                            {changeDateFormat(
                                                details.startDate,
                                                "DD-MM-YYYY",
                                                "DD MMM, YYYY"
                                            )}
                                        </li>
                                    </ul>
                                    <ul className="end">
                                        <li>End:</li>
                                        <li>
                                            {changeDateFormat(
                                                details.endDate,
                                                "DD-MM-YYYY",
                                                "DD MMM, YYYY"
                                            )}
                                        </li>
                                    </ul>
                                    <ul className="spent-status">
                                        <li>Days spent:</li>
                                        <li>
                                            <span className="time-spent">{details.daySpent}</span>{" "}
                                            Days spent
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="order-style-info px-3">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-6 pl-0">
                            <ul className="d-flex py-5">
                                <li style={{ position: "relative" }} className="active">
                                    <span onClick={onStyleClick}>
                                        All styles ({details.totalStyles})
                                    </span>
                                </li>
                                <li>{details.orderQuantity} units</li>
                                <li>${getNumberUnit(details.totalValuation)}</li>
                            </ul>
                        </div>
                        <div className="col-6 text-right">
                            {/* <div className="more-btn">
                        <button>
                           More <img src={MORE_ICON} alt="More" />
                        </button>
                     </div> */}
                            <div className="more-option-box text-left">
                                <p>
                                    <a href="#">Edit order</a>
                                </p>
                                <p>
                                    <a href="#">Activity log</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {showAllStyles && (
                <div className="all-style-absolute-section" ref={AllStylesModal}>
                    <AllStyles onClose={onStyleClose} />
                </div>
            )}
        </div>
    );
};

export default TopBar;
