import $ from "jquery";
import moment from "moment";
import React, {Component} from "react";

const capitalizeFirstLetter = (str) =>
    str?.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

const replaceSpace = (str) => str.split(" ").join("_");

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const isTokenExpired = (token) => {
    let base64Url = token.split(".")[1];
    if (base64Url === undefined) return true;

    console.log("base64Url: ", base64Url);

    let base64 = base64Url.replace("-", "+");
    if (base64 === undefined) return true;

    base64 = base64.replace("_", "/");
    if (base64 === undefined) return true;

    let json = JSON.parse(window.atob(base64));
    if (json === undefined) return true;

    let exp = JSON.parse(window.atob(base64)).exp;
    if (exp === undefined) return true;

    exp *= 1000;

    return exp <= new Date().getTime();
};

function convertMmDdYyyyFormat(dateString) {
    if (!dateString) return "";
    var parts = dateString.split("/");
    if (parts.length === 1) {
        parts = dateString.split("-");
        var tt = parts[2].split(",");
        dateString = tt[0] + "/" + parts[1] + "/" + parts[0] + "," + tt[1];
    } else {
        dateString = parts[1] + "/" + parts[0] + "/" + parts[2];
    }

    //console.log(dateString);

    return dateString;
}

const getDateTimeFormat = function (val) {
    if (!val) return;
    // console.log(val);
    var dt = convertMmDdYyyyFormat(new Date(parseInt(val)).toLocaleString());
    return dt;
};

