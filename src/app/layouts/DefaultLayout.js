import React, { useEffect } from 'react'
import {
    Link,
    Navigate,
    Outlet,
    useNavigate,
    useLocation
} from 'react-router-dom'
import { ReactComponent as MenuIcon } from '../../assets/images/home/humbargerMenu.svg'
import { ReactComponent as NitexIcon } from '../../assets/images/home/nitexLogo.svg'
import { ReactComponent as CloseIcon } from '../../assets/images/home/cross.svg'
import { ReactComponent as IconFavourite } from '../../assets/images/home/favourite.svg'
import { ReactComponent as IconNotification } from '../../assets/images/home/notification.svg'

const DefaultLayout = () => {
    const navigate = useNavigate()
    const currentLocation = useLocation()
    // console.log(currentLocation)

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('userInfo'))
        if (data === undefined || data === null) {
            navigate('/login')
        } else if (
            data?.status === 'ACTIVE' &&
            currentLocation.pathname === '/'
        ) {
            navigate('/dashboard')
            // we have to implement some other logic here so we can render other protected routes
            // i think we can use useLocation() hook to know the current location
            // and then we can take the decision to render protected routes or not
        } else if (data?.status === 'DISABLED') {
            localStorage.clear()
            sessionStorage.clear()
            navigate('/login')
        } else if (data?.emailVerified === false) {
            navigate('/login', { state: { emailVerified: false } })
        } else if (data?.businessInfoGiven === false) {
            navigate('/activation')
            return <Navigate to='/activation' />
        } else if (data?.status === 'PENDING') {
            navigate('/activation')
        }
    }, [])

    return (
        <div className='container-fluid bg-primaryColor-shade-300'>
            <header className='bg-white py-5 px-5 logo flex items-center'>
                <div className='logo flex items-center gap-6'>
                    <div className='burger-menu xl:hidden'>
                        <MenuIcon />
                    </div>
                    <Link to='/dashboard'>
                        <span className='brand-logo'>
                            <NitexIcon />
                        </span>
                    </Link>
                    <span className='divider hidden xl:block'>
                        <CloseIcon />
                    </span>
                    <span className='hidden xl:block text-logo text-2xl text-primaryColor-shade-100 font-bold uppercase'>
                        Louis Vuitton
                    </span>
                </div>
                <div className='main-menu hidden xl:block ml-16 4xl:ml-28'>
                    <ul>
                        <li className='text-base text-primaryColor uppercase inline-block mr-6 4xl:mr-10 5xl:mr-14 active'>
                            <Link to='/dashboard'>Home</Link>
                        </li>
                        <li className='text-base text-primaryColor uppercase inline-block mr-6 4xl:mr-10 5xl:mr-14'>
                            <Link to='/moodboard'>Moodboard</Link>
                        </li>
                        <li className='text-base text-primaryColor uppercase inline-block mr-6 4xl:mr-10 5xl:mr-14'>
                            <a href='#'>Collections</a>
                        </li>
                        <li className='text-base text-primaryColor uppercase inline-block mr-6 4xl:mr-10 5xl:mr-14'>
                            <a href='#'>Quotes</a>
                        </li>
                        <li className='text-base text-primaryColor uppercase inline-block mr-6 4xl:mr-10 5xl:mr-14'>
                            <a href='#'>Samples</a>
                        </li>
                        <li className='text-base text-primaryColor uppercase inline-block mr-6 4xl:mr-10 5xl:mr-14'>
                            <a href='#'>Orders</a>
                        </li>
                        <li className='text-base text-primaryColor uppercase inline-block mr-6 4xl:mr-10 5xl:mr-14'>
                            <a href='#'>More</a>
                        </li>
                    </ul>
                </div>

                <div className='user-interaction ml-auto flex items-center gap-x-6'>
                    <div className='w-[40px] h-[40px] rounded-full bg-primaryColor-shade-300 p-2 relative flex items-center justify-center cursor-pointer'>
                        <span>
                            <IconFavourite />
                        </span>
                        <span className='absolute top-[-9px] right-[-22px] text-sm text-white-shade-100 bg-primaryColor inline-block rounded-[20px] px-3 text-center'>
                            12
                        </span>
                    </div>
                    <div className='w-[40px] h-[40px] rounded-full bg-primaryColor-shade-300 p-2 relative flex items-center justify-center cursor-pointer'>
                        <span>
                            <IconNotification />
                        </span>
                        <span className='absolute top-[-9px] right-[-22px] text-sm text-white-shade-100 bg-primaryColor inline-block rounded-[20px] px-   3 text-center'>
                            99+
                        </span>
                    </div>
                    <div className='w-[40px] h-[40px] rounded-full bg-primaryColor-shade-300 relative border border-white-shade-100 flex items-center justify-center cursor-pointer overflow-hidden'>
                        <img
                            src='./images/user.jpg'
                            className='object-cover object-top w-full h-full'
                            alt=''
                        />
                    </div>
                </div>
            </header>
            <div className='body-container p-4'>{<Outlet />}</div>
        </div>
    )
}

export default DefaultLayout
