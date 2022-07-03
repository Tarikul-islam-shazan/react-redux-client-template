import React from 'react'
import SelectComponent from '../../../app/common/SelectComponent'
import SliderWrapper from '../../../app/common/SliderWrapper'
import { ReactComponent as UploadIcon } from '../../images/upload.svg'
import { ReactComponent as FilterIcon } from '../../images/filter.svg'
import { ReactComponent as CloseIcon } from '../../images/close.svg'
import { ReactComponent as Favourite } from '../../images/favourite.svg'
import { ReactComponent as SearchIconWhite } from '../../images/search-white.svg'
import User from '../../images/user.jpg'
import { ReactComponent as PlusIcon } from '../../images/plus.svg'
import { ReactComponent as SearchIcon } from '../../images/search.svg'
// import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';

const StyleGuide = () => {
    //change the Boilarplate name to your specified name
    return (
        <div className='container p-10 space-y-16'>
            <div>
                <h2 className='mb-4'>Modal & Buttons</h2>
                <div className='grid grid-cols-4 gap-5'>
                    <button
                        type='button'
                        className='btn'
                        data-bs-toggle='modal'
                        data-bs-target='#exampleModalCenter'
                    >
                        Vertically centered modal
                    </button>
                    <button
                        type='button'
                        className='btn'
                        data-bs-toggle='modal'
                        data-bs-target='#ActivatedSoon'
                    >
                        Activated Soon
                    </button>
                    <button
                        type='button'
                        className='btn flex justify-between items-center'
                    >
                        <span>Login Now</span>
                        <span className='ml-2'>
                            <svg
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M21 12L14 19M3 12H21H3ZM21 12L14 5L21 12Z'
                                    stroke='#F5F5F5'
                                    stroke-width='1.5'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                            </svg>
                        </span>
                    </button>
                    <button
                        type='button'
                        className='btn flex justify-between items-center'
                    >
                        <span>
                            Ask <strong>Collection</strong>
                        </span>
                        <span className='ml-2'>
                            <svg
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M21 12L14 19M3 12H21H3ZM21 12L14 5L21 12Z'
                                    stroke='#F5F5F5'
                                    stroke-width='1.5'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                            </svg>
                        </span>
                    </button>
                    <button
                        type='button'
                        className='btn w-full bg-transparent font-normal border border-primaryColor text-primaryColor'
                    >
                        Close
                    </button>
                    <button
                        type='button'
                        className='btn bg-transparent font-normal border border-primaryColor text-primaryColor flex justify-between items-center'
                    >
                        <span>Sample</span>
                        <span className='ml-2'>
                            <UploadIcon />
                        </span>
                    </button>
                    <div className='input-group'>
                        <div className='file'>
                            <input id='input-file' type='file' />
                            <label
                                htmlFor='input-file'
                                className='w-full justify-between'
                            >
                                <span className='mr-4'>Browse Files</span>
                                <svg
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M3 14V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V14'
                                        stroke='#282828'
                                        stroke-width='1.5'
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                    />
                                    <path
                                        d='M12 3L17 8.44444M12 17V3V17ZM12 3L7 8.44446L12 3Z'
                                        stroke='#282828'
                                        stroke-width='1.5'
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                    />
                                </svg>
                            </label>
                        </div>
                    </div>
                    <div className='input-group'>
                        <div className='file'>
                            <input id='input-file' type='file' />
                            <label
                                htmlFor='input-file'
                                className='w-full justify-between !border !border-solid'
                            >
                                <span className='mr-4'>Upload</span>
                                <UploadIcon />
                            </label>
                        </div>
                    </div>
                </div>
                <button
                    type='button'
                    className='btn bg-transparent px-5 font-normal border border-primaryColor text-primaryColor'
                >
                    <FilterIcon />
                </button>

                {/*Forgot Password Modal*/}
                <div
                    className='modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto'
                    id='exampleModalCenter'
                    tabIndex='-1'
                    aria-labelledby='exampleModalCenterTitle'
                    aria-modal='true'
                    role='dialog'
                >
                    <div className='modal-dialog max-w-[680px] modal-dialog-centered relative w-auto pointer-events-none'>
                        <div className='modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding outline-none text-current'>
                            <div className='modal-header flex flex-shrink-0 items-center justify-between bg-primaryColor-shade-300 p-4'>
                                <h5
                                    className='text-xl font-bold leading-normal text-primaryColor uppercase'
                                    id='exampleModalScrollableLabel'
                                >
                                    Forget Password
                                </h5>
                                <button
                                    type='button'
                                    className='btn-close box-content w-4 h-4 p-1 !mr-0.5 text-black border-none  opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline'
                                    data-bs-dismiss='modal'
                                    aria-label='Close'
                                ></button>
                            </div>
                            <div className='modal-body relative p-4'>
                                <div className='input-group'>
                                    <label htmlFor='email' className='label'>
                                        Email address *
                                    </label>
                                    <input
                                        type='email'
                                        className='form-field bg-primaryColor-shade-300'
                                        id='email'
                                        placeholder='e.g. shiblysaikat@gmail.com'
                                        name='email'
                                    />
                                </div>
                                <p className='text-xl'>
                                    A recovery link has been sent to your email
                                    address. <br />
                                    By clicking the link, you can change your
                                    password.{' '}
                                </p>
                            </div>
                            <div className='modal-footer p-4'>
                                <button
                                    type='button'
                                    className='btn w-full'
                                    data-bs-toggle='modal'
                                    data-bs-target='#exampleModalCenter'
                                >
                                    Receive Recovery Link
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/*Activated Soon Modal*/}
                <div
                    className='modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto'
                    id='ActivatedSoon'
                    tabIndex='-1'
                    aria-labelledby='exampleModalCenterTitle'
                    aria-modal='true'
                    role='dialog'
                >
                    <div className='modal-dialog max-w-[1840px] mx-4 5xl:mx-auto overflow-hidden modal-dialog-centered relative w-auto pointer-events-none'>
                        <div className='modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding outline-none text-current'>
                            <div className='modal-header flex flex-shrink-0 items-center justify-between p-8 pb-0'>
                                <button
                                    type='button'
                                    className='btn-close box-content w-4 h-4 p-1 text-black border-none  opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline'
                                    data-bs-dismiss='modal'
                                    aria-label='Close'
                                ></button>
                            </div>
                            <div className='modal-body relative p-4'>
                                <div className='px-4 sm:px-10 xl:px-20 pb-12'>
                                    <h2 className='text-4xl sm:text-[44px] text-primaryColor uppercase font-bold mb-8'>
                                        Your Account will be activated Soon.
                                    </h2>
                                    <div className='space-y-4'>
                                        <p className='text-xl'>
                                            Welcome! Sir{' '}
                                            <strong className='uppercase'>
                                                Kavin
                                            </strong>
                                            . Thanks for joining us!
                                        </p>
                                        <p className='text-xl'>
                                            This is{' '}
                                            <strong className='uppercase'>
                                                Saikat
                                            </strong>
                                            , a Business Evangelist dedicated to
                                            you and your brand.{' '}
                                        </p>
                                        <p className='text-xl'>
                                            We will contact you{' '}
                                            <strong>within 24 hours </strong>
                                        </p>
                                        <p className='text-xl'>
                                            While waiting, you can check out how
                                            we’re empowering +50 brands from
                                            across the world.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='modal-footer pb-0 lg:pb-4 p-4 bg-white-shade-100'>
                                <div className='px-4 sm:px-10 xl:pl-20 pt-12 flex flex-col lg:flex-row justify-between'>
                                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:w-[54%] gap-12 pb-12'>
                                        <div className='flex items-center gap-6'>
                                            <span>
                                                <span className='w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center'>
                                                    <svg
                                                        width='24'
                                                        height='24'
                                                        viewBox='0 0 24 24'
                                                        fill='none'
                                                        xmlns='http://www.w3.org/2000/svg'
                                                    >
                                                        <path
                                                            d='M17.4 13.8758C16.425 12.6758 16.875 11.4008 17.7 10.2758C18.75 9.07576 18.75 7.20077 18.75 7.20077V4.87576C18.75 4.87576 12.3 4.42576 11.625 8.55076C10.875 4.42576 4.5 4.87576 4.5 4.87576V7.20077C4.5 7.20077 4.5 9.07576 5.55 10.2758C6.375 11.4008 6.825 12.6758 5.85 13.8758C4.425 15.6758 3.975 19.4258 6.525 22.4258H11.55H11.625H16.65C19.275 19.4258 18.9 15.6758 17.4 13.8758Z'
                                                            stroke='#282828'
                                                            stroke-width='1.5'
                                                            stroke-linecap='round'
                                                            stroke-linejoin='round'
                                                        />
                                                        <path
                                                            d='M10.348 6.4502C10.348 6.4502 8.09796 9.45019 9.14796 10.3502C9.82296 10.8752 11.623 8.25019 11.623 8.25019'
                                                            stroke='#282828'
                                                            stroke-width='1.5'
                                                            stroke-linecap='round'
                                                            stroke-linejoin='round'
                                                        />
                                                        <path
                                                            d='M13.425 6.4502C13.425 6.4502 15.675 9.45019 14.625 10.3502C13.95 10.8752 12.15 8.25019 12.15 8.25019'
                                                            stroke='#282828'
                                                            stroke-width='1.5'
                                                            stroke-linecap='round'
                                                            stroke-linejoin='round'
                                                        />
                                                        <path
                                                            d='M18 4.5V1.5'
                                                            stroke='#282828'
                                                            stroke-width='1.5'
                                                            stroke-linecap='round'
                                                            stroke-linejoin='round'
                                                        />
                                                        <path
                                                            d='M5.25 4.5V1.5'
                                                            stroke='#282828'
                                                            stroke-width='1.5'
                                                            stroke-linecap='round'
                                                            stroke-linejoin='round'
                                                        />
                                                    </svg>
                                                </span>
                                            </span>
                                            <span>
                                                100s of designs every week
                                            </span>
                                        </div>
                                        <div className='flex items-center gap-6'>
                                            <span>
                                                <span className='w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center'>
                                                    <svg
                                                        width='26'
                                                        height='20'
                                                        viewBox='0 0 26 20'
                                                        fill='none'
                                                        xmlns='http://www.w3.org/2000/svg'
                                                    >
                                                        <path
                                                            d='M22.8182 1H3.18182C1.97683 1 1 1.97683 1 3.18182V16.2727C1 17.4777 1.97683 18.4545 3.18182 18.4545H22.8182C24.0232 18.4545 25 17.4777 25 16.2727V3.18182C25 1.97683 24.0232 1 22.8182 1Z'
                                                            stroke='#282828'
                                                            stroke-width='1.5'
                                                            stroke-linecap='round'
                                                            stroke-linejoin='round'
                                                        />
                                                        <path
                                                            d='M1 7.54492H25'
                                                            stroke='#282828'
                                                            stroke-width='1.5'
                                                            stroke-linecap='round'
                                                            stroke-linejoin='round'
                                                        />
                                                    </svg>
                                                </span>
                                            </span>
                                            <span>
                                                Up to 150 days Credit line
                                            </span>
                                        </div>
                                        <div className='flex items-center gap-6'>
                                            <span>
                                                <span className='w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center'>
                                                    <svg
                                                        width='26'
                                                        height='26'
                                                        viewBox='0 0 26 26'
                                                        fill='none'
                                                        xmlns='http://www.w3.org/2000/svg'
                                                    >
                                                        <path
                                                            d='M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z'
                                                            stroke='#282828'
                                                            stroke-width='1.5'
                                                            stroke-linecap='round'
                                                            stroke-linejoin='round'
                                                        />
                                                        <path
                                                            d='M12.9991 5.80078V13.0008L17.7991 15.4008'
                                                            stroke='#282828'
                                                            stroke-width='1.5'
                                                            stroke-linecap='round'
                                                            stroke-linejoin='round'
                                                        />
                                                    </svg>
                                                </span>
                                            </span>
                                            <span>
                                                4-6 wks production lead time
                                            </span>
                                        </div>
                                        <div className='flex items-center gap-6'>
                                            <span>
                                                <span className='w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center'>
                                                    <svg
                                                        width='24'
                                                        height='24'
                                                        viewBox='0 0 24 24'
                                                        fill='none'
                                                        xmlns='http://www.w3.org/2000/svg'
                                                    >
                                                        <path
                                                            d='M3 9C3 7.89543 3.89543 7 5 7H19C20.1046 7 21 7.89543 21 9V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V9Z'
                                                            stroke='#282828'
                                                            stroke-width='1.5'
                                                            stroke-linecap='round'
                                                            stroke-linejoin='round'
                                                        />
                                                        <path
                                                            d='M8 10V6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6V9.6888'
                                                            stroke='#282828'
                                                            stroke-width='1.5'
                                                            stroke-linecap='round'
                                                            stroke-linejoin='round'
                                                        />
                                                    </svg>
                                                </span>
                                            </span>
                                            <span>
                                                Order as low as 250 units
                                            </span>
                                        </div>
                                        <div className='flex items-center gap-6'>
                                            <span>
                                                <span className='w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center'>
                                                    <svg
                                                        width='26'
                                                        height='24'
                                                        viewBox='0 0 26 24'
                                                        fill='none'
                                                        xmlns='http://www.w3.org/2000/svg'
                                                    >
                                                        <path
                                                            d='M12.9995 8.99968C12.9995 6.87803 12.1567 4.84328 10.6565 3.34305C9.15623 1.84282 7.12149 1 4.99984 1H1V3.66656C1 5.78821 1.84282 7.82296 3.34305 9.32319C4.84328 10.8234 6.87803 11.6662 8.99968 11.6662H12.9995'
                                                            stroke='#282828'
                                                            stroke-width='1.5'
                                                            stroke-linecap='round'
                                                            stroke-linejoin='round'
                                                        />
                                                        <path
                                                            d='M13.0005 14.3327C13.0005 12.211 13.8433 10.1763 15.3435 8.67606C16.8438 7.17583 18.8785 6.33301 21.0002 6.33301H25V7.66629C25 9.78793 24.1572 11.8227 22.657 13.3229C21.1567 14.8231 19.122 15.666 17.0003 15.666H13.0005'
                                                            stroke='#282828'
                                                            stroke-width='1.5'
                                                            stroke-linecap='round'
                                                            stroke-linejoin='round'
                                                        />
                                                        <path
                                                            d='M13.0005 22.3328V9'
                                                            stroke='#282828'
                                                            stroke-width='1.5'
                                                            stroke-linecap='round'
                                                            stroke-linejoin='round'
                                                        />
                                                    </svg>
                                                </span>
                                            </span>
                                            <span>
                                                100% Sustainable materials
                                            </span>
                                        </div>
                                    </div>
                                    <div className='lg:w-[40%] flex flex-col xl:flex-row xl:items-end relative'>
                                        <div className='space-y-5 pb-8 relative z-10 '>
                                            <div>
                                                <a href='mailto:saikat@nitex.info'>
                                                    <div className='flex gap-3'>
                                                        <span>
                                                            <svg
                                                                width='24'
                                                                height='24'
                                                                viewBox='0 0 24 24'
                                                                fill='none'
                                                                xmlns='http://www.w3.org/2000/svg'
                                                            >
                                                                <path
                                                                    d='M20 5H4C3.44772 5 3 5.44772 3 6V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V6C21 5.44772 20.5523 5 20 5Z'
                                                                    stroke='#282828'
                                                                    stroke-width='1.5'
                                                                    stroke-linecap='round'
                                                                    stroke-linejoin='round'
                                                                />
                                                                <path
                                                                    d='M20 5.5L12 13L4 5.5'
                                                                    stroke='#282828'
                                                                    stroke-width='1.5'
                                                                    stroke-linecap='round'
                                                                    stroke-linejoin='round'
                                                                />
                                                            </svg>
                                                        </span>
                                                        <span>
                                                            saikat@nitex.info
                                                        </span>
                                                    </div>
                                                </a>
                                            </div>
                                            <div>
                                                <a href='tel:+88 015 21 300 845'>
                                                    <div className='flex gap-3'>
                                                        <span>
                                                            <svg
                                                                width='24'
                                                                height='24'
                                                                viewBox='0 0 24 24'
                                                                fill='none'
                                                                xmlns='http://www.w3.org/2000/svg'
                                                            >
                                                                <path
                                                                    d='M3.51089 2L7.15002 2.13169C7.91653 2.15942 8.59676 2.64346 8.89053 3.3702L9.96656 6.03213C10.217 6.65159 10.1496 7.35837 9.78693 7.91634L8.40831 10.0375C9.22454 11.2096 11.4447 13.9558 13.7955 15.5633L15.5484 14.4845C15.9939 14.2103 16.5273 14.1289 17.0314 14.2581L20.5161 15.1517C21.4429 15.3894 22.0674 16.2782 21.9942 17.2552L21.7705 20.2385C21.6919 21.2854 20.8351 22.1069 19.818 21.9887C6.39245 20.4276 -1.48056 1.99997 3.51089 2Z'
                                                                    stroke='#282828'
                                                                    stroke-width='1.5'
                                                                    stroke-linecap='round'
                                                                    stroke-linejoin='round'
                                                                />
                                                            </svg>
                                                        </span>
                                                        <span>
                                                            +88 015 21 300 845
                                                        </span>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <img
                                            src='./images/person.png'
                                            alt=''
                                            className='lg:absolute lg:max-h-[630px] lg:right-[-72px] lg:bottom-[-16px] xl:pl-14 4xl:pl-0'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h2 className='mb-8'>Text Boxes & Drop-downs</h2>
                <div className='flex flex-wrap gap-5'>
                    <div className='flex'>
                        <input
                            type='text'
                            className='form-field border border-primaryColor h-[40px] p-2 px-4'
                            id='name'
                            placeholder='Search ...'
                            name='name'
                        />
                        <button type='button' className='btn h-[40px] p-2'>
                            <SearchIconWhite />
                        </button>
                    </div>
                    <div className='flex'>
                        <input
                            type='text'
                            className='form-field w-auto border border-primaryColor  p-2 px-4'
                            id='name'
                            placeholder='Search ...'
                            name='name'
                        />
                        <button
                            type='button'
                            className='btn w-[60px] flex items-center justify-center p-2'
                        >
                            <SearchIconWhite />
                        </button>
                    </div>
                    <div className='form-group flex flex-wrap gap-5'>
                        <div className='input-group'>
                            <label htmlFor='email' className='label'>
                                Email address *
                            </label>
                            <input
                                type='email'
                                className='form-field border-error'
                                id='email'
                                placeholder='Enter email'
                                name='email'
                            />
                            <span className='text-error text-sm'>
                                Invalid Email Address
                            </span>
                        </div>
                        <div className='input-group'>
                            <label htmlFor='name' className='label'>
                                Name *
                            </label>
                            <input
                                type='text'
                                className='form-field'
                                id='name'
                                placeholder='Enter Name'
                                name='name'
                            />
                        </div>
                        <div className='input-group'>
                            <label htmlFor='email' className='label'>
                                Password *
                            </label>
                            <div className='relative'>
                                <input
                                    type='password'
                                    className='form-field pr-12'
                                    id='password'
                                    placeholder='Enter password'
                                    name='password'
                                />
                                <span className='absolute cursor-pointer right-[17px] top-[17px]'>
                                    <svg
                                        width='24'
                                        height='24'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            d='M1 12C1 12 5 4 12 4C19 4 23 12 23 12'
                                            stroke='#282828'
                                            stroke-width='1.5'
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                        />
                                        <path
                                            d='M1 12C1 12 5 20 12 20C19 20 23 12 23 12'
                                            stroke='#282828'
                                            stroke-width='1.5'
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                        />
                                        <path
                                            d='M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z'
                                            stroke='#282828'
                                            stroke-width='1.5'
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div className='input-group'>
                            <label htmlFor='email' className='label'>
                                Password *
                            </label>
                            <div className='relative'>
                                <input
                                    type='password'
                                    className='form-field pr-12'
                                    id='password'
                                    placeholder='Enter password'
                                    name='password'
                                />
                                <span className='absolute cursor-pointer right-[17px] top-[17px]'>
                                    <svg
                                        width='24'
                                        height='24'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            d='M2 2L22 22'
                                            stroke='#282828'
                                            stroke-width='1.5'
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                        />
                                        <path
                                            d='M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884L6.71277 6.7226Z'
                                            stroke='#282828'
                                            stroke-width='1.5'
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                        />
                                        <path
                                            d='M14 14.2357C13.4692 14.7107 12.7684 14.9996 12 14.9996C10.3431 14.9996 9 13.6565 9 11.9996C9 11.1759 9.33193 10.4298 9.86932 9.8877'
                                            stroke='#282828'
                                            stroke-width='1.5'
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div className='input-group'>
                            <label htmlFor='search' className='label'>
                                Search *
                            </label>
                            <div className='relative'>
                                <input
                                    type='text'
                                    className='form-field pr-12'
                                    id='search'
                                    placeholder='Search ...'
                                    name='search'
                                />
                                <span className='absolute cursor-pointer right-[17px] top-[17px]'>
                                    <svg
                                        width='24'
                                        height='24'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            d='M17 17L22 22L17 17ZM19.5 10.75C19.5 15.5825 15.5825 19.5 10.75 19.5C5.91751 19.5 2 15.5825 2 10.75C2 5.91751 5.91751 2 10.75 2C15.5825 2 19.5 5.91751 19.5 10.75Z'
                                            stroke='#282828'
                                            stroke-width='1.5'
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div className='input-group'>
                            <label className='label'>
                                Select
                            </label>
                            <SelectComponent
                                options={[
                                    { label: 'Country', value: 'country' },
                                    { label: 'Country 1', value: 'country1' },
                                    { label: 'Country 2', value: 'country2' }
                                ]}
                            />
                        </div>
                        <div className="p-5 bg-white">
                            <div className="input-group select-bg-gray-style w-full sm:w-[182px]">
                                <label className='label'>
                                    Select
                                </label>
                                <SelectComponent
                                    options={[
                                        {label: "See Samples", value: "NITEX/BO/1212"},
                                        {label: "Country 1", value: "NITEX/BO/1212"},
                                        {label: "Country 2", value: "NITEX/BO/1212"}
                                    ]}
                                />
                            </div>
                        </div>
                        <div className="input-group bordered-style w-full sm:w-[182px]">
                            <label className='label'>
                                Select
                            </label>
                            <SelectComponent
                                options={[
                                    {label: "See Samples", value: "NITEX/BO/1212"},
                                    {label: "Country 1", value: "NITEX/BO/1212"},
                                    {label: "Country 2", value: "NITEX/BO/1212"}
                                ]}
                            />
                        </div>
                        <div className='input-group'>
                            <label htmlFor='search' className='label'>
                                Textarea
                            </label>
                            <textarea
                                name=''
                                id=''
                                cols='30'
                                rows='4'
                                className='form-field h-auto'
                                placeholder='Write Here ...'
                            ></textarea>
                        </div>
                        <div class='input-group flex items-center'>
                            <input
                                type='text'
                                class='form-field bg-transparent border border-primaryColor w-[380px] placeholder:text-primaryColor'
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
            <div>
                <h2 className='mb-8'>Others</h2>

                <div className='gspace-x-4 space-y-4'>
                    <div className='flex flex-wrap items-center justify-end gap-4 lg:gap-2'>
                        <div className='flex mr-4'>
                            <div className='flex'>
                                <span className='w-[40px] h-[40px] cursor-pointer border-2 border-white rounded-full overflow-hidden inline-block ml-[-10px]'>
                                    <img
                                        src={User}
                                        alt=''
                                        className='object-cover w-full h-full'
                                    />
                                </span>
                                <span className='w-[40px] h-[40px] cursor-pointer border-2 border-white rounded-full overflow-hidden inline-block ml-[-10px]'>
                                    <img
                                        src={User}
                                        alt=''
                                        className='object-cover w-full h-full'
                                    />
                                </span>
                                <span className='w-[40px] h-[40px] cursor-pointer border-2 border-white rounded-full overflow-hidden inline-block ml-[-10px]'>
                                    <img
                                        src={User}
                                        alt=''
                                        className='object-cover w-full h-full'
                                    />
                                </span>
                                <span className='w-[40px] h-[40px] cursor-pointer bg-white font-semibold flex items-center justify-center border-2 border-white rounded-full overflow-hidden inline-block ml-[-10px]'>
                                    <span>4+</span>
                                </span>
                            </div>
                            <span
                                data-bs-toggle='modal'
                                data-bs-target='#AddTeam'
                                className='w-[40px] h-[40px] cursor-pointer bg-primaryColor font-semibold flex items-center justify-center border-2 border-white rounded-full overflow-hidden inline-block ml-[5px]'
                            >
                                <PlusIcon />
                            </span>
                        </div>
                        <div className='flex items-center overflow-x-auto gap-2'>
                            <button
                                type='button'
                                className='btn bg-transparent px-5 font-normal border border-primaryColor text-primaryColor'
                            >
                                <SearchIcon />
                            </button>
                            <button
                                type='button'
                                className='btn bg-transparent px-5 font-normal border border-primaryColor text-primaryColor'
                            >
                                <FilterIcon />
                            </button>
                        </div>
                    </div>

                    <div className='mt-6 space-y-6'>
                        <div className='flex items-start'>
                            <span>
                                <input
                                    type='radio'
                                    name='Sortby'
                                    id='NewestFirst'
                                />
                            </span>
                            <label
                                htmlFor='NewestFirst'
                                className='align-middle pl-4 inline-block mt-[-3px]'
                            >
                                Newest First
                            </label>
                        </div>
                        <div className='flex items-start'>
                            <span>
                                <input
                                    type='radio'
                                    name='Sortby'
                                    id='OldestFirst'
                                />
                            </span>
                            <label
                                htmlFor='OldestFirst'
                                className='align-middle pl-4 inline-block mt-[-3px]'
                            >
                                Oldest First
                            </label>
                        </div>
                    </div>
                    <div className='mt-6 space-y-6'>
                        <div className='flex items-start'>
                            <span>
                                <input type='checkbox' id='Summer' />
                            </span>
                            <label
                                htmlFor='Summer'
                                className='align-middle pl-4 inline-block mt-[-3px]'
                            >
                                Summer
                            </label>
                        </div>
                        <div className='flex items-start'>
                            <span>
                                <input type='checkbox' id='Winter' />
                            </span>
                            <label
                                htmlFor='Winter'
                                className='align-middle pl-4 inline-block mt-[-3px]'
                            >
                                Winter
                            </label>
                        </div>
                        <div className='flex items-start'>
                            <span>
                                <input type='checkbox' id='Autumn' />
                            </span>
                            <label
                                htmlFor='Autumn'
                                className='align-middle pl-4 inline-block mt-[-3px]'
                            >
                                Autumn
                            </label>
                        </div>
                        <div className='flex items-start'>
                            <span>
                                <input type='checkbox' id='Spring' />
                            </span>
                            <label
                                htmlFor='Spring'
                                className='align-middle pl-4 inline-block mt-[-3px]'
                            >
                                Spring
                            </label>
                        </div>
                    </div>

                    <div className='flex items-center gap-2'>
                        <div className='tag-badge'>
                            <span>Summer</span>
                            <span className='ml-6 cursor-pointer'>
                                <CloseIcon />
                            </span>
                        </div>
                        <div className='tag-badge'>
                            <span>Men</span>
                            <span className='ml-6 cursor-pointer'>
                                <CloseIcon />
                            </span>
                        </div>
                        <div className='tag-badge'>
                            <span>Newest</span>
                            <span className='ml-6 cursor-pointer'>
                                <CloseIcon />
                            </span>
                        </div>
                    </div>

                    <div className='flex gap-3 mb-2 xl:mb-0'>
                        <span className='badge bg-warning font-bold'>New</span>
                        <span className='badge bg-success'>Eco-Friendly</span>
                        <span className='badge bg-pending'>
                            requested for collection
                        </span>
                        <span className='badge bg-pending border border-primaryColor'>
                            requested for collection
                        </span>
                    </div>

                    {/*Favraoite */}
                    <div className='flex flex-wrap gap-5'>
                        <div className='favourite'>
                            <span className='mt-2'>
                                <Favourite />
                            </span>
                        </div>
                    </div>
                </div>

                {/*Slcik Carousel*/}
                <SliderWrapper>
                    <div>
                        <h3>1</h3>
                    </div>
                    <div>
                        <h3>2</h3>
                    </div>
                    <div>
                        <h3>3</h3>
                    </div>
                    <div>
                        <h3>3</h3>
                    </div>
                    <div>
                        <h3>3</h3>
                    </div>
                    <div>
                        <h3>3</h3>
                    </div>
                    <div>
                        <h3>4</h3>
                    </div>
                    <div>
                        <h3>5</h3>
                    </div>
                    <div>
                        <h3>6</h3>
                    </div>
                </SliderWrapper>
            </div>
        </div>
    )
}

export default StyleGuide //change the Boilarplate name to your specified name