const getDeviceID = () => {
    const deviceId = JSON.parse(localStorage.getItem("device_id"));
    if (deviceId) {
        return deviceId;
    }

    const nAgt = navigator.userAgent;
    let browserName = navigator.appName;
    let nameOffset, verOffset;

    // In Opera 15+, the true version is after "OPR/"
    if (nAgt.indexOf("OPR/") !== -1) {
        browserName = "Opera";
    }
    // In older Opera, the true version is after "Opera" or after "Version"
    else if (nAgt.indexOf("Opera") !== -1) {
        browserName = "Opera";
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if (nAgt.indexOf("MSIE") !== -1) {
        browserName = "InternetExplorer";
    }
    // In Chrome, the true version is after "Chrome"
    else if (nAgt.indexOf("Chrome") !== -1) {
        browserName = "Chrome";
    }
    // In Safari, the true version is after "Safari" or after "Version"
    else if (nAgt.indexOf("Safari") !== -1) {
        browserName = "Safari";
    }
    // In Firefox, the true version is after "Firefox"
    else if (nAgt.indexOf("Firefox") !== -1) {
        browserName = "Firefox";
    }
    // In most other browsers, "name/version" is at the end of userAgent
    else if ((nameOffset = nAgt.lastIndexOf(" ") + 1) < (verOffset = nAgt.lastIndexOf("/"))) {
        browserName = nAgt.substring(nameOffset, verOffset);
        if (browserName.toLowerCase() === browserName.toUpperCase()) {
            browserName = navigator.appName;
        }
    }

    const guid = `browser-${browserName.toLowerCase()}-${navigator.mimeTypes.length}_${nAgt.replace(
        /\D+/g,
        ""
    )}_${navigator.plugins.length}_${$(window).height() || ""}_${$(window).width() || ""}`;
    console.log("Util.getDeviceID(): ", guid);
    localStorage.setItem("device_id", JSON.stringify(guid));
    return guid;
};

const getDateFromMillis = (millis) => {
    let date = new Date(millis);
    return (
        (date.getDate() < 10 ? "0" : "") +
        date.getDate() +
        "-" +
        months[date.getMonth()] +
        "-" +
        date.getFullYear()
    );
};

const getDateWithHourFromMillis = (millis) => {
    let d = new Date(millis);
    return (
        ("0" + d.getDate()).slice(-2) +
        "-" +
        ("0" + (d.getMonth() + 1)).slice(-2) +
        "-" +
        d.getFullYear() +
        " " +
        ("0" + d.getHours()).slice(-2) +
        ":" +
        ("0" + d.getMinutes()).slice(-2)
    );
};

const doCommaSeparationWithIntegers = (amount) => {
    if (amount === null || amount === undefined) return "-";
    amount = amount.toString();
    if (amount.length <= 3) {
        return amount;
    }
    let formattedAmount = "";
    for (let i = amount.length - 1, p = 0; i >= 0; i--, p++) {
        if (p >= 3 && (p - 3) % 2 === 0) formattedAmount = ",".concat(formattedAmount);
        formattedAmount = amount[i].concat(formattedAmount);
    }
    return formattedAmount;
};

const convertToISODate = (dateObj) => {
    console.log(
        "convert function, dateObj: " +
        dateObj +
        "full year: " +
        dateObj.getFullYear() +
        " month: " +
        dateObj.getMonth() +
        " day: " +
        dateObj.getDate()
    );
    let date = dateObj.getFullYear();
    date += "-";
    if (dateObj.getMonth() < 9) date += "0" + (dateObj.getMonth() + 1) + "-";
    else date += dateObj.getMonth() + 1 + "-";
    if (dateObj.getDate() < 10) date += "0";
    date += dateObj.getDate();
    return date;
};

const getOneWeekAgoMillis = () => {
    let start = new Date();
    start.setHours(0, 0, 0, 0);
    return start.getTime() - 7 * 24 * 60 * 60 * 1000;
};

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

const convertToSelectOptions = (obj) => {
    let array = [];
    for (let i in obj) {
        array.push({value: parseInt(i, 10), label: obj[i]});
    }
    return array;
};

const doCommaSeparationWithDecimals = (amount) => {
    if (amount === null || amount === undefined) return "-";

    amount = amount.toString();
    let minusFound = false;
    if (amount.startsWith("-")) {
        minusFound = true;
        amount = amount.substr(1);
    }
    amount = parseFloat(amount).toFixed(2);

    let lastIndex = amount.lastIndexOf(".");
    let formattedAmount = amount.substring(lastIndex);

    for (let i = lastIndex - 1, p = 0; i >= 0; i--, p++) {
        if (p >= 3 && (p - 3) % 2 === 0) formattedAmount = ",".concat(formattedAmount);
        formattedAmount = amount[i].concat(formattedAmount);
    }

    if (minusFound) formattedAmount = "-" + formattedAmount;
    return formattedAmount;
};

const convertToDateFromMiliSeconds = (input) => {
    return new Date(input).toLocaleDateString("en-GB");
};

const convertToDateTimeFromMiliSeconds = (input) => {
    return new Date(input).toLocaleString("en-GB");
};

const validate = (e, pass = "", passFullCheck = false) => {
    // console.log(e.target.name,e.target.value);return;
    if (e.target.name == "email") {
        let re =
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (e.target.value == "") {
            return {
                name: "emailError",
                value: "Email is required!",
            };
        } else if (!re.test(e.target.value)) {
            return {
                name: "emailError",
                value: "Invalid Email Format!",
            };
        } else {
            return {
                name: "emailError",
                value: "",
            };
        }
    }
    if (e.target.name == "fullName") {
        if (!e.target.value) {
            return {
                name: "fullNameError",
                value: "Full name is required",
            };
        } else {
            return {
                name: "fullNameError",
                value: "",
            };
        }
    }
    if (e.target.name == "password") {
        // if(e.target.value.length<6){
        let re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if (e.target.value == "") {
            return {
                name: "passwordError",
                value: "Password is required!",
            };
        } else if (!re.test(e.target.value) && passFullCheck) {
            return {
                name: "passwordError",
                value: "Password must contain 6 characters, at least one number, one lowercase and one uppercase letter",
            };
        } else {
            return {
                name: "passwordError",
                value: "",
            };
        }
    }
    if (e.target.name == "passwordRe") {
        if (e.target.value != pass) {
            return {
                name: "passwordReError",
                value: "Passwords didn't match!",
            };
        } else {
            return {
                name: "passwordReError",
                value: "",
            };
        }
    }
    if (e.target.name == "agreement") {
        if (!e.target.checked) {
            return {
                name: "agreementError",
                value: "Please accept terms & conditions first!",
            };
        } else {
            return {
                name: "agreementError",
                value: "",
            };
        }
    }
    if (e.target.name == "oldPassword") {
        if (e.target.value == "") {
            return {
                name: "oldPasswordError",
                value: "Current password is required!",
            };
        } else {
            return {
                name: "oldPasswordError",
                value: "",
            };
        }
    }
    if (e.target.name == "newPassword") {
        // if(e.target.value.length<6){
        let re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if (e.target.value == "") {
            return {
                name: "newPasswordError",
                value: "Password is required!",
            };
        } else if (!re.test(e.target.value) && passFullCheck) {
            return {
                name: "newPasswordError",
                value: "Password must contain 6 characters, at least one number, one lowercase and one uppercase letter",
            };
        } else {
            return {
                name: "newPasswordError",
                value: "",
            };
        }
    }
    if (e.target.name == "newPasswordRe") {
        if (e.target.value != pass) {
            return {
                name: "newPasswordReError",
                value: "Passwords didn't match!",
            };
        } else {
            return {
                name: "newPasswordReError",
                value: "",
            };
        }
    }
};

const encodeQueryData = (data) => {
    let ret = [],
        temp;
    for (let i in data) {
        temp = data[i];
        if (temp !== "" && temp !== null) {
            ret.push(encodeURIComponent(i) + "=" + encodeURIComponent(temp));
        }
    }
    return ret.length ? "?" + ret.join("&") : "";
};

const rfqStatus = (item) => {
    switch (item.status) {
        case "PENDING":
            return (
                <span
                    className="badge table-badge"
                    style={{backgroundColor: "#FFF1F1", color: "#D53939"}}
                >
                    Pending
                </span>
            );
            break;
        case "OFFER_PENDING":
            return (
                <span
                    className="badge table-badge"
                    style={{backgroundColor: "#FFF1F1", color: "#D53939"}}
                >
                    Pending
                </span>
            );
            break;
        case "RUNNING":
            return (
                <span
                    className="badge table-badge"
                    style={{backgroundColor: "#F5EFE4", color: "#D29F27"}}
                >
                    Running
                </span>
            );
            break;
        case "COMPLETED":
            return (
                <span
                    className="badge table-badge"
                    style={{backgroundColor: "#E4F6EA", color: "#35D575"}}
                >
                    Completed
                </span>
            );
            break;
        default:
        // code block
    }
};

const rfqProductStatus = (item) => {
    switch (item.status) {
        case "OFFER_PENDING":
            return (
                <span
                    className="badge table-badge"
                    style={{backgroundColor: "#F0EDF7", color: "#452D8F"}}
                >
                    Offer Pending
                </span>
            );

        case "PRICE_GIVEN":
            return (
                <span
                    className="badge table-badge"
                    style={{backgroundColor: "#F5EFE4", color: "#D29F27"}}
                >
                    Quoted
                </span>
            );

        case "APPROVED":
            return (
                <span
                    className="badge table-badge"
                    style={{backgroundColor: "#E4F6EA", color: "#35D575"}}
                >
                    Approved
                </span>
            );

        case "PRODUCT_SOLD":
            return (
                <span
                    className="badge table-badge"
                    style={{backgroundColor: "#FFE6E6", color: "#F22B2B"}}
                >
                    Design Sold
                </span>
            );

        case "ORDER_PLACED":
            return (
                <span
                    className="badge table-badge"
                    style={{backgroundColor: "#DBFFE5", color: "#00C334"}}
                >
                    Order Placed
                </span>
            );

        default:
        // code block
    }
};

const projectStatus = (item) => {
    switch (item.status) {
        case "PENDING":
            return (
                <span
                    className="badge table-badge"
                    style={{backgroundColor: "#FFF1F1", color: "#D53939"}}
                >
                    Pending
                </span>
            );
            break;
        case "RUNNING":
            return (
                <span
                    className="badge table-badge"
                    style={{backgroundColor: "#F5EFE4", color: "#D29F27"}}
                >
                    Running
                </span>
            );
            break;
        case "COMPLETED":
            return (
                <span
                    className="badge table-badge"
                    style={{backgroundColor: "#E4F6EA", color: "#35D575"}}
                >
                    Completed
                </span>
            );
            break;
        default:
        // code block
    }
};

const renderPaymentStatus = (item) => {
    switch (item.status) {
        case "PENDING":
            return (
                <span
                    className="badge table-badge"
                    style={{backgroundColor: "#FFF1F1", color: "#D53939"}}
                >
                    Pending
                </span>
            );
            break;
        case "PARTIALLY_PAID":
            return (
                <span
                    className="badge table-badge"
                    style={{backgroundColor: "#F5EFE4", color: "#D29F27"}}
                >
                    Partially Paid
                </span>
            );
            break;
        case "PAID":
            return (
                <span
                    className="badge table-badge"
                    style={{backgroundColor: "#E4F6EA", color: "#35D575"}}
                >
                    Paid
                </span>
            );
            break;
        default:
        // code block
    }
};

const deliverableStatus = (item) => {
    switch (item.status) {
        case "APPROVED":
            return (
                <span
                    className="badge table-badge"
                    style={{backgroundColor: "#E4F6EA", color: "#35D575"}}
                >
                    Approved
                </span>
            );
            break;
        case "REJECTED":
            return (
                <span
                    className="badge table-badge"
                    style={{backgroundColor: "#FFF1F1", color: "#D53939"}}
                >
                    Rejected
                </span>
            );
            break;
        case "SUBMIT":
            return (
                <span
                    className="badge table-badge"
                    style={{backgroundColor: "#E4EAF5", color: "#719EE6"}}
                >
                    Submit
                </span>
            );
            break;
        case "RE_SUBMIT":
            return (
                <span
                    className="badge table-badge"
                    style={{backgroundColor: "#E8E4F5", color: "#7B5CDB"}}
                >
                    Re-submit
                </span>
            );
            break;
        case "RUNNING":
            return (
                <span
                    className="badge table-badge"
                    style={{backgroundColor: "#F5EFE4", color: "#D29F27"}}
                >
                    Running
                </span>
            );
            break;
        case "SUBMITTED":
            return (
                <span
                    className="badge table-badge"
                    style={{backgroundColor: "#F5EFE4", color: "#D29F27"}}
                >
                    Submitted
                </span>
            );
            break;
        case "INITIALIZED":
            return (
                <span
                    className="badge table-badge"
                    style={{backgroundColor: "#E7E9EF", color: "#3E4148"}}
                >
                    Initialized
                </span>
            );
            break;
        case "COMPLETED":
            return (
                <span
                    className="badge table-badge"
                    style={{backgroundColor: "#E4F6EA", color: "#35D575"}}
                >
                    Completed
                </span>
            );
            break;
        default:
        // code block
    }
};

const productAvailabilityStatus = (item) => {
    switch (item.availabilityStatus) {
        case "AVAILABLE":
            return (
                <span
                    className="badge table-badge"
                    style={{backgroundColor: "#E4F6EA", color: "#35D575"}}
                >
                    Available
                </span>
            );
            break;
        case "CHECKED":
            return (
                <span
                    className="badge table-badge"
                    style={{backgroundColor: "#F5EFE4", color: "#D29F27"}}
                >
                    Checked
                </span>
            );
            break;
        case "SOLD":
            return (
                <span
                    className="badge table-badge"
                    style={{backgroundColor: "#FFF1F1", color: "#D53939"}}
                >
                    Sold
                </span>
            );
            break;
        case "AVAILABLE":
            return (
                <span
                    className="badge table-badge"
                    style={{backgroundColor: "#E4F6EA", color: "#35D575"}}
                >
                    Available
                </span>
            );
            break;
        case "IN_RFQ":
            return (
                <span
                    className="badge table-badge"
                    style={{backgroundColor: "#F5EFE4", color: "#D29F27"}}
                >
                    In RFQ
                </span>
            );
            break;
        case "IN_PROJECT":
            return (
                <span
                    className="badge table-badge"
                    style={{backgroundColor: "#FFF1F1", color: "#D53939"}}
                >
                    In Project
                </span>
            );
            break;
        default:
            return (
                <span
                    className="badge table-badge"
                    style={{backgroundColor: "#FFF1F1", color: "#D53939"}}
                >
                    Private
                </span>
            );
        // code block
    }
};

const invoiceStatus = (invoice) => {
    let invoiceStatus = "";
    if (invoice.paymentStatus === "PARTIALLY_PAID") {
        invoiceStatus = "yellow";
    } else if (invoice.paymentStatus === "PAID") {
        invoiceStatus = "green";
    } else {
        invoiceStatus = "purple";
    }
    return (
        <div className={`task-status ${invoiceStatus}`}>
            <span className="status-btn">
                {invoice.paymentStatus &&
                    capitalizeFirstLetter(invoice.paymentStatus.replace("_", " "))}
            </span>
        </div>
    );
};

const _getKey = () => {
    return Math.floor(Math.random() * 10000000) + Math.floor(Math.random() * 10000000);
};

const getToken = () => {
    let token = "";
    let rememberMe = localStorage.getItem("rememberMe");
    if (parseInt(rememberMe) === 1) {
        token = localStorage.getItem("token");
    } else {
        token = sessionStorage.getItem("token");
    }
    return token;
};

const IMAGE_SOURCE = ["cloudfront.net"];

const addImageSuffix = (imgUrl, suffix) => {
    if (!imgUrl) {
        return "";
    }

    let flag = true;

    IMAGE_SOURCE.map((url) => {
        if (imgUrl.includes(url)) {
            flag = false;
        }
    });

    if (flag) {
        return imgUrl;
    }

    //checking the scaled image types
    if (!["jpeg", "jpg", "png"].includes(getImageExt(imgUrl))) {
        return imgUrl;
    }

    let splits = imgUrl.split(".");
    let result = "";
    splits.map((item, i) => {
        if (i === splits.length - 1) {
            result += suffix + "." + item;
        } else if (i === 0) {
            result += item;
        } else {
            result += "." + item;
        }
    });
    return result;
};

const convertTimeToLocal = (date, time = "", outputFormat = "DD.MM.YYYY") => {
    let formatForUtc = moment(date, "DD/MM/YYYY").format("MM/DD/YYYY") + (time ? " " + time : "");
    let convertedDate = moment.utc(formatForUtc).format();
    var local = moment.utc(convertedDate).local().format(outputFormat);
    return local;
};

const convertDateTimeToLocal = (date, time = "", outputFormat = "DD.MM.YYYY") => {
    let formattedTime = moment(time, "HH:mm:ss").format("hh:mm A");
    let formatForUtc =
        moment(date, "YYYY-MM-DD").format("MM/DD/YYYY") + (time ? " " + formattedTime : "");
    let convertedDate = moment.utc(formatForUtc).format();
    var local = moment.utc(convertedDate).local().format(outputFormat);
    return local;
};

const getTodayTimeDifference = (startDate, endDate = moment()) => {
    let a = moment(startDate);
    let b = moment(endDate);
    let res = b.diff(a, "minutes");
    if (res < 60) {
        return `${res} minutes ago`;
    } else {
        let res = b.diff(a, "hours");
        return `${res} hours ago`;
    }
    return "";
};

const getUrlParameter = (name, params) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");

    var results = regex.exec(params);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

const formatProductTypeWithGroup = (data) => {
    let arr = [];
    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            let obj = {
                groupId: 0,
                groupName: "",
                types: [],
            };
            if (i == 0) {
                obj.groupId = data[i].productGroup.id;
                obj.groupName = data[i].productGroup.name;
                obj.types[0] = data[i];
                arr[0] = obj;
                continue;
            }
            let flag = true;
            for (let j = 0; j < arr.length; j++) {
                if (data[i].productGroup.id == arr[j].groupId) {
                    arr[j].types[arr[j].types.length] = data[i];
                    flag = false;
                    break;
                }
            }
            if (flag) {
                obj.groupId = data[i].productGroup.id;
                obj.groupName = data[i].productGroup.name;
                obj.types[0] = data[i];
                arr[arr.length] = obj;
            }
        }
    }
    return arr;
};

