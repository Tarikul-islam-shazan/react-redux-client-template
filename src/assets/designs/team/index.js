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
import Pdf from '../../images/pdf.png'
import User from '../../images/user.jpg'

const StyleGuide = () => {
    //change the Boilarplate name to your specified name
    return (
        <div className='container-fluid bg-primaryColor-shade-300'>
            <header className='bg-white py-5 px-5 logo flex items-center'>
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
                <div className='filter'>
                    <div className='flex flex-col lg:flex-row lg:items-center justify-between mb-4 gap-6'>
                        <div className='text-base'>
                            <h4 className='font-bold'>My team</h4>
                        </div>
                        <div className='flex flex-wrap justify-end gap-4 lg:gap-2'>
                            <div className='flex items-center overflow-x-auto gap-2'>
                                <div className=''>
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

                                <button
                                    type='button'
                                    className='btn bg-transparent px-5 font-normal border border-primaryColor text-primaryColor'
                                >
                                    <FilterIcon />
                                </button>
                                <button
                                    type='button'
                                    className='btn bg-transparent font-normal border border-primaryColor text-primaryColor flex justify-between items-center'
                                >
                                    <span>Add new member</span>
                                    <span className='ml-4'>
                                        <PlusDarkIcon />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-wrap border-t border-primaryColor-shade-200 '>
                    <div className='w-full sm:w-2/4 border-r border-primaryColor-shade-200 height-without-filter'>
                        <div className='flex justify-between p-5 hover:bg-white'>
                            <div className='flex items-center'>
                                <span className='w-[40px] h-[40px] cursor-pointer rounded-full overflow-hidden inline-block '>
                                    <img
                                        src={User}
                                        alt=''
                                        className='object-cover w-full h-full'
                                    />
                                </span>
                                <div className='ml-5'>
                                    <p className='font-bold leading-6'>
                                        Shibly Saikat
                                    </p>
                                    <p className='leading-6'>
                                        shibly@gmail.com
                                    </p>
                                </div>
                            </div>
                            <div className='mr-8'>
                                <p className='leading-6'>Creator</p>
                            </div>
                        </div>
                        <div className='flex justify-between p-5 hover:bg-white'>
                            <div className='flex items-center'>
                                <span className='w-[40px] h-[40px] cursor-pointer rounded-full overflow-hidden inline-block '>
                                    <img
                                        src={User}
                                        alt=''
                                        className='object-cover w-full h-full'
                                    />
                                </span>
                                <div className='ml-5'>
                                    <p className='font-bold leading-6'>
                                        Shibly Saikat
                                    </p>
                                    <p className='leading-6'>
                                        shibly@gmail.com
                                    </p>
                                </div>
                            </div>
                            <div className='mr-8'>
                                <p className='leading-6'>Creator</p>
                            </div>
                        </div>
                        <div className='flex justify-between p-5 hover:bg-white'>
                            <div className='flex items-center'>
                                <span className='w-[40px] h-[40px] cursor-pointer rounded-full overflow-hidden inline-block '>
                                    <img
                                        src={User}
                                        alt=''
                                        className='object-cover w-full h-full'
                                    />
                                </span>
                                <div className='ml-5'>
                                    <p className='font-bold leading-6'>
                                        Shibly Saikat
                                    </p>
                                    <p className='leading-6'>
                                        shibly@gmail.com
                                    </p>
                                </div>
                            </div>
                            <div className='mr-8'>
                                <p className='leading-6'>Creator</p>
                            </div>
                        </div>
                        <div className='flex justify-between p-5 hover:bg-white'>
                            <div className='flex items-center'>
                                <span className='w-[40px] h-[40px] cursor-pointer rounded-full overflow-hidden inline-block '>
                                    <img
                                        src={User}
                                        alt=''
                                        className='object-cover w-full h-full'
                                    />
                                </span>
                                <div className='ml-5'>
                                    <p className='font-bold leading-6'>
                                        Shibly Saikat
                                    </p>
                                    <p className='leading-6'>
                                        shibly@gmail.com
                                    </p>
                                </div>
                            </div>
                            <div className='mr-8'>
                                <p className='leading-6'>Creator</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-full sm:w-2/4'></div>
                </div>
            </div>

            {/*Brief a Collection Modal*/}
            <div
                className='modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto'
                id='BriefCollection'
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
                                Brief a Collection
                            </h5>
                            <button
                                type='button'
                                className='btn-close box-content w-4 h-4 p-1 !mr-0.5 text-black border-none  opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline'
                                data-bs-dismiss='modal'
                                aria-label='Close'
                            ></button>
                        </div>
                        <div className='modal-body relative p-4'>
                            <div className='space-y-4'>
                                <div className='input-group flex items-center'>
                                    <label
                                        htmlFor='text'
                                        className='label w-[30%]'
                                    >
                                        Email address *
                                    </label>
                                    <input
                                        type='text'
                                        className='form-field bg-primaryColor-shade-300 w-[70%]'
                                        id='text'
                                        placeholder='Write Here ...'
                                        name='text'
                                    />
                                </div>
                                <div className='input-group flex items-center'>
                                    <label
                                        htmlFor='text'
                                        className='label w-[30%]'
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        name=''
                                        id=''
                                        cols='30'
                                        rows='4'
                                        className='form-field h-auto bg-primaryColor-shade-300 w-[70%]'
                                        placeholder='Write Here ...'
                                    ></textarea>
                                </div>
                                <div className='input-group flex items-center'>
                                    <label
                                        htmlFor='text'
                                        className='label w-[30%]'
                                    >
                                        Attach
                                    </label>
                                    <div className='file w-[70%]'>
                                        <input id='input-file' type='file' />
                                        <label
                                            htmlFor='input-file'
                                            className='w-full justify-between'
                                        >
                                            <span className='mr-4'>
                                                Browse Files
                                            </span>
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
                            </div>
                            <div className='mt-14'>
                                <div className='flex justify-between items-center mb-5'>
                                    <h5 className='text-xl font-bold leading-normal text-primaryColor'>
                                        Brief a Collection
                                    </h5>
                                    <span className='text-base'>4 files</span>
                                </div>
                                <div className='flex flex-col'>
                                    <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
                                        <div className='py-2 inline-block min-w-full sm:px-6 lg:px-8'>
                                            <div className='overflow-hidden'>
                                                <table className='min-w-full'>
                                                    <thead className='bg-white'>
                                                        <tr>
                                                            <th
                                                                scope='col'
                                                                className='w-[100px] text-xl font-normal bg-white-shade-100 px-6 py-4 text-left first:border-r border-primaryColor-shade-200'
                                                            ></th>
                                                            <th
                                                                scope='col'
                                                                className='text-xl font-normal bg-white-shade-100 px-6 py-4 text-left first:border-r border-primaryColor-shade-200'
                                                            >
                                                                File
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className='even:bg-white-shade-100'>
                                                            <td className='text-base font-normal px-6 py-6 whitespace-nowrap first:border-r border-primaryColor-shade-200'>
                                                                <span className='cursor-pointer'>
                                                                    <svg
                                                                        width='24'
                                                                        height='24'
                                                                        viewBox='0 0 24 24'
                                                                        fill='none'
                                                                        xmlns='http://www.w3.org/2000/svg'
                                                                    >
                                                                        <path
                                                                            d='M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6M3 6H21H3ZM5 6V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V6H5Z'
                                                                            stroke='#282828'
                                                                            stroke-width='1.5'
                                                                            stroke-linecap='round'
                                                                            stroke-linejoin='round'
                                                                        />
                                                                        <path
                                                                            d='M14 11V17'
                                                                            stroke='#282828'
                                                                            stroke-width='1.5'
                                                                            stroke-linecap='round'
                                                                            stroke-linejoin='round'
                                                                        />
                                                                        <path
                                                                            d='M10 11V17'
                                                                            stroke='#282828'
                                                                            stroke-width='1.5'
                                                                            stroke-linecap='round'
                                                                            stroke-linejoin='round'
                                                                        />
                                                                    </svg>
                                                                </span>
                                                            </td>
                                                            <td className='text-base font-normal px-6 py-6 whitespace-nowrap'>
                                                                <div className='flex items-center'>
                                                                    <span>
                                                                        <img
                                                                            src='./images/pdf.png'
                                                                            alt=''
                                                                        />
                                                                    </span>
                                                                    <span className='text-base ml-4'>
                                                                        Untiltled.pdf{' '}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr className='even:bg-white-shade-100'>
                                                            <td className='text-base font-normal px-6 py-6 whitespace-nowrap first:border-r border-primaryColor-shade-200'>
                                                                <span className='cursor-pointer'>
                                                                    <svg
                                                                        width='24'
                                                                        height='24'
                                                                        viewBox='0 0 24 24'
                                                                        fill='none'
                                                                        xmlns='http://www.w3.org/2000/svg'
                                                                    >
                                                                        <path
                                                                            d='M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6M3 6H21H3ZM5 6V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V6H5Z'
                                                                            stroke='#282828'
                                                                            stroke-width='1.5'
                                                                            stroke-linecap='round'
                                                                            stroke-linejoin='round'
                                                                        />
                                                                        <path
                                                                            d='M14 11V17'
                                                                            stroke='#282828'
                                                                            stroke-width='1.5'
                                                                            stroke-linecap='round'
                                                                            stroke-linejoin='round'
                                                                        />
                                                                        <path
                                                                            d='M10 11V17'
                                                                            stroke='#282828'
                                                                            stroke-width='1.5'
                                                                            stroke-linecap='round'
                                                                            stroke-linejoin='round'
                                                                        />
                                                                    </svg>
                                                                </span>
                                                            </td>
                                                            <td className='text-base font-normal px-6 py-6 whitespace-nowrap'>
                                                                <div className='flex items-center'>
                                                                    <span>
                                                                        <img
                                                                            src='./images/pdf.png'
                                                                            alt=''
                                                                        />
                                                                    </span>
                                                                    <span className='text-base ml-4'>
                                                                        Untiltled.pdf{' '}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr className='even:bg-white-shade-100'>
                                                            <td className='text-base font-normal px-6 py-6 whitespace-nowrap first:border-r border-primaryColor-shade-200'>
                                                                <span className='cursor-pointer'>
                                                                    <svg
                                                                        width='24'
                                                                        height='24'
                                                                        viewBox='0 0 24 24'
                                                                        fill='none'
                                                                        xmlns='http://www.w3.org/2000/svg'
                                                                    >
                                                                        <path
                                                                            d='M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6M3 6H21H3ZM5 6V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V6H5Z'
                                                                            stroke='#282828'
                                                                            stroke-width='1.5'
                                                                            stroke-linecap='round'
                                                                            stroke-linejoin='round'
                                                                        />
                                                                        <path
                                                                            d='M14 11V17'
                                                                            stroke='#282828'
                                                                            stroke-width='1.5'
                                                                            stroke-linecap='round'
                                                                            stroke-linejoin='round'
                                                                        />
                                                                        <path
                                                                            d='M10 11V17'
                                                                            stroke='#282828'
                                                                            stroke-width='1.5'
                                                                            stroke-linecap='round'
                                                                            stroke-linejoin='round'
                                                                        />
                                                                    </svg>
                                                                </span>
                                                            </td>
                                                            <td className='text-base font-normal px-6 py-6 whitespace-nowrap'>
                                                                <div className='flex items-center'>
                                                                    <span>
                                                                        <img
                                                                            src='./images/pdf.png'
                                                                            alt=''
                                                                        />
                                                                    </span>
                                                                    <span className='text-base ml-4'>
                                                                        Untiltled.pdf{' '}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr className='even:bg-white-shade-100'>
                                                            <td className='text-base font-normal px-6 py-6 whitespace-nowrap first:border-r border-primaryColor-shade-200'>
                                                                <span className='cursor-pointer'>
                                                                    <svg
                                                                        width='24'
                                                                        height='24'
                                                                        viewBox='0 0 24 24'
                                                                        fill='none'
                                                                        xmlns='http://www.w3.org/2000/svg'
                                                                    >
                                                                        <path
                                                                            d='M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6M3 6H21H3ZM5 6V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V6H5Z'
                                                                            stroke='#282828'
                                                                            stroke-width='1.5'
                                                                            stroke-linecap='round'
                                                                            stroke-linejoin='round'
                                                                        />
                                                                        <path
                                                                            d='M14 11V17'
                                                                            stroke='#282828'
                                                                            stroke-width='1.5'
                                                                            stroke-linecap='round'
                                                                            stroke-linejoin='round'
                                                                        />
                                                                        <path
                                                                            d='M10 11V17'
                                                                            stroke='#282828'
                                                                            stroke-width='1.5'
                                                                            stroke-linecap='round'
                                                                            stroke-linejoin='round'
                                                                        />
                                                                    </svg>
                                                                </span>
                                                            </td>
                                                            <td className='text-base font-normal px-6 py-6 whitespace-nowrap'>
                                                                <div className='flex items-center'>
                                                                    <span>
                                                                        <img
                                                                            src='./images/pdf.png'
                                                                            alt=''
                                                                        />
                                                                    </span>
                                                                    <span className='text-base ml-4'>
                                                                        Untiltled.pdf{' '}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='modal-footer p-4'>
                            <button
                                type='button'
                                className='btn flex justify-between items-center max-w-[445px] w-full'
                                data-bs-toggle='modal'
                                data-bs-target='#ConfirmationAction'
                            >
                                <span>
                                    Ask{' '}
                                    <strong className='font-bold'>
                                        Collection
                                    </strong>
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
                        </div>
                    </div>
                </div>
            </div>

            {/*ConfirmationAction Soon Modal*/}
            <div
                className='modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto'
                id='ConfirmationAction'
                tabIndex='-1'
                aria-labelledby='exampleModalCenterTitle'
                aria-modal='true'
                role='dialog'
            >
                <div className='modal-dialog max-w-[680px] overflow-hidden modal-dialog-centered relative w-auto pointer-events-none'>
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
                            <div className='px-6 pb-6'>
                                <h2 className='text-4xl sm:text-[44px] text-primaryColor uppercase font-bold mb-8'>
                                    Thanks!
                                </h2>
                                <div className='space-y-4'>
                                    <p className='text-xl'>
                                        Your <strong>Brief</strong> has been
                                        received. We will share a collection
                                        with you within{' '}
                                        <strong>24 hours</strong>.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='modal-footer p-10 flex gap-6'>
                            <button
                                type='button'
                                className='btn w-[150px] bg-transparent font-normal border border-primaryColor text-primaryColor'
                                data-bs-toggle='modal'
                                data-bs-target='#exampleModalCenter'
                            >
                                Close
                            </button>
                            <button
                                type='button'
                                className='btn w-full'
                                data-bs-toggle='modal'
                                data-bs-target='#exampleModalCenter'
                            >
                                Go to{' '}
                                <strong className='!font-bold'>
                                    Collection
                                </strong>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StyleGuide //change the Boilarplate name to your specified name
