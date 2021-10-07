import axios from "axios";
import { API, HTTP_STATUS, BASE_URL } from "../constant";
import store from "../redux/store";
import { REDIRECT_TO } from "../redux/actions/types";
import { getToken } from "./Util";

const { fs, central_auth } = API();
const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
};

// const BASE_URL = "http://nitex-env.eba-bj9qc7tu.eu-central-1.elasticbeanstalk.com";

const routes = {
    userInfo: `${BASE_URL}/user/me`, // get
    updateProfile: `${BASE_URL}/user/update-basic-info`, //post
    updateProPic: `${BASE_URL}/user/update-profile-picture`, //post
    updatePassword: `${BASE_URL}/user/change-password`, //post
    getCompanyList: `${BASE_URL}/company/search`, //post
    login: `${BASE_URL}/auth/login`, // POST
    signup: `${BASE_URL}/auth/signup`, // POST
    forgetPassword: `${BASE_URL}/user/request-forgot-password`, // POST
    completeForgotPassword: `${BASE_URL}/user/complete-forgot-password`, // POST
    updateBusinessInfo: `${BASE_URL}/user/update-business-info`, // POST
    sendOtpRe: `${BASE_URL}/user/send-otp`, // GET
    verifyOtp: `${BASE_URL}/user/validate-otp/`, // POST
    addProduct: `${BASE_URL}/product/add`, // POST
    getProductList: `${BASE_URL}/product/my-product`, // GET
    getAvailableProductList: `${BASE_URL}/product/my-product-by-availability-status`, // GET (new)
    getProductDetails: `${BASE_URL}/product/`, // GET
    getProductType: `${BASE_URL}/product-type/all`, // GET
    getProductTypeWithGroup: `${BASE_URL}/product-group/all`, // GET
    getProductTypeWithGroupWithData: `${BASE_URL}/product-type/all-with-group-having-product`, // GET
    getColorType: `${BASE_URL}/color/all`, // GET
    getAllColors: `${BASE_URL}/color/pantone/search`,
    getAccessoriesList: `${BASE_URL}/accessories/by-product-type/`, // GET
    getSizeTableData: `${BASE_URL}/sizes/get-size-table/`, // GET
    likeProduct: `${BASE_URL}/product/like/`, //post
    unlikeProduct: `${BASE_URL}/product/unlike/`, //post
    updateProductStatus: `${BASE_URL}/product/update-product-status/`, //post
    getDashboardData: `${BASE_URL}/dashboard/`, // GET
    getDashboardDesignList: `${BASE_URL}/dashboard/design-by-nitex`, // GET
    getExploreDesignLanding: `${BASE_URL}/product/explore-design`, // GET called initially for landing data
    getExploreDesignFilterOptions: `${BASE_URL}/product/search/filter-options`,
    getSearchSuggestions: `${BASE_URL}/product/search/suggestion`,
    getPickDesign: `${BASE_URL}/product/for-pick-design`, // GET
    getProjectList: `${BASE_URL}/order/my-project`, // GET
    getProjectDetails: `${BASE_URL}/order/`, // GET
    getRfqList: `${BASE_URL}/rfq/my-rfq`,
    getRfqDetails: `${BASE_URL}/rfq/`,
    getRfqNegotiationMessages: `${BASE_URL}/product/get-messages/`,
    sendRfqNegotiationMessage: `${BASE_URL}/rfq/send-message/`,
    getDeliverableMessages: `${BASE_URL}/deliverable/get-messages/`,
    sendDeliverableMessages: `${BASE_URL}/deliverable/send-message/`,
    getProjectProductDetails: `${BASE_URL}/order/product/`,
    addRfq: `${BASE_URL}/rfq/add`,
    addProject: `${BASE_URL}/order/add`,
    getMostTaggedTopics: `${BASE_URL}/timeline/most-tagged-topic/`,
    getUpcomingDeadlines: `${BASE_URL}/order/nearest-deliverable-list/`,
    getPostsForProject: `${BASE_URL}/timeline/order/`,
    getFeedbackForPost: `${BASE_URL}/timeline/comment-by-post/`,
    sendPost: `${BASE_URL}/timeline/new-post`,
    sendFeedback: `${BASE_URL}/timeline/new-comment`,
    updateDeliverables: `${BASE_URL}/deliverable/update-status-and-deadline/`,
    authGoogle: `${BASE_URL}/oauth2/authorize/google`,
    authLinkedin: `${BASE_URL}/oauth2/authorize/linkedin`,
    getProjectInvoice: `${BASE_URL}/invoice/order/`,
    payForInvoice: `${BASE_URL}/invoice/pay`,
    getInvoiceDetails: `${BASE_URL}/invoice/`,
    getNotifications: `${BASE_URL}/notification/all`,
    markNotificationRead: `${BASE_URL}/notification/mark-seen/`,
    markNotificationUnread: `${BASE_URL}/notification/mark-unseen/`,
    getUnseenNotificationCount: `${BASE_URL}/notification/unseen-count`,
    getSimilarDesign: `${BASE_URL}/product/similar/`,
    getProjectMembers: `${BASE_URL}/order/get-member-list/`,

    getProductCollectionList: `${BASE_URL}/collection/products/`,
    getProductsForRfq: `${BASE_URL}/product/for-rfq`,
    searchProduct: `${BASE_URL}/product/search`, // integrated in explore design
    getRfqListV2: `${BASE_URL}/rfq/my-quotes`,
    getSettingsData: `${BASE_URL}/personal-setting/get/`,
    updatePersonalSettings: `${BASE_URL}/personal-setting/set`,

    order: `${BASE_URL}/order/place-order`,
    updateOrderAddress: `${BASE_URL}/order/update-address`,
    removeOrderItem: `${BASE_URL}/order/place-order/remove-item`,
    cancelOrder: `${BASE_URL}/order/cancel-order/`,
    getPaymentSession: `${BASE_URL}/invoice/pay-via-gateway`,
    getOrderList: `${BASE_URL}/order/my-order`, // GET
    getStepResponseForOrderDetails: `${BASE_URL}/order/step-response-for-order-details`,
    addMemberToOrder: `${BASE_URL}/order/assign-member`,
    removeMemberFromOrder: `${BASE_URL}/order/remove-members`,
    myTaskCount: `${BASE_URL}/step/tasks/my-tasks-count`,
    getMyTasks: `${BASE_URL}/step/tasks/my-tasks`,
    task: `${BASE_URL}/step/`,
    addDeleteMemberToTask: `${BASE_URL}/step/add-delete-member`,
    getTaskPosts: `${BASE_URL}/timeline/step/`,
    commentOnTask: `${BASE_URL}/timeline/new-comment`,
    postOnTask: `${BASE_URL}/timeline/new-post`,
    approveTask: `${BASE_URL}/step/approve/`,
    reviseTask: `${BASE_URL}/step/revise/`,
    addNewTask: `${BASE_URL}/step/add`,
    //updatePaymentStatus: `${BASE_URL}/payment/confirm`,

    // stage api
    updateStage: `${BASE_URL}/stage/`,
    completeStage: `${BASE_URL}/stage/complete/`,

    // collection api
    addCollection: `${BASE_URL}/collection/add`,
    addProductToCollection: `${BASE_URL}/collection/product/add`,
    getUserCollectionList: `${BASE_URL}/collection/search/user/`,
    getCollectionDetails: `${BASE_URL}/collection/`,
    getCollectionProducts: `${BASE_URL}/collection/products/`,
    getCollectionProductsByCollectionType: `${BASE_URL}/collection/products/collection-type/`,
    getUsersByTypes: `${BASE_URL}/user/by-user-types`,
    shareCollection: `${BASE_URL}/collection/share`,
    getFixedCollection: `${BASE_URL}/collection/fixed-collection`,
    getUserSuggestions: `${BASE_URL}/user/find-list-by-email-and-user-type`,
    updatePaymentStatus: `${BASE_URL}/payment/confirm`,

    invoiceList: `${BASE_URL}/invoice/user/`,

    uploadDocument: `${BASE_URL}/doc/add`,
    uploadDocumentInProduct: `${BASE_URL}/product/doc/add/`,
    removeProductDocument: `${BASE_URL}/product/doc/`,
    shareDesign: `${BASE_URL}/product/add`,
    getShareDesignDetails: `${BASE_URL}/product/style-info/`,
    updateDesignDetails: `${BASE_URL}/product/style-info/`,
    updateSizeTable: `${BASE_URL}/product/size/`,
    getDesignImages: `${BASE_URL}/product/doc/`,
    getFabricTypes: `${BASE_URL}/material/fabric-type/all`,
    getDesignCategories: `${BASE_URL}/category/all`,
    getDocumentResponse: `${BASE_URL}/product/groupwise-doc/`,
    addNewGroupDocument: `${BASE_URL}/product/document-group/add`,

    // measurment api
    getPomAndSize: `${BASE_URL}/product-measurement/pom-and-size/all`,
    addSizeToProduct: `${BASE_URL}/product-measurement/add-size`,
    removeSizeFromProduct: `${BASE_URL}/product-measurement/remove-size`,
    getProductMeasurement: `${BASE_URL}/product-measurement/`,
    addPomToProduct: `${BASE_URL}/product-measurement/add-point-of-measurement`,
    removePomFromProduct: `${BASE_URL}/product-measurement/remove-point-of-measurement`,
    updateCellValue: `${BASE_URL}/product-measurement/update-cell-value`,
    addGrading: `${BASE_URL}/product-measurement/add-grading`,
    addNewPom: `${BASE_URL}/product-measurement/point-of-measurement/add`,
    saveAsTemplate: `${BASE_URL}/product-measurement/save-as-template`,
    getAllTemplate: `${BASE_URL}/product-measurement/template/all`,
    loadFromTemplate: `${BASE_URL}/product-measurement/load-from-template`,

    getSettings: `${BASE_URL}/setting/get/`,
};