const changeDateFormat = (date, currentFormat = "DD/MM/YYYY", newFormat = "Do MMM, YY") =>
    moment(date, currentFormat).format(newFormat);

const parseHtml = (text) => {
    let urlRegex =
        /(\b((https?|ftp|file):\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?)/gi;

    return text.replace(urlRegex, function (url) {
        let newUrl = url.indexOf("http") === -1 ? "http://" + url : url;
        return '<a href="' + newUrl + '">' + url + "</a>";
    });
    // let exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    // let text1=text.replace(exp, "<a href='$1'>$1</a>");
    // let exp2 =/(^|[^\/])(www\.[\S]+(\b|$))/gim;
    // return text1.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>');
};

const validateNumber = (e) => {
    const valuesAllowed = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    if (!valuesAllowed.includes(e.key)) {
        e.preventDefault();
    }
};

const validateFloatNumber = (e) => {
    const valuesAllowed = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
    if (!valuesAllowed.includes(e.key)) {
        e.preventDefault();
    }
};

const authUserInfo = () => {
    let userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
        userInfo = JSON.parse(userInfo);
    } else {
        userInfo = {};
    }
    return userInfo;
};
const STATUS_NOT_ALLOWED_FOR_SELECTION = ["SOLD", "IN_PROJECT", "LOCKED"];
const STATUS_NOT_ALLOWED_FOR_SHOW_EXPLORE_DESIGN = ["SOLD", "IN_PROJECT", "LOCKED"];

