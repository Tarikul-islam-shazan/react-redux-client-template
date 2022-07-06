import React from 'react'
import SelectComponent from "../../../app/common/SelectComponent";
import { ReactComponent as PlusIcon } from '../../images/plus.svg';
import { ReactComponent as PlusIconBlack } from '../../images/plus-black.svg';
import { ReactComponent as UploadIcon } from '../../images/upload.svg';
import { ReactComponent as UploadWhiteIcon } from '../../images/upload-white.svg';
import { ReactComponent as FilterIcon } from '../../images/filter.svg';
import { ReactComponent as SearchIcon } from '../../images/search.svg';
import { ReactComponent as SearchIconWhite } from '../../images/search-white.svg';
import { ReactComponent as CloseIcon } from '../../images/close.svg';
import { ReactComponent as EditIcon } from '../../images/edit.svg';
import { ReactComponent as OkWhite } from '../../images/ok-white.svg';
import { ReactComponent as Refresh } from '../../images/refresh.svg';
import { ReactComponent as RefreshWhite } from '../../images/refresh-white.svg';
import { ReactComponent as Dlt } from '../../images/dlt.svg';
import { ReactComponent as ArrowRightWhite } from '../../images/arror-right-white.svg';
import { ReactComponent as Favourite } from '../../images/favourite.svg';
import { ReactComponent as ArrorRightWhite } from '../../images/arror-right-white.svg';
import Pdf from '../../images/pdf.png';
import User from '../../images/user.jpg';
import Pant from "../../images/home/pant.png";
import Cloud from "../../images/home/cloud.png";
import {ReactComponent as MinusIcon} from "../../images/minus.svg";
import {ReactComponent as ShareIcon} from "../../images/share.svg";
import {ReactComponent as CloseSmallWhiteIcon} from "../../images/close-small-white.svg";
import {ReactComponent as AttachedIcon} from "../../images/attached.svg";

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

                 <div className="mb-4">
                     <div className="flex lg:justify-between flex-col lg:flex-row-reverse lg:items-center gap-4">
                        <div className="uppercase flex items-center gap-4 cursor-pointer">
                            <span>Go to Collecton</span>
                            <span  data-bs-toggle="modal" data-bs-target="#AddTeam" className="w-[40px] h-[40px] cursor-pointer bg-primaryColor font-semibold flex items-center justify-center border-2 border-white rounded-full overflow-hidden inline-block ml-[5px]">
                                 <ArrorRightWhite />
                            </span>
                        </div>
                         <h1 className="text-3xl font-semibold">Men’s Semi-formal Full Set Pack Summer 2022</h1>
                     </div>
                     <div className="flex items-center text-base italic gap-2 mt-2 mb-4">
                         <span>ID: NTX/BO/CO/88</span>
                         <div className="dot"></div>
                         <span>23 Styles</span>
                     </div>

                     <div className="flex items-start gap-3   xl:w-1/2">
                         <p>To be sincerely honest in my humble opinion without being sentimental and of course, without offending anyone who thinks differently from my opinion but rather looking into this serious matter with perspective distinction and without condemning.</p>
                     </div>
                 </div>

                <div className="max-w-[1400px] mt-10 lg:mt-20">

                    <div className="flex flex-col tab:flex-row justify-between gap-6 mb-6">
                        <span className="cursor-pointer text-base underline"><strong>10</strong> files attached</span>
                        <div className="flex flex-wrap gap-4">
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

                                <span  className="w-[40px] h-[40px] cursor-pointer bg-primaryColor font-semibold flex items-center justify-center overflow-hidden inline-block">
                                    <UploadWhiteIcon />
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='overflow-x-auto mb-10 lg:mb-20'>
                        <div className='overflow-x-auto'>
                            <table className='min-w-full'>
                                <thead className='bg-white'>
                                <tr>
                                    <th scope='col' className='w-[60px] text-xl font-normal bg-white px-6 py-4 text-left border-r border-primaryColor-shade-200 last:border-transparent'>
                                        <span>
                                            <input type='checkbox' id='Winter' />
                                        </span>
                                    </th>
                                    <th scope='col' className='text-xl font-normal bg-white px-6 py-4 text-left border-r border-primaryColor-shade-200 last:border-transparent'>
                                        Style
                                    </th>
                                    <th scope='col' className='text-xl font-normal bg-white px-6 py-4 text-left border-r border-primaryColor-shade-200 last:border-transparent'>
                                        Description
                                    </th>
                                    <th scope='col' className='text-xl font-normal bg-white px-6 py-4 text-left border-r border-primaryColor-shade-200 last:border-transparent'>
                                        Quantity
                                    </th>
                                    <th scope='col' className='text-xl font-normal bg-white px-6 py-4 text-left border-r border-primaryColor-shade-200 last:border-transparent'>
                                        Target Price
                                    </th>
                                    <th scope='col' className='text-xl font-normal bg-white px-6 py-4 text-left border-r border-primaryColor-shade-200 last:border-transparent'>
                                        Offer Price
                                    </th>
                                    <th scope='col' className='text-xl font-normal bg-white px-6 py-4 text-left border-r border-primaryColor-shade-200 last:border-transparent'>
                                        Status
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                      <tr className='even:bg-white'>
                                    <td className='text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200 last:border-transparent'>
                                         <span>
                                            <input type='checkbox' id='Winter2' />
                                         </span>
                                    </td>
                                    <td className='on-hover-add text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200 last:border-transparent whitespace-nowrap relative'>
                                        <div className='flex items-center'>
                                            <span className='w-[54px] h-[60px] border border-primaryColor-shade-300'>
                                                <img src={Pant}
                                                     alt=''
                                                     className='w-100 h-100 object-contain'
                                                />
                                            </span>
                                            <span className='text-base ml-4'>
                                                <a href="">NITEX/B1/2021</a>
                                            </span>
                                        </div>
                                        <span  className="add-item hidden w-[40px] h-[40px] absolute bottom-0 right-0 cursor-pointer bg-primaryColor font-semibold flex items-center justify-center border-2 border-white overflow-hidden inline-block ml-[5px]">
                                             <PlusIcon />
                                        </span>
                                    </td>
                                    <td className='text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200 last:border-transparent'>
                                        100% cotton, 2x2 Rib, 200 GSM
                                    </td>
                                    <td className='text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200 last:border-transparent whitespace-nowrap'>
                                        1,200
                                    </td>
                                    <td className='text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200 last:border-transparent whitespace-nowrap'>

                                        $ 12.30
                                    </td>
                                    <td className='text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200 last:border-transparent whitespace-nowrap'>
                                        <div className="flex gap-2">
                                            <span>
                                                $ 12.30
                                            </span>
                                            <s className="text-[#C4C4C4]">
                                                $ 12.30
                                            </s>
                                        </div>
                                    </td>
                                    <td className='text-base font-normal border-r border-primaryColor-shade-200 last:border-transparent bg-primaryColor'>
                                        <div className="flex">
                                            <div className="flex flex-col items-center flex-1 gap-2 bg-primaryColor text-white p-4 cursor-pointer border-r border-primaryColor-shade-100 whitespace-nowrap">
                                                <span>
                                                    <OkWhite />
                                                </span>
                                                <span>Approve</span>
                                            </div>
                                            <div className="flex flex-col items-center flex-1 gap-2 bg-primaryColor text-white p-4 cursor-pointer whitespace-nowrap">
                                                <span>
                                                    <RefreshWhite />
                                                </span>
                                                <span>Re-cost</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                      <tr className='even:bg-white'>
                                            <td className='text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200 last:border-transparent'>
                                                 <span>
                                                    <input type='checkbox' id='Winter2' />
                                                 </span>
                                            </td>
                                            <td className='on-hover-add text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200 last:border-transparent whitespace-nowrap relative'>
                                                <div className='flex items-center'>
                                                    <span className='w-[54px] h-[60px] border border-primaryColor-shade-300'>
                                                        <img src={Pant}
                                                             alt=''
                                                             className='w-100 h-100 object-contain'
                                                        />
                                                    </span>
                                                    <span className='text-base ml-4'>
                                                        <a href="">NITEX/B1/2021</a>
                                                    </span>
                                                </div>
                                                <span  className="add-item hidden w-[40px] h-[40px] absolute bottom-0 right-0 cursor-pointer bg-primaryColor font-semibold flex items-center justify-center border-2 border-white overflow-hidden inline-block ml-[5px]">
                                                     <PlusIcon />
                                                </span>
                                            </td>
                                            <td className='text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200 last:border-transparent'>
                                                100% cotton, 2x2 Rib, 200 GSM
                                            </td>
                                            <td className='text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200 last:border-transparent whitespace-nowrap'>
                                                1,200
                                            </td>
                                            <td className='text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200 last:border-transparent whitespace-nowrap'>

                                                $ 12.30
                                            </td>
                                            <td className='text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200 last:border-transparent whitespace-nowrap'>
                                                <div className="flex gap-2">
                                                    <span>
                                                        $ 12.30
                                                    </span>
                                                    <s className="text-[#C4C4C4]">
                                                        $ 12.30
                                                    </s>
                                                </div>
                                            </td>
                                            <td className='text-base font-normal border-r border-primaryColor-shade-200 last:border-transparent'>
                                                <div className="flex items-center justify-center gap-2 opacity-50 whitespace-nowrap">
                                                    <span>Revised</span>
                                                    <span>
                                                        <Refresh />
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                      <tr className='even:bg-white'>
                                            <td className='text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200 last:border-transparent'>
                                                 <span>
                                                    <input type='checkbox' id='Winter2' />
                                                 </span>
                                            </td>
                                            <td className='on-hover-add text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200 last:border-transparent whitespace-nowrap'>

                                            </td>
                                            <td className='text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200 last:border-transparent'>
                                                100% cotton, 2x2 Rib, 200 GSM
                                            </td>
                                            <td className='text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200 last:border-transparent whitespace-nowrap'>
                                                1,200
                                            </td>
                                            <td className='text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200 last:border-transparent whitespace-nowrap'>

                                                $ 12.30
                                            </td>
                                            <td className='text-base font-normal px-6 py-6 border-r border-primaryColor-shade-200 last:border-transparent whitespace-nowrap'>
                                                <div className="flex gap-2">
                                                    <span>
                                                        $ 12.30
                                                    </span>
                                                    <s className="text-[#C4C4C4]">
                                                        $ 12.30
                                                    </s>
                                                </div>
                                            </td>
                                            <td className='text-base font-normal border-r border-primaryColor-shade-200 last:border-transparent'>
                                                <div className="flex items-center justify-center gap-2 opacity-50 whitespace-nowrap">
                                                    <span>Revised</span>
                                                    <span>
                                                        <Refresh />
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


                <div className="conversation-container"> {/* < add '.minimize' class to hide chatbox */}
                    <div className="conversation-header flex items-center justify-between p-4 border-b border-white-shade-100 cursor-pointer relative z-10"> {/* < Click here */}
                        <span className="text-xl font-bold">Conversations (08)</span>
                        <span className="cursor-pointer">
                                <MinusIcon /> {/* Change to 'PlusIcon' */}
                            </span>
                    </div>
                    <div className="conversation-body">
                        <div className="conversations p-4  custom-scroll">
                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                     <span className="w-[20px] h-[20px] rounded-full overflow-hidden inline-block">
                                        <img src={User} alt="" className="object-cover w-full h-full"/>
                                    </span>
                                        <span className="font-bold">Subrina</span>
                                        <div className="flex items-center text-sm text-primaryColor-shade-100">
                                            <div className="dot bg-primaryColor-shade-100 mx-2"></div>
                                            <span>12.03 PM, Jun 12, 22</span>
                                        </div>
                                    </div>
                                    <div className="pl-7">
                                        <div className="flex justify-between gap-4 conversations-item">
                                            <p>All of the changes have bee done. How is this?</p>
                                            <div className="cursor-pointer">
                                                <ShareIcon />
                                            </div>
                                        </div>
                                        <div className="flex gap-1">
                                            <div className="w-[60px] h-60px">
                                                <img src={Pant} alt="" className="object-cover w-full h-full object-top"/>
                                            </div>
                                            <div className="w-[60px] h-60px">
                                                <img src={Pant} alt="" className="object-cover w-full h-full object-top"/>
                                            </div>
                                            <div className="w-[60px] h-60px">
                                                <img src={Pant} alt="" className="object-cover w-full h-full object-top"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                     <span className="w-[20px] h-[20px] rounded-full overflow-hidden inline-block">
                                        <img src={User} alt="" className="object-cover w-full h-full"/>
                                    </span>
                                        <span className="font-bold">Subrina</span>
                                        <div className="flex items-center text-sm text-primaryColor-shade-100">
                                            <div className="dot bg-primaryColor-shade-100 mx-2"></div>
                                            <span>12.03 PM, Jun 12, 22</span>
                                        </div>
                                    </div>
                                    <div className="pl-7">
                                        <div className="flex justify-between gap-4 conversations-item">
                                            <p>All of the changes have bee done. How is this?</p>
                                            <div className="cursor-pointer">
                                                <ShareIcon />
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <div className="bg-white-shade-100 p-1 px-2 border-l-2  border-primaryColor-shade-100">
                                                <span className="font-bold">Subrina</span>
                                                <p>All of the changes  </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                     <span className="w-[20px] h-[20px] rounded-full overflow-hidden inline-block">
                                        <img src={User} alt="" className="object-cover w-full h-full"/>
                                    </span>
                                        <span className="font-bold">Subrina</span>
                                        <div className="flex items-center text-sm text-primaryColor-shade-100">
                                            <div className="dot bg-primaryColor-shade-100 mx-2"></div>
                                            <span>12.03 PM, Jun 12, 22</span>
                                        </div>
                                    </div>
                                    <div className="pl-7">
                                        <div className="flex justify-between gap-4 conversations-item">
                                            <p>All of the changes have bee done. How is this?</p>
                                            <div className="cursor-pointer">
                                                <ShareIcon />
                                            </div>
                                        </div>
                                        <div className="flex gap-1">
                                            <div className="w-[60px] h-60px">
                                                <img src={Pant} alt="" className="object-cover w-full h-full object-top"/>
                                            </div>
                                            <div className="w-[60px] h-60px">
                                                <img src={Pant} alt="" className="object-cover w-full h-full object-top"/>
                                            </div>
                                            <div className="w-[60px] h-60px">
                                                <img src={Pant} alt="" className="object-cover w-full h-full object-top"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                     <span className="w-[20px] h-[20px] rounded-full overflow-hidden inline-block">
                                        <img src={User} alt="" className="object-cover w-full h-full"/>
                                    </span>
                                        <span className="font-bold">Subrina</span>
                                        <div className="flex items-center text-sm text-primaryColor-shade-100">
                                            <div className="dot bg-primaryColor-shade-100 mx-2"></div>
                                            <span>12.03 PM, Jun 12, 22</span>
                                        </div>
                                    </div>
                                    <div className="pl-7">
                                        <div className="flex justify-between gap-4 conversations-item">
                                            <p>All of the changes have bee done. How is this?</p>
                                            <div className="cursor-pointer">
                                                <ShareIcon />
                                            </div>
                                        </div>
                                        <div className="flex gap-1">
                                            <div className="w-[60px] h-60px">
                                                <img src={Pant} alt="" className="object-cover w-full h-full object-top"/>
                                            </div>
                                            <div className="w-[60px] h-60px">
                                                <img src={Pant} alt="" className="object-cover w-full h-full object-top"/>
                                            </div>
                                            <div className="w-[60px] h-60px">
                                                <img src={Pant} alt="" className="object-cover w-full h-full object-top"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                     <span className="w-[20px] h-[20px] rounded-full overflow-hidden inline-block">
                                        <img src={User} alt="" className="object-cover w-full h-full"/>
                                    </span>
                                        <span className="font-bold">Subrina</span>
                                        <div className="flex items-center text-sm text-primaryColor-shade-100">
                                            <div className="dot bg-primaryColor-shade-100 mx-2"></div>
                                            <span>12.03 PM, Jun 12, 22</span>
                                        </div>
                                    </div>
                                    <div className="pl-7">
                                        <div className="flex justify-between gap-4 conversations-item">
                                            <p>All of the changes have bee done. How is this?</p>
                                            <div className="cursor-pointer">
                                                <ShareIcon />
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <div className="bg-white-shade-100 p-1 px-2 border-l-2  border-primaryColor-shade-100">
                                                <span className="font-bold">Subrina</span>
                                                <p>All of the changes  </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                     <span className="w-[20px] h-[20px] rounded-full overflow-hidden inline-block">
                                        <img src={User} alt="" className="object-cover w-full h-full"/>
                                    </span>
                                        <span className="font-bold">Subrina</span>
                                        <div className="flex items-center text-sm text-primaryColor-shade-100">
                                            <div className="dot bg-primaryColor-shade-100 mx-2"></div>
                                            <span>12.03 PM, Jun 12, 22</span>
                                        </div>
                                    </div>
                                    <div className="pl-7">
                                        <div className="flex justify-between gap-4 conversations-item">
                                            <p>All of the changes have bee done. How is this?</p>
                                            <div className="cursor-pointer">
                                                <ShareIcon />
                                            </div>
                                        </div>
                                        <div className="flex gap-1">
                                            <div className="w-[60px] h-60px">
                                                <img src={Pant} alt="" className="object-cover w-full h-full object-top"/>
                                            </div>
                                            <div className="w-[60px] h-60px">
                                                <img src={Pant} alt="" className="object-cover w-full h-full object-top"/>
                                            </div>
                                            <div className="w-[60px] h-60px">
                                                <img src={Pant} alt="" className="object-cover w-full h-full object-top"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="conversation-footer absolute bottom-0 w-full">
                            <div className="px-4 py-3 flex items-center gap-2 border-t border-b border-primaryColor-shade-200 overflow-x-auto custom-scroll scroll-y">
                                <span>To</span>
                                <div className="flex gap-2">
                                    <div className="flex items-center gap-2">
                                        <div className="tag-badge normal-case h-auto text-white px-2 bg-primaryColor">
                                            <span>Nitex</span>
                                            <span className="ml-3 cursor-pointer">
                                            <CloseSmallWhiteIcon />
                                        </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="tag-badge normal-case h-auto text-white px-2 bg-primaryColor">
                                            <span>Buyer</span>
                                            <span className="ml-3 cursor-pointer">
                                            <CloseSmallWhiteIcon />
                                        </span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <input type="text" className="outline-none" placeholder="Type here ..."/>
                                </div>
                            </div>
                            <div className="p-4 h-[116px]">
                                <div className="flex items-center gap-2 mb-1">
                                     <span className="w-[40px] h-[40px] rounded-full overflow-hidden inline-block">
                                        <img src={User} alt="" className="object-cover w-full h-full"/>
                                    </span>
                                    <input type="text" className="outline-none" placeholder="Write Here ..."/>
                                    <div className="ml-auto cursor-pointer">
                                        <AttachedIcon />
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

export default StyleGuide //change the Boilarplate name to your specified name
