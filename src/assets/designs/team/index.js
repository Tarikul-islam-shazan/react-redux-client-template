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
                                    data-bs-toggle='modal'
                                    data-bs-target='#InviteTeamMember'
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
                    <div className='w-full sm:w-2/4 p-5'>
                        <div className='flex'>
                            <span className='w-[100px] h-[100px] cursor-pointer rounded-full overflow-hidden inline-block '>
                                <img
                                    src={User}
                                    alt=''
                                    className='object-cover w-full h-full'
                                />
                            </span>
                            <div className='ml-5 mt-7'>
                                <div className='flex'>
                                    <div className='w-2/3'>
                                        <p className='font-bold leading-6'>
                                            Shibly Saikat
                                        </p>
                                        <p className='leading-6'>
                                            shibly@gmail.com
                                        </p>
                                    </div>
                                    <div>
                                        <button
                                            data-bs-toggle='modal'
                                            data-bs-target='#RemoveMember'
                                        >
                                            <Dlt />
                                        </button>
                                    </div>
                                </div>
                                <div className='pt-8 flex-col space-y-2.5'>
                                    <div className='flex'>
                                        <p className='w-[174px] text-primaryColor-shade-100'>
                                            Full Name
                                        </p>
                                        <p className='font-medium'>
                                            MD Shibly Nomany Saikat
                                        </p>
                                    </div>
                                    <div className='flex'>
                                        <p className='w-[174px] text-primaryColor-shade-100'>
                                            Role
                                        </p>
                                        <p className='font-medium'>
                                            Senior Accounts Manager
                                        </p>
                                    </div>
                                    <div className='flex'>
                                        <p className='w-[174px] text-primaryColor-shade-100'>
                                            Contact Number
                                        </p>
                                        <p className='font-medium'>
                                            + 88 015 21 300 845
                                        </p>
                                    </div>
                                    <div className='flex'>
                                        <p className='w-[174px] text-primaryColor-shade-100'>
                                            Brand Name
                                        </p>
                                        <p className='font-medium'>Saikat’s</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*Team member invite modal*/}
            <div
                className='modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto'
                id='InviteTeamMember'
                tabIndex='-1'
                aria-labelledby='exampleModalCenterTitle'
                aria-modal='true'
                role='dialog'
            >
                <div className='modal-dialog max-w-[485px] modal-dialog-centered relative w-auto pointer-events-none'>
                    <div className='modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding outline-none text-current'>
                        <div className='modal-header flex flex-shrink-0 items-center justify-between bg-primaryColor-shade-300 p-6'>
                            <h5
                                className='text-xl font-bold leading-normal text-primaryColor uppercase'
                                id='exampleModalScrollableLabel'
                            >
                                Team
                            </h5>
                            <button
                                type='button'
                                className='btn-close box-content w-4 h-4 p-1 !mr-0.5 text-black border-none  opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline'
                                data-bs-dismiss='modal'
                                aria-label='Close'
                            ></button>
                        </div>
                        <div className='modal-body relative'>
                            <div className='p-4'>
                                <div className='flex flex-1 w-full'>
                                    <input
                                        type='text'
                                        className='form-field w-full border border-primaryColor p-2 px-4'
                                        id='name'
                                        placeholder='Search Team Member ...'
                                        name='name'
                                    />
                                </div>
                            </div>

                            <div className='flex flex-col m-4 mt-0'>
                                <label className='text-xl mb-4'>
                                    Invite ‘shibly@nitex.info’
                                </label>
                                <button
                                    type='button'
                                    data-bs-toggle='modal'
                                    data-bs-target='#AddTeam'
                                    className='btn'
                                >
                                    Invite
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*Invitation send Modal*/}
            <div
                className='modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto'
                id='AddTeam'
                tabIndex='-1'
                aria-labelledby='exampleModalCenterTitle'
                aria-modal='true'
                role='dialog'
            >
                <div className='modal-dialog max-w-[485px] modal-dialog-centered relative w-auto pointer-events-none'>
                    <div className='modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding outline-none text-current'>
                        <div className='modal-header flex flex-shrink-0 items-center justify-between bg-primaryColor-shade-300 p-6'>
                            <h5
                                className='text-xl font-bold leading-normal text-primaryColor uppercase'
                                id='exampleModalScrollableLabel'
                            >
                                Team
                            </h5>
                            <button
                                type='button'
                                className='btn-close box-content w-4 h-4 p-1 !mr-0.5 text-black border-none  opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline'
                                data-bs-dismiss='modal'
                                aria-label='Close'
                            ></button>
                        </div>
                        <div className='modal-body relative'>
                            <div className='p-4'>
                                <div className='flex flex-1 w-full mb-4'>
                                    <input
                                        type='text'
                                        className='form-field w-[90%] border border-primaryColor  p-2 px-4'
                                        id='name'
                                        placeholder='Search Team Member ...'
                                        name='name'
                                    />
                                    <button
                                        type='button'
                                        className='btn w-[60px] flex items-center justify-center p-2'
                                    >
                                        <TickWhite />
                                    </button>
                                </div>
                            </div>

                            <div className='flex flex-col m-4'>
                                <label className='text-xl mb-1'>
                                    Invitation sent to{' '}
                                </label>
                                <label className='text-xl mb-3 font-bold'>
                                    ‘shibly@nitex.info’
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*Remove member Modal*/}
            <div
                className='modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto'
                id='RemoveMember'
                tabIndex='-1'
                aria-labelledby='exampleModalCenterTitle'
                aria-modal='true'
                role='dialog'
            >
                <div className='modal-dialog max-w-[485px] modal-dialog-centered relative w-auto pointer-events-none'>
                    <div className='modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding outline-none text-current'>
                        <div className='modal-header flex flex-shrink-0 items-center justify-between bg-primaryColor-shade-300 p-6'>
                            <h5
                                className='text-xl font-bold leading-normal text-primaryColor uppercase'
                                id='exampleModalScrollableLabel'
                            >
                                Remove member
                            </h5>
                            <button
                                type='button'
                                className='btn-close box-content w-4 h-4 p-1 !mr-0.5 text-black border-none  opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline'
                                data-bs-dismiss='modal'
                                aria-label='Close'
                            ></button>
                        </div>
                        <div className='modal-body relative'>
                            <div className='m-4 pb-4 border-b border-white-shade-100'>
                                <p className='text-xl'>
                                    Do you really want to remove{' '}
                                    <strong>Shibly Saikat</strong> from your
                                    team?
                                </p>
                            </div>

                            <div className='flex flex-col m-4 mt-0 mb-8'>
                                <button
                                    type='button'
                                    className='btn font-normal border border-primaryColor  flex justify-between items-center'
                                >
                                    <span>Remove</span>
                                    <span className='ml-4'>
                                        <ArrowRightWhite />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StyleGuide //change the Boilarplate name to your specified name