const isValidJSON = (str) => {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
};

const getImageExt = (url) => {
    if (!url) {
        return "";
    }

    let splits = url.split(".");
    let result = "";
    if (splits.length) {
        result = splits[splits.length - 1];
    }
    return result;
};

const IMAGE_EXTS = ["jpeg", "jpg", "png", "gif", "tiff", "svg"];

const replaceUnderLine = (str) => capitalizeFirstLetter(str.split("_").join(" "));

const isValidFile = (file, type) => {
    let ext = file.name.split(".").pop();
    if (type === "PRODUCT_DESIGN" || type == "REFERENCE_IMAGE") {
        if (IMAGE_EXTS.includes(ext) && file.size < 2000001) {
            return true;
        }
    } else {
        if (
            (IMAGE_EXTS.includes(ext) ||
                ext === "xls" ||
                ext === "xlsx" ||
                ext === "docx" ||
                ext === "doc" ||
                ext === "eps" ||
                ext === "ai" ||
                ext === "pdf" ||
                ext === "ppt" ||
                ext === "pptx") &&
            file.size < 2000001
        ) {
            return true;
        }
    }

    return false;
};

const parseDate = (date) => {
    let temp = date.split("/");
    return temp[2] + "-" + temp[1] + "-" + temp[0];
};

