import React, { useEffect, useState } from 'react'
import nitexLogoDark from '../../../assets/images/login/nitexLogoDark.svg'
import rightWhite from '../../../assets/images/login/rightWhite.svg'
import LoaderComponent from '../../common/LoaderComponent'
import Http from '../../services/Http'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { getRedirectUrl } from '../../services/Util'
import 'tw-elements'
import countryList from '../../services/DialCodeList';
import SelectComponent from '../../common/SelectComponent';
import ForgetPassword from './ForgetPassword';
import moment from 'moment';

const Login = () => {
    const [loader, setLoader] = useState(true)
    const [activeTab, setActiveTab] = useState('login')
    const [passwordType, setPasswordType] = useState('password')
    const [inputData, setInputData] = useState({})
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [listOfCountryCode, setListOfCountryCode] = useState([])
    const [isRegisterButtonClicked, setIsRegisterButtonClicked] = useState(false)
    const [bgImageLink, setBgImageLink] = useState('')
    const navigate = useNavigate()


    useEffect(() => {
        let utcFormat = moment(new Date()).format()
        Http.GET('getLoginPageBgImage',`?localDateTime=${encodeURI(utcFormat.split('+')[0])}`)
            .then(({ data }) => {
                setBgImageLink(data)
                setLoader(false)
            })
            .catch((error) => {
                setLoader(false)
                toast.error(error.response.data.message)
            })
    },[])

    useEffect(() => {
        localStorage.clear()
    }, [])

    useEffect(() => {
        let countryCodeList = []
        for(let item of countryList){
            countryCodeList.push({
                label: `${item.code} (${item.dial_code})`,
                value: item.dial_code
            })
        }
        setListOfCountryCode(countryCodeList)
    },[isRegisterButtonClicked])

    const handleChangeLogin = (e) => {
        let { name, value } = e.target
        let cloneLoginParams = { ...inputData }
        if (name === 'approveTC') {
            cloneLoginParams[name] = e.target.checked
        } else {
            cloneLoginParams[name] = value
        }
        setInputData(cloneLoginParams)
    }

    const handleUserInfo = () => {
        Http.GET('userInfo')
            .then(({ data }) => {
                setLoader(false)
                toast.success('Successful!')
                localStorage.setItem(
                    'userInfo',
                    JSON.stringify(data)
                )
                navigate(getRedirectUrl(data))
            })
            .catch((error) => {
                setLoader(false)
                toast.error(error.response.data.message)
            })
    }

    const handleLoginSubmit = () => {
        setPasswordError('')
        setEmailError('')
        setLoader(true)
        Http.POST('login', inputData)
            .then(({ data }) => {
                if (data.accessToken) {
                    localStorage.setItem(
                        'token',
                        data.tokenType + ' ' + data.accessToken
                    )
                    localStorage.setItem('refreshToken', data.refreshToken)
                    handleUserInfo()
                }
            })
            .catch((error) => {
                setLoader(false)
                try {
                    let errors = JSON.parse(error.response.data.message)
                    for(let item of errors){
                        if(item.field === 'email'){
                            setEmailError(item.defaultMessage)
                        }
                        if(item.field === 'password'){
                            setPasswordError(item.defaultMessage)
                        }
                    }
                }catch (e){
                    toast.error(error.response.data.message)
                }
            })
    }

    const togglePassword = () => {
        if (passwordType === 'password') {
            setPasswordType('text')
        } else {
            setPasswordType('password')
        }
    }

    const renderLoginOrRegister = () => {
        if(activeTab === 'login'){
            return(
                <div className='form-group'>
                    <button
                        type='submit'
                        className='submit-btn'
                        onClick={handleLoginSubmit}
                        disabled={!inputData?.approveTC}
                    >
                        Login Now
                        <img src={rightWhite} alt='right'/>
                    </button>
                </div>
            )
        }else{
            return (
                <div className='form-group'>
                    <button
                        type='submit'
                        className='submit-btn'
                        onClick={() => setIsRegisterButtonClicked(true)}
                        disabled={!inputData?.approveTC}
                    >
                        Register Now
                        <img src={rightWhite} alt='right'/>
                    </button>
                </div>
            )
        }
    }

    const renderLoginForm = () => {
        if(!isRegisterButtonClicked) {
            return (
                <>
                    <div className='login-register-tab'>
                        <ul>
                            <li
                                className={activeTab === 'login' ? 'active' : ''}
                                onClick={() => setActiveTab('login')}
                            >
                                Login
                            </li>
                            <li
                                className={activeTab === 'register' ? 'active' : ''}
                                onClick={() => setActiveTab('register')}
                            >
                                Register
                            </li>
                        </ul>
                    </div>
                    <div className='login-input-forms'>
                        <div className='form-group'>
                            <label htmlFor='email'>Email address</label>
                            <input
                                type='email'
                                className={emailError ? 'form-field border-error' : 'form-field'}
                                id='email'
                                placeholder='Enter email'
                                name='email'
                                value={inputData?.email || ''}
                                onChange={handleChangeLogin}
                            />
                            {emailError && <span className='text-error text-sm'>
                            {emailError}
                        </span>}
                        </div>
                        <div className='form-group '>
                            <div className='flex justify-between items-center'>
                                <label htmlFor='password'>Password</label>
                                {activeTab === 'login' && <button
                                    className='forget-password uppercase underline'
                                    data-bs-toggle='modal'
                                    data-bs-target='#forgetPasswordModal'
                                >
                                    Forget Password
                                </button>}
                            </div>
                            <div className='input-group relative'>
                                <input
                                    type={passwordType}
                                    id='password'
                                    className={passwordError ? 'form-field pr-12 border-error' : 'form-field pr-12'}
                                    placeholder='Password'
                                    name='password'
                                    value={inputData?.password || ''}
                                    onChange={handleChangeLogin}
                                />
                                {passwordError && <span className='text-error text-sm'>
                                {passwordError}
                            </span>}
                                <span
                                    className='absolute cursor-pointer right-[10px] top-[10px]'
                                    onClick={togglePassword}
                                >
                                <svg
                                    width='40'
                                    height='40'
                                    viewBox='0 0 40 40'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M9 20C9 20 13 12 20 12C27 12 31 20 31 20'
                                        stroke='#282828'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M9 20C9 20 13 28 20 28C27 28 31 20 31 20'
                                        stroke='#282828'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M20 23C21.6569 23 23 21.6569 23 20C23 18.3431 21.6569 17 20 17C18.3431 17 17 18.3431 17 20C17 21.6569 18.3431 23 20 23Z'
                                        stroke='#282828'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </svg>
                            </span>
                            </div>
                        </div>
                        <div className='form-group'>
                            <div className='flex items-center'>
                            <span className=''>
                                <input
                                    type='checkbox'
                                    name='approveTC'
                                    value={inputData?.approveTC}
                                    onChange={handleChangeLogin}
                                />
                            </span>
                                <span className='agree-text'>
                                Agree our
                                <a
                                    href='#'
                                    className='border-b border-black  mx-2 uppercase'
                                >
                                    Terms & Conditions
                                </a>
                                &
                                <a
                                    href='#'
                                    className='border-b border-black  mx-2 uppercase'
                                >
                                    Policies
                                </a>
                            </span>
                            </div>
                        </div>
                        {renderLoginOrRegister()}
                    </div>
                </>
            )
        }
    }

    const handleCountryCode = (e) => {
        let cloneLoginParams = { ...inputData }
        cloneLoginParams['countryCode'] = e;
        setInputData(cloneLoginParams)
    }

    const handleRegisterSubmit = () => {
        setLoader(true)
        let postData = { ...inputData }
        postData['contactNumber'] = inputData.countryCode.value + inputData.contactNumber
        Http.POST('signup', postData)
            .then(({ data }) => {
                setLoader(false)
                localStorage.setItem(
                    'token',
                    data.tokenType + ' ' + data.accessToken
                )
                localStorage.setItem('refreshToken', data.refreshToken)
                handleUserInfo()
            })
            .catch((error) => {
                setLoader(false)
                    toast.error(error.response.data.message)
            })
    }

    const renderRegistrationForm = () => {
        if (activeTab === 'register' && isRegisterButtonClicked) {
            return (
                <div className='login-input-forms register'>
                    <div className='form-group'>
                        <label htmlFor='name'>Full Name</label>
                        <input
                            type='text'
                            className='form-field'
                            id='name'
                            placeholder='Write Here ...'
                            name='name'
                            value={inputData?.name || ''}
                            onChange={handleChangeLogin}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='contactNumber'>Contact Number</label>
                        <div className="flex">
                            <SelectComponent
                                options={listOfCountryCode}
                                onChange={handleCountryCode}
                            />
                            <input
                                type='text'
                                className='form-field'
                                id='contactNumber'
                                placeholder='e.g. 01521300845'
                                name='contactNumber'
                                value={inputData?.contactNumber || ''}
                                onChange={handleChangeLogin}
                            />
                        </div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='brandName'>Brand Name</label>
                        <input
                            type='text'
                            className='form-field'
                            id='brandName'
                            placeholder='Write Here ...'
                            name='brandName'
                            value={inputData?.brandName || ''}
                            onChange={handleChangeLogin}
                        />
                    </div>
                    <div className='form-group'>
                        <button
                            type='submit'
                            className='submit-btn'
                            onClick={handleRegisterSubmit}
                        >
                            Submit
                            <img src={rightWhite} alt='right' />
                        </button>
                    </div>
                </div>
            )
        }
    }

    return (
        <LoaderComponent loading={loader}>
            <div className='login-container' style={{ background: `url(${bgImageLink})` }}>
                <div className='h-full sm:p-10'>
                    <div className='login-form-contents'>
                        <div className='form-container xl:max-w-[500px]  3xl:max-w-[586px] xl:ml-auto'>
                            <div className='entry-title'>
                                <img src={nitexLogoDark} alt='nitex' />
                                <h2 className='belong-here-text font-bold text-6xl'>
                                    Belong Here
                                </h2>
                            </div>
                            {renderLoginForm()}
                            {renderRegistrationForm()}
                        </div>
                    </div>
                </div>
            </div>
            <ForgetPassword target='forgetPasswordModal'/>
        </LoaderComponent>
    )
}

export default Login
