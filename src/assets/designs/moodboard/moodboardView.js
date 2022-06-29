import React from 'react'
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

const Boilarplate = () => {
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
            <div className='body-container p-4'>
                <div className='common-moodboard-container'>
                    {/* Moodboard Information */}
                    <div className='moodboard-information'>
                        <div className='left-half'>
                            <div className='title'>
                                <div className='input-group'>
                                    <label htmlFor='name' className='label'>
                                        Title
                                    </label>
                                    <h4 >
                                        Summer 2022 For Men
                                        <span>
                                            <EditIcon />
                                        </span>
                                    </h4>
                                </div>
                            </div>
                            <div className='description'>
                                <div className='input-group'>
                                    <label htmlFor='name' className='label'>
                                        Description
                                    </label>
                                    <p>
                                        To be sincerely honest in my humble
                                        opinion without being sentimental and of
                                        course, without offending anyone who
                                        thinks differently from my opinion but
                                        rather looking into this serious matter
                                        with perspective distinction and without
                                        condemning.
                                        <span>
                                            <EditIcon />
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='right-half'>
                            <button
                                type='button'
                                class='btn bg-white text-black float-right'
                            >
                                <span>
                                    Go to <strong>Collection</strong>
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Moodboard and image layout */}
                    <div className='moodboard-and-images-layout'>
                        <div className='left-half'>
                            <div className='moodboard-tab'>
                                <ul>
                                    <li className='active'>Moodboard</li>
                                    <li>Images</li>
                                </ul>
                            </div>
                            {/* Images layout */}
                            <div className='moodboard-masonry-container'>
                                <div className='masonry-item add-item'>
                                    <span className=''>+</span>
                                </div>
                                <div className='masonry-item'>
                                    <img
                                        src='/images/products/1.jpg'
                                        alt='product'
                                    />
                                    <span className='delete'>
                                        <DeleteIcon />
                                    </span>
                                </div>
                                <div className='masonry-item'>
                                    <img
                                        src='/images/products/2.jpg'
                                        alt='product'
                                    />
                                    <span className='delete'>
                                        <DeleteIcon />
                                    </span>
                                </div>
                                <div className='masonry-item'>
                                    <img
                                        src='/images/products/3.jpg'
                                        alt='product'
                                    />
                                    <span className='delete'>
                                        <DeleteIcon />
                                    </span>
                                </div>
                                <div className='masonry-item'>
                                    <img
                                        src='/images/products/4.jpg'
                                        alt='product'
                                    />
                                    <span className='delete'>
                                        <DeleteIcon />
                                    </span>
                                </div>
                                <div className='masonry-item'>
                                    <img
                                        src='/images/products/3.jpg'
                                        alt='product'
                                    />
                                    <span className='delete'>
                                        <DeleteIcon />
                                    </span>
                                </div>
                                <div className='masonry-item'>
                                    <img
                                        src='/images/products/2.jpg'
                                        alt='product'
                                    />
                                    <span className='delete'>
                                        <DeleteIcon />
                                    </span>
                                </div>
                                <div className='masonry-item'>
                                    <img
                                        src='/images/products/3.jpg'
                                        alt='product'
                                    />
                                    <span className='delete'>
                                        <DeleteIcon />
                                    </span>
                                </div>
                                <div className='masonry-item'>
                                    <img
                                        src='/images/products/2.jpg'
                                        alt='product'
                                    />
                                    <span className='delete'>
                                        <DeleteIcon />
                                    </span>
                                </div>
                                <div className='masonry-item'>
                                    <img
                                        src='/images/products/1.jpg'
                                        alt='product'
                                    />
                                    <span className='delete'>
                                        <DeleteIcon />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='right-half'>
                            {/* Moodboard colors */}
                            <div className='moodboard-color-container'>
                                <div className='color-single-item'>
                                    <div className='add-color'>
                                        <span>+</span>
                                    </div>
                                </div>
                                <div className='color-single-item'>
                                    <div
                                        className='color-view'
                                        style={{ background: '#00f851' }}
                                    >
                                        <span className='close'>
                                            <CloseIcon />
                                        </span>
                                    </div>
                                    <div className='color-info'>
                                        <div className='color-code'>
                                            TCX 16-1288
                                        </div>
                                        <div className='color-name'>
                                            Dark Blue
                                        </div>
                                    </div>
                                </div>
                                <div className='color-single-item'>
                                    <div
                                        className='color-view'
                                        style={{ background: '#B08574' }}
                                    >
                                        <span className='close'>
                                            <CloseIcon />
                                        </span>
                                    </div>
                                    <div className='color-info'>
                                        <div className='color-code'>
                                            TCX 16-1288
                                        </div>
                                        <div className='color-name'>
                                            Dark Blue
                                        </div>
                                    </div>
                                </div>
                                <div className='color-single-item'>
                                    <div
                                        className='color-view'
                                        style={{ background: '#B08574' }}
                                    >
                                        <span className='close'>
                                            <CloseIcon />
                                        </span>
                                    </div>
                                    <div className='color-info'>
                                        <div className='color-code'>
                                            TCX 16-1288
                                        </div>
                                        <div className='color-name'>
                                            Dark Blue
                                        </div>
                                    </div>
                                </div>
                                <div className='color-single-item'>
                                    <div
                                        className='color-view'
                                        style={{ background: '#3B3738' }}
                                    >
                                        <span className='close'>
                                            <CloseIcon />
                                        </span>
                                    </div>
                                    <div className='color-info'>
                                        <div className='color-code'>
                                            TCX 16-1288
                                        </div>
                                        <div className='color-name'>
                                            Dark Blue
                                        </div>
                                    </div>
                                </div>
                                <div className='color-single-item'>
                                    <div
                                        className='color-view'
                                        style={{ background: '#16505B' }}
                                    >
                                        <span className='close'>
                                            <CloseIcon />
                                        </span>
                                    </div>
                                    <div className='color-info'>
                                        <div className='color-code'>
                                            TCX 16-1288
                                        </div>
                                        <div className='color-name'>
                                            Dark Blue
                                        </div>
                                    </div>
                                </div>
                                <div className='color-single-item'>
                                    <div
                                        className='color-view'
                                        style={{ background: '#6FA7B8' }}
                                    >
                                        <span className='close'>
                                            <CloseIcon />
                                        </span>
                                    </div>
                                    <div className='color-info'>
                                        <div className='color-code'>
                                            TCX 16-1288
                                        </div>
                                        <div className='color-name'>
                                            Dark Blue
                                        </div>
                                    </div>
                                </div>
                                <div className='color-single-item'>
                                    <div
                                        className='color-view'
                                        style={{ background: '#B7B548' }}
                                    >
                                        <span className='close'>
                                            <CloseIcon />
                                        </span>
                                    </div>
                                    <div className='color-info'>
                                        <div className='color-code'>
                                            TCX 16-1288
                                        </div>
                                        <div className='color-name'>
                                            Dark Blue
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Moodboard fabrics */}
                            <div className='moodboard-fabric-container'>
                                <h3>Fabrics</h3>

                                {/* Selcted Fabrics */}
                                <div className='fabric-filter'>
                                    <p>
                                        Suggested <span>Fabrics</span>
                                    </p>
                                    <span>
                                        <FilterIcon />
                                    </span>
                                </div>
                                <div className='fabric-all-items'>
                                    <div className='fabric-single-item'>
                                        <div className='fabric-image'>
                                            <img
                                                src='/images/moodboard/fabric1.png'
                                                alt='fabric'
                                            />
                                            <span className='close'>
                                                <CloseIcon />
                                            </span>
                                        </div>

                                        <p>Single Jersey CO(35%), PL(65%)</p>
                                    </div>
                                    <div className='fabric-single-item'>
                                        <div className='fabric-image'>
                                            <img
                                                src='/images/moodboard/fabric2.png'
                                                alt='fabric'
                                            />
                                            <span className='close'>
                                                <CloseIcon />
                                            </span>
                                        </div>
                                        <p>Single Jersey CO(35%), PL(65%)</p>
                                    </div>
                                </div>

                                {/* Suggested Fabrics */}
                                <div className='fabric-filter top-border'>
                                    <p>
                                        Suggested <span>Fabrics</span>
                                    </p>
                                    <span>
                                        <FilterIcon />
                                    </span>
                                </div>
                                <div className='fabric-all-items'>
                                    <div className='fabric-single-item'>
                                        <div className='fabric-image'>
                                            <img
                                                src='/images/moodboard/fabric2.png'
                                                alt='fabric'
                                            />
                                            <span className='select'>
                                                <TickIcon />
                                            </span>
                                        </div>

                                        <p>Single Jersey CO(35%), PL(65%)</p>
                                    </div>
                                    <div className='fabric-single-item'>
                                        <div className='fabric-image'>
                                            <img
                                                src='/images/moodboard/fabric1.png'
                                                alt='fabric'
                                            />
                                            <span className='select'>
                                                <TickIcon />
                                            </span>
                                        </div>
                                        <p>Single Jersey CO(35%), PL(65%)</p>
                                    </div>
                                    <div className='fabric-single-item'>
                                        <div className='fabric-image'>
                                            <img
                                                src='/images/moodboard/fabric3.png'
                                                alt='fabric'
                                            />
                                            <span className='select'>
                                                <TickIcon />
                                            </span>
                                        </div>
                                        <p>Single Jersey CO(35%), PL(65%)</p>
                                    </div>
                                    <div className='fabric-single-item'>
                                        <div className='fabric-image'>
                                            <img
                                                src='/images/moodboard/fabric1.png'
                                                alt='fabric'
                                            />
                                            <span className='select'>
                                                <TickIcon />
                                            </span>
                                        </div>
                                        <p>Single Jersey CO(35%), PL(65%)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Boilarplate //change the Boilarplate name to your specified name
