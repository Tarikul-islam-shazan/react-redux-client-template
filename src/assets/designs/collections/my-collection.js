import React from 'react'
import SelectComponent from "../../../app/common/SelectComponent";
import { ReactComponent as PlusIcon } from '../../images/plus.svg';
import { ReactComponent as UploadIcon } from '../../images/upload.svg';
import { ReactComponent as FilterIcon } from '../../images/filter.svg';
import { ReactComponent as SearchIcon } from '../../images/search.svg';
import { ReactComponent as SearchIconWhite } from '../../images/search-white.svg';
import { ReactComponent as CloseIcon } from '../../images/close.svg';
import { ReactComponent as OkWhite } from '../../images/ok-white.svg';
import { ReactComponent as Refresh } from '../../images/refresh.svg';
import { ReactComponent as Dlt } from '../../images/dlt.svg';
import { ReactComponent as ArrowRightWhite } from '../../images/arror-right-white.svg';
import Pdf from '../../images/pdf.png';

const StyleGuide = () => {
    //change the Boilarplate name to your specified name
    return (
        <div className='container-fluid bg-primaryColor-shade-300'>
            <header className="bg-white py-5 px-5 logo flex items-center">
                <div className="logo flex items-center gap-6">
                    <div className="burger-menu xl:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="21" viewBox="0 0 28 21">
                            <g id="Group_1" data-name="Group 1" transform="translate(-598 -131)">
                                <rect id="Rectangle_1" data-name="Rectangle 1" width="28" height="3" transform="translate(598 131)"/>
                                <rect id="Rectangle_2" data-name="Rectangle 2" width="28" height="3" transform="translate(598 149)"/>
                                <rect id="Rectangle_3" data-name="Rectangle 3" width="20" height="3" transform="translate(598 140)"/>
                            </g>
                        </svg>
                    </div>
                    <a href="#">
                        <span className="brand-logo">
                            <svg width="75" height="20" viewBox="0 0 75 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.9741 1.48607L14.0236 13.8452L1.01775 0.96582H0.896973V18.5713H3.30083L3.25136 6.40127L16.2791 19.1384H16.3533V1.48607H13.9741Z" fill="#282828"/>
                                <path d="M21.2734 1.48633V18.5716H23.6526V1.48633H21.2734Z" fill="#282828"/>
                                <path d="M27.2656 1.48633V3.68531H31.9031V18.5701H34.2851V3.68531H39.0434V1.48633H27.2656Z" fill="#282828"/>
                                <path d="M53.8118 3.68531V1.48633H42.6655V18.5716H53.8118V16.3484H45.0446V11.0793H52.4876V8.88333H45.0446V3.68531H53.8118Z" fill="#282828"/>
                                <path d="M70.928 18.5713H67.8882L63.5781 12.1861C63.9477 11.5751 64.3275 10.9913 64.7175 10.4242C64.8354 10.2503 65.0798 9.90395 65.0798 9.89941L70.928 18.5713Z" fill="#282828"/>
                                <path d="M63.5394 7.64577C63.1349 8.1025 62.7304 8.58344 62.3316 9.08403C62.2749 9.15511 62.2138 9.22619 62.157 9.3003C62.0654 9.41826 61.9693 9.54076 61.8762 9.66327L61.8733 9.6678L61.5823 9.23375L60.6772 7.88926L56.3555 1.48438H59.3705L63.5394 7.64577Z" fill="#282828"/>
                                <path d="M74.1054 0.240234V1.16429C72.9733 1.77529 71.9023 2.51484 70.8735 3.30429C70.6247 3.49183 70.3832 3.68692 70.1445 3.8926C69.3093 4.58829 68.5162 5.35355 67.7567 6.15057C65.801 8.1968 64.1334 10.5546 62.703 13.0606C61.9886 14.3128 61.341 15.6104 60.7546 16.9368C60.5189 17.4782 60.289 18.0211 60.0736 18.5732H56.9175C57.063 18.2404 57.2172 17.9153 57.3715 17.5962C57.7076 16.8869 58.0641 16.2018 58.4337 15.5242C59.1758 14.1737 59.9805 12.867 60.8434 11.6178C61.3396 10.9055 61.8547 10.2067 62.3902 9.52769C62.9286 8.84258 63.4888 8.17714 64.0694 7.53892C64.9236 6.59521 65.8214 5.70442 66.7686 4.88169C67.7945 3.98486 68.8626 3.15154 69.9888 2.42258C70.079 2.36209 70.1736 2.30159 70.2668 2.24412C70.8183 1.89779 71.377 1.56961 71.9431 1.2626C72.6386 0.886015 73.3472 0.547245 74.0734 0.255358L74.1054 0.240234Z" fill="#282828"/>
                                <path d="M66.0977 11.4334L65.9566 11.2171L65.392 10.3732L65.0791 9.90137" fill="#282828"/>
                                <path d="M60.6777 7.89062L61.5828 9.23361L61.8739 9.66766" fill="#282828"/>
                            </svg>
                        </span>
                    </a>
                    <span className="divider hidden xl:block">
                        <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="20.3536" y1="1.35355" x2="0.353554" y2="21.3536" stroke="#646464"/>
                            <line y1="-0.5" x2="28.2843" y2="-0.5" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 20 21)" stroke="#646464"/>
                        </svg>
                    </span>
                    <span className="hidden xl:block text-logo text-2xl text-primaryColor-shade-100 font-bold uppercase">
                        Louis Vuitton
                    </span>
                </div>
                <div className="main-menu hidden xl:block ml-16 4xl:ml-28">
                    <ul>
                        <li className="text-base text-primaryColor uppercase inline-block mr-6 4xl:mr-10 5xl:mr-14 active">
                            <a href="#">Home</a>
                        </li>
                        <li className="text-base text-primaryColor uppercase inline-block mr-6 4xl:mr-10 5xl:mr-14">
                            <a href="#">Moodboards</a>
                        </li>
                        <li className="text-base text-primaryColor uppercase inline-block mr-6 4xl:mr-10 5xl:mr-14">
                            <a href="#">Collections</a>
                        </li>
                        <li className="text-base text-primaryColor uppercase inline-block mr-6 4xl:mr-10 5xl:mr-14">
                            <a href="#">Quotes</a>
                        </li>
                        <li className="text-base text-primaryColor uppercase inline-block mr-6 4xl:mr-10 5xl:mr-14">
                            <a href="#">Samples</a>
                        </li>
                        <li className="text-base text-primaryColor uppercase inline-block mr-6 4xl:mr-10 5xl:mr-14">
                            <a href="#">Orders</a>
                        </li>
                        <li className="text-base text-primaryColor uppercase inline-block mr-6 4xl:mr-10 5xl:mr-14">
                            <a href="#">More</a>
                        </li>
                    </ul>
                </div>

                <div className="user-interaction ml-auto flex items-center gap-x-6">
                    <div className="w-[40px] h-[40px] rounded-full bg-primaryColor-shade-300 p-2 relative flex items-center justify-center cursor-pointer">
                        <span>
                            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.4454 18.7608L2.57617 10.5663C0.359638 8.2582 0.499218 4.4736 2.87922 2.34929C5.24035 0.241811 8.82044 0.651052 10.6863 3.24171L11 3.67724L11.3137 3.24171C13.1796 0.651052 16.7596 0.241811 19.1208 2.34929C21.5008 4.4736 21.6404 8.2582 19.4238 10.5663L11.5546 18.7608C11.2483 19.0797 10.7517 19.0797 10.4454 18.7608Z" stroke="#282828" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>
                        <span className="absolute top-[-9px] right-[-22px] text-sm text-white-shade-100 bg-primaryColor inline-block rounded-[20px] px-3 text-center">12</span>
                    </div>
                    <div className="w-[40px] h-[40px] rounded-full bg-primaryColor-shade-300 p-2 relative flex items-center justify-center cursor-pointer">
                        <span>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.6 9.45798V8.4C5.6 4.86538 8.46538 2 12 2C15.5346 2 18.4 4.86537 18.4 8.4V9.45798C18.4 11.7583 19.0649 14.0096 20.3146 15.9409L21 17H3L3.68539 15.9408C4.93512 14.0096 5.6 11.7583 5.6 9.45798Z" stroke="#282828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M11 20.8887C11.5344 21.4825 12.4656 21.4825 13 20.8887" stroke="#282828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>
                        <span className="absolute top-[-9px] right-[-22px] text-sm text-white-shade-100 bg-primaryColor inline-block rounded-[20px] px-3 text-center">99+</span>
                    </div>
                    <div className="w-[40px] h-[40px] rounded-full bg-primaryColor-shade-300 relative border border-white-shade-100 flex items-center justify-center cursor-pointer overflow-hidden">
                        <img src="./images/user.jpg" className="object-cover object-top w-full h-full" alt=""/>
                    </div>
                </div>
            </header>

            <div className="body-container p-4">
                <div className="filter">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 gap-6">
                        <div className="text-base md:text-xl text-white-shade-200 flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                           <div className="flex items-center gap-3 cursor-pointer">
                               <span className="font-bold text-xl leading-none inline-block mb-2">.</span>
                               <span>NITEX Collection</span>
                           </div>
                           <div className="flex items-center gap-3 cursor-pointer  text-primaryColor font-bold">
                               <span className="font-bold text-xl leading-none inline-block mb-2">.</span>
                               <span>My Collection</span>
                           </div>
                           <div className="flex items-center gap-3 cursor-pointer">
                               <span className="font-bold text-xl leading-none inline-block mb-2">.</span>
                               <span>Requested Collection</span>
                           </div>
                        </div>
                        <div className="flex flex-wrap justify-end gap-4 lg:gap-2">
                            <div className="flex items-center gap-2 overflow-x-auto">
                                <div className="tag-badge">
                                    <span>Summer</span>
                                    <span className="ml-6 cursor-pointer">
                                        <CloseIcon />
                                    </span>
                                </div>
                                <div className="tag-badge">
                                    <span>Men</span>
                                    <span className="ml-6 cursor-pointer">
                                        <CloseIcon />
                                    </span>
                                </div>
                                <div className="tag-badge">
                                    <span>Newest</span>
                                    <span className="ml-6 cursor-pointer">
                                        <CloseIcon />
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center overflow-x-auto gap-2">
                                <button type="button" className="btn bg-transparent px-5 font-normal border border-primaryColor text-primaryColor">
                                    <SearchIcon />
                                </button>
                                <button data-bs-toggle="modal" data-bs-target="#SortFilter" type="button" className="btn bg-transparent px-5 font-normal border border-primaryColor text-primaryColor">
                                    <FilterIcon />
                                </button>
                                <div className="h-[60px] w-[1px] bg-primaryColor-shade-200 mx-3"></div>
                                <button type="button"  className="btn bg-transparent font-normal border border-primaryColor text-primaryColor flex justify-between items-center">
                                    <span>Upload</span>
                                    <span className="ml-4">
                                        <UploadIcon />
                                    </span>
                                </button>
                                <button type="button" data-bs-toggle="modal" data-bs-target="#CreateCollection" className="btn flex justify-between items-center">
                                    <span>Create Collection</span>
                                        <span className="ml-2">
                                        <PlusIcon />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pb-4">
                    <div className="collection-box grid grid-cols-1 md:grid-cols-2 bg-white">
                        <div className="p-6 xl:p-10 relative flex items-center">
                           <div>
                               <div className="flex gap-3">
                                   <span className="badge bg-primaryColor py-1 text-white">Quote received</span>
                               </div>
                               <h1 className="text-2xl md:text-4xl text-primaryColor font-bold mt-3  md:leading-[54px]">Men’s Semi-formal Full Set Pack Summer 2022</h1>
                               <div className="paragraph-grid-overlay-white relative mb-4">
                                   <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's stans standard dummy text ever since the 1500s,</p>
                               </div>
                               <div className="flex items-center text-base md:text-xl text-primaryColor gap-3 md:gap-5">
                                   <span>Designed by NITEX</span>
                                   <span className="leading-none inline-block mb-2">.</span>
                                   <span>23 Styles</span>
                               </div>
                               <div className="color-list flex gap-1 mt-10 md:mt-16">
                                   <span className="color-circle bg-primaryColor"></span>
                                   <span className="color-circle bg-primaryColor-shade-300"></span>
                                   <span className="color-circle bg-primaryColor-shade-200"></span>
                                   <span className="color-circle bg-[#D1B59D]"></span>
                               </div>
                           </div>
                        </div>
                        <div className="overflow-hidden relative h-[276px] md:h-[524px] pt-0 md:pt-4 p-4 bg-white">
                            <div className="image-grid-overlay-white">
                                <div className="columns-3 gap-1 direction-rtl">
                                    <img className="w-full mb-1" src="/images/products/1.jpg"/>
                                    <img className="w-full mb-1" src="/images/products/3.jpg"/>
                                    <img className="w-full mb-1" src="/images/products/2.jpg"/>
                                    <img className="w-full mb-1" src="/images/products/4.jpg"/>
                                    <img className="w-full mb-1" src="/images/products/1.jpg"/>
                                    <img className="w-full mb-1" src="/images/products/3.jpg"/>
                                    <img className="w-full mb-1" src="/images/products/2.jpg"/>
                                    <img className="w-full mb-1" src="/images/products/4.jpg"/>
                                </div>
                            </div>
                            <div className="w-[40px] h-[40px] bg-white border border-white-shade-100 flex justify-center items-center absolute right-[35px] top-[35px] cursor-pointer">
                                    <span className="mt-2">
                                        <svg width="38" height="36" viewBox="0 0 38 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g filter="url(#filter0_d_944_19802)">
                                            <path d="M18.4415 22.7608L10.5723 14.5663C8.35573 12.2582 8.49531 8.4736 10.8753 6.34929C13.2364 4.24181 16.8165 4.65105 18.6824 7.24171L18.9961 7.67724L19.3098 7.24171C21.1757 4.65105 24.7557 4.24181 27.1169 6.34929C29.4969 8.4736 29.6365 12.2582 27.4199 14.5663L19.5507 22.7608C19.2444 23.0797 18.7478 23.0797 18.4415 22.7608Z" fill="#DA336F"/>
                                            <path d="M18.4415 22.7608L10.5723 14.5663C8.35573 12.2582 8.49531 8.4736 10.8753 6.34929C13.2364 4.24181 16.8165 4.65105 18.6824 7.24171L18.9961 7.67724L19.3098 7.24171C21.1757 4.65105 24.7557 4.24181 27.1169 6.34929C29.4969 8.4736 29.6365 12.2582 27.4199 14.5663L19.5507 22.7608C19.2444 23.0797 18.7478 23.0797 18.4415 22.7608Z" stroke="#F5F5F5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </g>
                                            <defs>
                                            <filter id="filter0_d_944_19802" x="0.496094" y="0.5" width="37" height="35" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                            <feOffset dy="4"/>
                                            <feGaussianBlur stdDeviation="4"/>
                                            <feComposite in2="hardAlpha" operator="out"/>
                                            <feColorMatrix type="matrix" values="0 0 0 0 0.854167 0 0 0 0 0.199306 0 0 0 0 0.435056 0 0 0 0.2 0"/>
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_944_19802"/>
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_944_19802" result="shape"/>
                                            </filter>
                                            </defs>
                                        </svg>
                                    </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pb-4">
                    <div className="collection-box grid grid-cols-1 md:grid-cols-2 bg-white">
                        <div className="p-6 xl:p-10 relative flex items-center">
                           <div>
                               <div className="flex gap-3">
                                   <span className="badge bg-pending border border-primaryColor">requested for collection</span>
                               </div>
                               <h1 className="text-2xl md:text-4xl text-primaryColor font-bold mt-3  md:leading-[54px]">Men’s Semi-formal Full Set Pack Summer 2022</h1>
                               <div className="paragraph-grid-overlay-white relative mb-4">
                                   <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's stans standard dummy text ever since the 1500s,</p>
                               </div>
                               <div className="flex items-center text-base md:text-xl text-primaryColor gap-3 md:gap-5">
                                   <span>Designed by NITEX</span>
                                   <span className="leading-none inline-block mb-2">.</span>
                                   <span>23 Styles</span>
                               </div>
                               <div className="color-list flex gap-1 mt-10 md:mt-16">
                                   <span className="color-circle bg-primaryColor"></span>
                                   <span className="color-circle bg-primaryColor-shade-300"></span>
                                   <span className="color-circle bg-primaryColor-shade-200"></span>
                                   <span className="color-circle bg-[#D1B59D]"></span>
                               </div>
                           </div>
                        </div>
                        <div className="overflow-hidden relative h-[276px] md:h-[524px] pt-0 md:pt-4 p-4 bg-white">
                            <div className="image-grid-overlay-white">
                                <div className="columns-3 gap-1 direction-rtl">
                                    <img className="w-full mb-1" src="/images/products/1.jpg"/>
                                    <img className="w-full mb-1" src="/images/products/3.jpg"/>
                                    <img className="w-full mb-1" src="/images/products/2.jpg"/>
                                    <img className="w-full mb-1" src="/images/products/4.jpg"/>
                                    <img className="w-full mb-1" src="/images/products/1.jpg"/>
                                    <img className="w-full mb-1" src="/images/products/3.jpg"/>
                                    <img className="w-full mb-1" src="/images/products/2.jpg"/>
                                    <img className="w-full mb-1" src="/images/products/4.jpg"/>
                                </div>
                            </div>
                            <div className="w-[40px] h-[40px] bg-white border border-white-shade-100 flex justify-center items-center absolute right-[35px] top-[35px] cursor-pointer">
                                    <span className="mt-2">
                                        <svg width="38" height="36" viewBox="0 0 38 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g filter="url(#filter0_d_944_19802)">
                                            <path d="M18.4415 22.7608L10.5723 14.5663C8.35573 12.2582 8.49531 8.4736 10.8753 6.34929C13.2364 4.24181 16.8165 4.65105 18.6824 7.24171L18.9961 7.67724L19.3098 7.24171C21.1757 4.65105 24.7557 4.24181 27.1169 6.34929C29.4969 8.4736 29.6365 12.2582 27.4199 14.5663L19.5507 22.7608C19.2444 23.0797 18.7478 23.0797 18.4415 22.7608Z" fill="#DA336F"/>
                                            <path d="M18.4415 22.7608L10.5723 14.5663C8.35573 12.2582 8.49531 8.4736 10.8753 6.34929C13.2364 4.24181 16.8165 4.65105 18.6824 7.24171L18.9961 7.67724L19.3098 7.24171C21.1757 4.65105 24.7557 4.24181 27.1169 6.34929C29.4969 8.4736 29.6365 12.2582 27.4199 14.5663L19.5507 22.7608C19.2444 23.0797 18.7478 23.0797 18.4415 22.7608Z" stroke="#F5F5F5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </g>
                                            <defs>
                                            <filter id="filter0_d_944_19802" x="0.496094" y="0.5" width="37" height="35" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                            <feOffset dy="4"/>
                                            <feGaussianBlur stdDeviation="4"/>
                                            <feComposite in2="hardAlpha" operator="out"/>
                                            <feColorMatrix type="matrix" values="0 0 0 0 0.854167 0 0 0 0 0.199306 0 0 0 0 0.435056 0 0 0 0.2 0"/>
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_944_19802"/>
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_944_19802" result="shape"/>
                                            </filter>
                                            </defs>
                                        </svg>
                                    </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pb-4">
                    <div className="collection-box grid grid-cols-1 md:grid-cols-2 bg-white">
                        <div className="p-6 xl:p-10 relative flex items-center">
                           <div>
                               <div className="flex gap-3">
                                   <span className="badge bg-warning font-bold py-1">Collection Received</span>
                               </div>
                               <h1 className="text-2xl md:text-4xl text-primaryColor font-bold mt-3  md:leading-[54px]">Men’s Semi-formal Full Set Pack Summer 2022</h1>
                               <div className="paragraph-grid-overlay-white relative mb-4">
                                   <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's stans standard dummy text ever since the 1500s,</p>
                               </div>
                               <div className="flex items-center text-base md:text-xl text-primaryColor gap-3 md:gap-5">
                                   <span>Designed by NITEX</span>
                                   <span className="leading-none inline-block mb-2">.</span>
                                   <span>23 Styles</span>
                               </div>
                               <div className="color-list flex gap-1 mt-10 md:mt-16">
                                   <span className="color-circle bg-primaryColor"></span>
                                   <span className="color-circle bg-primaryColor-shade-300"></span>
                                   <span className="color-circle bg-primaryColor-shade-200"></span>
                                   <span className="color-circle bg-[#D1B59D]"></span>
                               </div>
                           </div>
                        </div>
                        <div className="overflow-hidden relative h-[276px] md:h-[524px] pt-0 md:pt-4 p-4 bg-white">
                            <div className="image-grid-overlay-white">
                                <div className="columns-3 gap-1 direction-rtl">
                                    <img className="w-full mb-1" src="/images/products/1.jpg"/>
                                    <img className="w-full mb-1" src="/images/products/3.jpg"/>
                                    <img className="w-full mb-1" src="/images/products/2.jpg"/>
                                    <img className="w-full mb-1" src="/images/products/4.jpg"/>
                                    <img className="w-full mb-1" src="/images/products/1.jpg"/>
                                    <img className="w-full mb-1" src="/images/products/3.jpg"/>
                                    <img className="w-full mb-1" src="/images/products/2.jpg"/>
                                    <img className="w-full mb-1" src="/images/products/4.jpg"/>
                                </div>
                            </div>
                            <div className="w-[40px] h-[40px] bg-white border border-white-shade-100 flex justify-center items-center absolute right-[35px] top-[35px] cursor-pointer">
                                    <span className="mt-2">
                                        <svg width="38" height="36" viewBox="0 0 38 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g filter="url(#filter0_d_944_19802)">
                                            <path d="M18.4415 22.7608L10.5723 14.5663C8.35573 12.2582 8.49531 8.4736 10.8753 6.34929C13.2364 4.24181 16.8165 4.65105 18.6824 7.24171L18.9961 7.67724L19.3098 7.24171C21.1757 4.65105 24.7557 4.24181 27.1169 6.34929C29.4969 8.4736 29.6365 12.2582 27.4199 14.5663L19.5507 22.7608C19.2444 23.0797 18.7478 23.0797 18.4415 22.7608Z" fill="#DA336F"/>
                                            <path d="M18.4415 22.7608L10.5723 14.5663C8.35573 12.2582 8.49531 8.4736 10.8753 6.34929C13.2364 4.24181 16.8165 4.65105 18.6824 7.24171L18.9961 7.67724L19.3098 7.24171C21.1757 4.65105 24.7557 4.24181 27.1169 6.34929C29.4969 8.4736 29.6365 12.2582 27.4199 14.5663L19.5507 22.7608C19.2444 23.0797 18.7478 23.0797 18.4415 22.7608Z" stroke="#F5F5F5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </g>
                                            <defs>
                                            <filter id="filter0_d_944_19802" x="0.496094" y="0.5" width="37" height="35" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                            <feOffset dy="4"/>
                                            <feGaussianBlur stdDeviation="4"/>
                                            <feComposite in2="hardAlpha" operator="out"/>
                                            <feColorMatrix type="matrix" values="0 0 0 0 0.854167 0 0 0 0 0.199306 0 0 0 0 0.435056 0 0 0 0.2 0"/>
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_944_19802"/>
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_944_19802" result="shape"/>
                                            </filter>
                                            </defs>
                                        </svg>
                                    </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pb-4">
                    <div className="collection-box grid grid-cols-1 md:grid-cols-2 bg-white">
                        <div className="p-6 xl:p-10 relative flex items-center">
                           <div>
                               <div className="flex gap-3">
                                   <span className="badge bg-warning font-bold py-1">Collection Received</span>
                               </div>
                               <h1 className="text-2xl md:text-4xl text-primaryColor font-bold mt-3  md:leading-[54px]">Men’s Semi-formal Full Set Pack Summer 2022</h1>
                               <div className="paragraph-grid-overlay-white relative mb-4">
                                   <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's stans standard dummy text ever since the 1500s,</p>
                               </div>
                               <div className="flex items-center text-base md:text-xl text-primaryColor gap-3 md:gap-5">
                                   <span>Designed by NITEX</span>
                                   <span className="leading-none inline-block mb-2">.</span>
                                   <span>23 Styles</span>
                               </div>
                               <div className="color-list flex gap-1 mt-10 md:mt-16">
                                   <span className="color-circle bg-primaryColor"></span>
                                   <span className="color-circle bg-primaryColor-shade-300"></span>
                                   <span className="color-circle bg-primaryColor-shade-200"></span>
                                   <span className="color-circle bg-[#D1B59D]"></span>
                               </div>
                           </div>
                        </div>
                        <div className="overflow-hidden relative h-[276px] md:h-[524px] pt-0 md:pt-4 p-4 bg-white">
                            <div className="image-grid-overlay-white">
                                <div className="columns-3 gap-1 direction-rtl">
                                    <img className="w-full mb-1" src="/images/products/1.jpg"/>
                                    <img className="w-full mb-1" src="/images/products/3.jpg"/>
                                    <img className="w-full mb-1" src="/images/products/2.jpg"/>
                                    <img className="w-full mb-1" src="/images/products/4.jpg"/>
                                    <img className="w-full mb-1" src="/images/products/1.jpg"/>
                                    <img className="w-full mb-1" src="/images/products/3.jpg"/>
                                    <img className="w-full mb-1" src="/images/products/2.jpg"/>
                                    <img className="w-full mb-1" src="/images/products/4.jpg"/>
                                </div>
                            </div>
                            <div className="w-[40px] h-[40px] bg-white border border-white-shade-100 flex justify-center items-center absolute right-[35px] top-[35px] cursor-pointer">
                                    <span className="mt-2">
                                        <svg width="38" height="36" viewBox="0 0 38 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g filter="url(#filter0_d_944_19802)">
                                            <path d="M18.4415 22.7608L10.5723 14.5663C8.35573 12.2582 8.49531 8.4736 10.8753 6.34929C13.2364 4.24181 16.8165 4.65105 18.6824 7.24171L18.9961 7.67724L19.3098 7.24171C21.1757 4.65105 24.7557 4.24181 27.1169 6.34929C29.4969 8.4736 29.6365 12.2582 27.4199 14.5663L19.5507 22.7608C19.2444 23.0797 18.7478 23.0797 18.4415 22.7608Z" fill="#DA336F"/>
                                            <path d="M18.4415 22.7608L10.5723 14.5663C8.35573 12.2582 8.49531 8.4736 10.8753 6.34929C13.2364 4.24181 16.8165 4.65105 18.6824 7.24171L18.9961 7.67724L19.3098 7.24171C21.1757 4.65105 24.7557 4.24181 27.1169 6.34929C29.4969 8.4736 29.6365 12.2582 27.4199 14.5663L19.5507 22.7608C19.2444 23.0797 18.7478 23.0797 18.4415 22.7608Z" stroke="#F5F5F5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </g>
                                            <defs>
                                            <filter id="filter0_d_944_19802" x="0.496094" y="0.5" width="37" height="35" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                            <feOffset dy="4"/>
                                            <feGaussianBlur stdDeviation="4"/>
                                            <feComposite in2="hardAlpha" operator="out"/>
                                            <feColorMatrix type="matrix" values="0 0 0 0 0.854167 0 0 0 0 0.199306 0 0 0 0 0.435056 0 0 0 0.2 0"/>
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_944_19802"/>
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_944_19802" result="shape"/>
                                            </filter>
                                            </defs>
                                        </svg>
                                    </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>





            {/*Brief a Collection Modal*/}
            <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="CreateCollection" tabIndex="-1" aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog">
                <div className="modal-dialog max-w-[400px] modal-dialog-centered relative w-auto pointer-events-none">
                    <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between bg-primaryColor-shade-300 p-4">
                            <h5 className="text-xl font-bold leading-normal text-primaryColor uppercase"
                                id="exampleModalScrollableLabel">
                                Create Collection
                            </h5>
                            <button type="button"
                                    className="btn-close box-content w-4 h-4 p-1 !mr-0.5 text-black border-none  opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                    data-bs-dismiss="modal" aria-label="Close">
                            </button>
                        </div>
                        <div className="modal-body relative p-4">
                            <div className="space-y-4">
                                <div className="input-group">
                                    <label htmlFor="text" className="label">Collection Name</label>
                                    <input type="text"
                                           className="form-field bg-primaryColor-shade-300"
                                           id="text"
                                           placeholder="e.g. summar 22"
                                           name="text"/>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer p-4">
                            <button type="button" className="btn flex justify-between items-center max-w-[445px] w-full" data-bs-toggle="modal" data-bs-target="#Congratulations">
                                <span>Create</span>
                                <span className="ml-2">
                                    <PlusIcon />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/*ConfirmationAction Soon Modal*/}
            <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="Congratulations" tabIndex="-1" aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog">
                <div className="modal-dialog max-w-[400px] overflow-hidden modal-dialog-centered relative w-auto pointer-events-none">
                    <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between p-6 pb-0">
                            <h5 className="text-xl font-bold leading-normal text-primaryColor uppercase"
                                id="exampleModalScrollableLabel">
                                Congratulations!
                            </h5>
                            <button type="button"
                                    className="btn-close box-content w-4 h-4 p-1 text-black border-none  opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                    data-bs-dismiss="modal" aria-label="Close">
                            </button>
                        </div>
                        <div className="modal-body relative p-6">
                            <div className="space-y-4">
                                <p className="text-base"><strong>‘Summer 22’</strong>  collection has been created. </p>
                            </div>
                        </div>
                        <div className="modal-footer p-6">
                            <button type="button" className="btn w-full" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
                                View Collection
                            </button>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default StyleGuide //change the Boilarplate name to your specified name
