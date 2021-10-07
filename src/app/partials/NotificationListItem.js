import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import {
    addImageSuffix,
    convertTimeToLocal,
    getTodayTimeDifference,
    parseHtml,
} from "../services/Util";

export const NotificationListItem = ({ item, markRead, todayData }) => {
    const renderPost = () => {
        let result = [];
        item.body &&
            item.body.entityIdTypeMapList &&
            item.body.entityIdTypeMapList.map((entity) => {
                if (entity.type === "POST") {
                    result.push(
                        <p
                            className="comment-text"
                            dangerouslySetInnerHTML={{ __html: parseHtml(entity.text) }}
                        />
                    );
                }
            });
        return result;
    };

    const goTo = (e, url) => {
        window.open(url, "_blank");
        e.preventDefault();
    };

    const redirectNotification = async () => {
        await markRead(item.id, item.isSeen);
        let { relatedEntityId } = item;
        let url = window.location.origin;
        switch (item.category) {
            case "ORDER":
                url += `/orders/view/${relatedEntityId.orderId}`;
                break;
            case "TASK":
                // code block
                break;
            case "POST":
                url += `/orders/view/${relatedEntityId.orderId}?stageId=${relatedEntityId.stageId}&stepId=${relatedEntityId.stepId}`;
                // code block
                break;
            case "PRODUCT":
                url += `/orders/view/${relatedEntityId.productId}`;
                // code block
                break;
            case "COLLECTION":
                url += `/orders/view/${relatedEntityId.collectionId}`;
                // code block
                break;
            case "INVOICE":
                url += `/orders/view/${relatedEntityId.invoiceId}`;
                // code block
                break;
            default:
                // code block
                break;
        }
        window.open(url, "_blank");
    };

    const read = (e) => {
        e.stopPropagation();
        markRead(item.id, item.isSeen);
    };

    return (
        <div
            className={`single-notification-item ${item.isSeen ? `read` : `unread`}`}
            onClick={() => redirectNotification()}
        >
            <div className="order-approve-notification d-flex justify-content-between">
                <div className="left-notification">
                    <div className="truck-icon">{loadIcon(item)}</div>
                    <div className="notification-content">
                        <p>
                            {item.body &&
                                item.body.titlePartList &&
                                item.body.titlePartList.map((section) => {
                                    if (
                                        section.titlePartType === "ACTOR" ||
                                        section.titlePartType === "ACTED_UPON"
                                    ) {
                                        return <span className="start-name"> {section.text} </span>;
                                    }
                                    if (section.titlePartType === "PREPOSITION") {
                                        return (
                                            <span className="sep-text">{` ${section.text} `}</span>
                                        );
                                    }
                                    return section.text;
                                })}
                        </p>
                        <ul className="notification-order-info">
                            {item.body &&
                                item.body.entityIdTypeMapList &&
                                item.body.entityIdTypeMapList.map((entity) => {
                                    let relatedEntityId = item.relatedEntityId
                                        ? item.relatedEntityId
                                        : {};
                                    if (entity.type === "ORDER") {
                                        return (
                                            <li>
                                                <a
                                                    href="#"
                                                    onClick={(e) =>
                                                        goTo(e, `/orders/view/${entity.id}`)
                                                    }
                                                >
                                                    {entity.text}
                                                </a>
                                            </li>
                                        );
                                    }
                                    if (entity.type === "PRODUCT") {
                                        return (
                                            <li>
                                                <a
                                                    href="#"
                                                    onClick={(e) =>
                                                        goTo(e, `/designs/view/${entity.id}`)
                                                    }
                                                >
                                                    {entity.text}
                                                </a>
                                            </li>
                                        );
                                    }
                                    if (entity.type === "COLLECTION") {
                                        return (
                                            <li>
                                                <a
                                                    href="#"
                                                    onClick={(e) =>
                                                        goTo(e, `/collections/view/${entity.id}`)
                                                    }
                                                >
                                                    {entity.text}
                                                </a>
                                            </li>
                                        );
                                    }
                                    if (entity.type === "INVOICE") {
                                        return (
                                            <li>
                                                <a
                                                    href="#"
                                                    onClick={(e) =>
                                                        goTo(e, `/invoices/view/${entity.id}`)
                                                    }
                                                >
                                                    {entity.text}
                                                </a>
                                            </li>
                                        );
                                    }
                                })}
                        </ul>
                        {renderPost()}
                    </div>
                    <div className="time-read-action">
                        <ul className="d-flex">
                            <li>
                                {getTimeCount(
                                    getMinsCountFromNow(
                                        `${item.createdAt} ${item.createdTime}`,
                                        `DD/MM/YYYY HH:mm A`
                                    )
                                )}
                            </li>
                            <li className="mark-as-read">
                                <a href="#" onClick={(e) => read(e)}>
                                    Mark as read
                                </a>
                            </li>
                            <li className="mark-as-unread">
                                <a href="#" onClick={(e) => read(e)}>
                                    Mark as unread
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="right-notification">
                    <div className="four-images d-flex">
                        {renderImages(item.notificationImages)}
                    </div>
                </div>
            </div>
        </div>
    );
};

const getMinsCountFromNow = (dateTime, format) => {
    let res = moment().diff(moment.utc(dateTime, format));
    if (res) {
        return parseInt(res / (1000 * 60));
    }
    return 0;
};

const getTimeCount = (mins) => {
    if (mins < 60) {
        return `${mins} m`;
    }

    let hrs = parseInt(mins / 60);

    if (hrs < 24) {
        return `${hrs}h`;
    } else if (hrs < 24 * 7) {
        return `${parseInt(hrs / 24)}d`;
    } else {
        return `${parseInt(hrs / (24 * 7))}w`;
    }
};

const loadIcon = (item) => {
    let type = item.event;
    if (["PROJECT_STATUS_UPDATED", "TASK_COMPLETED", "INVOICE_PAYMENT_APPROVED"].includes(type)) {
        //thumbs up
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
            >
                <path
                    d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
                    stroke="#21242B"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        );
    } else if (
        [
            "PROJECT_MEMBER_ADDED",
            "TASK_MEMBER_ASSIGNED",
            "NEW_PRODUCT_ADDED",
            "COLLECTION_SHARED",
            "COLLECTION_NEW_DESIGN_ADDED",
        ].includes(type)
    ) {
        //plus icon
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
            >
                <path
                    d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                    stroke="#21242B"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M12 8V16"
                    stroke="#21242B"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M8 12H16"
                    stroke="#21242B"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        );
    } else if (["INVOICE_PAYMENT_ADDED", "NEW_INVOICE_ADDED"].includes(type)) {
        //card/invoice icon
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
            >
                <path
                    d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z"
                    stroke="#21242B"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M1 10H23"
                    stroke="#21242B"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        );
    } else if (["NEW_RFQ_ADDED", "RFQ_PRICE_UPDATED"].includes(type)) {
        //dollar icon
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
            >
                <path
                    d="M12 1V23"
                    stroke="#21242B"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6"
                    stroke="#21242B"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        );
    }
    if (item.profileImage) {
        return <img src={addImageSuffix(item.profileImage, "_xicon")} alt="profile" />;
    }
};

const renderImages = (images) => {
    let res = [];
    let count = 0;
    if (images.length === 1) {
        return (
            <div className="full-image">
                <img src={images[0]} alt="" />
            </div>
        );
    }
    images.map((image) => {
        ++count;
        if (count < 4) {
            res.push(
                <div className="single-one">
                    <img src={image} />
                </div>
            );
        }
    });
    return res;
};
