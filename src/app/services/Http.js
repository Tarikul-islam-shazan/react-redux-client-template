import axios from 'axios';
import { API, HTTP_STATUS } from '../constant';
import store from '../store';
import { REDIRECT_TO } from '../actions/types';

const {fs, central_auth} = API();
const headers = {'Content-Type': 'application/json', 'Accept': 'application/json'};

const routes = {
    login: `${central_auth}/auth/api/v1/login/`, // POST
    logout: `${central_auth}/auth/api/v1/logout/`, // GET
    public_holidays: `${fs}/public-holidays/`
};

// Axios response interceptor
axios.interceptors.response.use((response) => {
    if (response.config.url.includes('logout')) {
        delete axios.defaults.headers.common['token'];
    }
    return response;
}, (error) => {
    if (HTTP_STATUS['Unauthorized'] === error.response.status && JSON.parse(localStorage.getItem('token'))) {
        setTimeout(() => {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['token'];
            store.dispatch({
                type: REDIRECT_TO,
                payload: {
                    link: '/login'
                }
            });
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

const updateTokenInHeader = () => {
    const token = {
        local: JSON.parse(localStorage.getItem('token')),
        header: axios.defaults.headers.common['token']
    };

    if (token.local && (!token.header || token.local !== token.header)) {
        axios.defaults.headers.common['token'] = token.local;
    }
};

const Http = {
    GET: (key, params = '') => {
        updateTokenInHeader();
        console.log('key: ', key, ' params: ', params);
        params = typeof params === 'object' ? encodeQueryData(params) : params;
        return axios.get(routes[key] + params, headers);
    },
    POST: (key, params) => {
        updateTokenInHeader();
        return axios.post(routes[key], params, headers);
    },
    PUT: (key, params) => {
        updateTokenInHeader();
        return axios.put(routes[key], params, headers);
    },
    UPLOAD: (key, {name, file}) => {
        updateTokenInHeader();
        const formData = new FormData();
        formData.append(name, file);

        return axios.post(routes[key], formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    DOWNLOAD: (key, params = '') => { // Only GET is supported
        updateTokenInHeader();
        params = typeof params === 'object' ? encodeQueryData(params) : params;
        return axios(routes[key] + params, {
            method: 'GET',
            responseType: 'blob', // Force to receive data in a Blob Format
            header: JSON.parse(localStorage.getItem('token'))
        });
    }
};

export default Http;
