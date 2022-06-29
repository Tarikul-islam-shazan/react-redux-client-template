import React from 'react'
import SelectComponent from "../../../app/common/SelectComponent";
import SliderWrapper from "../../../app/common/SliderWrapper";
import slide from '../../images/home/slide.png';
import slide1 from '../../images/home/slide1.png';
import Cloud from '../../images/home/cloud.png';
import { ReactComponent as Favourite } from '../../images/favourite.svg';

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
                                <path d="M10.4454 18.7608L2.57617 10.5663C0.359638 8.2582 0.499218 4.4736 2.87922 2.34929C5.24035 0.241811 8.82044 0.651052 10.6863 3.24171L11 3.67724L11.3137 3.24171C13.1796 0.651052 16.7596 0.241811 19.1208 2.34929C21.5008 4.4736 21.6404 8.2582 19.4238 10.5663L11.5546 18.7608C11.2483 19.0797 10.7517 19.0797 10.4454 18.7608Z" stroke="#282828" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                        <span className="absolute top-[-9px] right-[-22px] text-sm text-white-shade-100 bg-primaryColor inline-block rounded-[20px] px-3 text-center">12</span>
                    </div>
                    <div className="w-[40px] h-[40px] rounded-full bg-primaryColor-shade-300 p-2 relative flex items-center justify-center cursor-pointer">
                        <span>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.6 9.45798V8.4C5.6 4.86538 8.46538 2 12 2C15.5346 2 18.4 4.86537 18.4 8.4V9.45798C18.4 11.7583 19.0649 14.0096 20.3146 15.9409L21 17H3L3.68539 15.9408C4.93512 14.0096 5.6 11.7583 5.6 9.45798Z" stroke="#282828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M11 20.8887C11.5344 21.4825 12.4656 21.4825 13 20.8887" stroke="#282828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
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
                <div className="banner-section flex flex-col xl:flex-row gap-4">
                    <div className="xl:w-[30%] 4xl:w-1/4">
                        <div id="carouselExampleCaptions" className="carousel slide relative bg-[#0476E0] h-full px-4 py-6" data-bs-ride="carousel">
                            <div className="carousel-inner relative w-full overflow-hidden">
                                <div className="carousel-item active relative float-left w-full bg-no-repeat bg-right-top"  style={{ 'background-image': `url(${Cloud})` }}>
                                    <div className="flex justify-between">
                                        <span className="text-white-shade-100 text-4xl font-bold uppercase opacity-20">
                                            DEC 17 <br/>
                                            2022
                                        </span>
                                    </div>
                                    <div className="carousel-caption pb-5 mt-9">
                                        <span className="inline-block text-xl text-white-shade-100 mb-3">Good Morning!</span>
                                        <h5 className="text-4xl text-white-shade-100 font-bold mb-3 truncate-2">Robert D. Junior Ironman</h5>
                                        <span className="inline-block text-xl text-white-shade-100 mb-3 truncate-2">Wishing you a productive day</span>
                                    </div>
                                </div>
                                <div className="carousel-item relative float-left w-full bg-no-repeat bg-right-top"  style={{ 'background-image': `url(${Cloud})` }}>
                                    <div className="flex justify-between">
                                        <span className="text-white-shade-100 text-4xl font-bold uppercase opacity-20">
                                            DEC 18 <br/>
                                            2022
                                        </span>
                                    </div>
                                    <div className="carousel-caption pb-5 mt-9">
                                        <span className="inline-block text-xl text-white-shade-100 mb-3">Good Morning!</span>
                                        <h5 className="text-4xl text-white-shade-100 font-bold mb-3 truncate-2">Robert D. Junior Ironman</h5>
                                        <span className="inline-block text-xl text-white-shade-100 mb-3 truncate-2">Wishing you a productive day Wishing you a productive day</span>
                                    </div>
                                </div>
                                <div className="carousel-item relative float-left w-full bg-no-repeat bg-right-top"  style={{ 'background-image': `url(${Cloud})` }}>
                                    <div className="flex justify-between">
                                        <span className="text-white-shade-100 text-4xl font-bold uppercase opacity-20">
                                            DEC 19 <br/>
                                            2022
                                        </span>
                                    </div>
                                    <div className="carousel-caption pb-5 mt-9">
                                        <span className="inline-block text-xl text-white-shade-100 mb-3">Good Morning!</span>
                                        <h5 className="text-4xl text-white-shade-100 font-bold mb-3 truncate-2">Robert D. Junior Ironman</h5>
                                        <span className="inline-block text-xl text-white-shade-100 mb-3 truncate-2">Wishing you a productive day Wishing you a productive day</span>
                                    </div>
                                </div>
                                <div className="carousel-item relative float-left w-full bg-no-repeat bg-right-top"  style={{ 'background-image': `url(${Cloud})` }}>
                                    <div className="flex justify-between">
                                        <span className="text-white-shade-100 text-4xl font-bold uppercase opacity-20">
                                            DEC 20 <br/>
                                            2022
                                        </span>
                                    </div>
                                    <div className="carousel-caption pb-5 mt-9">
                                        <span className="inline-block text-xl text-white-shade-100 mb-3">Good Morning!</span>
                                        <h5 className="text-4xl text-white-shade-100 font-bold mb-3 truncate-2">Robert D. Junior Ironman</h5>
                                        <span className="inline-block text-xl text-white-shade-100 mb-3 truncate-2">Wishing you a productive day Wishing you a productive day</span>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-indicators m-0 mr-2 flex justify-end absolute bottom-[20px] right-[15px]">
                                <div>
                                    <button
                                        type="button"
                                        data-bs-target="#carouselExampleCaptions"
                                        data-bs-slide-to="0"
                                        className="active"
                                        aria-current="true"
                                        aria-label="Slide 1"
                                    ></button>
                                    <button
                                        type="button"
                                        data-bs-target="#carouselExampleCaptions"
                                        data-bs-slide-to="1"
                                        aria-label="Slide 2"
                                    ></button>
                                    <button
                                        type="button"
                                        data-bs-target="#carouselExampleCaptions"
                                        data-bs-slide-to="2"
                                        aria-label="Slide 3"
                                    ></button>
                                    <button
                                        type="button"
                                        data-bs-target="#carouselExampleCaptions"
                                        data-bs-slide-to="3"
                                        aria-label="Slide 4"
                                    ></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="xl:w-[70%] 4xl:w-4/5">
                        <div className="bg-primaryColor xl:h-[431px] p-4 pb-0 flex flex-col md:flex-row justify-between relative">
                            <div className="md:w-7/12 pt-16 p-5 md:pr-10 relative">
                                <div className="flex gap-3">
                                    <span className="badge bg-warning font-bold">New</span>
                                    <span className="badge bg-success">Eco-Friendly</span>
                                </div>
                                <h1 className="text-4xl text-white-shade-100 font-bold mt-6 mb-8 leading-[54px] xl:ellipsis-2">Men’s Semi-formal Full Set Pack Summer 2022</h1>
                                <div className="flex items-center text-base md:text-xl text-white-shade-100 gap-3 md:gap-5">
                                    <span>Designed by NITEX</span>
                                    <span className="leading-none inline-block mb-2">.</span>
                                    <span>23 Styles</span>
                                </div>
                                <div className="color-list flex gap-1 mt-16">
                                    <span className="color-circle bg-primaryColor"></span>
                                    <span className="color-circle bg-primaryColor-shade-300"></span>
                                    <span className="color-circle bg-primaryColor-shade-200"></span>
                                    <span className="color-circle bg-[#D1B59D]"></span>
                                </div>
                                <img src="/images/leef1.png" className="absolute left-[-32px] top-[-40px] z-10" alt=""/>
                                <img src="/images/leef2.png" className="absolute right-[-94px] xl:right-[-40px] bottom-0 z-10 hidden xl:block" alt=""/>
                            </div>
                            <div className="md:w-5/12 h-full overflow-hidden relative">
                                <div className="image-grid-overlay">
                                    <div className="columns-3 gap-1">
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
                                <div className="favourite">
                                    <span className="mt-2">
                                        <svg width="38" height="36" viewBox="0 0 38 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g filter="url(#filter0_d_944_19802)">
                                            <path d="M18.4415 22.7608L10.5723 14.5663C8.35573 12.2582 8.49531 8.4736 10.8753 6.34929C13.2364 4.24181 16.8165 4.65105 18.6824 7.24171L18.9961 7.67724L19.3098 7.24171C21.1757 4.65105 24.7557 4.24181 27.1169 6.34929C29.4969 8.4736 29.6365 12.2582 27.4199 14.5663L19.5507 22.7608C19.2444 23.0797 18.7478 23.0797 18.4415 22.7608Z" fill="#DA336F"/>
                                            <path d="M18.4415 22.7608L10.5723 14.5663C8.35573 12.2582 8.49531 8.4736 10.8753 6.34929C13.2364 4.24181 16.8165 4.65105 18.6824 7.24171L18.9961 7.67724L19.3098 7.24171C21.1757 4.65105 24.7557 4.24181 27.1169 6.34929C29.4969 8.4736 29.6365 12.2582 27.4199 14.5663L19.5507 22.7608C19.2444 23.0797 18.7478 23.0797 18.4415 22.7608Z" stroke="#F5F5F5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </g>
                                            <defs>
                                            <filter id="filter0_d_944_19802" x="0.496094" y="0.5" width="37" height="35" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
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

                {/*for New User*/}
                <div>Bottom 1 is For New User </div>
                <div className="banner-section flex flex-col xl:flex-row gap-4">
                    <div className="xl:w-[30%] 4xl:w-1/4">
                        <div id="carouselExampleCaptions2" className="carousel slide relative  bg-[#0476E0] px-4 py-6" data-bs-ride="carousel">
                            <div className="carousel-inner relative w-full overflow-hidden">
                                <div className="carousel-item active relative float-left w-full">
                                    <div className="flex justify-between">
                                        <span className="text-white-shade-100 text-4xl font-bold uppercase opacity-20">
                                            DEC 17 <br/>
                                            2022
                                        </span>

                                    </div>
                                    <div className="carousel-caption pb-5">
                                        <span className="inline-block text-xl text-white-shade-100 mb-3">Good Morning!</span>
                                        <h5 className="text-4xl text-white-shade-100 font-bold mb-3">Robert D. Junior Ironman</h5>
                                        <span className="inline-block text-xl text-white-shade-100 mb-3">Wishing you a productive day</span>
                                    </div>
                                </div>
                                <div className="carousel-item relative float-left w-full">
                                    <div className="flex justify-between">
                                        <span className="text-white-shade-100 text-4xl font-bold uppercase opacity-20">
                                            DEC 18 <br/>
                                            2022
                                        </span>

                                    </div>
                                    <div className="carousel-caption pb-5">
                                        <span className="inline-block text-xl text-white-shade-100 mb-3">Good Morning!</span>
                                        <h5 className="text-4xl text-white-shade-100 font-bold mb-3">Robert D. Junior Ironman</h5>
                                        <span className="inline-block text-xl text-white-shade-100 mb-3">Wishing you a productive day</span>
                                    </div>
                                </div>
                                <div className="carousel-item relative float-left w-full">
                                    <div className="flex justify-between">
                                        <span className="text-white-shade-100 text-4xl font-bold uppercase opacity-20">
                                            DEC 19 <br/>
                                            2022
                                        </span>

                                    </div>
                                    <div className="carousel-caption pb-5">
                                        <span className="inline-block text-xl text-white-shade-100 mb-3">Good Morning!</span>
                                        <h5 className="text-4xl text-white-shade-100 font-bold mb-3">Robert D. Junior Ironman</h5>
                                        <span className="inline-block text-xl text-white-shade-100 mb-3">Wishing you a productive day</span>
                                    </div>
                                </div>
                                <div className="carousel-item relative float-left w-full">
                                    <div className="flex justify-between">
                                        <span className="text-white-shade-100 text-4xl font-bold uppercase opacity-20">
                                            DEC 20 <br/>
                                            2022
                                        </span>

                                    </div>
                                    <div className="carousel-caption pb-5">
                                        <span className="inline-block text-xl text-white-shade-100 mb-3">Good Morning!</span>
                                        <h5 className="text-4xl text-white-shade-100 font-bold mb-3">Robert D. Junior Ironman</h5>
                                        <span className="inline-block text-xl text-white-shade-100 mb-3">Wishing you a productive day</span>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-indicators m-0 mr-2 flex justify-end">
                                <div>
                                    <button
                                        type="button"
                                        data-bs-target="#carouselExampleCaptions2"
                                        data-bs-slide-to="0"
                                        className="active"
                                        aria-current="true"
                                        aria-label="Slide 1"
                                    ></button>
                                    <button
                                        type="button"
                                        data-bs-target="#carouselExampleCaptions2"
                                        data-bs-slide-to="1"
                                        aria-label="Slide 2"
                                    ></button>
                                    <button
                                        type="button"
                                        data-bs-target="#carouselExampleCaptions2"
                                        data-bs-slide-to="2"
                                        aria-label="Slide 3"
                                    ></button>
                                    <button
                                        type="button"
                                        data-bs-target="#carouselExampleCaptions2"
                                        data-bs-slide-to="3"
                                        aria-label="Slide 4"
                                    ></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="xl:w-[70%] 4xl:w-4/5">
                        <div className="flex items-center justify-center h-full py-10">
                            <div className="max-w-[582px] text-center relative">
                                <img src="/images/leef-new.png" className="absolute left-0 sm:left-[-74px] top-0 z-10 hidden sm:block" alt="" />
                                <h1 className="text-4xl sm:text-5xl text-primaryColor font-bold  mb-4">We are designing <br/> for you</h1>
                                <p className="max-w-[398px] text-base text-primaryColor m-0">We are designing something interisting for you.  We will revolutionize together.</p>
                                <img src="/images/leef-new-reflect.png" className="absolute right-0 sm:right-[-74px] top-0 z-10 hidden sm:block" alt="" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 py-4">
                    <div className="collection-box">
                        <div className="overflow-hidden relative h-[300px] sm:h-[400px] xl:h-[524px] p-4 bg-white">
                            <div className="image-grid-overlay-white">
                                <div className="columns-3 gap-1">
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
                            <div className="w-[40px] h-[40px] bg-white border border-white-shade-100 flex justify-center items-center absolute right-[20px] top-[20px] cursor-pointer">
                                    <span className="mt-2">
                                        <svg width="38" height="36" viewBox="0 0 38 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g filter="url(#filter0_d_944_19802)">
                                            <path d="M18.4415 22.7608L10.5723 14.5663C8.35573 12.2582 8.49531 8.4736 10.8753 6.34929C13.2364 4.24181 16.8165 4.65105 18.6824 7.24171L18.9961 7.67724L19.3098 7.24171C21.1757 4.65105 24.7557 4.24181 27.1169 6.34929C29.4969 8.4736 29.6365 12.2582 27.4199 14.5663L19.5507 22.7608C19.2444 23.0797 18.7478 23.0797 18.4415 22.7608Z" fill="#DA336F"/>
                                            <path d="M18.4415 22.7608L10.5723 14.5663C8.35573 12.2582 8.49531 8.4736 10.8753 6.34929C13.2364 4.24181 16.8165 4.65105 18.6824 7.24171L18.9961 7.67724L19.3098 7.24171C21.1757 4.65105 24.7557 4.24181 27.1169 6.34929C29.4969 8.4736 29.6365 12.2582 27.4199 14.5663L19.5507 22.7608C19.2444 23.0797 18.7478 23.0797 18.4415 22.7608Z" stroke="#F5F5F5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </g>
                                            <defs>
                                            <filter id="filter0_d_944_19802" x="0.496094" y="0.5" width="37" height="35" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
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
                        <div className="flex flex-col-reverse xl:flex-row justify-between items-start p-4 pt-0 bg-white">
                            <div>
                                <h4 className="text-xl font-bold text-primaryColor">Men’s Semi-formal Full Set Pack Summer 2022</h4>
                                <div className="flex items-center text-base text-primaryColor gap-5 mt-2">
                                    <span>Designed by NITEX</span>
                                    <span className="leading-none inline-block mb-2">.</span>
                                    <span>23 Styles</span>
                                </div>
                                <div className="color-list flex gap-1 mt-5">
                                    <span className="color-circle bg-primaryColor"></span>
                                    <span className="color-circle bg-primaryColor-shade-300"></span>
                                    <span className="color-circle bg-primaryColor-shade-200"></span>
                                    <span className="color-circle bg-[#D1B59D]"></span>
                                </div>
                            </div>
                            <div className="flex gap-3 mb-2 xl:mb-0">
                                <span className="badge bg-warning font-bold">New</span>
                                <span className="badge bg-success">Eco-Friendly</span>
                            </div>
                        </div>
                    </div>
                    <div className="collection-box">
                        <div className="overflow-hidden relative  h-[300px] sm:h-[400px] xl:h-[524px] p-4 bg-white">
                            <div className="image-grid-overlay-white">
                                <div className="columns-3 gap-1">
                                    <img className="w-full mb-1" src="/images/products/1.jpg"/>
                                    <img className="w-full mb-1" src="/images/products/3.jpg"/>
                                    <img className="w-full mb-1" src="/images/products/2.jpg"/>
                                </div>
                            </div>
                            <div className="w-[40px] h-[40px] bg-white border border-white-shade-100 flex justify-center items-center absolute right-[20px] top-[20px] cursor-pointer">
                               <span className="mt-2">
                                   <svg width="38" height="36" viewBox="0 0 38 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g filter="url(#filter0_d_944_19802)">
                                            <path d="M18.4415 22.7608L10.5723 14.5663C8.35573 12.2582 8.49531 8.4736 10.8753 6.34929C13.2364 4.24181 16.8165 4.65105 18.6824 7.24171L18.9961 7.67724L19.3098 7.24171C21.1757 4.65105 24.7557 4.24181 27.1169 6.34929C29.4969 8.4736 29.6365 12.2582 27.4199 14.5663L19.5507 22.7608C19.2444 23.0797 18.7478 23.0797 18.4415 22.7608Z" fill="#DA336F"/>
                                            <path d="M18.4415 22.7608L10.5723 14.5663C8.35573 12.2582 8.49531 8.4736 10.8753 6.34929C13.2364 4.24181 16.8165 4.65105 18.6824 7.24171L18.9961 7.67724L19.3098 7.24171C21.1757 4.65105 24.7557 4.24181 27.1169 6.34929C29.4969 8.4736 29.6365 12.2582 27.4199 14.5663L19.5507 22.7608C19.2444 23.0797 18.7478 23.0797 18.4415 22.7608Z" stroke="#F5F5F5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </g>
                                            <defs>
                                            <filter id="filter0_d_944_19802" x="0.496094" y="0.5" width="37" height="35" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
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
                        <div className="flex flex-col-reverse xl:flex-row justify-between items-start p-4 pt-0 bg-white">
                            <div>
                                <h4 className="text-xl font-bold text-primaryColor">Men’s Semi-formal Full Set Pack Summer 2022</h4>
                                <div className="flex items-center text-base text-primaryColor gap-5 mt-2">
                                    <span>Designed by NITEX</span>
                                    <span className="leading-none inline-block mb-2">.</span>
                                    <span>23 Styles</span>
                                </div>
                                <div className="color-list flex gap-1 mt-5">
                                    <span className="color-circle bg-primaryColor"></span>
                                    <span className="color-circle bg-primaryColor-shade-300"></span>
                                    <span className="color-circle bg-primaryColor-shade-200"></span>
                                    <span className="color-circle bg-[#D1B59D]"></span>
                                </div>
                            </div>
                            <div className="flex gap-3 mb-2 xl:mb-0">
                                <span className="badge bg-warning font-bold">New</span>
                                <span className="badge bg-success">Eco-Friendly</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pb-4">
                    <div className="collection-box grid grid-cols-1 md:grid-cols-2 bg-white">
                        <div className="p-6 xl:p-10 relative flex items-center">
                           <div>
                               <div className="flex gap-3">
                                   <span className="badge bg-warning font-bold py-1">New</span>
                               </div>
                               <h1 className="text-2xl md:text-4xl text-primaryColor font-bold mt-3 md:mt-6 mb-4 md:mb-8 md:leading-[54px]">Men’s Semi-formal Full Set Pack Summer 2022</h1>
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
                                            <path d="M18.4415 22.7608L10.5723 14.5663C8.35573 12.2582 8.49531 8.4736 10.8753 6.34929C13.2364 4.24181 16.8165 4.65105 18.6824 7.24171L18.9961 7.67724L19.3098 7.24171C21.1757 4.65105 24.7557 4.24181 27.1169 6.34929C29.4969 8.4736 29.6365 12.2582 27.4199 14.5663L19.5507 22.7608C19.2444 23.0797 18.7478 23.0797 18.4415 22.7608Z" stroke="#F5F5F5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </g>
                                            <defs>
                                            <filter id="filter0_d_944_19802" x="0.496094" y="0.5" width="37" height="35" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
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
                                   <span className="badge bg-warning font-bold py-1">New</span>
                               </div>
                               <h1 className="text-2xl md:text-4xl text-primaryColor font-bold mt-3 md:mt-6 mb-4 md:mb-8 md:leading-[54px]">Men’s Semi-formal Full Set Pack Summer 2022</h1>
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
                                            <path d="M18.4415 22.7608L10.5723 14.5663C8.35573 12.2582 8.49531 8.4736 10.8753 6.34929C13.2364 4.24181 16.8165 4.65105 18.6824 7.24171L18.9961 7.67724L19.3098 7.24171C21.1757 4.65105 24.7557 4.24181 27.1169 6.34929C29.4969 8.4736 29.6365 12.2582 27.4199 14.5663L19.5507 22.7608C19.2444 23.0797 18.7478 23.0797 18.4415 22.7608Z" stroke="#F5F5F5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </g>
                                            <defs>
                                            <filter id="filter0_d_944_19802" x="0.496094" y="0.5" width="37" height="35" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
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
                                   <span className="badge bg-warning font-bold py-1">New</span>
                               </div>
                               <h1 className="text-2xl md:text-4xl text-primaryColor font-bold mt-3 md:mt-6 mb-4 md:mb-8 md:leading-[54px]">Men’s Semi-formal Full Set Pack Summer 2022</h1>
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
                                            <path d="M18.4415 22.7608L10.5723 14.5663C8.35573 12.2582 8.49531 8.4736 10.8753 6.34929C13.2364 4.24181 16.8165 4.65105 18.6824 7.24171L18.9961 7.67724L19.3098 7.24171C21.1757 4.65105 24.7557 4.24181 27.1169 6.34929C29.4969 8.4736 29.6365 12.2582 27.4199 14.5663L19.5507 22.7608C19.2444 23.0797 18.7478 23.0797 18.4415 22.7608Z" stroke="#F5F5F5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </g>
                                            <defs>
                                            <filter id="filter0_d_944_19802" x="0.496094" y="0.5" width="37" height="35" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
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

                <div className="flex items-center justify-center pt-5 sm:pt-10 pb-12 sm:pb-20">
                    <button className="flex items-center text-xl text-primaryColor">
                            <span className="mr-4">See More</span>
                            <span>
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="40" height="40" rx="20" fill="#282828"/>
                                <path d="M29 20L22 27M11 20H29H11ZM29 20L22 13L29 20Z" stroke="#F5F5F5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-6 mb-12 sm:mb-20">
                    <div data-bs-toggle="modal" data-bs-target="#BriefCollection" className="flex items-center p-6 lg:p-10 py-12 bg-pink overflow-hidden cursor-pointer">
                        <div className="flex items-center justify-between w-full relative circle-bg circle-bg2">
                            <div>
                                <h4 className="text-px28 text-white-shade-100 uppercase mb-4 leading-8">Brief a  <strong>Collection</strong></h4>
                                <span className="flex items-center text-xl font-light text-white-shade-100 cursor-pointer">
                                    <span className="lg:mr-4">By sharing your Inspirations</span>
                                    <span>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 12L14 19M3 12H21H3ZM21 12L14 5L21 12Z" stroke="#F5F5F5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </span>
                                </span>
                            </div>
                            <div className="share cursor-pointer z-10">
                                <svg width="107" height="108" viewBox="0 0 107 108" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_d_944_25122)">
                                        <path d="M68.3775 30.5903C74.5905 28.8829 78.243 22.4621 76.5356 16.2491C74.8282 10.0361 68.4074 6.38366 62.1944 8.09107C55.9814 9.79849 52.329 16.2192 54.0364 22.4322C55.7438 28.6452 62.1645 32.2977 68.3775 30.5903Z" stroke="#F5F5F5" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M30.5924 69.2055C36.8053 67.4981 40.4578 61.0773 38.7504 54.8644C37.043 48.6514 30.6222 44.9989 24.4093 46.7063C18.1963 48.4137 14.5438 54.8345 16.2512 61.0475C17.9586 67.2604 24.3794 70.9129 30.5924 69.2055Z" stroke="#F5F5F5" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M82.8048 83.0883C89.0177 81.3809 92.6702 74.9602 90.9628 68.7472C89.2554 62.5342 82.8347 58.8817 76.6217 60.5891C70.4087 62.2965 66.7562 68.7173 68.4636 74.9303C70.171 81.1432 76.5918 84.7957 82.8048 83.0883Z" stroke="#F5F5F5" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M38.7686 60.9492L68.4816 68.8353" stroke="#F5F5F5" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M57.1293 27.6721L35.6566 49.6247" stroke="#F5F5F5" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
                                    </g>
                                    <defs>
                                        <filter id="filter0_d_944_25122" x="0.330078" y="0.169922" width="106.554" height="106.839" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                            <feOffset dy="8"/>
                                            <feGaussianBlur stdDeviation="6"/>
                                            <feComposite in2="hardAlpha" operator="out"/>
                                            <feColorMatrix type="matrix" values="0 0 0 0 0.960784 0 0 0 0 0.960784 0 0 0 0 0.960784 0 0 0 0.2 0"/>
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_944_25122"/>
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_944_25122" result="shape"/>
                                        </filter>
                                    </defs>
                                </svg>

                            </div>
                        </div>
                    </div>
                    <div className="flex items-center p-6 lg:p-10 py-12 bg-blue overflow-hidden">
                        <div className="flex items-center justify-between w-full relative circle-bg circle-bg2">
                            <div>
                                <h4 className="text-px28 text-white-shade-100 uppercase mb-4 leading-8">Share <strong>Moodboard</strong></h4>
                                <span className="flex items-center text-xl font-light text-white-shade-100 cursor-pointer">
                                    <span className="lg:mr-4">& collaborate with our designers</span>
                                    <span>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 12L14 19M3 12H21H3ZM21 12L14 5L21 12Z" stroke="#F5F5F5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </span>
                                </span>
                            </div>
                            <div className="share cursor-pointer z-10">
                                <svg width="118" height="118" viewBox="0 0 118 118" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_d_944_25144)">
                                        <path d="M38.9634 24.1901L19.66 35.3349C16.1064 37.3866 14.8888 41.9306 16.9405 45.4843L42.945 90.5254C44.9968 94.0791 49.5407 95.2966 53.0944 93.2449L98.1355 67.2404C101.689 65.1886 102.907 60.6448 100.855 57.091L89.7102 37.7877" stroke="#F5F5F5" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M49.9256 54.3226L60.8036 13.7251C61.93 9.52112 66.2514 7.02618 70.4553 8.1527C74.6592 9.27922 77.1541 13.6004 76.0277 17.8044L65.1496 58.4019L53.4583 71.5863L49.9256 54.3226Z" stroke="#F5F5F5" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
                                    </g>
                                    <defs>
                                        <filter id="filter0_d_944_25144" x="0.443359" y="0.881836" width="116.909" height="116.86" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                            <feOffset dy="8"/>
                                            <feGaussianBlur stdDeviation="6"/>
                                            <feComposite in2="hardAlpha" operator="out"/>
                                            <feColorMatrix type="matrix" values="0 0 0 0 0.960784 0 0 0 0 0.960784 0 0 0 0 0.960784 0 0 0 0.3 0"/>
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_944_25144"/>
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_944_25144" result="shape"/>
                                        </filter>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center p-6 lg:p-10 py-12 bg-primaryColor overflow-hidden">
                        <div className="flex items-center justify-between w-full relative circle-bg circle-bg2">
                            <div>
                                <h4 className="text-px28 text-white-shade-100 uppercase mb-4 leading-8">Get  <strong>Quotation</strong></h4>
                                <span className="flex items-center text-xl font-light text-white-shade-100 cursor-pointer">
                                    <span className="lg:mr-4">by uploading Techpacks</span>
                                    <span>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 12L14 19M3 12H21H3ZM21 12L14 5L21 12Z" stroke="#F5F5F5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </span>
                                </span>
                            </div>
                            <div className="share cursor-pointer z-10">
                                <svg width="107" height="127" viewBox="0 0 107 127" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_d_944_25163)">
                                        <path d="M28.1351 15L53.2312 58.4678L78.3274 101.936M59.4796 14.2903L24.8386 34.2903C16.4685 39.1228 13.6157 49.8518 18.4668 58.2541C23.3179 66.6564 34.0358 69.5503 42.4059 64.7178L64.0565 52.2178C72.4267 47.3853 83.1445 50.2792 87.9956 58.6815C92.8467 67.0839 89.994 77.8128 81.6238 82.6453L46.9828 102.645" stroke="#F5F5F5" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
                                    </g>
                                    <defs>
                                        <filter id="filter0_d_944_25163" x="0.102539" y="6.29004" width="106.258" height="120.355" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                            <feOffset dy="8"/>
                                            <feGaussianBlur stdDeviation="6"/>
                                            <feComposite in2="hardAlpha" operator="out"/>
                                            <feColorMatrix type="matrix" values="0 0 0 0 0.960784 0 0 0 0 0.960784 0 0 0 0 0.960784 0 0 0 0.2 0"/>
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_944_25163"/>
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_944_25163" result="shape"/>
                                        </filter>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="max-w-[434px] mb-8">
                        <div className="input-group">
                            <SelectComponent
                                options={[{label: "Premium Fabric Base", placeholder: "asd" , value: "Premium Fabric Base"}]}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between mb-8 gap-6">
                    <p className="text-base text-primaryColor sm:max-w-[50%]">Specially designed for your <strong>SS2022</strong> that introduces a unique combination of <strong>luxury</strong> and <strong>tredition</strong>.
                        The feel and the experience of the collections are top-notch.</p>
                    <div className="sm:max-w-[40%]">
                        <div className="flex flex-wrap justify-end gap-3">
                            <span className="text-base uppercase text-primaryColor px-4 rounded-full border border-primaryColor inline-block">Aesthetic</span>
                            <span className="text-base uppercase text-primaryColor px-4 rounded-full border border-primaryColor inline-block">Summer</span>
                            <span className="text-base uppercase text-primaryColor px-4 rounded-full border border-primaryColor inline-block">Vintage</span>
                            <span className="text-base uppercase text-primaryColor px-4 rounded-full border border-primaryColor inline-block">SS 2022</span>
                            <span className="text-base uppercase text-primaryColor px-4 rounded-full border border-primaryColor inline-block">Aesthetic</span>
                            <span className="text-base uppercase text-primaryColor px-4 rounded-full border border-primaryColor inline-block">Summer</span>
                            <span className="text-base uppercase text-primaryColor px-4 rounded-full border border-primaryColor inline-block">Vintage</span>
                            <span className="text-base uppercase text-primaryColor px-4 rounded-full border border-primaryColor inline-block">SS 2022</span>
                        </div>
                    </div>
                </div>

                <div className="kint-carasoul mb-6">
                    <SliderWrapper>

                        <div>
                            <div className="bg-white p-3 m-3 relative">
                                <div className="flex flex-wrap gap-5">
                                    <div className="favourite">
                                        <span className="mt-2">
                                            <Favourite />
                                        </span>
                                    </div>
                                </div>
                                <img src={slide} alt=""/>
                                <div className="flex items-center py-4 pb-3 uppercase">
                                    <span>Knit</span>
                                    <span className="dot"></span>
                                    <span>Organic</span>
                                    <span className="dot"></span>
                                    <span>16-2121</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="bg-white p-3 m-3 relative">
                                <div className="flex flex-wrap gap-5">
                                    <div className="favourite">
                                        <span className="mt-2">
                                            <Favourite />
                                        </span>
                                    </div>
                                </div>
                                <img src={slide1} alt=""/>
                                <div className="flex items-center py-4 pb-3 uppercase">
                                    <span>Knit</span>
                                    <span className="dot"></span>
                                    <span>Organic</span>
                                    <span className="dot"></span>
                                    <span>16-2121</span>
                                </div>
                            </div>
                        </div>

                    </SliderWrapper>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 tab:grid-cols-3 xl:!grid-cols-4 gap-5">
                    <div className="collection-box">
                        <div className="overflow-hidden relative h-[300px] sm:h-[330px] 5xl:h-[456px] p-4 bg-white">
                            <div className="h-full">
                                <img className="w-full h-full object-cover" src="/images/products/3.jpg"/>
                            </div>
                            <div className="w-[40px] h-[40px] bg-white border border-white-shade-100 flex justify-center items-center absolute right-[20px] top-[20px] cursor-pointer">
                                    <span className="mt-2">
                                        <svg width="38" height="36" viewBox="0 0 38 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g filter="url(#filter0_d_944_19802)">
                                            <path d="M18.4415 22.7608L10.5723 14.5663C8.35573 12.2582 8.49531 8.4736 10.8753 6.34929C13.2364 4.24181 16.8165 4.65105 18.6824 7.24171L18.9961 7.67724L19.3098 7.24171C21.1757 4.65105 24.7557 4.24181 27.1169 6.34929C29.4969 8.4736 29.6365 12.2582 27.4199 14.5663L19.5507 22.7608C19.2444 23.0797 18.7478 23.0797 18.4415 22.7608Z" fill="#DA336F"/>
                                            <path d="M18.4415 22.7608L10.5723 14.5663C8.35573 12.2582 8.49531 8.4736 10.8753 6.34929C13.2364 4.24181 16.8165 4.65105 18.6824 7.24171L18.9961 7.67724L19.3098 7.24171C21.1757 4.65105 24.7557 4.24181 27.1169 6.34929C29.4969 8.4736 29.6365 12.2582 27.4199 14.5663L19.5507 22.7608C19.2444 23.0797 18.7478 23.0797 18.4415 22.7608Z" stroke="#F5F5F5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </g>
                                            <defs>
                                            <filter id="filter0_d_944_19802" x="0.496094" y="0.5" width="37" height="35" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
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
                        <div className="py-4">
                            <h4 className="text-xl font-bold text-primaryColor mb-3">Cotton elastane boat neck</h4>
                            <div className="flex  items-center gap-6 text-base text-primaryColor-shade-100 cursor-pointer">
                                <span>View Collection</span>
                                <span>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 12L14 19M3 12H21H3ZM21 12L14 5L21 12Z" stroke="#646464" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="collection-box">
                        <div className="overflow-hidden relative h-[300px] sm:h-[330px] 5xl:h-[456px] p-4 bg-white">
                            <div className="h-full">
                                <img className="w-full h-full object-cover" src="/images/products/pant.png"/>
                            </div>
                            <div className="w-[40px] h-[40px] bg-white border border-white-shade-100 flex justify-center items-center absolute right-[20px] top-[20px] cursor-pointer">
                                    <span className="mt-2">
                                        <svg width="38" height="36" viewBox="0 0 38 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g filter="url(#filter0_d_944_19802)">
                                            <path d="M18.4415 22.7608L10.5723 14.5663C8.35573 12.2582 8.49531 8.4736 10.8753 6.34929C13.2364 4.24181 16.8165 4.65105 18.6824 7.24171L18.9961 7.67724L19.3098 7.24171C21.1757 4.65105 24.7557 4.24181 27.1169 6.34929C29.4969 8.4736 29.6365 12.2582 27.4199 14.5663L19.5507 22.7608C19.2444 23.0797 18.7478 23.0797 18.4415 22.7608Z" fill="#DA336F"/>
                                            <path d="M18.4415 22.7608L10.5723 14.5663C8.35573 12.2582 8.49531 8.4736 10.8753 6.34929C13.2364 4.24181 16.8165 4.65105 18.6824 7.24171L18.9961 7.67724L19.3098 7.24171C21.1757 4.65105 24.7557 4.24181 27.1169 6.34929C29.4969 8.4736 29.6365 12.2582 27.4199 14.5663L19.5507 22.7608C19.2444 23.0797 18.7478 23.0797 18.4415 22.7608Z" stroke="#F5F5F5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </g>
                                            <defs>
                                            <filter id="filter0_d_944_19802" x="0.496094" y="0.5" width="37" height="35" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
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
                        <div className="py-4">
                            <h4 className="text-xl font-bold text-primaryColor mb-3">Cotton elastane boat neck</h4>
                            <div className="flex  items-center gap-6 text-base text-primaryColor-shade-100 cursor-pointer">
                                <span>View Collection</span>
                                <span>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 12L14 19M3 12H21H3ZM21 12L14 5L21 12Z" stroke="#646464" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="collection-box">
                        <div className="overflow-hidden relative h-[300px] sm:h-[330px] 5xl:h-[456px] p-4 bg-white">
                            <div className="h-full">
                                <img className="w-full h-full object-cover" src="/images/products/pant2.png"/>
                            </div>
                            <div className="w-[40px] h-[40px] bg-white border border-white-shade-100 flex justify-center items-center absolute right-[20px] top-[20px] cursor-pointer">
                                    <span className="mt-2">
                                        <svg width="38" height="36" viewBox="0 0 38 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g filter="url(#filter0_d_944_19802)">
                                            <path d="M18.4415 22.7608L10.5723 14.5663C8.35573 12.2582 8.49531 8.4736 10.8753 6.34929C13.2364 4.24181 16.8165 4.65105 18.6824 7.24171L18.9961 7.67724L19.3098 7.24171C21.1757 4.65105 24.7557 4.24181 27.1169 6.34929C29.4969 8.4736 29.6365 12.2582 27.4199 14.5663L19.5507 22.7608C19.2444 23.0797 18.7478 23.0797 18.4415 22.7608Z" fill="#DA336F"/>
                                            <path d="M18.4415 22.7608L10.5723 14.5663C8.35573 12.2582 8.49531 8.4736 10.8753 6.34929C13.2364 4.24181 16.8165 4.65105 18.6824 7.24171L18.9961 7.67724L19.3098 7.24171C21.1757 4.65105 24.7557 4.24181 27.1169 6.34929C29.4969 8.4736 29.6365 12.2582 27.4199 14.5663L19.5507 22.7608C19.2444 23.0797 18.7478 23.0797 18.4415 22.7608Z" stroke="#F5F5F5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </g>
                                            <defs>
                                            <filter id="filter0_d_944_19802" x="0.496094" y="0.5" width="37" height="35" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
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
                        <div className="py-4">
                            <h4 className="text-xl font-bold text-primaryColor mb-3">Cotton elastane boat neck</h4>
                            <div className="flex  items-center gap-6 text-base text-primaryColor-shade-100 cursor-pointer">
                                <span>View Collection</span>
                                <span>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 12L14 19M3 12H21H3ZM21 12L14 5L21 12Z" stroke="#646464" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="collection-box">
                        <div className="overflow-hidden relative h-[300px] sm:h-[330px] 5xl:h-[456px] p-4 bg-white">
                            <div className="h-full">
                                <img className="w-full h-full object-cover" src="/images/products/3.jpg"/>
                            </div>
                            <div className="w-[40px] h-[40px] bg-white border border-white-shade-100 flex justify-center items-center absolute right-[20px] top-[20px] cursor-pointer">
                                    <span className="mt-2">
                                        <svg width="38" height="36" viewBox="0 0 38 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g filter="url(#filter0_d_944_19802)">
                                            <path d="M18.4415 22.7608L10.5723 14.5663C8.35573 12.2582 8.49531 8.4736 10.8753 6.34929C13.2364 4.24181 16.8165 4.65105 18.6824 7.24171L18.9961 7.67724L19.3098 7.24171C21.1757 4.65105 24.7557 4.24181 27.1169 6.34929C29.4969 8.4736 29.6365 12.2582 27.4199 14.5663L19.5507 22.7608C19.2444 23.0797 18.7478 23.0797 18.4415 22.7608Z" fill="#DA336F"/>
                                            <path d="M18.4415 22.7608L10.5723 14.5663C8.35573 12.2582 8.49531 8.4736 10.8753 6.34929C13.2364 4.24181 16.8165 4.65105 18.6824 7.24171L18.9961 7.67724L19.3098 7.24171C21.1757 4.65105 24.7557 4.24181 27.1169 6.34929C29.4969 8.4736 29.6365 12.2582 27.4199 14.5663L19.5507 22.7608C19.2444 23.0797 18.7478 23.0797 18.4415 22.7608Z" stroke="#F5F5F5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </g>
                                            <defs>
                                            <filter id="filter0_d_944_19802" x="0.496094" y="0.5" width="37" height="35" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
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
                        <div className="py-4">
                            <h4 className="text-xl font-bold text-primaryColor mb-3">Cotton elastane boat neck</h4>
                            <div className="flex  items-center gap-6 text-base text-primaryColor-shade-100 cursor-pointer">
                                <span>View Collection</span>
                                <span>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 12L14 19M3 12H21H3ZM21 12L14 5L21 12Z" stroke="#646464" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="collection-box">
                        <div className="overflow-hidden relative h-[300px] sm:h-[330px] 5xl:h-[456px] p-4 bg-white">
                            <div className="h-full">
                                <img className="w-full h-full object-cover" src="/images/products/pant.png"/>
                            </div>
                            <div className="w-[40px] h-[40px] bg-white border border-white-shade-100 flex justify-center items-center absolute right-[20px] top-[20px] cursor-pointer">
                                    <span className="mt-2">
                                        <svg width="38" height="36" viewBox="0 0 38 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g filter="url(#filter0_d_944_19802)">
                                            <path d="M18.4415 22.7608L10.5723 14.5663C8.35573 12.2582 8.49531 8.4736 10.8753 6.34929C13.2364 4.24181 16.8165 4.65105 18.6824 7.24171L18.9961 7.67724L19.3098 7.24171C21.1757 4.65105 24.7557 4.24181 27.1169 6.34929C29.4969 8.4736 29.6365 12.2582 27.4199 14.5663L19.5507 22.7608C19.2444 23.0797 18.7478 23.0797 18.4415 22.7608Z" fill="#DA336F"/>
                                            <path d="M18.4415 22.7608L10.5723 14.5663C8.35573 12.2582 8.49531 8.4736 10.8753 6.34929C13.2364 4.24181 16.8165 4.65105 18.6824 7.24171L18.9961 7.67724L19.3098 7.24171C21.1757 4.65105 24.7557 4.24181 27.1169 6.34929C29.4969 8.4736 29.6365 12.2582 27.4199 14.5663L19.5507 22.7608C19.2444 23.0797 18.7478 23.0797 18.4415 22.7608Z" stroke="#F5F5F5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </g>
                                            <defs>
                                            <filter id="filter0_d_944_19802" x="0.496094" y="0.5" width="37" height="35" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
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
                        <div className="py-4">
                            <h4 className="text-xl font-bold text-primaryColor mb-3">Cotton elastane boat neck</h4>
                            <div className="flex  items-center gap-6 text-base text-primaryColor-shade-100 cursor-pointer">
                                <span>View Collection</span>
                                <span>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 12L14 19M3 12H21H3ZM21 12L14 5L21 12Z" stroke="#646464" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="collection-box">
                        <div className="overflow-hidden relative h-[300px] sm:h-[330px] 5xl:h-[456px] p-4 bg-white">
                            <div className="h-full">
                                <img className="w-full h-full object-cover" src="/images/products/pant2.png"/>
                            </div>
                            <div className="w-[40px] h-[40px] bg-white border border-white-shade-100 flex justify-center items-center absolute right-[20px] top-[20px] cursor-pointer">
                                    <span className="mt-2">
                                        <svg width="38" height="36" viewBox="0 0 38 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g filter="url(#filter0_d_944_19802)">
                                            <path d="M18.4415 22.7608L10.5723 14.5663C8.35573 12.2582 8.49531 8.4736 10.8753 6.34929C13.2364 4.24181 16.8165 4.65105 18.6824 7.24171L18.9961 7.67724L19.3098 7.24171C21.1757 4.65105 24.7557 4.24181 27.1169 6.34929C29.4969 8.4736 29.6365 12.2582 27.4199 14.5663L19.5507 22.7608C19.2444 23.0797 18.7478 23.0797 18.4415 22.7608Z" fill="#DA336F"/>
                                            <path d="M18.4415 22.7608L10.5723 14.5663C8.35573 12.2582 8.49531 8.4736 10.8753 6.34929C13.2364 4.24181 16.8165 4.65105 18.6824 7.24171L18.9961 7.67724L19.3098 7.24171C21.1757 4.65105 24.7557 4.24181 27.1169 6.34929C29.4969 8.4736 29.6365 12.2582 27.4199 14.5663L19.5507 22.7608C19.2444 23.0797 18.7478 23.0797 18.4415 22.7608Z" stroke="#F5F5F5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </g>
                                            <defs>
                                            <filter id="filter0_d_944_19802" x="0.496094" y="0.5" width="37" height="35" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
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
                        <div className="py-4">
                            <h4 className="text-xl font-bold text-primaryColor mb-3">Cotton elastane boat neck</h4>
                            <div className="flex items-center gap-6 text-base text-primaryColor-shade-100 cursor-pointer">
                                <span>View Collection</span>
                                <span>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 12L14 19M3 12H21H3ZM21 12L14 5L21 12Z" stroke="#646464" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="see-all flex items-center justify-center bg-primaryColor hover:bg-black h-[300px] sm:h-[330px] 5xl:h-[456px] cursor-pointer">
                        <div className="text-white-shade-100 text-[40px] text-center flex flex-col items-center">
                            <div>See All</div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 12L14 19M3 12H21H3ZM21 12L14 5L21 12Z" stroke="#F5F5F5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="at-a-glance my-14">
                    <h2 className="text-2xl text-primaryColor mb-5">What <strong>NITEX</strong> can offer</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 tab:grid-cols-3 xl:!grid-cols-4 gap-5">
                        <div className="glance-box">
                            <div className="overflow-hidden flex items-center relative h-[250px] 4xl:h-[296px] p-8 bg-white">
                                <div>
                                    <div className="text-5xl 3xl:text-6xl text-primaryColor mb-1">100,000+</div>
                                    <span className="text-lg text-primaryColor uppercase">Styles</span>
                                </div>
                            </div>
                        </div>
                        <div className="glance-box">
                            <div className="overflow-hidden flex items-center relative h-[250px] 4xl:h-[296px] p-8 bg-white">
                                <div>
                                    <div className="text-5xl 3xl:text-6xl text-primaryColor mb-1">5,000+</div>
                                    <span className="text-lg text-primaryColor uppercase">Collections</span>
                                </div>
                            </div>
                        </div>
                        <div className="glance-box">
                            <div className="overflow-hidden flex items-center relative h-[250px] 4xl:h-[296px] p-8 bg-white">
                                <div>
                                    <div className="text-5xl 3xl:text-6xl text-primaryColor mb-1">30 Days</div>
                                    <span className="text-lg text-primaryColor uppercase">Lead Time</span>
                                </div>
                            </div>
                        </div>
                        <div className="glance-box">
                            <div className="overflow-hidden flex items-center relative h-[250px] 4xl:h-[296px] p-8 bg-white">
                                <div>
                                    <div className="text-5xl 3xl:text-6xl text-primaryColor mb-1">10,000+</div>
                                    <span className="text-lg text-primaryColor uppercase">Materials in use</span>
                                </div>
                            </div>
                        </div>
                        <div className="glance-box">
                            <div className="overflow-hidden flex items-center relative h-[250px] 4xl:h-[296px] p-8 bg-white">
                                <div>
                                    <div className="text-5xl 3xl:text-6xl text-primaryColor mb-1">20+</div>
                                    <span className="text-lg text-primaryColor uppercase">Categories</span>
                                </div>
                            </div>
                        </div>
                        <div className="glance-box">
                            <div className="overflow-hidden flex items-center relative h-[250px] 4xl:h-[296px] p-8 bg-white">
                                <div>
                                    <div className="text-5xl 3xl:text-6xl text-primaryColor mb-1">13</div>
                                    <span className="text-lg text-primaryColor uppercase">Seasons</span>
                                </div>
                            </div>
                        </div>
                        <div className="glance-box">
                            <div className="overflow-hidden flex items-center relative h-[250px] 4xl:h-[296px] p-8 bg-white">
                                <div>
                                    <div className="text-5xl 3xl:text-6xl text-primaryColor mb-1">30 Days</div>
                                    <span className="text-lg text-primaryColor uppercase">Lead Time</span>
                                </div>
                            </div>
                        </div>
                        <div className="see-all flex items-center justify-center bg-primaryColor hover:bg-black h-[250px] 4xl:h-[296px] cursor-pointer">
                            <div className="text-white-shade-100 text-[40px] text-center flex flex-col items-center">
                                <div>Dashboard</div>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 12L14 19M3 12H21H3ZM21 12L14 5L21 12Z" stroke="#F5F5F5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="belong-here relative flex items-center justify-center lg:pt-10 xl:pt-52 pb-36">
                    <div className="w-full md:w-[730px] h-[250px] md:h-[450px] lg:w-[930px]  lg:h-[550px] relative z-10">
                        <div className="transparency-text  text-7xl sm:text-[150px] md:xl:text-[200px] font-bold xl:absolute xl:top-[-115px] left-[-112px] 3xl:left-[-212px]">Belong</div>
                        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/QjisC1Aj-rA"
                                title="FLYING OVER NEW ZEALAND (4K UHD) - Calming Music With Spectacular Natural Landscape For Relaxation"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen>
                        </iframe>
                        <div className="transparency-text text-right text-7xl sm:text-[150px] xl:text-[200px] font-bold xl:absolute xl:bottom-[-176px] right-[-112px] 3xl:right-[-212px] pb-20">Here</div>
                    </div>
                </div>


            </div>


            {/*Sticky option*/}
            <div className="bg-primaryColor cursor-pointer px-7 py-4 w-[165px]  fixed top-[30%] right-[-38px] text-white-shade-100 text-center text-base rotate-[-90deg] z-[999]">My Requests</div>
            <div className="bg-primaryColor cursor-pointer flex items-center gap-3 p-1 pr-4 w-[200px] h-[60px] rounded-full fixed bottom-0 right-[20px] text-white-shade-100 z-[999] text-base">
                <div className="w-[52px] h-[52px] rounded-full bg-primaryColor-shade-300 relative border border-white-shade-100 flex items-center justify-center cursor-pointer overflow-hidden">
                    <img src="./images/user.jpg" className="object-cover object-top w-full h-full" alt="" />
                </div>
                <span>Connect</span>
                <span className="ml-auto">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M8 20L16 12L8 4" stroke="#F5F5F5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
            </div>




            {/*ConfirmationAction Soon Modal*/}
            <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="ConfirmationAction" tabIndex="-1" aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog">
                <div className="modal-dialog max-w-[680px] overflow-hidden modal-dialog-centered relative w-auto pointer-events-none">
                    <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between p-8 pb-0">
                            <button type="button"
                                    className="btn-close box-content w-4 h-4 p-1 text-black border-none  opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                    data-bs-dismiss="modal" aria-label="Close">
                            </button>
                        </div>
                        <div className="modal-body relative p-4">
                            <div className="px-6 pb-6">
                                <h2 className="text-4xl sm:text-[44px] text-primaryColor uppercase font-bold mb-8">Thanks!</h2>
                                <div className="space-y-4">
                                    <p className="text-xl">Your <strong>Brief</strong> has been received. We will share a collection with you within <strong>24 hours</strong>.</p>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer p-10 flex gap-6">
                            <button type="button" className="btn w-[150px] bg-transparent font-normal border border-primaryColor text-primaryColor" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
                                Close
                            </button>
                            <button type="button" className="btn w-full" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
                                Go to <strong className="!font-bold">Collection</strong>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/*Brief a Collection Modal*/}
            <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="BriefCollection" tabIndex="-1" aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog">
                <div className="modal-dialog max-w-[680px] modal-dialog-centered relative w-auto pointer-events-none">
                    <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between bg-primaryColor-shade-300 p-4">
                            <h5 className="text-xl font-bold leading-normal text-primaryColor uppercase"
                                id="exampleModalScrollableLabel">
                                Brief a Collection
                            </h5>
                            <button type="button"
                                    className="btn-close box-content w-4 h-4 p-1 !mr-0.5 text-black border-none  opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                    data-bs-dismiss="modal" aria-label="Close">
                            </button>
                        </div>
                        <div className="modal-body relative p-4">
                            <div className="space-y-4">
                                <div className="input-group flex items-center">
                                    <label htmlFor="text" className="label w-[30%]">Email address *</label>
                                    <input type="text"
                                           className="form-field bg-primaryColor-shade-300 w-[70%]"
                                           id="text"
                                           placeholder="Write Here ..."
                                           name="text"/>
                                </div>
                                <div className="input-group flex items-center">
                                    <label htmlFor="text" className="label w-[30%]">Description</label>
                                    <textarea name="" id="" cols="30" rows="4" className="form-field h-auto bg-primaryColor-shade-300 w-[70%]" placeholder="Write Here ..."></textarea>

                                </div>
                                <div className="input-group flex items-center">
                                    <label htmlFor="text" className="label w-[30%]">Attach</label>
                                    <div className='file w-[70%]'>
                                        <input id='input-file' type='file'/>
                                        <label htmlFor='input-file' className="w-full justify-between">
                                            <span className="mr-4">Browse Files</span>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3 14V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V14" stroke="#282828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M12 3L17 8.44444M12 17V3V17ZM12 3L7 8.44446L12 3Z" stroke="#282828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-14">
                                <div className="flex justify-between items-center mb-5">
                                    <h5 className="text-xl font-bold leading-normal text-primaryColor">
                                        Brief a Collection
                                    </h5>
                                    <span className="text-base">4 files</span>
                                </div>
                                <div className="flex flex-col">
                                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                            <div className="overflow-hidden">
                                                <table className="min-w-full">
                                                    <thead className="bg-white">
                                                        <tr>
                                                            <th scope="col" className="w-[100px] text-xl font-normal bg-white-shade-100 px-6 py-4 text-left first:border-r border-primaryColor-shade-200">

                                                            </th>
                                                            <th scope="col" className="text-xl font-normal bg-white-shade-100 px-6 py-4 text-left first:border-r border-primaryColor-shade-200">
                                                                File
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
                                                            <td className="text-base font-normal px-6 py-6 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <span>
                                                                        <img src="./images/pdf.png" alt=""/>
                                                                    </span>
                                                                    <span className="text-base ml-4">Untiltled.pdf </span>
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
                                                            <td className="text-base font-normal px-6 py-6 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <span>
                                                                        <img src="./images/pdf.png" alt=""/>
                                                                    </span>
                                                                    <span className="text-base ml-4">Untiltled.pdf </span>
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
                                                            <td className="text-base font-normal px-6 py-6 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <span>
                                                                        <img src="./images/pdf.png" alt=""/>
                                                                    </span>
                                                                    <span className="text-base ml-4">Untiltled.pdf </span>
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
                                                            <td className="text-base font-normal px-6 py-6 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <span>
                                                                        <img src="./images/pdf.png" alt=""/>
                                                                    </span>
                                                                    <span className="text-base ml-4">Untiltled.pdf </span>
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
                            <button type="button" className="btn flex justify-between items-center max-w-[445px] w-full" data-bs-toggle="modal" data-bs-target="#ConfirmationAction">
                                <span>Ask <strong className="font-bold">Collection</strong></span>
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


        </div>
    )
}

export default StyleGuide //change the Boilarplate name to your specified name
