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
                <div className='max-w-[620px] mx-auto'>
                    <div className='filter'>
                        <div className='flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-6'>
                            <div className='text-base'>
                                <h4 className='font-bold'>Report Issue</h4>
                            </div>
                            <div className=''>
                                <a href='#' className='text-xl underline'>
                                    F.A.Q.s
                                </a>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='input-group'>
                            <label htmlFor='text' className='label'>
                                Let us know what issue you are facing
                            </label>
                            <textarea
                                name=''
                                id=''
                                cols='30'
                                rows='4'
                                className='form-field h-auto'
                                placeholder='e.g. shiblysaikat@gmail.com'
                            ></textarea>
                        </div>

                        <div className='mt-8'>
                            <label htmlFor='text' className='label'>
                                Attach file
                            </label>
                            <div className='input-group'>
                                <div className='file'>
                                    <input id='input-file' type='file' />
                                    <label
                                        htmlFor='input-file'
                                        className='w-full justify-between'
                                    >
                                        <span className='mr-4'>
                                            Browse Files
                                        </span>
                                        <UploadIcon />
                                    </label>
                                </div>
                            </div>
                            <button
                                type='button'
                                data-bs-toggle='modal'
                                data-bs-target='#AddTeam'
                                className='btn w-full mt-8'
                            >
                                Invite
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StyleGuide //change the Boilarplate name to your specified name
