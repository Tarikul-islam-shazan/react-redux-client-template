import axios from 'axios'
import { HTTP_STATUS, BASE_URL, BASE_FRONT_END_URL } from '../constant'
import { getToken } from './Util'

const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
}

// const BASE_URL = "http://nitex-env.eba-bj9qc7tu.eu-central-1.elasticbeanstalk.com";

const routes = {
    userInfo: `${BASE_URL}/user/me`, // get
    login: `${BASE_URL}/auth/login`, // POST
    signup: `${BASE_URL}/auth/signup`, // POST
    forgetPassword: `${BASE_URL}/user/request-forgot-password`, // POST
    completeForgotPassword: `${BASE_URL}/user/complete-forgot-password`, // POST
    refreshUserToken: `${BASE_URL}/auth/refresh`,
    verifyToken: `${BASE_URL}/auth/with-verification-token`,
    verifyEmail: `${BASE_URL}/user/client/verify-email`,
    resendVerificationMail: `${BASE_URL}/user/client/resend-email`,
    getLoginPageBgImage: `${BASE_URL}/static-content/`
}

// Axios request interceptor
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    config.headers.Authorization = token ? token : ''
    config.headers.unameid = userInfo?.id || ''
    config.headers.unamefull = userInfo?.name || ''
    return config
})

// Axios response interceptor
axios.interceptors.response.use(
    (response) => {
        if (response.config.url.includes('logout')) {
            delete axios.defaults.headers.common['Authorization']
        }
        return response
    },
    (error) => {
        if (
            error.response.data.status === HTTP_STATUS['Unauthorized'] &&
            localStorage.getItem('token')
        ) {
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
            window.location.replace(BASE_FRONT_END_URL)
        }
        return Promise.reject(error)
    }
)

const encodeQueryData = (data) => {
    let ret = [],
        temp
    for (let i in data) {
        temp = data[i]
        if (temp !== '' && temp !== null) {
            ret.push(encodeURIComponent(i) + '=' + encodeURIComponent(temp))
        }
    }
    return ret.length ? '?' + ret.join('&') : ''
}

const updateTokenInHeader = () => {
    let token = localStorage.getItem('token')
    if (token) {
        axios.defaults.headers.common['Authorization'] = token
    }

    // const token = {
    //     local: JSON.parse(localStorage.getItem('token')),
    //     header: axios.defaults.headers.common['Authorization']
    // };
    // if (token.local && (!token.header || token.local !== token.header)) {
    //     axios.defaults.headers.common['Authorization'] = token.local;
    // }
}

const Http = {
    GET: (key, params = '') => {
        // updateTokenInHeader();
        params = typeof params === 'object' ? encodeQueryData(params) : params
        return axios.get(routes[key] + params, headers)
    },
    GET_WITH_ID_PARAM: (key, params = '', id = '') => {
        // updateTokenInHeader();
        // console.log("id",id)
        // console.log("params",params)
        params = typeof params === 'object' ? encodeQueryData(params) : params
        return axios.get(routes[key] + id + params, headers)
    },
    POST: (key, params, id = '') => {
        // if(key!=='signup' || key!=='login'){
        // console.log("token header called",key);
        // updateTokenInHeader();
        // }
        // console.log("from post",routes[key] + id, params)
        return axios.post(routes[key] + id, params, headers)
    },
    POST_TEXT_BODY: (key, params, id = '') => {
        // if(key!=='signup' || key!=='login'){
        // console.log("token header called",key);
        // updateTokenInHeader();
        // }
        // console.log("from post",params)
        return axios.post(routes[key] + id, params, {
            'Content-Type': 'text/html',
            Accept: 'application/json'
        })
    },
    PUT: (key, params, id = '') => {
        // updateTokenInHeader();
        return axios.put(routes[key] + id, params, headers)
    },
    DELETE: (key, data, id = '') => {
        // updateTokenInHeader();
        return axios.delete(routes[key] + id, { data, headers })
    },
    DELETE_WITH_BODY: (key, body, params = '') => {
        // updateTokenInHeader();
        params = typeof params === 'object' ? encodeQueryData(params) : params
        return axios.delete(routes[key] + params, { headers, data: body })
    },
    UPLOAD: (key, { name, file }) => {
        // updateTokenInHeader();
        const formData = new FormData()
        formData.append(name, file)

        return axios.post(routes[key], formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    DOWNLOAD: (key, params = '') => {
        // Only GET is supported
        // updateTokenInHeader();
        params = typeof params === 'object' ? encodeQueryData(params) : params
        return axios(routes[key] + params, {
            method: 'GET',
            responseType: 'blob', // Force to receive data in a Blob Format
            header: JSON.parse(localStorage.getItem('token'))
        })
    },
    UPLOAD_WITH_PROGRESS: (key, params, id = '', progressCallback) => {
        // if(key!=='signup' || key!=='login'){
        // console.log("token header called",key);
        // updateTokenInHeader();
        // }
        // console.log("from post",routes[key] + id, params)
        return axios.post(routes[key] + id, params, {
            headers,
            onUploadProgress: (data) => {
                //Set the progress value to show the progress bar
                progressCallback(data, params)
            }
        })
    }
}

export default Http
