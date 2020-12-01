import axios from 'axios';
import { API, HTTP_STATUS, BASE_URL } from '../constant';
import store from '../store';
import { REDIRECT_TO } from '../actions/types';
import  { getToken } from "./Util";

const {fs, central_auth} = API();
const headers = {'Content-Type': 'application/json', 'Accept': 'application/json'};

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
    addProduct: `${BASE_URL}/product/add`, // POST
    getProductList: `${BASE_URL}/product/my-product`, // GET
    getProductDetails: `${BASE_URL}/product/`, // GET
    getProductType: `${BASE_URL}/product-type/all`, // GET
    getProductTypeWithGroup: `${BASE_URL}/product-type/all-with-group`, // GET
    getColorType: `${BASE_URL}/color/all`, // GET
    getAccessoriesList: `${BASE_URL}/accessories/by-product-type/`, // GET
    getSizeTableData: `${BASE_URL}/sizes/get-size-table/`, // GET
    likeProduct: `${BASE_URL}/product/like/`, //post
    unlikeProduct: `${BASE_URL}/product/unlike/`, //post
    updateProductStatus: `${BASE_URL}/product/update-product-status/`, //post
    getDashboardData: `${BASE_URL}/dashboard/`, // GET
    getDashboardDesignList: `${BASE_URL}/dashboard/design-by-nitex`, // GET
    getPickDesign: `${BASE_URL}/product/for-pick-design`, // GET
    getProjectList: `${BASE_URL}/project/my-project`, // GET
    getProjectDetails: `${BASE_URL}/project/`, // GET
    getRfqList: `${BASE_URL}/rfq/my-rfq`,
    getRfqDetails: `${BASE_URL}/rfq/`,
    getRfqNegotiationMessages: `${BASE_URL}/product/get-messages/`,
    sendRfqNegotiationMessage: `${BASE_URL}/rfq/send-message/`,
    getDeliverableMessages: `${BASE_URL}/deliverable/get-messages/`,
    sendDeliverableMessages: `${BASE_URL}/deliverable/send-message/`,
    getProjectProductDetails: `${BASE_URL}/project/product/`,
    addRfq: `${BASE_URL}/rfq/add`,
    addProject: `${BASE_URL}/project/add`,
    getMostTaggedTopics: `${BASE_URL}/timeline/most-tagged-topic/`,
    getUpcomingDeadlines: `${BASE_URL}/project/nearest-deliverable-list/`,
    getPostsForProject: `${BASE_URL}/timeline/project/`,
    getFeedbackForPost: `${BASE_URL}/timeline/comment-by-post/`,
    sendPost: `${BASE_URL}/timeline/new-post`,
    sendFeedback: `${BASE_URL}/timeline/new-comment`,
    updateDeliverables: `${BASE_URL}/deliverable/update-status-and-deadline/`,
    authGoogle: `${BASE_URL}/oauth2/authorize/google`,
    authLinkedin: `${BASE_URL}/oauth2/authorize/linkedin`,
    getProjectInvoice: `${BASE_URL}/invoice/project/`,
    payForInvoice: `${BASE_URL}/invoice/pay`,
    getInvoiceDetails: `${BASE_URL}/invoice/`,
    getNotifications: `${BASE_URL}/notification/all`,
    markNotificationRead: `${BASE_URL}/notification/mark-seen/`
};

// Axios request interceptor
axios.interceptors.request.use((config) => {
    const token = getToken();
    // console.log("token",token)
    config.headers.Authorization =  token ? token : '';
    // console.log("config from request",config)
    return config;
  });

// Axios response interceptor
axios.interceptors.response.use((response) => {
    if (response.config.url.includes('logout')) {
        delete axios.defaults.headers.common['Authorization'];
    }
    return response;
}, (error) => {
    if (HTTP_STATUS['Unauthorized'] === error.response.status && localStorage.getItem('token')) {
        setTimeout(() => {
            // localStorage.removeItem('token');
            // localStorage.clear();
            // delete axios.defaults.headers.common['Authorization'];
            window.location.href = '/logout';
            // store.dispatch({
            //     type: REDIRECT_TO,
            //     payload: {
            //         link: '/login'
            //     }
            // });
        }, 10);
    }
    return Promise.reject(error);
});

const encodeQueryData = data => {
    let ret = [], temp;
    for (let i in data) {
        temp = data[i];
        if (temp !== '' && temp !== null) {
            ret.push(encodeURIComponent(i) + '=' + encodeURIComponent(temp));
        }
    }
    return ret.length ? '?' + ret.join('&') : '';
};

const updateTokenInHeader = async () => {
    // return ;
    let token = await localStorage.getItem('token');
    console.log("token",token);
    if(token){
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
    GET: (key, params = '') => {
        // updateTokenInHeader();
        params = typeof params === 'object' ? encodeQueryData(params) : params;
        return axios.get(routes[key] + params, headers);
    },
    GET_WITH_ID_PARAM: (key, params = '', id = '') => {
        // updateTokenInHeader();
        // console.log("id",id)
        // console.log("params",params)
        params = typeof params === 'object' ? encodeQueryData(params) : params;
        return axios.get(routes[key] + id + params, headers);
    },
    POST: (key, params, id = '') => {
        // if(key!=='signup' || key!=='login'){
          // console.log("token header called",key);
        // updateTokenInHeader();
        // }
        // console.log("from post",routes[key] + id, params)
        return axios.post(routes[key] + id, params, headers);
    },
    POST_TEXT_BODY: (key, params, id = '') => {
        // if(key!=='signup' || key!=='login'){
          // console.log("token header called",key);
        // updateTokenInHeader();
        // }
        // console.log("from post",params)
        return axios.post(routes[key] + id, params, {'Content-Type': 'text/html', 'Accept': 'application/json'});
    },
    PUT: (key, params) => {
        // updateTokenInHeader();
        return axios.put(routes[key], params, headers);
    },
    UPLOAD: (key, {name, file}) => {
        // updateTokenInHeader();
        const formData = new FormData();
        formData.append(name, file);

        return axios.post(routes[key], formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    DOWNLOAD: (key, params = '') => { // Only GET is supported
        // updateTokenInHeader();
        params = typeof params === 'object' ? encodeQueryData(params) : params;
        return axios(routes[key] + params, {
            method: 'GET',
            responseType: 'blob', // Force to receive data in a Blob Format
            header: JSON.parse(localStorage.getItem('token'))
        });
    }
};

export default Http;
