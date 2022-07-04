import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector, useStore, shallowEqual } from 'react-redux'

import { useNavigate } from 'react-router-dom'
// import { ReactComponent as FilterIcon } from '../../icons/Filter-24.svg'
import { ReactComponent as PlusIcon } from '../../../assets/images/plus.svg'
import { ReactComponent as UploadIcon } from '../../../assets/images/upload.svg'
import { ReactComponent as FilterIcon } from '../../../assets/images/filter.svg'
import { ReactComponent as SearchIcon } from '../../../assets/images/search.svg'
import { ReactComponent as SearchIconWhite } from '../../../assets/images/search-white.svg'
import { ReactComponent as CloseIcon } from '../../../assets/images/close.svg'
import { ReactComponent as OkWhite } from '../../../assets/images/ok-white.svg'
import { ReactComponent as Refresh } from '../../../assets/images/refresh.svg'
import { ReactComponent as Dlt } from '../../../assets/images/dlt.svg'
import { ReactComponent as ArrowRightWhite } from '../../../assets/images/arror-right-white.svg'
import Pdf from '../../../assets/images/pdf.png'

// import thunkType
import {
  GET_MOODBOARD_LIST,
  UPLOAD_MOODBOARDS
} from '../../redux_toolkit/@types/thunk.types'

// importing thunks
import MoodboardThunks from '../../redux_toolkit/Moodboard/MoodboardThunks'

