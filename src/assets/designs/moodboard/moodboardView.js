import React, { useEffect } from 'react'
import SelectComponent from '../../../app/common/SelectComponent'
import { ReactComponent as FilterIcon } from '../../icons/Filter-24.svg'
import { ReactComponent as AddIcon } from '../../icons/add-white.svg'
import { ReactComponent as CloseIcon } from '../../icons/close.svg'
import { ReactComponent as TickIcon } from '../../icons/tick.svg'
import { ReactComponent as DeleteIcon } from '../../icons/delete.svg'
import { ReactComponent as EditIcon } from '../../icons/edit.svg'
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { ReactComponent as MenuIcon } from '../../images/home/humbargerMenu.svg'
import { ReactComponent as NitexIcon } from '../../images/home/nitexLogo.svg'
import { ReactComponent as IconFavourite } from '../../images/home/favourite.svg'
import { ReactComponent as IconNotification } from '../../images/home/notification.svg'
import { ReactComponent as SearchIconWhite } from '../../images/search-white.svg'
import { ReactComponent as OkWhite } from '../../../assets/images/ok-white.svg'
import { ReactComponent as Refresh } from '../../../assets/images/refresh.svg'

const Boilarplate = () => {
    useEffect(() => {
        console.log('Moodboard View Design Loaded')
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
            <div className='body-container relative p-4'>
                <div className='common-filter-popup absolute left-0 top-0 w-[435px] bg-white shadow-lg'>
                    <div className='color-popup-header flex justify-between p-5 bg-[#F5F5F5]'>
                        <h5 className='font-bold uppercase'>Filter Fabric</h5>
                        <span>
                            <CloseIcon />
                        </span>
                    </div>
                    <div className='common-color-popup-body p-5'>
                        <div className='flex'>
                            <input
                                type='text'
                                className='form-field w-full border border-primaryColor  p-2 px-4'
                                id='name'
                                placeholder='Search ...'
                                name='name'
                            />
                            <button
                                type='button'
                                className='btn w-[60px] min-w-[60px] flex items-center justify-center p-2'
                            >
                                <SearchIconWhite />
                            </button>
                        </div>

                        <div className='mt-5'>
                            <div className='input-group select-bg-gray-style w-full'>
                                <SelectComponent
                                    options={[
                                        {
                                            label: 'See Samples',
                                            value: 'NITEX/BO/1212'
                                        },
                                        {
                                            label: 'Country 1',
                                            value: 'NITEX/BO/1212'
                                        },
                                        {
                                            label: 'Country 2',
                                            value: 'NITEX/BO/1212'
                                        }
                                    ]}
                                />
                            </div>
                        </div>

                        <div className='mt-5'>
                            <div className='input-group select-bg-gray-style w-full'>
                                <SelectComponent
                                    options={[
                                        {
                                            label: 'See Samples',
                                            value: 'NITEX/BO/1212'
                                        },
                                        {
                                            label: 'Country 1',
                                            value: 'NITEX/BO/1212'
                                        },
                                        {
                                            label: 'Country 2',
                                            value: 'NITEX/BO/1212'
                                        }
                                    ]}
                                />
                            </div>
                        </div>

                        <div className='mt-5'>
                            <div className='input-group w-full'>
                                <div>
                                    <label
                                        htmlFor='points'
                                        className='w-full block mb-3'
                                    >
                                        GSM
                                    </label>
                                    <input
                                        type='range'
                                        id='points'
                                        name='points'
                                        min={0}
                                        max={100}
                                        className='w-full block'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='modal-footer mt-5 flex justify-end gap-4'>
                            <button
                                type='button'
                                className='btn bg-transparent px-5 font-normal border border-primaryColor text-primaryColor'
                            >
                                <Refresh />
                            </button>
                            <button
                                type='button ='
                                className='btn w-full flex justify-between items-center'
                            >
                                <span>Apply</span>
                                <span className='ml-2'>
                                    <OkWhite />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Boilarplate //change the Boilarplate name to your specified name
