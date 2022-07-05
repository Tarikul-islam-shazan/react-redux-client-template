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
                <div className='max-w-[930px] mx-auto'>
                    <div className='filter'>
                        <div className='flex flex-col lg:flex-row lg:items-center justify-between mb-5 gap-6'>
                            <div className='text-base'>
                                <h4 className='font-bold'>F.A.Q.s</h4>
                            </div>
                            <div className='flex flex-wrap justify-end gap-4 lg:gap-2'>
                                <div className='flex items-center overflow-x-auto gap-2'>
                                    <div className=''>
                                        <div class='input-group flex items-center'>
                                            <input
                                                type='text'
                                                class='form-field bg-transparent border border-primaryColor ww-[200px] lg:w-[380px] placeholder:text-primaryColor'
                                                id='text'
                                                placeholder='Search ...'
                                                name='text'
                                            />
                                            <button
                                                type='button'
                                                className='btn bg-primaryColor px-5 font-normal border border-primaryColor text-primaryColor'
                                            >
                                                <SearchIconWhite />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Accordion */}
                    <div
                        class='common-accordion accordion'
                        id='accordionExample'
                    >
                        <div class='accordion-item  border border-gray-200'>
                            <h2 class='accordion-header mb-0' id='headingOne'>
                                <button
                                    class='
        accordion-button
        relative
        flex
        items-center
        w-full
        py-4
        px-5
        text-base text-left
        border-0
        rounded-none
        transition
        focus:outline-none
        font-bold
        uppercase
      '
                                    type='button'
                                    data-bs-toggle='collapse'
                                    data-bs-target='#collapseOne'
                                    aria-expanded='true'
                                    aria-controls='collapseOne'
                                >
                                    More Info
                                </button>
                            </h2>
                            <div
                                id='collapseOne'
                                class='accordion-collapse collapse show'
                                aria-labelledby='headingOne'
                                data-bs-parent='#accordionExample'
                            >
                                <div class='accordion-body py-4 px-5'>
                                    <p className='leading-10'>
                                        Why do we use it? It is a long
                                        established fact that a reader will be
                                        distracted by the readable content of a
                                        page when looking at its layout. The
                                        point of using Lorem Ipsum is that it
                                        has a more-or-less normal distribution
                                        of letters, as opposed to using 'Content
                                        here, content here', making it look like
                                        readable English. Many desktop
                                        publishing packages and web page editors
                                        now use Lorem Ipsum as their default
                                        model text, and a search for 'lorem
                                        ipsum' will uncover many web sites still
                                        in their infancy. Various versions have
                                        evolved over the years, sometimes by
                                        accident, sometimes on purpose (injected
                                        humour and the like).
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class='accordion-item border border-gray-200'>
                            <h2 class='accordion-header mb-0' id='headingTwo'>
                                <button
                                    class='
        accordion-button
        collapsed
        relative
        flex
        items-center
        w-full
        py-4
        px-5
        text-base text-left
        border-0
        rounded-none
        transition
        focus:outline-none
        font-bold
        uppercase
      '
                                    type='button'
                                    data-bs-toggle='collapse'
                                    data-bs-target='#collapseTwo'
                                    aria-expanded='false'
                                    aria-controls='collapseTwo'
                                >
                                    Additional Info
                                </button>
                            </h2>
                            <div
                                id='collapseTwo'
                                class='accordion-collapse collapse'
                                aria-labelledby='headingTwo'
                                data-bs-parent='#accordionExample'
                            >
                                <div class='accordion-body py-4 px-5'>
                                    <p className='leading-10'>
                                        Why do we use it? It is a long
                                        established fact that a reader will be
                                        distracted by the readable content of a
                                        page when looking at its layout. The
                                        point of using Lorem Ipsum is that it
                                        has a more-or-less normal distribution
                                        of letters, as opposed to using 'Content
                                        here, content here', making it look like
                                        readable English. Many desktop
                                        publishing packages and web page editors
                                        now use Lorem Ipsum as their default
                                        model text, and a search for 'lorem
                                        ipsum' will uncover many web sites still
                                        in their infancy. Various versions have
                                        evolved over the years, sometimes by
                                        accident, sometimes on purpose (injected
                                        humour and the like).
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class='accordion-item  border border-gray-200'>
                            <h2 class='accordion-header mb-0' id='headingThree'>
                                <button
                                    class='
        accordion-button
        collapsed
        relative
        flex
        items-center
        w-full
        py-4
        px-5
        text-base text-gray-800 text-left
        border-0
        rounded-none
        transition
        focus:outline-none
        font-bold
        uppercase
      '
                                    type='button'
                                    data-bs-toggle='collapse'
                                    data-bs-target='#collapseThree'
                                    aria-expanded='false'
                                    aria-controls='collapseThree'
                                >
                                    Extra Info
                                </button>
                            </h2>
                            <div
                                id='collapseThree'
                                class='accordion-collapse collapse'
                                aria-labelledby='headingThree'
                                data-bs-parent='#accordionExample'
                            >
                                <div class='accordion-body py-4 px-5'>
                                    <p className='leading-10'>
                                        Why do we use it? It is a long
                                        established fact that a reader will be
                                        distracted by the readable content of a
                                        page when looking at its layout. The
                                        point of using Lorem Ipsum is that it
                                        has a more-or-less normal distribution
                                        of letters, as opposed to using 'Content
                                        here, content here', making it look like
                                        readable English. Many desktop
                                        publishing packages and web page editors
                                        now use Lorem Ipsum as their default
                                        model text, and a search for 'lorem
                                        ipsum' will uncover many web sites still
                                        in their infancy. Various versions have
                                        evolved over the years, sometimes by
                                        accident, sometimes on purpose (injected
                                        humour and the like).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StyleGuide //change the Boilarplate name to your specified name