const Moodboard = () => {
  const dispatch = useDispatch()
  // const store = useStore()
  const moodboardList = useSelector((state) => state.moodboard.moodboardList)

  const navigate = useNavigate()

  const [selectedFile, setSelectedFile] = useState([])


  const popupRef = useRef()

  let moodboardStatusToString = (status) => {
    switch (status) {
      case 'INITIALIZED':
        return ''
      case 'REQUESTED':
        return 'REQUESTED FOR COLLECTION'
      case 'COMPLETED':
        return 'COLLECTION RECEIVED'
      default:
        break
    }
  }

  const handleMoodboardClick = (id) => {
    navigate(`/moodboard/${id}`)
  }

  const onFileChange = async (e) => {
    await setSelectedFile([...e.target.files])

    // console.log(selectedFile)
  }
  const removeFile = (e, index) => {
    const files = [...selectedFile]
    files.splice(index, 1)
    setSelectedFile([...files])

    // console.log(selectedFile)
  }

  const uploadMoodboards = async () => {

      let thunkResponse = await dispatch(
        MoodboardThunks[UPLOAD_MOODBOARDS](selectedFile)
      )
      // console.log('thunkResponse', thunkResponse)
      popupRef.current.click()
      handleMoodboardClick(thunkResponse.response.data.id)
  }

  useEffect(() => {
    // this is a thunk, it has inside logic to set data in state
    let data = dispatch(MoodboardThunks[GET_MOODBOARD_LIST]())
    data.then((sliceSnap) => {
      // console.log(sliceSnap)
      // this is the snap of new state
      // but we won't use it here
    })
  }, [])

  return (
    <div className='container-fluid bg-primaryColor-shade-300'>
      <div className='body-container p-4'>
        <div className='filter'>
          <div className='flex flex-col lg:flex-row lg:items-center justify-between mb-4 gap-6'>
            <div className='text-base md:text-xl text-primaryColor'>
              18 Moodboards
            </div>
            <div className='flex flex-wrap justify-end gap-4 lg:gap-2'>
              <div className='flex items-center gap-2 overflow-x-auto'>
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
              <div className='flex items-center overflow-x-auto gap-2'>
                <button
                  type='button'
                  className='btn bg-transparent px-5 font-normal border border-primaryColor text-primaryColor'
                >
                  <SearchIcon />
                </button>
                <button
                  data-bs-toggle='modal'
                  data-bs-target='#SortFilter'
                  type='button'
                  className='btn bg-transparent px-5 font-normal border border-primaryColor text-primaryColor'
                >
                  <FilterIcon />
                </button>
                <div className='h-[60px] w-[1px] bg-primaryColor-shade-200 mx-3'></div>
                <button
                  type='button'
                  data-bs-toggle='modal'
                  data-bs-target='#UploadMoodboard'
                  className='btn bg-transparent font-normal border border-primaryColor text-primaryColor flex justify-between items-center'
                >
                  <span>Upload</span>
                  <span className='ml-4'>
                    <UploadIcon />
                  </span>
                </button>
                <button
                  type='button'
                  className='btn flex justify-between items-center'
                >
                  <span>Create</span>
                  <span className='ml-2'>
                    <PlusIcon />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* here starts the redering cards part */}
        {moodboardList.length > 0
          ? moodboardList.map((moodboard) => {
              {
                /* console.log(moodboard) */
              }
              return (
                <div
                  className='pb-4'
                  key={moodboard.id}
                  onClick={(e) => {
                    e.preventDefault()
                    handleMoodboardClick(moodboard.id)
                  }}
                >
                  <div className='collection-box grid grid-cols-1 md:grid-cols-2 bg-white'>
                    <div className='p-6 xl:p-10 relative flex items-center'>
                      <div>
                        <div className='flex gap-3'>
                          {moodboardStatusToString(moodboard.status) !== '' && (
                            <span className='badge bg-warning font-bold py-1'>
                              {moodboardStatusToString(moodboard.status)}
                            </span>
                          )}
                        </div>
                        <h1 className='text-2xl md:text-4xl text-primaryColor font-bold mt-3  md:leading-[54px]'>
                          {moodboard.name}
                        </h1>
                        <div className='paragraph-grid-overlay-white relative mb-4'>
                          <p>{moodboard.description}</p>
                        </div>
                        <div className='flex items-center text-base md:text-xl text-primaryColor gap-3 md:gap-5'>
                          <span>Designed by NITEX</span>
                          <span className='leading-none inline-block mb-2'>
                            .
                          </span>
                          <span>23 Styles</span>
                        </div>

                        {moodboard.colorResponseList.length > 0 && (
                          <div className='color-list flex gap-1 mt-10 md:mt-16'>
                            {moodboard.colorResponseList.map((color) => {
                              return (
                                <span
                                  className={`color-circle bg-primaryColor[${color.hexCode}]`}
                                  key={color.id}
                                ></span>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='overflow-hidden relative h-[276px] md:h-[524px] pt-0 md:pt-4 p-4 bg-white'>
                      <div className='image-grid-overlay-white'>
                        <div className='columns-3 gap-1 direction-rtl'>
                          {moodboard.productImageList.length > 0 &&
                            moodboard.productImageList.map((image) => {
                              return (
                                <img
                                  key={image.id}
                                  className='w-full mb-1'
                                  src={image.docUrl}
                                />
                              )
                            })}
                        </div>
                      </div>
                      <div className='w-[40px] h-[40px] bg-white border border-white-shade-100 flex justify-center items-center absolute right-[35px] top-[35px] cursor-pointer'>
                        <span className='mt-2'>
                          <svg
                            width='38'
                            height='36'
                            viewBox='0 0 38 36'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <g filter='url(#filter0_d_944_19802)'>
                              <path
                                d='M18.4415 22.7608L10.5723 14.5663C8.35573 12.2582 8.49531 8.4736 10.8753 6.34929C13.2364 4.24181 16.8165 4.65105 18.6824 7.24171L18.9961 7.67724L19.3098 7.24171C21.1757 4.65105 24.7557 4.24181 27.1169 6.34929C29.4969 8.4736 29.6365 12.2582 27.4199 14.5663L19.5507 22.7608C19.2444 23.0797 18.7478 23.0797 18.4415 22.7608Z'
                                fill='#DA336F'
                                // api not sending response for it
                              />
                              <path
                                d='M18.4415 22.7608L10.5723 14.5663C8.35573 12.2582 8.49531 8.4736 10.8753 6.34929C13.2364 4.24181 16.8165 4.65105 18.6824 7.24171L18.9961 7.67724L19.3098 7.24171C21.1757 4.65105 24.7557 4.24181 27.1169 6.34929C29.4969 8.4736 29.6365 12.2582 27.4199 14.5663L19.5507 22.7608C19.2444 23.0797 18.7478 23.0797 18.4415 22.7608Z'
                                stroke='#F5F5F5'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                            </g>
                            <defs>
                              <filter
                                id='filter0_d_944_19802'
                                x='0.496094'
                                y='0.5'
                                width='37'
                                height='35'
                                filterUnits='userSpaceOnUse'
                                colorInterpolationFilters='sRGB'
                              >
                                <feFlood
                                  floodOpacity='0'
                                  result='BackgroundImageFix'
                                />
                                <feColorMatrix
                                  in='SourceAlpha'
                                  type='matrix'
                                  values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                                  result='hardAlpha'
                                />
                                <feOffset dy='4' />
                                <feGaussianBlur stdDeviation='4' />
                                <feComposite in2='hardAlpha' operator='out' />
                                <feColorMatrix
                                  type='matrix'
                                  values='0 0 0 0 0.854167 0 0 0 0 0.199306 0 0 0 0 0.435056 0 0 0 0.2 0'
                                />
                                <feBlend
                                  mode='normal'
                                  in2='BackgroundImageFix'
                                  result='effect1_dropShadow_944_19802'
                                />
                                <feBlend
                                  mode='normal'
                                  in='SourceGraphic'
                                  in2='effect1_dropShadow_944_19802'
                                  result='shape'
                                />
                              </filter>
                            </defs>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          : null}
      </div>

      {/*SortFilter Moodboard Modal*/}
      <div
        className='modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto'
        id='SortFilter'
        tabIndex='-1'
        aria-labelledby='exampleModalCenterTitle'
        aria-modal='true'
        role='dialog'
      >
        <div className='modal-dialog max-w-[1840px] mx-4 5xl:mx-auto modal-dialog-centered relative w-auto pointer-events-none'>
          <div className='modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding outline-none text-current'>
            <div className='modal-header flex flex-shrink-0 items-center justify-between bg-primaryColor-shade-300 p-4 pl-8'>
              <h5
                className='text-xl font-bold leading-normal text-primaryColor uppercase'
                id='exampleModalScrollableLabel'
              >
                Sort & Filter
              </h5>
              <button
                type='button'
                className='btn-close box-content w-4 h-4 p-1 !mr-0.5 text-black border-none  opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body relative'>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
                <div className='border-r border-b last:border-r-none border-white-shade-100 py-6 px-10'>
                  <span className='text-primaryColor-shade-100'>Sort by</span>
                  <div className='mt-6 space-y-8'>
                    <div className='flex items-start'>
                      <span>
                        <input type='radio' name='Sortby' id='NewestFirst' />
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
                        <input type='radio' name='Sortby' id='OldestFirst' />
                      </span>
                      <label
                        htmlFor='OldestFirst'
                        className='align-middle pl-4 inline-block mt-[-3px]'
                      >
                        Oldest First
                      </label>
                    </div>
                  </div>
                </div>
                <div className='border-r border-b last:border-r-none border-white-shade-100 py-6 px-10'>
                  <span className='text-primaryColor-shade-100'>Season</span>
                  <div className='mt-6 space-y-8'>
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
                </div>
                <div className='border-r border-b last:border-r-none border-white-shade-100 py-6 px-10'>
                  <span className='text-primaryColor-shade-100'>Market</span>
                  <div className='mt-6 space-y-8'>
                    <div className='flex items-start'>
                      <span>
                        <input type='checkbox' id='Men' />
                      </span>
                      <label
                        htmlFor='Men'
                        className='align-middle pl-4 inline-block mt-[-3px]'
                      >
                        Men
                      </label>
                    </div>
                    <div className='flex items-start'>
                      <span>
                        <input type='checkbox' id='Girls' />
                      </span>
                      <label
                        htmlFor='Girls'
                        className='align-middle pl-4 inline-block mt-[-3px]'
                      >
                        Girls (age 5-18)
                      </label>
                    </div>
                    <div className='flex items-start'>
                      <span>
                        <input type='checkbox' id='Boys' />
                      </span>
                      <label
                        htmlFor='Boys'
                        className='align-middle pl-4 inline-block mt-[-3px]'
                      >
                        Boys (age 5-18)
                      </label>
                    </div>
                    <div className='flex items-start'>
                      <span>
                        <input type='checkbox' id='Toddlers' />
                      </span>
                      <label
                        htmlFor='Toddlers'
                        className='align-middle pl-4 inline-block mt-[-3px]'
                      >
                        Toddlers (age 1-4)
                      </label>
                    </div>
                    <div className='flex items-start'>
                      <span>
                        <input type='checkbox' id='Infants' />
                      </span>
                      <label
                        htmlFor='Infants'
                        className='align-middle pl-4 inline-block mt-[-3px]'
                      >
                        Infants (age 0-1)
                      </label>
                    </div>
                  </div>
                </div>
                <div className='border-r border-b last:border-r-none border-white-shade-100 py-6 px-10'>
                  <span className='text-primaryColor-shade-100'>Category</span>
                  <div className='mt-6'>
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
                  </div>
                  <div className='mt-6 space-y-8'>
                    <div className='flex items-start'>
                      <span>
                        <input type='checkbox' id='Jeans' />
                      </span>
                      <label
                        htmlFor='Jeans'
                        className='align-middle pl-4 inline-block mt-[-3px]'
                      >
                        Jeans
                      </label>
                    </div>
                    <div className='flex items-start'>
                      <span>
                        <input type='checkbox' id='Tee' />
                      </span>
                      <label
                        htmlFor='Tee'
                        className='align-middle pl-4 inline-block mt-[-3px]'
                      >
                        Tee
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='modal-footer p-4 flex justify-end gap-4'>
              <button
                type='button'
                className='btn bg-transparent px-5 font-normal border border-primaryColor text-primaryColor'
              >
                <Refresh />
              </button>
              <button
                type='button'
                className='btn flex justify-between items-center'
              >
                <span>Login Now</span>
                <span className='ml-2'>
                  <OkWhite />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*Upload Moodboard Modal*/}
      <div
        className='modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto'
        id='UploadMoodboard'
        tabIndex='-1'
        aria-labelledby='exampleModalCenterTitle'
        aria-modal='true'
        role='dialog'
      >
        <div className='modal-dialog max-w-[680px] modal-dialog-centered relative w-auto pointer-events-none'>
          <div className='modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding outline-none text-current'>
            <div className='modal-header flex flex-shrink-0 items-center justify-between bg-primaryColor-shade-300 p-4 pl-8'>
              <h5
                className='text-xl font-bold leading-normal text-primaryColor uppercase'
                id='exampleModalScrollableLabel'
              >
                Upload Moodboard
              </h5>
              <button
                type='button'
                className='btn-close box-content w-4 h-4 p-1 !mr-0.5 text-black border-none  opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body relative m-6 mb-0 pb-10  border-b border-primaryColor-shade-200'>
              <div className='space-y-10'>
                {/*  this is the block for uploading data */}
                <div className='input-group'>
                  <div className='file'>
                    <input
                      multiple
                      id='input-file'
                      type='file'
                      onClick={(e) => (e.target.value = null)}
                      onChange={(e) => onFileChange(e)}
                    />
                    <label
                      htmlFor='input-file'
                      className='w-full justify-between'
                    >
                      <span className='mr-4'>Browse Moodboard</span>
                      <UploadIcon />
                    </label>
                  </div>
                </div>
                <div className='input-group'>
                  <label className='label'>uploaded file</label>
                  <div className='space-y-3'>
                    {selectedFile?.length > 0 &&
                      selectedFile.map((file, index) => (
                        <div
                          key={index}
                          className='text-base font-normal p-4 px-5 bg-white-shade-100 flex items-center justify-between'
                        >
                          <div className='flex items-center'>
                            <span>
                              <img src={Pdf} alt='' />
                            </span>
                            <span className='text-base ml-4'>{file.name} </span>
                          </div>
                          <span className='cursor-pointer'>
                            <Dlt onClick={(e) => removeFile(index)} />
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className='modal-footer p-6 pt-10 flex gap-4'>
              <button
                type='button'
                data-bs-dismiss='modal'
                className='btn bg-transparent px-5 w-[135px] font-normal border border-primaryColor text-primaryColor px-8'
              >
                Close
              </button>
              <button
                ref={popupRef}
                type='button'
                className='btn hidden'
                data-bs-toggle='modal'
                data-bs-target='#UploadMoodboard'
              >
                Activated Soon
              </button>
              <button
                type='button'
                className='btn flex flex-1 justify-between items-center'
                onClick={(e) => uploadMoodboards(e)}
              >
                <span>Proceed</span>
                <span className='ml-2'>
                  <ArrowRightWhite />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Moodboard
