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
                                className='form-field'
                                id='email'
                                placeholder='Enter email'
                                name='email'
                                value={inputData?.email || ''}
                                onChange={handleChangeLogin}
                            />
                        </div>
                        <div className='form-group '>
                            <button className='forget-password'>
                                Forget Password
                            </button>
                            <label htmlFor='password'>Password</label>
                            <div className='input-group'>
                                <input
                                    type={passwordType}
                                    className='form-field'
                                    id='password'
                                    placeholder='Password'
                                    name='password'
                                    value={inputData?.password || ''}
                                    onChange={handleChangeLogin}
                                />
                                <span
                                    className='input-group-text'
                                    onClick={togglePassword}
                                >
                                    @
                                </span>
                            </div>
                        </div>
                        <div className='form-group'>
                            <div className='d-flex align-items-center'>
                                <input
                                    type='checkbox'
                                    name='agree'
                                    value={inputData?.agree}
                                    onChange={handleChangeLogin}
                                />
                                <span className='agree-text'>
                                    Agree our
                                    <a href='#'>Terms &amp; Conditions</a>
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
                <div className='login-input-forms'>
                    <div className='form-group'>
                        <label htmlFor='name'>Full Name</label>
                        <input
                            type='text'
                            className='form-field'
                            id='name'
                            placeholder='Write Here'
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
                            placeholder='Contact Number'
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
                            placeholder='Brand Name'
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
                <div className='container-fluid'>
                    <div className='p-10'>
                        <div className=''>
                            <div className='login-form-contents'>
                                <div className='form-container max-w-[586px] ml-auto'>
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
                        <div className='col-md-1' />
                        <p className='md:space-x-1 space-y-1 md:space-y-0 mb-4'>
                            <a
                                className='inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
                                data-bs-toggle='collapse'
                                href='#collapseExample'
                                role='button'
                                aria-expanded='false'
                                aria-controls='collapseExample'
                            >
                                Link with href
                            </a>
                            <button
                                className='inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
                                type='button'
                                data-bs-toggle='collapse'
                                data-bs-target='#collapseExample'
                                aria-expanded='false'
                                aria-controls='collapseExample'
                            >
                                Button with data-bs-target
                            </button>
                        </p>
                        <div className='collapse' id='collapseExample'>
                            <div className='block p-6 rounded-lg shadow-lg bg-white'>
                                Some placeholder content for the collapse
                                component. This panel is hidden by default but
                                revealed when the user activates the relevant
                                trigger.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LoaderComponent>
    )
}

export default Login