// Axios request interceptor
axios.interceptors.request.use((config) => {
    const token = getToken();
    // console.log("token",token)
    config.headers.Authorization = token ? token : "";
    // console.log("config from request",config)
    return config;
});

// Axios response interceptor
axios.interceptors.response.use(
    (response) => {
        if (response.config.url.includes("logout")) {
            delete axios.defaults.headers.common["Authorization"];
        }
        return response;
    },
    (error) => {
        if (
            HTTP_STATUS["Unauthorized"] === error.response.status &&
            localStorage.getItem("token")
        ) {
            setTimeout(() => {
                // localStorage.removeItem('token');
                // localStorage.clear();
                // delete axios.defaults.headers.common['Authorization'];
                window.location.href = "/logout";
                // store.dispatch({
                //     type: REDIRECT_TO,
                //     payload: {
                //         link: '/login'
                //     }
                // });
            }, 10);
        }
        return Promise.reject(error);
    }
);

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

const updateTokenInHeader = async () => {
    // return ;
    let token = await localStorage.getItem("token");
    console.log("token", token);
    if (token) {
        // axios.defaults.headers.common['Authorization'] = token;
    }

    // const token = {
    //     local: JSON.parse(localStorage.getItem('token')),
    //     header: axios.defaults.headers.common['Authorization']
    // };
    // if (token.local && (!token.header || token.local !== token.header)) {
    //     axios.defaults.headers.common['Authorization'] = token.local;
    // }
};