const dateCompare = (orderDate, dueDate) => {
    const dateA = moment(orderDate);
    const dateB = moment(dueDate);
    const difference = dateB.diff(dateA, "days");
    if (difference >= 1) {
        return true;
    } else {
        return false;
    }
};

const DATE_TYPES = [
    "year",
    "quarter",
    "month",
    "week",
    "day",
    "hour",
    "minute",
    "second",
    "millisecond",
];

const addWithCurrentDate = (date, duration, dateType, dateFormat = "Do MMM, YY") => {
    if (DATE_TYPES.includes(dateType)) {
        return moment(date).add(duration, dateType).format(dateFormat);
    }
    return false;
};

const copy = (obj) => JSON.parse(JSON.stringify(obj));

const getDateDifference = (startDate = moment(), endDate) => {
    const dateA = moment(startDate);
    const dateB = moment(endDate);
    return dateB.diff(dateA, "days");
};

const getNumberUnit = (value) => {
    if (value < 1e3) return value;
    if (value >= 1e3 && value < 1e6) return +(value / 1e3).toFixed(2) + "K";
    if (value >= 1e6 && value < 1e9) return +(value / 1e6).toFixed(2) + "M";
    if (value >= 1e9 && value < 1e12) return +(value / 1e9).toFixed(2) + "B";
    if (value >= 1e12) return +(value / 1e12).toFixed(2) + "T";
};

