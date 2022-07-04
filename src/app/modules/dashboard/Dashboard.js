import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { ReactComponent as IconSeeMore } from '../../../assets/icons/seeMore.svg'
import { ReactComponent as CloseIcon } from '../../../assets/images/close-small-white.svg'
import { ReactComponent as PhoneIcon } from '../../../assets/images/phone-circle.svg'
import { ReactComponent as MailIcon } from '../../../assets/images/mail-circle.svg'
import { ReactComponent as IconShare } from '../../../assets/icons/share.svg'
import { ReactComponent as IconRightArrow } from '../../../assets/icons/rightArrow.svg'
import { ReactComponent as IconEdit } from '../../../assets/icons/editModeboard.svg'
import { ReactComponent as IconDollar } from '../../../assets/icons/dolar.svg'
import GreetingSlider from './GreetingSlider'
import Http from '../../services/Http'
import { authUserInfo } from '../../services/Util'
import FirstSharedCollection from './FirstSharedCollection'
import ImageViewCollections from './ImageViewCollections'
import CardForCollection from '../../common/CardForCollection'
import LoaderComponent from '../../common/LoaderComponent'
import OurOffer from './OurOffer'
import FabricWiseProduct from './FabricWiseProduct'

const Dashboard = () => {
  const [loader, setLoader] = useState(true)
  const [showManagerInfo, setShowManagerInfo] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const [collections, setCollections] = useState([])
  const [managerInfo, setManagerInfo] = useState({})
  const [dashboardCount, setDashboardCount] = useState({})

  useEffect(() => {
    Http.GET_WITH_ID_PARAM('searchCollectionByUser', '?memberType=SHARED&size=10&sort=id,desc', authUserInfo().id).then(({ data }) => {
      setLoader(false)
      setCollections(data.data)
    }).catch(({ response }) => {
      toast.error(response.data.message)
      setLoader(false)
    })
  }, [])

  useEffect(() => {
    Http.GET('accManagerInfo')
      .then((response) => {
        setManagerInfo(response.data);
      })
      .catch(({ response }) => {
          toast.error(response.data.message);
      });
  },[])

  useEffect(() => {
    Http.GET('fetchDashboardCount')
      .then((response) => {
        setDashboardCount(response.data);
      })
      .catch(({ response }) => {
          toast.error(response.data.message);
      });
  },[])

  const renderFirstCollection = () => {
    if (collections.length > 0) {
      return (
        <FirstSharedCollection collection={collections[0]} />
      )
    } else {
      return (
        <div className='xl:w-[70%] 4xl:w-4/5'>
          <div className='flex items-center justify-center h-full py-10'>
            <div className='max-w-[582px] text-center relative'>
              <img src='/images/leef-new.png'
                   className='absolute left-0 sm:left-[-74px] top-0 z-10 hidden sm:block' alt='' />
              <h1 className='text-4xl sm:text-5xl text-primaryColor font-bold  mb-4'>We are
                designing <br /> for you</h1>
              <p className='max-w-[398px] text-base text-primaryColor m-0'>We are designing something
                interisting for you. We will revolutionize together.</p>
              <img src='/images/leef-new-reflect.png'
                   className='absolute right-0 sm:right-[-74px] top-0 z-10 hidden sm:block' alt='' />
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <LoaderComponent loading={loader}>
      <div className='banner-section flex flex-col xl:flex-row gap-4'>
        <GreetingSlider />
        {renderFirstCollection()}
      </div>
      <ImageViewCollections collections={collections.slice(1, 3)} />
      <CardForCollection collections={collections.slice(3, 6)} />

      {collections.length > 6 && <div className='flex items-center justify-center pt-5 sm:pt-10 pb-12 sm:pb-20'>
        <button className='flex items-center text-xl text-primaryColor'>
          <span className='mr-4'>See More</span>
          <span>
            <IconSeeMore />
          </span>
        </button>
      </div>}

      <div className='grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-6 mb-12 sm:mb-20'>
        <div data-bs-toggle='modal' data-bs-target='#BriefCollection'
             className='flex items-center p-6 lg:p-10 py-12 bg-pink overflow-hidden cursor-pointer'>
          <div className='flex items-center justify-between w-full relative circle-bg circle-bg2'>
            <div>
              <h4 className='text-px28 text-white-shade-100 uppercase mb-4 leading-8'>Brief
                a <strong>Collection</strong></h4>
              <span className='flex items-center text-xl font-light text-white-shade-100 cursor-pointer'>
                <span className='lg:mr-4'>By sharing your Inspirations</span>
                <span>
                  <IconRightArrow />
                </span>
              </span>
            </div>
            <div className='share cursor-pointer z-10'>
              <IconShare />
            </div>
          </div>
        </div>
        <div className='flex items-center p-6 lg:p-10 py-12 bg-blue overflow-hidden'>
          <div className='flex items-center justify-between w-full relative circle-bg circle-bg2'>
            <div>
              <h4 className='text-px28 text-white-shade-100 uppercase mb-4 leading-8'>Share <strong>Moodboard</strong>
              </h4>
              <span className='flex items-center text-xl font-light text-white-shade-100 cursor-pointer'>
                <span className='lg:mr-4'>& collaborate with our designers</span>
                <span>
                  <IconRightArrow />
                </span>
              </span>
            </div>
            <div className='share cursor-pointer z-10'>
              <IconEdit />
            </div>
          </div>
        </div>
        <div className='flex items-center p-6 lg:p-10 py-12 bg-primaryColor overflow-hidden'>
          <div className='flex items-center justify-between w-full relative circle-bg circle-bg2'>
            <div>
              <h4 className='text-px28 text-white-shade-100 uppercase mb-4 leading-8'>Get <strong>Quotation</strong>
              </h4>
              <span className='flex items-center text-xl font-light text-white-shade-100 cursor-pointer'>
                <span className='lg:mr-4'>by uploading Techpacks</span>
                <span>
                  <IconRightArrow />
                </span>
              </span>
            </div>
            <div className='share cursor-pointer z-10'>
              <IconDollar />
            </div>
          </div>
        </div>
      </div>
      <FabricWiseProduct />
      <OurOffer />
      <div className='belong-here relative flex items-center justify-center lg:pt-10 xl:pt-52 pb-36'>
        <div className='w-full md:w-[730px] h-[250px] md:h-[450px] lg:w-[930px]  lg:h-[550px] relative z-10'>
          <div
            className='transparency-text  text-7xl sm:text-[150px] md:xl:text-[200px] font-bold xl:absolute xl:top-[-115px] left-[-112px] 3xl:left-[-212px]'>Belong
          </div>
          <iframe width='100%' height='100%' src='https://www.youtube.com/embed/QjisC1Aj-rA'
                  title='FLYING OVER NEW ZEALAND (4K UHD) - Calming Music With Spectacular Natural Landscape For Relaxation'
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen>
          </iframe>
          <div
            className='transparency-text text-right text-7xl sm:text-[150px] xl:text-[200px] font-bold xl:absolute xl:bottom-[-176px] right-[-112px] 3xl:right-[-212px] pb-20'>Here
          </div>
        </div>
      </div>

      {/*Sticky option*/}

      <div className={`bg-primaryColor  shadow px-7 py-4 w-[338px]  fixed top-[20%] right-${showSummary ? '0' : '[-338px]'} text-white-shade-100 text-base z-[999]`}>
        <div className='bg-primaryColor cursor-pointer px-7 py-4 w-[165px]  absolute top-[45%] left-[-110px] text-white-shade-100 text-center text-base rotate-[-90deg] z-[999]' onClick={() => setShowSummary(prev => !prev)}>
          <span className='uppercase'>Summary</span>
        </div>
        <span className='absolute right-[26px] top-[68px] cursor-pointer'>
          <IconRightArrow />
        </span>
        <div className='flex flex-col border-b-2 border-primaryColor-shade-100 py-5 uppercase cursor-pointer'>
          <span className='mb-1 '>Current Order</span>
          <span className='font-normal text-px28'>{dashboardCount?.noOfCurrentOrder}</span>
        </div>
        <div className='flex flex-col border-b-2 border-primaryColor-shade-100 py-5 uppercase cursor-pointer'>
          <span className='mb-1 '>Quote Request</span>
          <span className='font-normal text-px28'>{dashboardCount?.noOfQuoteRequest}</span>
        </div>
        <div className='flex flex-col border-b-2 border-primaryColor-shade-100 py-5 uppercase cursor-pointer'>
          <span className='mb-1 '>Sample Request</span>
          <span className='font-normal text-px28'>{dashboardCount?.noOfSampleRequest}</span>
        </div>
        <div className='flex flex-col  py-5 uppercase cursor-pointer'>
          <span className='mb-1 '>Pending Notification</span>
          <span className='font-normal text-px28'>{dashboardCount?.noPendingNotification}</span>
        </div>
      </div>

      <div className={showManagerInfo ? 'bg-primaryColor hidden cursor-pointer flex items-center gap-3 p-1 pr-4 w-[200px] h-[60px] rounded-full fixed bottom-0 right-[20px] text-white-shade-100 z-[999] text-base' : 'bg-primaryColor cursor-pointer flex items-center gap-3 p-1 pr-4 w-[200px] h-[60px] rounded-full fixed bottom-0 right-[20px] text-white-shade-100 z-[999] text-base'} onClick={() => setShowManagerInfo(true)}>
        <div
          className='w-[52px] h-[52px] rounded-full bg-primaryColor-shade-300 relative border border-white-shade-100 flex items-center justify-center cursor-pointer overflow-hidden'>
          {!managerInfo?.profilePicDocument?.docUrl &&
            <img src='./images/user.jpg' className='object-cover object-top w-full h-full' alt='' />}
          {managerInfo?.profilePicDocument?.docUrl &&
            <img src={managerInfo?.profilePicDocument?.docUrl} className='object-cover object-top w-full h-full' alt='' />}
        </div>
        <span>Connect</span>
        <span className='ml-auto'>
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M8 20L16 12L8 4' stroke='#F5F5F5' strokeWidth='1.5' strokeLinecap='round'
                  strokeLinejoin='round' />
          </svg>
        </span>
      </div>

      {/*After Open Bottom Profile*/}
      <div className={showManagerInfo ? 'bg-primaryColor w-[420px] rounded-lg p-5 fixed bottom-0 right-[20px] text-white-shade-100 z-[999] text-base' : 'bg-primaryColor hidden w-[420px] rounded-lg p-5 fixed bottom-0 right-[20px] text-white-shade-100 z-[999] text-base'}>
        <div className='flex gap-4 border-b border-primaryColor-shade-100 pb-5 mb-5'>
          <div className='w-[52px] h-[52px] rounded-full bg-primaryColor-shade-300 relative border border-white-shade-100 flex items-center justify-center cursor-pointer overflow-hidden'>
            {!managerInfo?.profilePicDocument?.docUrl &&
              <img src='./images/user.jpg' className='object-cover object-top w-full h-full' alt='' />}
            {managerInfo?.profilePicDocument?.docUrl &&
              <img src={managerInfo?.profilePicDocument?.docUrl} className='object-cover object-top w-full h-full' alt='' />}
          </div>
          <div className='flex flex-col'>
            <span className='font-bold'>{managerInfo?.name}</span>
            <span className='font-normal'>{managerInfo?.designation}</span>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          {managerInfo?.phone && <div className='flex items-center gap-6'>
            <span>
              <PhoneIcon />
            </span>
            <span className='font-normal'>
              <a href={`tel:${managerInfo?.phone}`}>{managerInfo?.phone}</a>
            </span>
          </div>}
          {managerInfo?.email && <div className='flex items-center gap-6'>
            <span>
              <MailIcon />
            </span>
            <span className='font-normal'>
              <a href={`mailto:${managerInfo?.email}`}>{managerInfo?.email}</a>
            </span>
          </div>}
        </div>
        <span
          onClick={() => setShowManagerInfo(false)}
          className='absolute right-[20px] bottom-[20px] cursor-pointer'
        >
          <CloseIcon />
        </span>
      </div>
    </LoaderComponent>
  )
}

export default Dashboard