const Http = {
    GET: (key, params = "") => {
        // updateTokenInHeader();
        params = typeof params === "object" ? encodeQueryData(params) : params;
        return axios.get(routes[key] + params, headers);
    },
    GET_WITH_ID_PARAM: (key, params = "", id = "") => {
        // updateTokenInHeader();
        // console.log("id",id)
        // console.log("params",params)
        params = typeof params === "object" ? encodeQueryData(params) : params;
        return axios.get(routes[key] + id + params, headers);
    },
    POST: (key, params, id = "") => {
        // if(key!=='signup' || key!=='login'){
        // console.log("token header called",key);
        // updateTokenInHeader();
        // }
        // console.log("from post",routes[key] + id, params)
        return axios.post(routes[key] + id, params, headers);
    },
    POST_TEXT_BODY: (key, params, id = "") => {
        // if(key!=='signup' || key!=='login'){
        // console.log("token header called",key);
        // updateTokenInHeader();
        // }
        // console.log("from post",params)
        return axios.post(routes[key] + id, params, {
            "Content-Type": "text/html",
            Accept: "application/json",
        });
    },
    PUT: (key, params, id = "") => {
        // updateTokenInHeader();
        return axios.put(routes[key] + id, params, headers);
    },
    DELETE: (key, data, id = "") => {
        // updateTokenInHeader();
        return axios.delete(routes[key] + id, { data, headers });
    },
    DELETE_WITH_BODY: (key, body, params = "") => {
        // updateTokenInHeader();
        params = typeof params === "object" ? encodeQueryData(params) : params;
        return axios.delete(routes[key] + params, { headers, data: body });
    },
    UPLOAD: (key, { name, file }) => {
        // updateTokenInHeader();
        const formData = new FormData();
        formData.append(name, file);

        return axios.post(routes[key], formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    DOWNLOAD: (key, params = "") => {
        // Only GET is supported
        // updateTokenInHeader();
        params = typeof params === "object" ? encodeQueryData(params) : params;
        return axios(routes[key] + params, {
            method: "GET",
            responseType: "blob", // Force to receive data in a Blob Format
            header: JSON.parse(localStorage.getItem("token")),
        });
    },
    UPLOAD_WITH_PROGRESS: (key, params, id = "", progressCallback) => {
        // if(key!=='signup' || key!=='login'){
        // console.log("token header called",key);
        // updateTokenInHeader();
        // }
        // console.log("from post",routes[key] + id, params)
        return axios.post(routes[key] + id, params, {
            headers,
            onUploadProgress: (data) => {
                //Set the progress value to show the progress bar
                progressCallback(data, params);
            },
        });
    },
};

export default Http;
