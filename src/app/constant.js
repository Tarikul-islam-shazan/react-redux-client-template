export const BASE_URL = getBaseUrl()
export const BASE_FRONT_END_URL = getBaseFrontEndUrl()

export const OAUTH2_REDIRECT_URI = window.location.origin + '/oauth2/redirect'

export const GOOGLE_AUTH_URL =
    BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI
export const FACEBOOK_AUTH_URL =
    BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI
export const GITHUB_AUTH_URL =
    BASE_URL + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI
export const LINKEDIN_AUTH_URL =
    BASE_URL + '/oauth2/authorize/linkedin?redirect_uri=' + OAUTH2_REDIRECT_URI

export const LOADER_OVERLAY_BACKGROUND = 'transparent'
export const LOADER_COLOR = '#452D8D'
export const LOADER_WIDTH = '80px'
export const LOADER_TEXT = '' //temporarily removed
export const LOADER_POSITION = 'fixed'
export const LOADER_TOP = '50%'
export const LOADER_LEFT = '50%'
export const LOADER_MARGIN_TOP = -100
export const LOADER_MARGIN_LEFT = 0
export const hjid = getHotjarId()
export const hjsv = 6
export const GA_ID = 'UA-168122648-1'
export const LOCAL_QUOTE_NOW_KEY = 'nitex@quoteNowObj'

export const HTTP_STATUS = {
    OK: 200,
    'Bad Request': 400,
    Unauthorized: 401,
    Forbidden: 403,
    'Not Found': 404,
    'Method Not Allowed': 405,
    'Not Acceptable': 406,
    'Request Time-out': 408,
    Conflict: 409,
    Gone: 410,
    'Unsupported Media Type': 415,
    'Expectation Failed': 417,
    'Precondition Required': 428,
    'Valid OTP Exists': 452
}

function getBaseUrl() {
    const hostName = window.location.toString()

    if (hostName.indexOf('https://test.nitex.com') > -1) {
        return 'https://testapi-v2.nitex.com'
    } else if (hostName.indexOf('https://testadmin.nitex.com') > -1) {
        return 'https://testapi-v2.nitex.com'
    } else if (hostName.indexOf('https://app.nitex.com') > -1) {
        return 'https://api.nitex.com'
    } else if (hostName.indexOf('https://admin.nitex.com') > -1) {
        return 'https://api.nitex.com'
    } else if (hostName.indexOf('localhost') > -1) {
        return 'https://testapi-v2.nitex.com'
        //return "http://localhost:8080";
    } else if (hostName.indexOf('https://buyer-beta.nitex.com') > -1) {
        return 'https://apiv2.nitex.com'
    }
}

function getBaseFrontEndUrl() {
    const hostName = window.location.toString()

    if (hostName.indexOf('https://test.nitex.com') > -1) {
        return 'https://test.nitex.com'
    } else if (hostName.indexOf('https://testadmin.nitex.com') > -1) {
        return 'https://testadmin.nitex.com'
    } else if (hostName.indexOf('https://app.nitex.com') > -1) {
        return 'https://app.nitex.com'
    } else if (hostName.indexOf('https://admin.nitex.com') > -1) {
        return 'https://admin.nitex.com'
    } else if (hostName.indexOf('localhost') > -1) {
        return 'http://localhost:3000'
    } else if (hostName.indexOf('https://admin-beta.nitex.com') > -1) {
        return 'https://admin-beta.nitex.com'
    }
}

function getHotjarId() {
    const hostName = window.location.toString()

    if (hostName.indexOf('https://app.nitex.com') > -1) {
        return 2096288
    } else {
        return 1986852
    }
}

export function getOneSignalAppId() {
    const hostName = window.location.toString()

    if (hostName.indexOf('https://app.nitex.com') > -1) {
        return 'd0288891-96ed-4f96-82f1-698d75dabe49'
    } else {
        return '944586d0-b5c4-4e89-9822-28dd97aaca14'
    }
}

export const isItProductionServer = () => {
    const hostName = window.location.toString()
    if (hostName.indexOf('https://app.nitex.com') > -1) {
        return true
    }
}
