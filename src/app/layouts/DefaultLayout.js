import React, { useEffect } from 'react'
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ReactComponent as MenuIcon } from '../../assets/images/home/humbargerMenu.svg'
import { ReactComponent as NitexIcon } from '../../assets/images/home/nitexLogo.svg'
import { ReactComponent as CloseIcon } from '../../assets/images/home/cross.svg'
import { ReactComponent as IconFavourite } from '../../assets/images/home/favourite.svg'
import { ReactComponent as IconNotification } from '../../assets/images/home/notification.svg'
import Slide1 from '../../assets/images/home/slide1.png';
import LoaderComponent from '../common/LoaderComponent'
import { useSelector } from 'react-redux'

const DefaultLayout = () => {
  const navigate = useNavigate()
  const currentLocation = useLocation()
  const loaderState = useSelector(state => state.loader)

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem('userInfo'))
    if (data === undefined || data === null) {
      navigate('/login')
    } else if (
      data?.status === 'ACTIVE' &&
      currentLocation.pathname === '/'
    ) {
      navigate('/dashboard')
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
    <LoaderComponent loading={loaderState}>
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
              <li className='text-base text-primaryColor uppercase inline-block mr-6 4xl:mr-10 5xl:mr-14 relative'>
                <a href='#'>Collections</a>
                <div className='submenu flex flex-col sm:flex-row p-5 bg-white shadow-lg w-[1240px] sm:h-[420px]  absolute top-[58px] left-[50%] translate-x-[-50%] z-[999]'>
                    <div className='sm:w-1/2 block bg-white-shade-100'>
                      <div className='overflow-hidden w-full h-full '>
                        {/*<img src='' alt='' className='w-full h-full object-cover'/>*/}
                      </div>
                    </div>
                    <div className='sm:w-1/2'>
                      <div className='uppercase text-[60px] text-white-shade-100 font-bold mt-8 ml-[-10px]'>COLLECTIONS</div>
                      <div className='space-y-10 p-4 mt-4 menu-items'>
                        <a href='#' className='active'>
                          <div className='flex gap-10'>
                            <span>NITEX COLLECTION</span>
                            <span>/ 07</span>
                          </div>
                        </a>
                        <a href='#'>
                          <div className='flex gap-10'>
                            <span>MY COLLECTION</span>
                            <span>/ 07</span>
                          </div>
                        </a>
                        <a href='#'>
                          <div className='flex gap-10'>
                            <span>COLLECTION REQUESTS</span>
                            <span>/ 07</span>
                          </div>
                        </a>
                      </div>
                    </div>
                </div>
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
            <div className='w-[40px] h-[40px] rounded-full bg-primaryColor-shade-300 p-2 relative  cursor-pointer'>
              <div className='flex items-center justify-center'>
                  <span>
                    <IconNotification />
                  </span>
                  <span className='absolute top-[-9px] right-[-22px] text-sm text-white-shade-100 bg-primaryColor inline-block rounded-[20px] px-3 text-center'>
                    99+
                </span>
              </div>
              <div className='submenu flex flex-col sm:flex-row p-6 bg-white shadow-lg w-[455px] sm:h-[386px]  absolute top-[66px] right-0  z-[999]'>
                <div>
                  <div className='uppercase text-[50px] text-white-shade-100 font-bold'>Favorites</div>
                  <div className='menu-items px-8'>
                    <a href='#' className='active'>
                      <div className='flex gap-10'>
                        <span>Moodboard </span>
                        <span>/ 07</span>
                      </div>
                    </a>
                    <a href='#'>
                      <div className='flex gap-10'>
                        <span>COLLECTION</span>
                        <span>/ 07</span>
                      </div>
                    </a>
                    <a href='#'>
                      <div className='flex gap-10'>
                        <span>Styles</span>
                        <span>/ 07</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
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
    </LoaderComponent>
  )
}

export default DefaultLayout
