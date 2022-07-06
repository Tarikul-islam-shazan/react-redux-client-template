import React from 'react'
import SelectComponent from '../../../app/common/SelectComponent'
import { ReactComponent as NitexLogo } from '../../images/home/nitexLogo.svg'
import { ReactComponent as FavouriteIcon } from '../../images/home/favourite.svg'
import { ReactComponent as NotificationIcon } from '../../images/home/notification.svg'
import { ReactComponent as CrossIcon } from '../../images/home/cross.svg'
import { ReactComponent as HumbargerIcon } from '../../images/home/humbargerMenu.svg'
import { ReactComponent as PlusIcon } from '../../images/plus.svg'
import { ReactComponent as PlusDarkIcon } from '../../icons/plusDark.svg'
import { ReactComponent as UploadIcon } from '../../images/upload.svg'
import { ReactComponent as FilterIcon } from '../../images/filter.svg'
import { ReactComponent as SearchIcon } from '../../images/search.svg'
import { ReactComponent as SearchIconWhite } from '../../images/search-white.svg'
import { ReactComponent as CloseIcon } from '../../images/close.svg'
import { ReactComponent as OkWhite } from '../../images/ok-white.svg'
import { ReactComponent as Refresh } from '../../images/refresh.svg'
import { ReactComponent as Dlt } from '../../images/dlt.svg'
import { ReactComponent as ArrowRightWhite } from '../../images/arror-right-white.svg'
import { ReactComponent as TickWhite } from '../../icons/tick-white.svg'
import { ReactComponent as EditDarkIcon } from '../../icons/editDark.svg'
import Pdf from '../../images/pdf.png'
import User from '../../images/user.jpg'

const StyleGuide = () => {
    //change the Boilarplate name to your specified name
    return (
        <div className='container-fluid bg-primaryColor-shade-300'>
            <header className=' py-5 px-5 logo flex items-center'>
                <div className='logo flex items-center gap-6'>
                    <div className='burger-menu xl:hidden'>
                        <HumbargerIcon />
                    </div>
                    <a href='#'>
                        <span className='brand-logo'>
                            <NitexLogo />
                        </span>
                    </a>
                    <span className='divider hidden xl:block'>
                        <CrossIcon />
                    </span>
                    <span className='hidden xl:block text-logo text-2xl text-primaryColor-shade-100 font-bold uppercase'>
                        Louis Vuitton
                    </span>
                </div>
                <div className='main-menu hidden xl:block ml-16 4xl:ml-28'>
                    <ul>
                        <li className='text-base text-primaryColor uppercase inline-block mr-6 4xl:mr-10 5xl:mr-14 active'>
                            <a href='#'>Home</a>
                        </li>
                        <li className='text-base text-primaryColor uppercase inline-block mr-6 4xl:mr-10 5xl:mr-14'>
                            <a href='#'>Moodboards</a>
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
                            <FavouriteIcon />
                        </span>
                        <span className='absolute top-[-9px] right-[-22px] text-sm text-white-shade-100 bg-primaryColor inline-block rounded-[20px] px-3 text-center'>
                            12
                        </span>
                    </div>
                    <div className='w-[40px] h-[40px] rounded-full bg-primaryColor-shade-300 p-2 relative flex items-center justify-center cursor-pointer'>
                        <span>
                            <NotificationIcon />
                        </span>
                        <span className='absolute top-[-9px] right-[-22px] text-sm text-white-shade-100 bg-primaryColor inline-block rounded-[20px] px-3 text-center'>
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

            <div className='body-container p-4'>
                <div className='max-w-[840px] mx-auto'>
                    <div className='filter'>
                        <div className='flex flex-col lg:flex-row lg:items-center justify-between mb-5 gap-6'>
                            <div className='text-base'>
                                <h4 className='font-bold'>Profile</h4>
                            </div>
                        </div>
                    </div>
                    <div className='flex mt-8'>
                        <span className='w-[138px] h-[138px] cursor-pointer rounded-full overflow-hidden inline-block relative'>
                            <img
                                src={User}
                                alt=''
                                className='object-cover w-full h-full'
                            />
                            <span className='absolute bottom-0 left-0 bg-[#D3D3D3] block w-full text-center py-2'>
                                <EditDarkIcon className='inline-block' />
                            </span>
                        </span>
                        <div className='ml-5 mt-7'>
                            <div className='flex'>
                                <div className='ml-14'>
                                    <p className=' text-primaryColor-shade-100'>
                                        User Name
                                    </p>
                                    <p className='text-xl font-bold'>
                                        shiblysaikat
                                    </p>
                                </div>
                                <div className='ml-14'>
                                    <p className=' text-primaryColor-shade-100'>
                                        Email Address
                                    </p>
                                    <p className='text-xl font-bold'>
                                        shiblysaikat@nitex.info
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='pt-14'>
                        <div className='flex mb-5'>
                            <p className='w-[320px] text-primaryColor-shade-100'>
                                Full Name
                            </p>
                            <input
                                type='text'
                                className='form-field'
                                placeholder='e.g. shiblysaikat@gmail.com'
                            />
                        </div>
                        <div className='flex mb-5'>
                            <p className='w-[320px] text-primaryColor-shade-100'>
                                Role
                            </p>
                            <input
                                type='text'
                                className='form-field'
                                placeholder='e.g. shiblysaikat@gmail.com'
                            />
                        </div>
                        <div className='flex mb-5'>
                            <p className='w-[320px] text-primaryColor-shade-100'>
                                Contact Number
                            </p>
                            <input
                                type='text'
                                className='form-field'
                                placeholder='e.g. shiblysaikat@gmail.com'
                            />
                        </div>
                        <div className='flex mb-5'>
                            <p className='w-[320px] text-primaryColor-shade-100'>
                                Brand Name
                            </p>
                            <input
                                type='text'
                                className='form-field'
                                placeholder='e.g. shiblysaikat@gmail.com'
                            />
                        </div>
                        <div className='flex mb-5'>
                            <p className='w-[320px] text-primaryColor-shade-100'></p>
                            <button className='btn w-full'>
                                <span className='font-bold'>Save </span>Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StyleGuide //change the Boilarplate name to your specified name
