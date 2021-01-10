const APPLICATION_ID = 10;

const SERVICES = {
    1: 'Send Money',
    6001: 'Request Money',
    3001: 'Add Money - Bank',
    3011: 'Add Money - Card',
    3002: 'Withdraw Money',
    6002: 'Make Payment',
    6005: 'Request Payment',
    2001: 'Mobile Top Up',
    1100: 'Offer'
};

const RULE_NAMES = ['MAX_AMT_SINGLE', 'MAX_AMT_MONTHLY', 'MAX_BANK_ACCOUNT_NUMBER_LENGTH'];

const HTTP_STATUS = {
    'OK': 200,
    'Bad Request': 400,
    'Unauthorized': 401,
    'Forbidden': 403,
    'Not Found': 404,
    'Method Not Allowed': 405,
    'Not Acceptable': 406,
    'Request Time-out': 408,
    'Conflict': 409,
    'Gone': 410,
    'Unsupported Media Type': 415,
    'Expectation Failed': 417,
    'Precondition Required': 428,
    'Valid OTP Exists': 452
};

const API = () => {
    const {hostname} = window.location;
    let url = null;

    switch (hostname) {
        case 'fs.ipay.com.bd':
            url = {
                fs: 'http://10.200.40.206:8899/api',
                central_auth: 'http://10.200.40.203:7000'
            };
            break;
        case 'testfs.ipay.com.bd':
            url = {
                fs: 'http://10.10.40.15:8899/api',
                central_auth: 'http://10.10.40.31:8000'
            };
            break;
        case '10.10.10.199':
        case 'localhost':
        default:
            url = {
                fs: 'http://10.10.10.12:8899/api',
                central_auth: 'http://10.10.10.199:8000'
            };
            break;
    }

    return url;
};

//export const BASE_URL = "http://nitex-env.eba-bj9qc7tu.eu-central-1.elasticbeanstalk.com"; // test
//export const BASE_URL = "https://api.nitex.com"; //Live
//export const BASE_URL_2 = "http://bb43c5f2.ngrok.io";
export const BASE_URL = getBaseUrl(); //"http://localhost:8080"; //Live

export const OAUTH2_REDIRECT_URI = window.location.origin+'/oauth2/redirect'

export const GOOGLE_AUTH_URL = BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = BASE_URL + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const LINKEDIN_AUTH_URL = BASE_URL + '/oauth2/authorize/linkedin?redirect_uri=' + OAUTH2_REDIRECT_URI;

export const LOADER_OVERLAY_BACKGROUND = 'transparent';
export const LOADER_COLOR = '#452D8D';
export const LOADER_WIDTH = '80px';
export const LOADER_TEXT = ''; //temporarily removed
export const LOADER_POSITION = 'fixed';
export const LOADER_TOP = '50%';
export const LOADER_LEFT = '50%';
export const LOADER_MARGIN_TOP = -100;
export const LOADER_MARGIN_LEFT = 0;
export const hjid = getHotjarId();
export const hjsv = 6;
export const GA_ID = 'UA-168122648-1';

export { APPLICATION_ID, SERVICES, RULE_NAMES, HTTP_STATUS, API };

function getBaseUrl(){
    const hostName = window.location.toString();

    if( hostName.indexOf( "https://test.nitex.com" ) > -1  ){
        return "http://testapi-v2.nitex.com";
        // return "https://testapi.nitex.com";
    }
    else if( hostName.indexOf( "https://testadmin.nitex.com" ) > -1  ){
        return "http://testapi-v2.nitex.com";
        // return "https://testapi.nitex.com";
    }
    else if( hostName.indexOf( "https://app.nitex.com" ) > -1 ){
        return "https://api.nitex.com";
    }
    else if( hostName.indexOf( "https://admin.nitex.com" ) > -1 ){
        return "https://api.nitex.com";
    }
    else if( hostName.indexOf( "localhost" ) > -1 ){
        return "http://testapi-v2.nitex.com";
        // return "https://testapi.nitex.com";
    }
}

function getHotjarId(){
    const hostName = window.location.toString();

    if( hostName.indexOf( "https://app.nitex.com" ) > -1  ){
        return 2096288;
    } else {
        return 1986852;
    }
}