const getShortName = (source, size = 35) => {
    return source?.length > size ? source?.slice(0, size - 1) + "…" : source;
};

const generateRedirectRoute = (data, props) => {
    let redirection = getUrlParameter(
        "redirect",
        props.location.search
    );
    if (data.status === "DISABLED") {
        localStorage.clear();
        sessionStorage.clear()
        props.history.push({
            pathname: redirection ? redirection : "/login",
            state: {from: "login"},
        });
    } else if (data.status === "ACTIVE") {
        props.history.push({
            pathname: redirection ? redirection : "/dashboard",
            state: {from: "login"},
        });
    } else if (data.emailVerified === false) {
        props.history.push("/verifyEmail" + (redirection ? "?redirect=" + redirection : ""));
    } else if (data.businessInfoGiven === false) {
        props.history.push("/verify/email" + (redirection ? "?redirect=" + redirection : ""));
    } else if (data.status === "PENDING") {
        props.history.push({
            pathname: redirection ? redirection : "/loginPopup",
            state: {from: "login"},
        });
    } else {
        props.history.push({
            pathname: redirection ? redirection : "/dashboard",
            state: {from: "login"},
        });
    }
};

const renderMultiColor = (color) => {
    if (color.representedBy === 'SWATCH') {
        return (
            <div className='colors-row'>
                <div className='multicolors'>
					<span
                        className='color-icon'
                    >
						<img src={color?.swatchDocResponse?.docUrl} alt={`swatch color`}/>
					</span>
                </div>
            </div>
        );
    } else if (color.colorType !== 'SOLID') {
        return (
            <div className='colors-row'>
                <div className='multicolors'>

                    {color?.compositeColorList?.length > 0 &&
                        color.compositeColorList.map((item, index) => {
                            return (
                                <span
                                    key={`multi_color_${index}`}
                                    className='color-icon'
                                    style={{background: item.hexCode}}
                                >
								</span>
                            );
                        })
                    }
                </div>
            </div>
        );
    } else {
        return (
            <div className='colors-row'>
                <div className='multicolors'>
					<span
                        className='color-icon'
                        style={{background: color.hexCode}}
                    >
					</span>
                </div>
            </div>
        );
    }
};

