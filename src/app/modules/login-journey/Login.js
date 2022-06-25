import React, { useEffect, useState } from 'react'
import nitexLogoDark from '../../../assets/images/login/nitexLogoDark.svg'
import rightWhite from '../../../assets/images/login/rightWhite.svg'
import LoaderComponent from '../../common/LoaderComponent'
import Http from '../../services/Http'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { getRedirectUrl } from '../../services/Util'
import 'tw-elements'

const Login = () => {
    const [loader, setLoader] = useState(false)
    const [activeTab, setActiveTab] = useState('login')
    const [passwordType, setPasswordType] = useState('password')
    const [inputData, setInputData] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.clear()
    }, [])

    useEffect(() => {
        setInputData({})
    }, [activeTab])

    const handleChangeLogin = (e) => {
        let { name, value } = e.target
        let cloneLoginParams = { ...inputData }
        if (name === 'agree') {
            cloneLoginParams[name] = e.target.checked
        } else {
            cloneLoginParams[name] = value
        }
        setInputData(cloneLoginParams)
    }

    const handleLoginSubmit = () => {
        setLoader(true)
        Http.POST('login', inputData)
            .then(({ data }) => {
                if (data.accessToken) {
                    localStorage.setItem(
                        'token',
                        data.tokenType + ' ' + data.accessToken
                    )
                    localStorage.setItem('refreshToken', data.refreshToken)
                    Http.GET('userInfo')
                        .then(({ data }) => {
                            setLoader(false)
                            toast.success('Successfully Logged In.')
                            localStorage.setItem(
                                'userInfo',
                                JSON.stringify(data)
                            )
                            navigate(getRedirectUrl())
                        })
                        .catch((error) => {
                            setLoader(false)
                            toast.error(error.response.data.message)
                        })
                }
            })
            .catch((error) => {
                setLoader(false)
                toast.error(error.response.data.message)
            })
    }

    const togglePassword = () => {
        if (passwordType === 'password') {
            setPasswordType('text')
        } else {
            setPasswordType('password')
        }
    }

    const renderLoginForm = () => {
        if (activeTab === 'login') {
            return (
                <>
                    <div className='login-register-tab'>
                        <ul>
                            <li
                                className={
                                    activeTab === 'login' ? 'active' : ''
                                }
                                onClick={() => setActiveTab('login')}
                            >
                                Login
                            </li>
                            <li
                                className={
                                    activeTab === 'register' ? 'active' : ''
                                }
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
                                className='form-field border-error'
                                id='email'
                                placeholder='Enter email'
                                name='email'
                                value={inputData?.email || ''}
                                onChange={handleChangeLogin}
                            />
                            <span className='text-error text-sm'>
                                Invalid Email Address
                            </span>
                        </div>
                        <div className='form-group '>
                            <div className='flex justify-between items-center'>
                                <label htmlFor='password'>Password</label>
                                <button className='forget-password uppercase underline'>
                                    Forget Password
                                </button>
                            </div>
                            <div className='input-group relative'>
                                <input
                                    type={passwordType}
                                    className='form-field pr-12'
                                    id='password'
                                    placeholder='Password'
                                    name='password'
                                    value={inputData?.password || ''}
                                    onChange={handleChangeLogin}
                                />
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
                                        name='agree'
                                        value={inputData?.agree}
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
                        <div className='form-group'>
                            <button
                                type='submit'
                                className='submit-btn'
                                onClick={handleLoginSubmit}
                                disabled={!inputData?.agree}
                            >
                                Login Now
                                <img src={rightWhite} alt='right' />
                            </button>
                        </div>
                    </div>
                </>
            )
        }
    }

    const handleRegisterSubmit = () => {}

    const renderRegistrationForm = () => {
        if (activeTab === 'register') {
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
            <div className='login-container'>
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
        </LoaderComponent>
    )
}

export default Login
