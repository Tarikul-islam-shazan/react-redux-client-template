import React from 'react'
import SelectComponent from "../../../app/common/SelectComponent";
import { ReactComponent as PlusIcon } from '../../images/plus.svg';
import { ReactComponent as PlusIconBlack } from '../../images/plus-black.svg';
import { ReactComponent as UploadIcon } from '../../images/upload.svg';
import { ReactComponent as FilterIcon } from '../../images/filter.svg';
import { ReactComponent as SearchIcon } from '../../images/search.svg';
import { ReactComponent as SearchIconWhite } from '../../images/search-white.svg';
import { ReactComponent as CloseIcon } from '../../images/close.svg';
import { ReactComponent as EditIcon } from '../../images/edit.svg';
import { ReactComponent as OkWhite } from '../../images/ok-white.svg';
import { ReactComponent as Refresh } from '../../images/refresh.svg';
import { ReactComponent as Dlt } from '../../images/dlt.svg';
import { ReactComponent as ArrowRightWhite } from '../../images/arror-right-white.svg';
import { ReactComponent as Favourite } from '../../images/favourite.svg';
import { ReactComponent as ArrorRightWhite } from '../../images/arror-right-white.svg';
import Pdf from '../../images/pdf.png';
import User from '../../images/user.jpg';
import Pant from "../../images/home/pant.png";
import Cloud from "../../images/home/cloud.png";

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

                 <div className="mb-4 xl:w-1/2">
                     <div className="flex items-center gap-4">
                         <h1 className="text-3xl font-semibold">Men’s Semi-formal Full Set Pack Summer 2022</h1>
                         <span className="cursor-pointer bg-white p-2">
                             <EditIcon />
                         </span>
                     </div>
                     <div className="flex items-center text-base italic gap-2 mt-2 mb-4">
                         <span>ID: NTX/BO/CO/88</span>
                         <div className="dot"></div>
                         <span>23 Styles</span>
                     </div>

                     <div className="flex items-start gap-3">
                         <p>To be sincerely honest in my humble opinion without being sentimental and of course, without offending anyone who thinks differently from my opinion but rather looking into this serious matter with perspective distinction and without condemning.</p>
                         <span className="cursor-pointer bg-white p-2">
                             <EditIcon />
                         </span>
                     </div>
                 </div>

                <div className="flex flex-col tab:flex-row justify-between gap-6 mb-6">
                    <span className="cursor-pointer text-base underline"><strong>10</strong> files attached</span>
                    <div className="flex flex-wrap gap-4">
                        <div className="input-group bordered-style w-full sm:w-[182px]">
                            <SelectComponent
                                options={[
                                    {label: "See Samples", value: "NITEX/BO/1212"},
                                    {label: "Country 1", value: "NITEX/BO/1212"},
                                    {label: "Country 2", value: "NITEX/BO/1212"}
                                ]}
                            />
                        </div>
                        <div className="input-group bordered-style w-full sm:w-[182px]">
                            <SelectComponent
                                options={[
                                    {label: "See Samples", value: "See Samples"},
                                    {label: "Country 1", value: "country1"},
                                    {label: "Country 2", value: "country2"}
                                ]}
                            />
                        </div>
                        <button type="button" data-bs-toggle="modal" data-bs-target="#UploadStyle" className="btn w-full sm:w-auto flex justify-between items-center">
                            <span>Add <strong className="font-bold">Style</strong></span>
                            <span className="ml-2">
                                <PlusIcon />
                            </span>
                        </button>
                    </div>
                </div>

                <div className="bg-white p-4 mb-6 relative min-h-[900px]">
                    <div className="flex flex-wrap gap-5">
                        <div className="favourite">
                            <span className="mt-2">
                                   <Favourite />
                            </span>
                        </div>
                    </div>

                    <button type="button"  className="btn even:bg-white-shade-100 text-primaryColor flex justify-between items-center absolute bottom-[15px] right-[15px]">
                        <span>Go to Moodboard</span>
                    </button>
                </div>




                <div className="filter">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-6">
                        <div className="flex items-start">
                            <span><input type="checkbox" id="SelectAll"/></span>
                            <label htmlFor="SelectAll" className="align-middle pl-4 inline-block mt-[-3px]">Select All</label>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <span className="badge bg-transparent border border-primaryColor pb-1 cursor-pointer">Aesthetic</span>
                            <span className="badge bg-transparent border border-primaryColor pb-1 cursor-pointer">Vintage</span>
                            <span className="badge bg-transparent border border-primaryColor pb-1 cursor-pointer">Aesthetic</span>
                            <span className="badge bg-transparent border border-primaryColor pb-1 cursor-pointer">Vintage</span>
                        </div>
                        <div className="flex flex-wrap items-center justify-end gap-4 lg:gap-2">
                            <div className="flex mr-4">
                                <div className="flex">
                                    <span className="w-[40px] h-[40px] cursor-pointer border-2 border-white rounded-full overflow-hidden inline-block ml-[-10px]">
                                        <img src={User} alt="" className="object-cover w-full h-full"/>
                                    </span>
                                        <span className="w-[40px] h-[40px] cursor-pointer border-2 border-white rounded-full overflow-hidden inline-block ml-[-10px]">
                                        <img src={User} alt="" className="object-cover w-full h-full"/>
                                    </span>
                                        <span className="w-[40px] h-[40px] cursor-pointer border-2 border-white rounded-full overflow-hidden inline-block ml-[-10px]">
                                        <img src={User} alt="" className="object-cover w-full h-full"/>
                                    </span>
                                        <span className="w-[40px] h-[40px] cursor-pointer bg-white font-semibold flex items-center justify-center border-2 border-white rounded-full overflow-hidden inline-block ml-[-10px]">
                                        <span>4+</span>
                                    </span>
                                </div>
                                <span  data-bs-toggle="modal" data-bs-target="#AddTeam" className="w-[40px] h-[40px] cursor-pointer bg-primaryColor font-semibold flex items-center justify-center border-2 border-white rounded-full overflow-hidden inline-block ml-[5px]">
                                    <PlusIcon />
                                </span>
                            </div>
                            <div className="flex items-center overflow-x-auto gap-2">
                                <button type="button" className="btn bg-transparent px-5 font-normal border border-primaryColor text-primaryColor">
                                    <SearchIcon />
                                </button>
                                <button type="button" className="btn bg-transparent px-5 font-normal border border-primaryColor text-primaryColor">
                                    <FilterIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 tab:grid-cols-3 xl:!grid-cols-4 gap-5 mb-60 tab:mb-40">
                    <div className="collection-box">
                        <div className="overflow-hidden relative h-[300px] sm:h-[330px] 5xl:h-[456px] p-4 bg-white border border-white">
                            <div className="h-full">
                                <img className="w-full h-full object-cover" src="/images/products/3.jpg"/>
                            </div>
                            <div className="flex items-start absolute left-[20px] top-[20px]">
                                <span><input type="checkbox" id="Summer"/></span>
                            </div>
                            <div className="w-[40px] h-[40px] bg-white border border-white-shade-100 flex justify-center items-center absolute right-[20px] top-[20px] cursor-pointer">
                                    <span className="mt-2">
                                         <Favourite />
                                    </span>
                            </div>
                        </div>

                        <div className="py-4">
                            <h4 className="text-xl font-bold text-primaryColor mb-3">Cotton elastane boat neck</h4>
                            <div className="flex items-center text-base text-primaryColor-shade-100 gap-1 mt-2 mb-4">
                                <span>Knit</span>
                                <div className="dot"></div>
                                <span>Organic</span>
                            </div>
                            <div className="flex  items-center gap-6 text-base font-bold text-primaryColor cursor-pointer">
                                <span>$ 12.50</span>
                                <span>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 12L14 19M3 12H21H3ZM21 12L14 5L21 12Z" stroke="#646464" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="collection-box">
                        <div className="overflow-hidden relative h-[300px] sm:h-[330px] 5xl:h-[456px] p-4 bg-white border border-white">
                            <div className="h-full">
                                <img className="w-full h-full object-cover" src="/images/products/3.jpg"/>
                            </div>
                            <div className="flex items-start absolute left-[20px] top-[20px]">
                                <span><input type="checkbox" id="Summer"/></span>
                            </div>
                            <div className="w-[40px] h-[40px] bg-white border border-white-shade-100 flex justify-center items-center absolute right-[20px] top-[20px] cursor-pointer">
                                    <span className="mt-2">
                                         <Favourite />
                                    </span>
                            </div>
                        </div>

                        <div className="py-4">
                            <h4 className="text-xl font-bold text-primaryColor mb-3">Cotton elastane boat neck</h4>
                            <div className="flex items-center text-base text-primaryColor-shade-100 gap-1 mt-2 mb-4">
                                <span>Knit</span>
                                <div className="dot"></div>
                                <span>Organic</span>
                            </div>
                            <div className="flex  items-center gap-6 text-base font-bold text-primaryColor cursor-pointer">
                                <span>$ 12.50</span>
                                <span>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 12L14 19M3 12H21H3ZM21 12L14 5L21 12Z" stroke="#646464" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="collection-box">
                        <div className="overflow-hidden relative h-[300px] sm:h-[330px] 5xl:h-[456px] p-4 bg-white border border-white">
                            <div className="h-full">
                                <img className="w-full h-full object-cover" src="/images/products/3.jpg"/>
                            </div>
                            <div className="flex items-start absolute left-[20px] top-[20px]">
                                <span><input type="checkbox" id="Summer"/></span>
                            </div>
                            <div className="w-[40px] h-[40px] bg-white border border-white-shade-100 flex justify-center items-center absolute right-[20px] top-[20px] cursor-pointer">
                                    <span className="mt-2">
                                         <Favourite />
                                    </span>
                            </div>
                        </div>

                        <div className="py-4">
                            <h4 className="text-xl font-bold text-primaryColor mb-3">Cotton elastane boat neck</h4>
                            <div className="flex items-center text-base text-primaryColor-shade-100 gap-1 mt-2 mb-4">
                                <span>Knit</span>
                                <div className="dot"></div>
                                <span>Organic</span>
                            </div>
                            <div className="flex  items-center gap-6 text-base font-bold text-primaryColor cursor-pointer">
                                <span>$ 12.50</span>
                                <span>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 12L14 19M3 12H21H3ZM21 12L14 5L21 12Z" stroke="#646464" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="collection-box">
                        <div className="overflow-hidden relative h-[300px] sm:h-[330px] 5xl:h-[456px] p-4 bg-white border border-white">
                            <div className="h-full">
                                <img className="w-full h-full object-cover" src="/images/products/3.jpg"/>
                            </div>
                            <div className="flex items-start absolute left-[20px] top-[20px]">
                                <span><input type="checkbox" id="Summer"/></span>
                            </div>
                            <div className="w-[40px] h-[40px] bg-white border border-white-shade-100 flex justify-center items-center absolute right-[20px] top-[20px] cursor-pointer">
                                    <span className="mt-2">
                                         <Favourite />
                                    </span>
                            </div>
                        </div>

                        <div className="py-4">
                            <h4 className="text-xl font-bold text-primaryColor mb-3">Cotton elastane boat neck</h4>
                            <div className="flex items-center text-base text-primaryColor-shade-100 gap-1 mt-2 mb-4">
                                <span>Knit</span>
                                <div className="dot"></div>
                                <span>Organic</span>
                            </div>
                            <div className="flex  items-center gap-6 text-base font-bold text-primaryColor cursor-pointer">
                                <span>$ 12.50</span>
                                <span>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 12L14 19M3 12H21H3ZM21 12L14 5L21 12Z" stroke="#646464" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="collection-box">
                        <div className="overflow-hidden relative h-[300px] sm:h-[330px] 5xl:h-[456px] p-4 bg-white border border-white">
                            <div className="h-full">
                                <img className="w-full h-full object-cover" src="/images/products/3.jpg"/>
                            </div>
                            <div className="flex items-start absolute left-[20px] top-[20px]">
                                <span><input type="checkbox" id="Summer"/></span>
                            </div>
                            <div className="w-[40px] h-[40px] bg-white border border-white-shade-100 flex justify-center items-center absolute right-[20px] top-[20px] cursor-pointer">
                                    <span className="mt-2">
                                         <Favourite />
                                    </span>
                            </div>
                        </div>

                        <div className="py-4">
                            <h4 className="text-xl font-bold text-primaryColor mb-3">Cotton elastane boat neck</h4>
                            <div className="flex items-center text-base text-primaryColor-shade-100 gap-1 mt-2 mb-4">
                                <span>Knit</span>
                                <div className="dot"></div>
                                <span>Organic</span>
                            </div>
                            <div className="flex  items-center gap-6 text-base font-bold text-primaryColor cursor-pointer">
                                <span>$ 12.50</span>
                                <span>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 12L14 19M3 12H21H3ZM21 12L14 5L21 12Z" stroke="#646464" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="option-bottom bg-primaryColor p-6 fixed bottom-0 left-0 right-0">
                    <div className="flex flex-col xl:flex-row items-center justify-between gap-6">
                        <div className="text-base font-normal text-white">
                            <strong>5 Items</strong> Selected
                        </div>
                        <div className="justify-end">
                            <div className="flex items-center justify-center flex-wrap overflow-x-auto gap-4">

                                <button type="button" data-bs-toggle="modal" data-bs-target="#UploadMoodboard" className="btn hidden sm:flex text-base 4xl:text-xl p-4 4xl:px-6 font-normal border border-white-shade-100">
                                    <span>Request for Quote</span>
                                </button>
                                <button type="button" data-bs-toggle="modal" data-bs-target="#RequestSample" className="btn hidden sm:flex text-base 4xl:text-xl p-4 4xl:px-6 font-normal border border-white-shade-100">
                                    <span>Request for Sample</span>
                                </button>

                                <div className="h-[60px] w-[1px] bg-primaryColor-shade-200 mx-3 hidden sm:flex"></div>

                                <button type="button" data-bs-toggle="modal" data-bs-target="#MoveCopyCollection" className="btn hidden sm:flex text-base 4xl:text-xl p-4 4xl:px-6 font-normal border border-white-shade-100 flex justify-between items-center">
                                    <span>Move / Copy to Collection</span>
                                    <span className="ml-4">
                                        <ArrorRightWhite />
                                    </span>
                                </button>

                                <button type="button" data-bs-toggle="modal" data-bs-target="#ReviewSelectedStyles" className="btn text-base 4xl:text-xl p-4 4xl:px-6 bg-white text-primaryColor font-medium">
                                    <span>Order Now!</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>




            {/*Upload Style Modal*/}
            <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="UploadStyle" tabIndex="-1" aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog">
                <div className="modal-dialog max-w-[1600px] mx-4 4xl:mx-auto modal-dialog-centered relative w-auto pointer-events-none">
                    <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between bg-primaryColor-shade-300 p-4">
                            <h5 className="text-xl font-bold leading-normal text-primaryColor uppercase"
                                id="exampleModalScrollableLabel">
                                Upload Style
                            </h5>
                            <button type="button"
                                    className="btn-close box-content w-4 h-4 p-1 !mr-0.5 text-black border-none  opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                    data-bs-dismiss="modal" aria-label="Close">
                            </button>
                        </div>
                        <div className="modal-body relative p-4">
                            <div className="space-y-4">
                                <div className="input-group">
                                    <label htmlFor="text" className="label">Uploaded Techpacks</label>
                                    <div className='file'>
                                        <input id='input-file' type='file'/>
                                        <label htmlFor='input-file' className="max-w-[445px]  justify-between">
                                            <span className="mr-4">Browse Files</span>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3 14V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V14" stroke="#282828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M12 3L17 8.44444M12 17V3V17ZM12 3L7 8.44446L12 3Z" stroke="#282828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-14  overflow-hidden">
                                <div className="flex justify-between items-center mb-5">
                                    <h5 className="text-xl font-bold leading-normal text-primaryColor">
                                        Attached Files
                                    </h5>
                                    <span className="text-base">4 files</span>
                                </div>
                                <div className="flex flex-col">
                                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                            <div className="overflow-y-auto">
                                                <table className="min-w-full">
                                                    <thead className="bg-white">
                                                    <tr>
                                                        <th scope="col" className="w-[100px] text-xl font-normal bg-white-shade-100 px-6 py-4 text-left first:border-r border-primaryColor-shade-200">

                                                        </th>
                                                        <th scope="col" className="text-xl  xl:w-1/3 font-normal bg-white-shade-100 px-6 py-4 text-left first:border-r border-primaryColor-shade-200">
                                                            File
                                                        </th>
                                                        <th scope="col" className="text-xl font-normal bg-white-shade-100 px-6 py-4 text-left first:border-r border-primaryColor-shade-200">
                                                            Style Name
                                                        </th>
                                                        <th scope="col" className="text-xl font-normal bg-white-shade-100 px-6 py-4 text-left first:border-r border-primaryColor-shade-200">
                                                            Market
                                                        </th>
                                                        <th scope="col" className="text-xl font-normal bg-white-shade-100 px-6 py-4 text-left first:border-r border-primaryColor-shade-200">
                                                            Category
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="even:bg-white-shade-100">
                                                            <td className="text-base font-normal px-6 py-6 whitespace-nowrap first:border-r border-primaryColor-shade-200">
                                                                <span className="cursor-pointer">
                                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6M3 6H21H3ZM5 6V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V6H5Z" stroke="#282828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                    <path d="M14 11V17" stroke="#282828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                    <path d="M10 11V17" stroke="#282828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                    </svg>
                                                                </span>
                                                            </td>
                                                            <td className="text-base font-normal px-6 py-6 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                        <span>
                                                                            <img src="./images/pdf.png" alt=""/>
                                                                        </span>
                                                                    <span className="text-base ml-4">Untiltled.pdf </span>
                                                                </div>
                                                            </td>
                                                            <td className="text-base font-normal px-6 py-6">
                                                                <div className="input-group">
                                                                    <input type="text"
                                                                           className="form-field bg-transparent border border-primaryColor w-[286px]"
                                                                           id="text"
                                                                           placeholder="Write Here ..."
                                                                           name="text"/>
                                                                </div>
                                                            </td>
                                                            <td className="text-base font-normal px-6 py-6">
                                                                <div className="input-group bordered-style w-[286px]">
                                                                    <SelectComponent
                                                                        options={[
                                                                            {label: "See Samples", value: "Select Market"},
                                                                            {label: "Country 1", value: "country1"},
                                                                            {label: "Country 2", value: "country2"}
                                                                        ]}
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td className="text-base font-normal px-6 py-6">
                                                                <div className="input-group bordered-style w-[286px]">
                                                                    <SelectComponent
                                                                        options={[
                                                                            {label: "See Samples", value: "Select Category"},
                                                                            {label: "Country 1", value: "country1"},
                                                                            {label: "Country 2", value: "country2"}
                                                                        ]}
                                                                    />
                                                                </div>
                                                            </td>
                                                         </tr>
                                                        <tr className="even:bg-white-shade-100">
                                                            <td className="text-base font-normal px-6 py-6 whitespace-nowrap first:border-r border-primaryColor-shade-200">
                                                                <span className="cursor-pointer">
                                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6M3 6H21H3ZM5 6V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V6H5Z" stroke="#282828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                    <path d="M14 11V17" stroke="#282828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                    <path d="M10 11V17" stroke="#282828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                    </svg>
                                                                </span>
                                                            </td>
                                                            <td className="text-base font-normal px-6 py-6 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                        <span>
                                                                            <img src="./images/pdf.png" alt=""/>
                                                                        </span>
                                                                    <span className="text-base ml-4">Untiltled.pdf </span>
                                                                </div>
                                                            </td>
                                                            <td className="text-base font-normal px-6 py-6">
                                                                <div className="input-group">
                                                                    <input type="text"
                                                                           className="form-field bg-transparent border border-primaryColor w-[286px]"
                                                                           id="text"
                                                                           placeholder="Write Here ..."
                                                                           name="text"/>
                                                                </div>
                                                            </td>
                                                            <td className="text-base font-normal px-6 py-6">
                                                                <div className="input-group bordered-style w-[286px]">
                                                                    <SelectComponent
                                                                        options={[
                                                                            {label: "See Samples", value: "Select Market"},
                                                                            {label: "Country 1", value: "country1"},
                                                                            {label: "Country 2", value: "country2"}
                                                                        ]}
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td className="text-base font-normal px-6 py-6">
                                                                <div className="input-group bordered-style w-[286px]">
                                                                    <SelectComponent
                                                                        options={[
                                                                            {label: "See Samples", value: "Select Category"},
                                                                            {label: "Country 1", value: "country1"},
                                                                            {label: "Country 2", value: "country2"}
                                                                        ]}
                                                                    />
                                                                </div>
                                                            </td>
                                                         </tr>
                                                        <tr className="even:bg-white-shade-100">
                                                            <td className="text-base font-normal px-6 py-6 whitespace-nowrap first:border-r border-primaryColor-shade-200">
                                                                <span className="cursor-pointer">
                                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6M3 6H21H3ZM5 6V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V6H5Z" stroke="#282828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                    <path d="M14 11V17" stroke="#282828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                    <path d="M10 11V17" stroke="#282828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                    </svg>
                                                                </span>
                                                            </td>
                                                            <td className="text-base font-normal px-6 py-6 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                        <span>
                                                                            <img src="./images/pdf.png" alt=""/>
                                                                        </span>
                                                                    <span className="text-base ml-4">Untiltled.pdf </span>
                                                                </div>
                                                            </td>
                                                            <td className="text-base font-normal px-6 py-6">
                                                                <div className="input-group">
                                                                    <input type="text"
                                                                           className="form-field bg-transparent border border-primaryColor w-[286px]"
                                                                           id="text"
                                                                           placeholder="Write Here ..."
                                                                           name="text"/>
                                                                </div>
                                                            </td>
                                                            <td className="text-base font-normal px-6 py-6">
                                                                <div className="input-group bordered-style w-[286px]">
                                                                    <SelectComponent
                                                                        options={[
                                                                            {label: "See Samples", value: "Select Market"},
                                                                            {label: "Country 1", value: "country1"},
                                                                            {label: "Country 2", value: "country2"}
                                                                        ]}
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td className="text-base font-normal px-6 py-6">
                                                                <div className="input-group bordered-style w-[286px]">
                                                                    <SelectComponent
                                                                        options={[
                                                                            {label: "See Samples", value: "Select Category"},
                                                                            {label: "Country 1", value: "country1"},
                                                                            {label: "Country 2", value: "country2"}
                                                                        ]}
                                                                    />
                                                                </div>
                                                            </td>
                                                         </tr>
                                                        <tr className="even:bg-white-shade-100">
                                                            <td className="text-base font-normal px-6 py-6 whitespace-nowrap first:border-r border-primaryColor-shade-200">
                                                                <span className="cursor-pointer">
                                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6M3 6H21H3ZM5 6V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V6H5Z" stroke="#282828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                    <path d="M14 11V17" stroke="#282828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                    <path d="M10 11V17" stroke="#282828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                    </svg>
                                                                </span>
                                                            </td>
                                                            <td className="text-base font-normal px-6 py-6 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                        <span>
                                                                            <img src="./images/pdf.png" alt=""/>
                                                                        </span>
                                                                    <span className="text-base ml-4">Untiltled.pdf </span>
                                                                </div>
                                                            </td>
                                                            <td className="text-base font-normal px-6 py-6">
                                                                <div className="input-group">
                                                                    <input type="text"
                                                                           className="form-field bg-transparent border border-primaryColor w-[286px]"
                                                                           id="text"
                                                                           placeholder="Write Here ..."
                                                                           name="text"/>
                                                                </div>
                                                            </td>
                                                            <td className="text-base font-normal px-6 py-6">
                                                                <div className="input-group bordered-style w-[286px]">
                                                                    <SelectComponent
                                                                        options={[
                                                                            {label: "See Samples", value: "Select Market"},
                                                                            {label: "Country 1", value: "country1"},
                                                                            {label: "Country 2", value: "country2"}
                                                                        ]}
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td className="text-base font-normal px-6 py-6">
                                                                <div className="input-group bordered-style w-[286px]">
                                                                    <SelectComponent
                                                                        options={[
                                                                            {label: "See Samples", value: "Select Category"},
                                                                            {label: "Country 1", value: "country1"},
                                                                            {label: "Country 2", value: "country2"}
                                                                        ]}
                                                                    />
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
                        <div className="modal-footer p-4">
                            <button type="button" className="btn flex justify-between items-center max-w-[445px] w-full" data-bs-toggle="modal" data-bs-target="#UploadStyleGreat">
                                <span>Upload <strong className="font-bold"> Styles</strong></span>
                                <span className="ml-2">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 12L14 19M3 12H21H3ZM21 12L14 5L21 12Z" stroke="#F5F5F5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/*Upload Style Great! Modal*/}
            <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="UploadStyleGreat" tabIndex="-1" aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog">
                <div className="modal-dialog max-w-[500px] modal-dialog-centered relative w-auto pointer-events-none">
                    <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between bg-primaryColor-shade-300 p-4">
                            <h5 className="text-xl font-bold leading-normal text-primaryColor uppercase"
                                id="exampleModalScrollableLabel">
                                Upload Style
                            </h5>
                            <button type="button"
                                    className="btn-close box-content w-4 h-4 p-1 !mr-0.5 text-black border-none  opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                    data-bs-dismiss="modal" aria-label="Close">
                            </button>
                        </div>
                        <div className="modal-body relative p-4 py-10">
                             <h4 className="text-2xl font-bold mb-5">Great!</h4>
                            <div className="space-y-2 text-xl flex flex-col">
                                <span><strong>‘Men Top 23’</strong> has been uploaded. </span>
                                <span><strong>‘Men Top 23’</strong> has been uploaded. </span>
                                <span><strong>‘Men Top 23’</strong> has been uploaded. </span>
                                <span><strong>‘Men Top 23’</strong> has been uploaded. </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*Review Selected Styles Modal*/}
            <div className='modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto'
                 id='ReviewSelectedStyles'
                 tabIndex='-1'
                 aria-labelledby='exampleModalCenterTitle'
                 aria-modal='true'
                 role='dialog'
            >
                <div className='modal-dialog max-w-[1600px] modal-dialog-centered relative w-auto pointer-events-none'>
                    <div className='modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding outline-none text-current'>
                        <div className='modal-header flex flex-shrink-0 items-center justify-between bg-primaryColor-shade-300 p-4'>
                            <h5
                                className='text-xl font-bold leading-normal text-primaryColor uppercase'
                                id='exampleModalScrollableLabel'
                            >
                                Review Selected Styles
                            </h5>
                            <button
                                type='button'
                                className='btn-close box-content w-4 h-4 p-1 !mr-0.5 text-black border-none  opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline'
                                data-bs-dismiss='modal'
                                aria-label='Close'
                            ></button>
                        </div>
                        <div className='modal-body relative p-5'>
                            <div className='mt-0'>
                                <div className='flex justify-between items-center mb-5'>
                                    <h5 className='text-xl font-bold leading-normal text-primaryColor'>
                                        Selected Styles
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
                                                            className='text-xl font-normal bg-white-shade-100 px-6 py-4 text-left border-r border-primaryColor-shade-200'
                                                        >
                                                            File
                                                        </th>
                                                        <th
                                                            scope='col'
                                                            className='text-xl font-normal bg-white-shade-100 px-6 py-4 text-left border-r border-primaryColor-shade-200'
                                                        >
                                                            Description
                                                        </th>
                                                        <th
                                                            scope='col'
                                                            className='text-xl font-normal bg-white-shade-100 px-6 py-4 text-left'
                                                        >
                                                            Status
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr className='even:bg-white-shade-100'>
                                                        <td className='text-base font-normal px-6 py-6 first:border-r border-primaryColor-shade-200'>
                                                                <span className='cursor-pointer'>
                                                                    <Dlt />
                                                                </span>
                                                        </td>
                                                        <td className='text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200'>
                                                            <div className='flex items-center'>
                                                                    <span className='w-[54px] h-[60px] border border-primaryColor-shade-300'>
                                                                        <img
                                                                            src={
                                                                                Pant
                                                                            }
                                                                            alt=''
                                                                            className='w-100 h-100 object-contain'
                                                                        />
                                                                    </span>
                                                                <span className='text-base ml-4'>
                                                                        Name of
                                                                        the
                                                                        style
                                                                    </span>
                                                            </div>
                                                        </td>
                                                        <td className='text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200'>
                                                                <span className='text-base'>
                                                                    155.75
                                                                    Gauge, 9%
                                                                    Metallic 53%
                                                                    Rubber 1%
                                                                    Jute 33%
                                                                    Modacrylic
                                                                    4% Spandex,
                                                                    Intarsia,
                                                                    Fade in back
                                                                    side,
                                                                    Coconut Nut,
                                                                    Both side
                                                                    bru
                                                                </span>
                                                        </td>
                                                        <td className='text-base font-normal px-6 py-6 whitespace-nowrap'>
                                                            <div className='flex items-center'>
                                                                    <span className='text-base ml-4'>
                                                                        Ready to
                                                                        Buy
                                                                    </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className='even:bg-white-shade-100'>
                                                        <td className='text-base font-normal px-6 py-6 first:border-r border-primaryColor-shade-200'>
                                                                <span className='cursor-pointer'>
                                                                    <Dlt />
                                                                </span>
                                                        </td>
                                                        <td className='text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200'>
                                                            <div className='flex items-center'>
                                                                    <span className='w-[54px] h-[60px] border border-primaryColor-shade-300'>
                                                                        <img
                                                                            src={
                                                                                Pant
                                                                            }
                                                                            alt=''
                                                                            className='w-100 h-100 object-contain'
                                                                        />
                                                                    </span>
                                                                <span className='text-base ml-4'>
                                                                        Name of
                                                                        the
                                                                        style
                                                                    </span>
                                                            </div>
                                                        </td>
                                                        <td className='text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200'>
                                                                <span className='text-base'>
                                                                    155.75
                                                                    Gauge, 9%
                                                                    Metallic 53%
                                                                    Rubber 1%
                                                                    Jute 33%
                                                                    Modacrylic
                                                                    4% Spandex,
                                                                    Intarsia,
                                                                    Fade in back
                                                                    side,
                                                                    Coconut Nut,
                                                                    Both side
                                                                    bru
                                                                </span>
                                                        </td>
                                                        <td className='text-base font-normal px-6 py-6 whitespace-nowrap'>
                                                            <div className='flex items-center'>
                                                                    <span className='text-base ml-4'>
                                                                        Ready to
                                                                        Buy
                                                                    </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className='even:bg-white-shade-100'>
                                                        <td className='text-base font-normal px-6 py-6 first:border-r border-primaryColor-shade-200'>
                                                                <span className='cursor-pointer'>
                                                                    <Dlt />
                                                                </span>
                                                        </td>
                                                        <td className='text-base font-normal px-6 py-6  border-r border-primaryColor-shade-200'>
                                                            <div className='flex items-center'>
                                                                    <span className='w-[54px] h-[60px] border border-primaryColor-shade-300'>
                                                                        <img
                                                                            src={
                                                                                Pant
                                                                            }
                                                                            alt=''
                                                                            className='w-100 h-100 object-contain'
                                                                        />
                                                                    </span>
                                                                <span className='text-base ml-4'>
                                                                        Name of
                                                                        the
                                                                        style
                                                                    </span>
                                                            </div>
                                                        </td>
                                                        <td className='text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200'>
                                                                <span className='text-base'>
                                                                    155.75
                                                                    Gauge, 9%
                                                                    Metallic 53%
                                                                    Rubber 1%
                                                                    Jute 33%
                                                                    Modacrylic
                                                                    4% Spandex,
                                                                    Intarsia,
                                                                    Fade in back
                                                                    side,
                                                                    Coconut Nut,
                                                                    Both side
                                                                    bru
                                                                </span>
                                                        </td>
                                                        <td className='text-base font-normal px-6 py-6 whitespace-nowrap'>
                                                            <button
                                                                type='button'
                                                                data-bs-toggle="modal" data-bs-target="#RequestQuote"
                                                                class='btn w-full'
                                                            >
                                                                <strong class='!font-bold'>
                                                                    Request{' '}
                                                                </strong>
                                                                Quote
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr className='even:bg-white-shade-100'>
                                                        <td className='text-base font-normal px-6 py-6 first:border-r border-primaryColor-shade-200'>
                                                                <span className='cursor-pointer'>
                                                                    <Dlt />
                                                                </span>
                                                        </td>
                                                        <td className='text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200'>
                                                            <div className='flex items-center'>
                                                                    <span className='w-[54px] h-[60px] border border-primaryColor-shade-300'>
                                                                        <img
                                                                            src={
                                                                                Pant
                                                                            }
                                                                            alt=''
                                                                            className='w-100 h-100 object-contain'
                                                                        />
                                                                    </span>
                                                                <span className='text-base ml-4'>
                                                                        Name of
                                                                        the
                                                                        style
                                                                    </span>
                                                            </div>
                                                        </td>
                                                        <td className='text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200'>
                                                                <span className='text-base'>
                                                                    155.75
                                                                    Gauge, 9%
                                                                    Metallic 53%
                                                                    Rubber 1%
                                                                    Jute 33%
                                                                    Modacrylic
                                                                    4% Spandex,
                                                                    Intarsia,
                                                                    Fade in back
                                                                    side,
                                                                    Coconut Nut,
                                                                    Both side
                                                                    bru
                                                                </span>
                                                        </td>
                                                        <td className='text-base font-normal px-6 py-6 whitespace-nowrap'>
                                                            <button
                                                                type='button'
                                                                class='btn w-full'
                                                            >
                                                                <strong class='!font-bold'>
                                                                    Review{' '}
                                                                </strong>
                                                                Quote
                                                            </button>
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
                                data-bs-target='#PlaceOrder'
                            >
                                <span>
                                    Buy{' '}
                                    <strong className='font-bold'>Now</strong>
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

            {/*Request for Quote Modal*/}
            <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="RequestQuote" tabIndex="-1" aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog">
                <div className="modal-dialog max-w-[1600px] mx-4 4xl:mx-auto modal-dialog-centered relative w-auto pointer-events-none">
                    <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between bg-primaryColor-shade-300 p-4">
                            <h5 className="text-xl font-bold leading-normal text-primaryColor uppercase"
                                id="exampleModalScrollableLabel">
                                Request for Quote
                            </h5>
                            <button type="button"
                                    className="btn-close box-content w-4 h-4 p-1 !mr-0.5 text-black border-none  opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                    data-bs-dismiss="modal" aria-label="Close">
                            </button>
                        </div>
                        <div className="modal-body relative p-4">

                            <div className="mb-4 space-y-5 xl:w-[70%]">
                                <div className="flex flex-col sm:flex-row items-start">
                                    <label className="mt-2 mb-2 font-semibold sm:font-normal sm:mb-0 sm:w-[20%]">Title</label>
                                    <div className="flex items-center  gap-5 sm:w-[80%]">
                                        <h1 className="text-3xl font-semibold">Men’s Semi-formal Full Set Pack Summer 2022</h1>
                                        <span className="cursor-pointer bg-white p-2">
                                         <EditIcon />
                                     </span>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start">
                                    <label className="mt-2 mb-2 sm:mb-0 font-semibold sm:font-normal sm:w-[20%]">Description</label>
                                    <div className="flex items-start gap-3 sm:w-[80%]">
                                        <p>To be sincerely honest in my humble opinion without being sentimental and of course, without offending anyone who thinks differently from my opinion but rather looking into this serious matter with perspective distinction and without condemning.</p>
                                        <span className="cursor-pointer bg-white p-2">
                                             <EditIcon />
                                         </span>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:justify-between space-y-5 sm:space-y-0">
                                    <div className="sm:w-[55%] lg:w-[60%] flex flex-col sm:flex-row  sm:items-center">
                                        <label className="mt-2 sm:w-[33%]">Attach</label>
                                        <div className="sm:w-[66%]">
                                            <div className='file'>
                                                <input id='input-file' type='file'/>
                                                <label htmlFor='input-file' className="max-w-[445px]  justify-between">
                                                    <span className="mr-4">Browse Files</span>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M3 14V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V14" stroke="#282828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M12 3L17 8.44444M12 17V3V17ZM12 3L7 8.44446L12 3Z" stroke="#282828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sm:w-[40%] 4xl:w-[35%] flex flex-col sm:flex-row sm:items-center">
                                        <label className="mt-2 sm:w-[40%] text-center">ETD</label>
                                        <div className="sm:w-[70%]">
                                            <input type="date" className="form-field border border-primaryColor uppercase" id="name"  name="name" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-14  overflow-hidden">
                                <div className="flex justify-between items-center mb-5">
                                    <h5 className="text-xl font-bold leading-normal text-primaryColor">
                                        Uploaded Files
                                    </h5>
                                    <span className="text-base">4 files</span>
                                </div>
                                <div className="flex flex-col">
                                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                            <div className="overflow-y-auto">
                                                <table className="min-w-full">
                                                    <thead className="bg-white">
                                                    <tr>
                                                        <th scope="col" className="w-[100px] text-xl font-normal bg-white-shade-100 px-6 py-4 text-left first:border-r border-primaryColor-shade-200">

                                                        </th>
                                                        <th scope="col" className="text-xl   font-normal bg-white-shade-100 px-6 py-4 text-left first:border-r border-primaryColor-shade-200">
                                                            File
                                                        </th>
                                                        <th scope="col" className="text-xl xl:w-1/5 font-normal bg-white-shade-100 px-6 py-4 text-left first:border-r border-primaryColor-shade-200">
                                                            Quantity
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                          <tr className="even:bg-white-shade-100">
                                                                <td className="text-base font-normal px-6 py-6 whitespace-nowrap first:border-r border-primaryColor-shade-200">
                                                                        <span className="cursor-pointer">
                                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6M3 6H21H3ZM5 6V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V6H5Z" stroke="#282828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                            <path d="M14 11V17" stroke="#282828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                            <path d="M10 11V17" stroke="#282828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                            </svg>
                                                                        </span>
                                                                </td>
                                                                <td className='text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200'>
                                                                  <div className='flex items-center'>
                                                                    <span className='w-[54px] h-[60px] border border-primaryColor-shade-300'>
                                                                        <img src={Pant}
                                                                            alt=''
                                                                            className='w-100 h-100 object-contain'
                                                                        />
                                                                    </span>
                                                                      <span className='text-base ml-4'>
                                                                            Name of the style
                                                                       </span>
                                                                  </div>
                                                              </td>
                                                                <td className="text-base font-normal px-6 py-6">
                                                                    <div className="input-group">
                                                                        <input type="text"
                                                                               className="form-field bg-transparent border border-primaryColor w-[286px]"
                                                                               id="text"
                                                                               placeholder="Input Quantity"
                                                                               name="text"/>
                                                                    </div>
                                                                </td>
                                                          </tr>
                                                          <tr className="even:bg-white-shade-100">
                                                                <td className="text-base font-normal px-6 py-6 whitespace-nowrap first:border-r border-primaryColor-shade-200">
                                                                        <span className="cursor-pointer">
                                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6M3 6H21H3ZM5 6V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V6H5Z" stroke="#282828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                            <path d="M14 11V17" stroke="#282828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                            <path d="M10 11V17" stroke="#282828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                            </svg>
                                                                        </span>
                                                                </td>
                                                                <td className='text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200'>
                                                                  <div className='flex items-center'>
                                                                    <span className='w-[54px] h-[60px] border border-primaryColor-shade-300'>
                                                                        <img src={Pant}
                                                                            alt=''
                                                                            className='w-100 h-100 object-contain'
                                                                        />
                                                                    </span>
                                                                      <span className='text-base ml-4'>
                                                                            Name of the style
                                                                       </span>
                                                                  </div>
                                                              </td>
                                                                <td className="text-base font-normal px-6 py-6">
                                                                    <div className="input-group">
                                                                        <input type="text"
                                                                               className="form-field bg-transparent border border-primaryColor w-[286px]"
                                                                               id="text"
                                                                               placeholder="Input Quantity"
                                                                               name="text"/>
                                                                    </div>
                                                                </td>
                                                          </tr>
                                                          <tr className="even:bg-white-shade-100">
                                                                <td className="text-base font-normal px-6 py-6 whitespace-nowrap first:border-r border-primaryColor-shade-200">
                                                                        <span className="cursor-pointer">
                                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6M3 6H21H3ZM5 6V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V6H5Z" stroke="#282828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                            <path d="M14 11V17" stroke="#282828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                            <path d="M10 11V17" stroke="#282828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                            </svg>
                                                                        </span>
                                                                </td>
                                                                <td className='text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200'>
                                                                  <div className='flex items-center'>
                                                                    <span className='w-[54px] h-[60px] border border-primaryColor-shade-300'>
                                                                        <img src={Pant}
                                                                            alt=''
                                                                            className='w-100 h-100 object-contain'
                                                                        />
                                                                    </span>
                                                                      <span className='text-base ml-4'>
                                                                            Name of the style
                                                                       </span>
                                                                  </div>
                                                              </td>
                                                                <td className="text-base font-normal px-6 py-6">
                                                                    <div className="input-group">
                                                                        <input type="text"
                                                                               className="form-field bg-transparent border border-primaryColor w-[286px]"
                                                                               id="text"
                                                                               placeholder="Input Quantity"
                                                                               name="text"/>
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
                        <div className="modal-footer p-4">
                            <button type="button" className="btn flex justify-between items-center max-w-[445px] w-full" data-bs-toggle="modal" data-bs-target="#UploadStyleGreat">
                                <span>Upload <strong className="font-bold"> Styles</strong></span>
                                <span className="ml-2">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 12L14 19M3 12H21H3ZM21 12L14 5L21 12Z" stroke="#F5F5F5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            {/*Request for Quote Modal*/}
            <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="RequestSample" tabIndex="-1" aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog">
                <div className="modal-dialog max-w-[1600px] mx-4 4xl:mx-auto modal-dialog-centered relative w-auto pointer-events-none">
                    <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between bg-primaryColor-shade-300 p-4">
                            <h5 className="text-xl font-bold leading-normal text-primaryColor uppercase"
                                id="exampleModalScrollableLabel">
                                Request for Quote
                            </h5>
                            <button type="button"
                                    className="btn-close box-content w-4 h-4 p-1 !mr-0.5 text-black border-none  opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                    data-bs-dismiss="modal" aria-label="Close">
                            </button>
                        </div>
                        <div className="modal-body relative p-4">

                            <div className="mb-4 space-y-5 xl:w-[70%]">
                                <div className="flex flex-col sm:flex-row items-start">
                                    <label className="mt-2 mb-2 font-semibold sm:font-normal sm:mb-0 sm:w-[20%]">Title</label>
                                    <div className="flex items-center  gap-5 sm:w-[80%]">
                                        <h1 className="text-3xl font-semibold">Men’s Semi-formal Full Set Pack Summer 2022</h1>
                                        <span className="cursor-pointer bg-white p-2">
                                         <EditIcon />
                                     </span>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start">
                                    <label className="mt-2 mb-2 sm:mb-0 font-semibold sm:font-normal sm:w-[20%]">Description</label>
                                    <div className="flex items-start gap-3 sm:w-[80%]">
                                        <p>To be sincerely honest in my humble opinion without being sentimental and of course, without offending anyone who thinks differently from my opinion but rather looking into this serious matter with perspective distinction and without condemning.</p>
                                        <span className="cursor-pointer bg-white p-2">
                                             <EditIcon />
                                         </span>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:justify-between space-y-5 sm:space-y-0">
                                    <div className="sm:w-[55%] lg:w-[60%] flex flex-col sm:flex-row  sm:items-center">
                                        <label className="mt-2 sm:w-[33%]">Attach</label>
                                        <div className="sm:w-[66%]">
                                            <div className='file'>
                                                <input id='input-file' type='file'/>
                                                <label htmlFor='input-file' className="max-w-[445px]  justify-between">
                                                    <span className="mr-4">Browse Files</span>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M3 14V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V14" stroke="#282828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M12 3L17 8.44444M12 17V3V17ZM12 3L7 8.44446L12 3Z" stroke="#282828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sm:w-[40%] 4xl:w-[35%] flex flex-col sm:flex-row sm:items-center">
                                        <label className="mt-2 sm:w-[40%]">ETD</label>
                                        <div className="sm:w-[70%]">
                                            <input type="date" className="form-field border border-primaryColor uppercase" id="name"  name="name" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-14  overflow-hidden">
                                <div className="flex justify-between items-center mb-5">
                                    <h5 className="text-xl font-bold leading-normal text-primaryColor">
                                        Uploaded Files
                                    </h5>
                                    <span className="text-base">4 files</span>
                                </div>
                                <div className="flex flex-col">
                                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                            <div className="overflow-y-auto">
                                                <table className="min-w-full">
                                                    <thead className="bg-white">
                                                    <tr>
                                                        <th scope="col" className="w-[100px] text-xl font-normal bg-white-shade-100 px-6 py-4 text-left border-r border-primaryColor-shade-200">

                                                        </th>
                                                        <th scope="col" className="text-xl w-[30%]  font-normal bg-white-shade-100 px-6 py-4 text-left border-r border-primaryColor-shade-200">
                                                            File
                                                        </th>
                                                        <th scope="col" className="text-xl  font-normal bg-white-shade-100 px-6 py-4 text-left border-r border-primaryColor-shade-200">
                                                            Size
                                                        </th>
                                                        <th scope="col" className="text-xl  font-normal bg-white-shade-100 px-6 py-4 text-left border-r border-primaryColor-shade-200">
                                                            Color
                                                        </th>
                                                        <th scope="col" className="text-xl  font-normal bg-white-shade-100 px-6 py-4 text-left">
                                                            Quantity
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                          <tr className="even:bg-white-shade-100">
                                                                <td className="text-base font-normal px-6 py-6 whitespace-nowrap border-r border-primaryColor-shade-200 align-top">
                                                                        <span className="cursor-pointer">
                                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6M3 6H21H3ZM5 6V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V6H5Z" stroke="#282828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                            <path d="M14 11V17" stroke="#282828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                            <path d="M10 11V17" stroke="#282828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                            </svg>
                                                                        </span>
                                                                </td>
                                                                <td className='text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200 align-top'>
                                                                      <div className="flex justify-between">
                                                                          <div className='flex items-center'>
                                                                        <span className='w-[54px] h-[60px] border border-primaryColor-shade-300'>
                                                                            <img src={Pant}
                                                                                 alt=''
                                                                                 className='w-100 h-100 object-contain'
                                                                            />
                                                                        </span>
                                                                              <span className='text-base ml-4'>
                                                                                Name of the style
                                                                           </span>
                                                                          </div>
                                                                          <button type="button" className="btn bg-transparent px-5 font-normal border border-primaryColor text-primaryColor">
                                                                              <PlusIconBlack />
                                                                          </button>
                                                                      </div>
                                                                </td>
                                                                <td className="text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200 align-top">
                                                                    <div className="flex flex-col gap-5">
                                                                        <div className="input-group bordered-style w-[286px]">
                                                                            <SelectComponent
                                                                                options={[
                                                                                    {label: "See Samples", value: "Size: XL"},
                                                                                    {label: "Country 1", value: "country1"},
                                                                                    {label: "Country 2", value: "country2"}
                                                                                ]}
                                                                            />
                                                                        </div>
                                                                        <div className="input-group bordered-style w-[286px]">
                                                                            <SelectComponent
                                                                                options={[
                                                                                    {label: "See Samples", value: "Size: XL"},
                                                                                    {label: "Country 1", value: "country1"},
                                                                                    {label: "Country 2", value: "country2"}
                                                                                ]}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200 align-top">
                                                                    <div className="input-group relative">
                                                                        <div>
                                                                            <input type="text"
                                                                                   className="form-field bg-transparent border border-primaryColor pr-14"
                                                                                   id="text"
                                                                                   placeholder="16-8888"
                                                                                   name="text"/>
                                                                        </div>
                                                                       <span className="color-circle-picker bg-[#DA336F]" style={{ 'border-radius': `100%` }}></span>
                                                                    </div>
                                                                </td>
                                                                <td className="text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200 align-top">
                                                                    <div className="input-group">
                                                                        <input type="text"
                                                                               className="form-field bg-transparent border border-primaryColor w-[286px]"
                                                                               id="text"
                                                                               placeholder="Input Quantity"
                                                                               name="text"/>
                                                                    </div>
                                                                </td>
                                                          </tr>
                                                          <tr className="even:bg-white-shade-100">
                                                                <td className="text-base font-normal px-6 py-6 whitespace-nowrap border-r border-primaryColor-shade-200 align-top">
                                                                        <span className="cursor-pointer">
                                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6M3 6H21H3ZM5 6V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V6H5Z" stroke="#282828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                            <path d="M14 11V17" stroke="#282828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                            <path d="M10 11V17" stroke="#282828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                            </svg>
                                                                        </span>
                                                                </td>
                                                                <td className='text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200 align-top'>
                                                                      <div className="flex justify-between">
                                                                          <div className='flex items-center'>
                                                                        <span className='w-[54px] h-[60px] border border-primaryColor-shade-300'>
                                                                            <img src={Pant}
                                                                                 alt=''
                                                                                 className='w-100 h-100 object-contain'
                                                                            />
                                                                        </span>
                                                                              <span className='text-base ml-4'>
                                                                                Name of the style
                                                                           </span>
                                                                          </div>
                                                                          <button type="button" className="btn bg-transparent px-5 font-normal border border-primaryColor text-primaryColor">
                                                                              <PlusIconBlack />
                                                                          </button>
                                                                      </div>
                                                                </td>
                                                                <td className="text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200 align-top">
                                                                    <div className="flex flex-col gap-5">
                                                                        <div className="input-group bordered-style w-[286px]">
                                                                            <SelectComponent
                                                                                options={[
                                                                                    {label: "See Samples", value: "Size: XL"},
                                                                                    {label: "Country 1", value: "country1"},
                                                                                    {label: "Country 2", value: "country2"}
                                                                                ]}
                                                                            />
                                                                        </div>
                                                                        <div className="input-group bordered-style w-[286px]">
                                                                            <SelectComponent
                                                                                options={[
                                                                                    {label: "See Samples", value: "Size: XL"},
                                                                                    {label: "Country 1", value: "country1"},
                                                                                    {label: "Country 2", value: "country2"}
                                                                                ]}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200 align-top">
                                                                    <div className="input-group relative">
                                                                        <div>
                                                                            <input type="text"
                                                                                   className="form-field bg-transparent border border-primaryColor pr-14"
                                                                                   id="text"
                                                                                   placeholder="16-8888"
                                                                                   name="text"/>
                                                                        </div>
                                                                       <span className="color-circle-picker bg-[#DA336F]" style={{ 'border-radius': `100%` }}></span>
                                                                    </div>
                                                                </td>
                                                                <td className="text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200 align-top">
                                                                    <div className="input-group">
                                                                        <input type="text"
                                                                               className="form-field bg-transparent border border-primaryColor w-[286px]"
                                                                               id="text"
                                                                               placeholder="Input Quantity"
                                                                               name="text"/>
                                                                    </div>
                                                                </td>
                                                          </tr>
                                                          <tr className="even:bg-white-shade-100">
                                                                <td className="text-base font-normal px-6 py-6 whitespace-nowrap border-r border-primaryColor-shade-200 align-top">
                                                                        <span className="cursor-pointer">
                                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6M3 6H21H3ZM5 6V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V6H5Z" stroke="#282828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                            <path d="M14 11V17" stroke="#282828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                            <path d="M10 11V17" stroke="#282828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                            </svg>
                                                                        </span>
                                                                </td>
                                                                <td className='text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200 align-top'>
                                                                      <div className="flex justify-between">
                                                                          <div className='flex items-center'>
                                                                            <span className='w-[54px] h-[60px] border border-primaryColor-shade-300'>
                                                                                <img src={Pant}
                                                                                     alt=''
                                                                                     className='w-100 h-100 object-contain'
                                                                                />
                                                                            </span>
                                                                                  <span className='text-base ml-4'>
                                                                                    Name of the style
                                                                               </span>
                                                                          </div>
                                                                      </div>
                                                                </td>
                                                                <td className="text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200 align-top">
                                                                    <div className="flex flex-col gap-5">
                                                                        <div className="input-group bordered-style w-[286px]">
                                                                            <SelectComponent
                                                                                options={[
                                                                                    {label: "See Samples", value: "Size: XL"},
                                                                                    {label: "Country 1", value: "country1"},
                                                                                    {label: "Country 2", value: "country2"}
                                                                                ]}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200 align-top">
                                                                    <div className="input-group relative">
                                                                        <div>
                                                                            <input type="text"
                                                                                   className="form-field bg-transparent border border-primaryColor pr-14"
                                                                                   id="text"
                                                                                   placeholder="16-8888"
                                                                                   name="text"/>
                                                                        </div>
                                                                       <span className="color-circle-picker bg-[#DA336F]" style={{ 'border-radius': `100%` }}></span>
                                                                    </div>
                                                                </td>
                                                                <td className="text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200 align-top">
                                                                    <div className="input-group">
                                                                        <input type="text"
                                                                               className="form-field bg-transparent border border-primaryColor w-[286px]"
                                                                               id="text"
                                                                               placeholder="Input Quantity"
                                                                               name="text"/>
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
                        <div className="modal-footer p-4">
                            <button type="button" className="btn flex justify-between items-center max-w-[445px] w-full" data-bs-toggle="modal" data-bs-target="#UploadStyleGreat">
                                <span>Ask Sample</span>
                                <span className="ml-2">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 12L14 19M3 12H21H3ZM21 12L14 5L21 12Z" stroke="#F5F5F5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/*Move / Copy to Collection Modal*/}
            <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="MoveCopyCollection" tabIndex="-1" aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog">
                <div className="modal-dialog max-w-[680px] modal-dialog-centered relative w-auto pointer-events-none">
                    <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between bg-primaryColor-shade-300 p-6">
                            <h5 className="text-4xl font-bold leading-normal text-primaryColor uppercase"
                                id="exampleModalScrollableLabel">
                                Move / Copy to Collection
                            </h5>
                            <button type="button"
                                    className="btn-close box-content w-4 h-4 p-1 !mr-0.5 text-black border-none  opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                    data-bs-dismiss="modal" aria-label="Close">
                            </button>
                        </div>
                        <div className="modal-body relative">
                            <div className="flex justify-between gap-5 px-6 py-4">
                                <div className="flex flex-1 w-full">
                                    <input type="text" className="form-field w-[90%] border border-primaryColor  p-2 px-4" id="name" placeholder="Search ..." name="name" />
                                    <button type="button" className="btn w-[60px] flex items-center justify-center p-2">
                                        <SearchIconWhite />
                                    </button>
                                </div>
                                <button type="button" className="btn bg-transparent px-5 font-normal border border-primaryColor text-primaryColor">
                                    <PlusIconBlack />
                                </button>
                            </div>
                            <div className="">
                                <h4 className="px-6 py-4 cursor-pointer text-xl hover:text-white hover:bg-primaryColor">Summer Mens Top 22</h4>
                                <h4 className="px-6 py-4 cursor-pointer text-xl hover:text-white hover:bg-primaryColor text-white bg-primaryColor">Summer Mens Top 22</h4>
                                <h4 className="px-6 py-4 cursor-pointer text-xl hover:text-white hover:bg-primaryColor">Summer Mens Top 22</h4>
                                <h4 className="px-6 py-4 cursor-pointer text-xl hover:text-white hover:bg-primaryColor">Summer Mens Top 22</h4>
                                <h4 className="px-6 py-4 cursor-pointer text-xl hover:text-white hover:bg-primaryColor">Summer Mens Top 22</h4>
                            </div>
                        </div>
                        <div className="modal-footer flex gap-5 border-t border-white-shade-100 p-6">
                            <button type="button" className="btn flex-1 bg-transparent font-normal border border-primaryColor text-primaryColor flex justify-between items-center">
                                <span>Move</span>
                                <span className="ml-2">
                                     <UploadIcon />
                                </span>
                            </button>
                            <button type="button" className="btn  flex-1 flex justify-between items-center">
                                <span>Copy</span>
                                <span className="ml-2">
                                    <ArrorRightWhite />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>



            {/*Add Team Modal*/}
            <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="AddTeam" tabIndex="-1" aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog">
                <div className="modal-dialog max-w-[485px] modal-dialog-centered relative w-auto pointer-events-none">
                    <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between bg-primaryColor-shade-300 p-6">
                            <h5 className="text-xl font-bold leading-normal text-primaryColor uppercase"
                                id="exampleModalScrollableLabel">
                                Team
                            </h5>
                            <button type="button"
                                    className="btn-close box-content w-4 h-4 p-1 !mr-0.5 text-black border-none  opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                    data-bs-dismiss="modal" aria-label="Close">
                            </button>
                        </div>
                        <div className="modal-body relative">
                            <div className="p-4 border-b border-white-shade-100">
                                <div className="flex flex-1 w-full mb-4">
                                    <input type="text" className="form-field w-[90%] border border-primaryColor  p-2 px-4" id="name" placeholder="Search Team Member ..." name="name" />
                                    <button type="button" className="btn w-[60px] flex items-center justify-center p-2">
                                        <SearchIconWhite />
                                    </button>
                                </div>
                                <label>4 Members</label>
                            </div>
                            <div className="m-4 mt-0">
                                <div className="flex items-center justify-between gap-5 py-6 border-b border-white-shade-100 last:border-white">
                                    <div className="flex items-center gap-5 w-[90%]">
                                        <div className="w-[12%]">
                                            <span className="w-[42px] h-[42px]  border-2 border-white rounded-full overflow-hidden inline-block">
                                                <img src={User} alt="" className="object-cover w-full h-full"/>
                                            </span>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-4">
                                                <h5 className="font-bold">Shibly S.</h5>
                                                <span className='w-[1px] h-[16px] bg-primaryColor-shade-200'></span>
                                                <span>Creator</span>
                                            </div>
                                            <span>shibly@gmail.com</span>
                                        </div>
                                    </div>
                                    <div className="cursor-pointer w-[10%]">
                                        <Dlt />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between gap-5 py-6 border-b border-white-shade-100 last:border-white">
                                    <div className="flex items-center gap-5 w-[90%]">
                                        <div className="w-[12%]">
                                            <span className="w-[42px] h-[42px]  border-2 border-white rounded-full overflow-hidden inline-block">
                                                <img src={User} alt="" className="object-cover w-full h-full"/>
                                            </span>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-4">
                                                <h5 className="font-bold">Shibly S.</h5>
                                                <span className='w-[1px] h-[16px] bg-primaryColor-shade-200'></span>
                                                <span>Creator</span>
                                            </div>
                                            <span>shibly@gmail.com</span>
                                        </div>
                                    </div>
                                    <div className="cursor-pointer w-[10%]">
                                        <Dlt />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between gap-5 py-6 border-b border-white-shade-100 last:border-white">
                                    <div className="flex items-center gap-5 w-[90%]">
                                        <div className="w-[12%]">
                                            <span className="w-[42px] h-[42px]  border-2 border-white rounded-full overflow-hidden inline-block">
                                                <img src={User} alt="" className="object-cover w-full h-full"/>
                                            </span>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-4">
                                                <h5 className="font-bold">Shibly S.</h5>
                                                <span className='w-[1px] h-[16px] bg-primaryColor-shade-200'></span>
                                                <span>Creator</span>
                                            </div>
                                            <span>shibly@gmail.com</span>
                                        </div>
                                    </div>
                                    <div className="cursor-pointer w-[10%]">
                                        <Dlt />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col m-4">
                                <label className="text-xl mb-3">Invite ‘shibly@nitex.info’</label>
                                <button type="button" className="btn">Activated Soon</button>
                            </div>
                            <div className="flex flex-col m-4">
                                <label className="text-xl mb-1">Invitation sent to </label>
                                <label className="text-xl mb-3 font-bold">‘shibly@nitex.info’</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>






        </div>
    )
}

export default StyleGuide //change the Boilarplate name to your specified name