const isPageReachBottom = () => {
    let bool = false;
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const html = document.documentElement;
    const windowBottom = windowHeight + window.pageYOffset;
    if (Math.floor(windowBottom) - html.scrollHeight === 0) {
        bool = true;
    }
    return bool;
};

const toOrdinalSuffix = num => {
    const int = parseInt(num),
        digits = [int % 10, int % 100],
        ordinals = ['st', 'nd', 'rd', 'th'],
        oPattern = [1, 2, 3, 4],
        tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
    return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
        ? int + ordinals[digits[0] - 1]
        : int + ordinals[3];
};


const DOC_EXTS = ['doc', 'docx', 'DOC', 'DOCX'];
const XLS_EXTS = ['xls', 'xlsx', 'XLS', 'XLSX'];
const PDF_EXTS = ['pdf', 'PDF'];
const AI_EXTS = ['ai', 'AI'];
const PSD_EXTS = ['ps', 'psd', 'PS', 'PSD'];
const EPS_EXTS = ['eps', 'EPS'];
const getFileType = (fileName) => {
    if (!fileName || fileName.trim().length === 0) return 'NO_FILE';

    let ext = fileName.split('.').pop();

    if (IMAGE_EXTS.includes(ext)) return 'IMAGE';
    else if (DOC_EXTS.includes(ext)) return 'DOC';
    else if (XLS_EXTS.includes(ext)) return 'XLX';
    else if (PDF_EXTS.includes(ext)) return 'PDF';
    else if (AI_EXTS.includes(ext)) return 'AI';
    else if (PSD_EXTS.includes(ext)) return 'PSD';
    else if (EPS_EXTS.includes(ext)) return 'EPS';
    else return 'FILE';
};
const getIconByFileType = (fileType) => {
    switch (fileType) {
        case 'DOC':
            return '/images/file-doc.svg';
        case 'XLX':
            return '/images/file-xls.svg';
        case 'PDF':
            return '/images/file-pdf.svg';
        case 'AI':
            return '/images/file-ai.svg';
        case 'PSD':
            return '/images/file-ps.svg';
        case 'EPS':
            return '/images/file-eps.svg';
        case 'FILE':
            return '/images/file.svg';
        default:
            return '/images/file.svg';
    }
};


export {
    capitalizeFirstLetter,
    replaceSpace,
    getDeviceID,
    shuffle,
    convertToDateTimeFromMiliSeconds,
    convertToDateFromMiliSeconds,
    convertToSelectOptions,
    isTokenExpired,
    convertToISODate,
    getOneWeekAgoMillis,
    getDateFromMillis,
    doCommaSeparationWithDecimals,
    doCommaSeparationWithIntegers,
    getDateWithHourFromMillis,
    validate,
    encodeQueryData,
    rfqStatus,
    rfqProductStatus,
    projectStatus,
    renderPaymentStatus,
    deliverableStatus,
    productAvailabilityStatus,
    _getKey,
    getToken,
    addImageSuffix,
    convertTimeToLocal,
    getTodayTimeDifference,
    getUrlParameter,
    formatProductTypeWithGroup,
    invoiceStatus,
    changeDateFormat,
    parseHtml,
    validateNumber,
    authUserInfo,
    STATUS_NOT_ALLOWED_FOR_SELECTION,
    isValidJSON,
    getImageExt,
    IMAGE_EXTS,
    replaceUnderLine,
    isValidFile,
    parseDate,
    dateCompare,
    addWithCurrentDate,
    STATUS_NOT_ALLOWED_FOR_SHOW_EXPLORE_DESIGN,
    copy,
    validateFloatNumber,
    getDateDifference,
    convertDateTimeToLocal,
    getNumberUnit,
    getShortName,
    generateRedirectRoute,
    renderMultiColor,
    isPageReachBottom,
    toOrdinalSuffix,
    getFileType,
    getIconByFileType
};
