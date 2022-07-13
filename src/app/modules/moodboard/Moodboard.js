import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector, useStore, shallowEqual } from 'react-redux'

import { Navigate, useNavigate } from 'react-router-dom'
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
import { ReactComponent as HeartIconFill } from '../../../assets/icons/favourite.svg'
import { ReactComponent as HeartIcon } from '../../../assets/images/fav-border.svg'

import { ReactComponent as ArrowRightWhite } from '../../../assets/images/arror-right-white.svg'
import Pdf from '../../../assets/images/pdf.png'

// import thunkType
import {
    GET_MOODBOARD_LIST,
    UPLOAD_MOODBOARDS,
    ADD_MOODBOARD_TO_FAVORITE,
    REMOVE_MOODBOARD_FROM_FAVORITE,
    GET_ALL_MOODBOARD_FILTER_DATA,
    GET_FILTERED_MOODBOARDS,
    CREATE_NEW_MOODBOARD
} from '../../redux_toolkit/@types/thunk.types'

// importing thunks
import MoodboardThunks from '../../redux_toolkit/Moodboard/MoodboardThunks'
import { MoodboardActions } from '../../redux_toolkit/Moodboard'
import { SET_TAG_LIST } from '../../redux_toolkit/@types/action.types'

const Moodboard = () => {
    const dispatch = useDispatch()
    // const store = useStore()

    // or some reason afterdeleting the tags vir enot re-rendring
    // so we are implementing a small hack over here

    const [renderAgain, setRenderAgain] = useState(1)

    // selectors
    const moodboardList = useSelector((state) => state.moodboard.moodboardList)

    const allCategory = useSelector(
        (state) => state.moodboard.moodboardFilters.allCategory
    )
    const allSeason = useSelector(
        (state) => state.moodboard.moodboardFilters.allSeason
    )
    const allMarket = useSelector(
        (state) => state.moodboard.moodboardFilters.allMarket
    )
    const selectedCategorySelector = useSelector(
        (state) => state.moodboard.moodboardFilters.selectedCategory
    )
    const selectedSeasonSelector = useSelector(
        (state) => state.moodboard.moodboardFilters.selectedSeason
    )
    const selectedMarketSelector = useSelector(
        (state) => state.moodboard.moodboardFilters.selectedMarket
    )
    const selectedDateOrderSelector = useSelector(
        (state) => state.moodboard.moodboardFilters.selectedDateOrder
    )

    const tagListSelector = useSelector((state) => state.moodboard.tagList)

    const navigate = useNavigate()

    // component states
    const [selectedFile, setSelectedFile] = useState([])

    const popupRef = useRef()

    const [selectedDateOrder, setSelectedDateOrder] = useState([])
    const [selectedCategory, setSelectedCategory] = useState([])
    const [selectedSeason, setSelectedSeason] = useState([])
    const [selectedMarket, setSelectedMarket] = useState([])

    // const [tagList, setTagList] = useState([])
    const [dateFilterTags, setDateFilterTags] = useState([])
    const [categoryFilterTags, setCategoryFilterTags] = useState([])
    const [seasonFilterTags, setSeasonFilterTags] = useState([])
    const [marketFilterTags, setMarketFilterTags] = useState([])

    // functions
    const createNewMoodboard = async () => {
        let respose = await dispatch(MoodboardThunks[CREATE_NEW_MOODBOARD]())
        console.log(respose)
        navigate('/moodboard/' + respose.data.id + '/true')
    }

    const filterTagProcessor = (tag) => {
        if (tag.toLowerCase() === 'id,desc') {
            return 'NEWEST'
        } else if (tag.toLowerCase() === 'id,asc') {
            return 'OLDEST'
        } else {
            return tag
        }
    }

    const removeTag = async (e, tag, target) => {
        // console.log(e.target.value)
        // console.log(tag)
        // console.log(target)
        if (target === 'date') {
            const _dateFilterTags = [...dateFilterTags]
            const indexOfData = _dateFilterTags.indexOf(tag)
            _dateFilterTags.splice(indexOfData, 1)
            setDateFilterTags(_dateFilterTags)
            const _selectedDateOrder = [...selectedDateOrder]
            _selectedDateOrder.splice(indexOfData, 1)
            setSelectedDateOrder(_selectedDateOrder)
        } else if (target === 'category') {
            const indexOfData = categoryFilterTags.indexOf(tag)
            const _categoryFilterTags = [...categoryFilterTags]
            _categoryFilterTags.splice(indexOfData, 1)
            setCategoryFilterTags(_categoryFilterTags)
            const _selectedCategory = [...selectedCategory]
            _selectedCategory.splice(indexOfData, 1)
            setSelectedCategory(_selectedCategory)
            console.log('executing')
        } else if (target === 'season') {
            const indexOfData = seasonFilterTags.indexOf(tag)
            const _seasonFilterTags = [...seasonFilterTags]
            _seasonFilterTags.splice(indexOfData, 1)
            setSeasonFilterTags(_seasonFilterTags)
            const _selectedSeason = [...selectedSeason]
            _selectedSeason.splice(indexOfData, 1)
            setSelectedSeason(_selectedSeason)
        } else if (target === 'market') {
            const indexOfData = marketFilterTags.indexOf(tag)
            const _marketFilterTags = [...marketFilterTags]
            _marketFilterTags.splice(indexOfData, 1)
            setMarketFilterTags(_marketFilterTags)
            const _selectedMarket = [...selectedMarket]
            _selectedMarket.splice(indexOfData, 1)
            setSelectedMarket(_selectedMarket)
        }

        // onFilterSubmit()

        // setRenderAgain(renderAgain + 1)
    }

    const onSortDateChange = (e) => {
        console.log(e)
        setSelectedDateOrder([e.target.value])
        let _dateFilterTags = Object.assign([], dateFilterTags)
        if (_dateFilterTags.includes(e.target.value)) {
            _dateFilterTags.splice(_dateFilterTags.indexOf(e.target.value), 1)
            setDateFilterTags(_dateFilterTags)
        } else {
            _dateFilterTags.push(e.target.value)
            setDateFilterTags(_dateFilterTags)
        }
    }

    const onSeasonChange = (e, seasonName) => {
        const _seasonFilterTags = Object.assign([], seasonFilterTags)
        if (selectedSeason.includes(e.target.value)) {
            setSelectedSeason(
                selectedSeason.filter((item) => item !== e.target.value)
            )
            _seasonFilterTags.splice(seasonFilterTags.indexOf(seasonName), 1)
            setSeasonFilterTags(_seasonFilterTags)
        } else {
            setSelectedSeason([...selectedSeason, e.target.value])
            _seasonFilterTags.push(seasonName)
            setSeasonFilterTags(_seasonFilterTags)
        }
    }

    const onCategoryChange = (e, categoryName) => {
        const _categoryFilterTags = Object.assign([], categoryFilterTags)
        if (selectedCategory.includes(e.target.value)) {
            const indexOfObject = categoryFilterTags.findIndex(
                (item) => item.name === categoryName
            )
            setSelectedCategory(
                selectedCategory.filter((item) => item !== e.target.value)
            )
            _categoryFilterTags.splice(
                categoryFilterTags.indexOf(categoryName),
                1
            )
            setCategoryFilterTags(_categoryFilterTags)
        } else {
            setSelectedCategory([...selectedCategory, e.target.value])
            _categoryFilterTags.push(categoryName)
            setCategoryFilterTags(_categoryFilterTags)
        }
        // we need to optimize this code in order to implement remove tag feature
        // first we will look for the data in array
    }

    const onMarketChange = (e, marketName) => {
        const _marketFilterTags = Object.assign([], marketFilterTags)
        if (selectedMarket.includes(e.target.value)) {
            setSelectedMarket(
                selectedMarket.filter((item) => item !== e.target.value)
            )
            _marketFilterTags.splice(marketFilterTags.indexOf(marketName), 1)
            setMarketFilterTags(_marketFilterTags)
        } else {
            setSelectedMarket([...selectedMarket, e.target.value])
            _marketFilterTags.push(marketName)
            setMarketFilterTags(_marketFilterTags)
        }
    }

    const onFilterSubmit = async () => {
        console.log('onFilterSubmit')
        // console.log(selectedCategory)
        // console.log(selectedSeason)
        // console.log(selectedMarket)

        // dispatch({
        //     type: MoodboardActions[SET_TAG_LIST],
        //     payload: {
        //         categoryTagList: categoryFilterTags,
        //         seasonTagList: seasonFilterTags,
        //         marketTagList: marketFilterTags,
        //         datetTagList: dateFilterTags
        //     }
        // })

        dispatch(
            MoodboardThunks[GET_FILTERED_MOODBOARDS]({
                selectedCategory,
                selectedSeason,
                selectedMarket,
                selectedDateOrder
            })
        )

        // dispatch(
        //     MoodboardThunks[GET_FILTERED_MOODBOARDS]({
        //         dateFilterTags,
        //         seasonFilterTags,
        //         categoryFilterTags,
        //         marketFilterTags
        //     })
        // )
        // resetFilters()
    }

    const resetFilters = (e) => {
        setSelectedCategory([])
        setSelectedSeason([])
        setSelectedMarket([])
        dispatch(MoodboardThunks[GET_MOODBOARD_LIST]())
    }

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

    const setFavourite = async (id) => {
        await dispatch(MoodboardThunks[ADD_MOODBOARD_TO_FAVORITE](id))
    }

    const removeFavourite = async (id) => {
        await dispatch(MoodboardThunks[REMOVE_MOODBOARD_FROM_FAVORITE](id))
    }

    // use effects

    useEffect(() => {
        // this is a thunk, it has inside logic to set data in state
        let data = dispatch(MoodboardThunks[GET_MOODBOARD_LIST]())
        data.then((sliceSnap) => {
            // console.log(sliceSnap)
            // this is the snap of new state
            // but we won't use it here
        })
    }, [])

    useEffect(() => {
        dispatch(MoodboardThunks[GET_ALL_MOODBOARD_FILTER_DATA]())
    }, [])

    useEffect(() => {
        // console.log(allCategory)
        // console.log(allSeason)
        // console.log(allMarket)
        setSelectedCategory(selectedCategorySelector)
        setSelectedSeason(selectedSeasonSelector)
        setSelectedMarket(selectedMarketSelector)
        setSelectedDateOrder(selectedDateOrderSelector)

        setDateFilterTags(tagListSelector.datetTagList)
        setSeasonFilterTags(tagListSelector.seasonTagList)
        setCategoryFilterTags(tagListSelector.categoryTagList)
        setMarketFilterTags(tagListSelector.marketTagList)
    }, [])

    useEffect(() => {
        dispatch({
            type: MoodboardActions[SET_TAG_LIST],
            payload: {
                categoryTagList: categoryFilterTags,
                seasonTagList: seasonFilterTags,
                marketTagList: marketFilterTags,
                datetTagList: dateFilterTags
            }
        })

        dispatch(
            MoodboardThunks[GET_FILTERED_MOODBOARDS]({
                selectedCategory,
                selectedSeason,
                selectedMarket,
                selectedDateOrder
            })
        )
    }, [categoryFilterTags, seasonFilterTags, marketFilterTags, dateFilterTags])

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
                                {tagListSelector?.categoryTagList?.length > 0 &&
                                    tagListSelector.categoryTagList.map(
                                        (tag, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className='tag-badge'
                                                >
                                                    <span>
                                                        {filterTagProcessor(
                                                            tag
                                                        )}
                                                    </span>
                                                    <span className='ml-6 cursor-pointer'>
                                                        <CloseIcon
                                                            onClick={(e) =>
                                                                removeTag(
                                                                    e,
                                                                    tag,
                                                                    'category'
                                                                )
                                                            }
                                                        />
                                                    </span>
                                                </div>
                                            )
                                        }
                                    )}
                                {tagListSelector?.seasonTagList?.length > 0 &&
                                    tagListSelector?.seasonTagList.map(
                                        (tag, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className='tag-badge'
                                                >
                                                    <span>
                                                        {filterTagProcessor(
                                                            tag
                                                        )}
                                                    </span>
                                                    <span className='ml-6 cursor-pointer'>
                                                        <CloseIcon
                                                            onClick={(e) =>
                                                                removeTag(
                                                                    e,
                                                                    tag,
                                                                    'season'
                                                                )
                                                            }
                                                        />
                                                    </span>
                                                </div>
                                            )
                                        }
                                    )}
                                {tagListSelector?.marketTagList?.length > 0 &&
                                    tagListSelector.marketTagList.map(
                                        (tag, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className='tag-badge'
                                                >
                                                    <span>
                                                        {filterTagProcessor(
                                                            tag
                                                        )}
                                                    </span>
                                                    <span className='ml-6 cursor-pointer'>
                                                        <CloseIcon
                                                            onClick={(e) =>
                                                                removeTag(
                                                                    e,
                                                                    tag,
                                                                    'market'
                                                                )
                                                            }
                                                        />
                                                    </span>
                                                </div>
                                            )
                                        }
                                    )}
                                {tagListSelector?.datetTagList?.length > 0 &&
                                    tagListSelector.datetTagList.map(
                                        (tag, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className='tag-badge'
                                                >
                                                    <span>
                                                        {filterTagProcessor(
                                                            tag
                                                        )}
                                                    </span>
                                                    <span className='ml-6 cursor-pointer'>
                                                        <CloseIcon
                                                            onClick={(e) =>
                                                                removeTag(
                                                                    e,
                                                                    tag,
                                                                    'date'
                                                                )
                                                            }
                                                        />
                                                    </span>
                                                </div>
                                            )
                                        }
                                    )}
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
                                    onClick={(e) => {
                                        e.preventDefault()
                                        createNewMoodboard()
                                    }}
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
                                                  {moodboardStatusToString(
                                                      moodboard.status
                                                  ) !== '' && (
                                                      <span className='badge bg-warning font-bold py-1'>
                                                          {moodboardStatusToString(
                                                              moodboard.status
                                                          )}
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
                                                      {moodboard?.noOfProduct !==
                                                          null &&
                                                          moodboard?.noOfProduct !==
                                                              0 &&
                                                          '.'}
                                                  </span>
                                                  <span>
                                                      {moodboard?.noOfProduct !==
                                                          null &&
                                                          moodboard?.noOfProduct !==
                                                              0 &&
                                                          moodboard.noOfProduct}
                                                  </span>
                                              </div>

                                              {moodboard.colorResponseList
                                                  .length > 0 && (
                                                  <div className='color-list flex gap-1 mt-10 md:mt-16'>
                                                      {moodboard.colorResponseList.map(
                                                          (color) => {
                                                              return (
                                                                  <span
                                                                      className={`color-circle bg-primaryColor[${color.hexCode}]`}
                                                                      key={
                                                                          color.id
                                                                      }
                                                                  ></span>
                                                              )
                                                          }
                                                      )}
                                                  </div>
                                              )}
                                          </div>
                                      </div>
                                      <div className='overflow-hidden relative h-[276px] md:h-[524px] pt-0 md:pt-4 p-4 bg-white'>
                                          <div className='image-grid-overlay-white'>
                                              <div className='columns-3 gap-1 direction-rtl'>
                                                  {moodboard.productImageList
                                                      .length > 0 &&
                                                      moodboard.productImageList.map(
                                                          (image) => {
                                                              return (
                                                                  <img
                                                                      key={
                                                                          image.id
                                                                      }
                                                                      className='w-full mb-1'
                                                                      src={
                                                                          image.docUrl
                                                                      }
                                                                  />
                                                              )
                                                          }
                                                      )}
                                              </div>
                                          </div>
                                          <div className='w-[40px] h-[40px] bg-white border border-white-shade-100 flex justify-center items-center absolute right-[35px] top-[35px] cursor-pointer'>
                                              <span className='mt-2'>
                                                  {/* <HeartIcon /> */}

                                                  {moodboard.isFavorite && (
                                                      <HeartIconFill
                                                          onClick={(e) => {
                                                              e.stopPropagation()

                                                              removeFavourite(
                                                                  moodboard.id
                                                              )
                                                          }}
                                                      />
                                                  )}
                                                  {!moodboard?.isFavorite && (
                                                      <HeartIcon
                                                          onClick={(e) => {
                                                              e.stopPropagation()
                                                              setFavourite(
                                                                  moodboard.id
                                                              )
                                                          }}
                                                      />
                                                  )}
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
            <form>
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
                                        <span className='text-primaryColor-shade-100'>
                                            Sort by
                                        </span>
                                        <div className='mt-6 space-y-8'>
                                            <div className='flex items-start'>
                                                <span>
                                                    <input
                                                        type='radio'
                                                        name='Sortby'
                                                        id='NewestFirst'
                                                        value='id,desc'
                                                        onChange={
                                                            onSortDateChange
                                                        }
                                                    />
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
                                                    <input
                                                        type='radio'
                                                        name='Sortby'
                                                        value='id,asc'
                                                        onChange={
                                                            onSortDateChange
                                                        }
                                                        id='OldestFirst'
                                                    />
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
                                        <span className='text-primaryColor-shade-100'>
                                            Season
                                        </span>
                                        <div className='mt-6 space-y-8'>
                                            {allSeason?.length > 0 &&
                                                allSeason.map((season) => {
                                                    {
                                                        /* {
                                                    console.log(season)
                                                } */
                                                    }
                                                    return (
                                                        <div
                                                            key={season.code}
                                                            className='flex items-start'
                                                        >
                                                            <span>
                                                                <input
                                                                    type='checkbox'
                                                                    id={
                                                                        season.code
                                                                    }
                                                                    value={
                                                                        season.code
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        onSeasonChange(
                                                                            e,
                                                                            season.name
                                                                        )
                                                                    }}
                                                                />
                                                            </span>
                                                            <label
                                                                htmlFor={
                                                                    season.code
                                                                }
                                                                className='align-middle pl-4 inline-block mt-[-3px]'
                                                            >
                                                                {season.name}
                                                            </label>
                                                        </div>
                                                    )
                                                })}
                                        </div>
                                    </div>
                                    <div className='border-r border-b last:border-r-none border-white-shade-100 py-6 px-10'>
                                        <span className='text-primaryColor-shade-100'>
                                            Market
                                        </span>
                                        <div className='mt-6 space-y-8'>
                                            {allMarket?.length > 0 &&
                                                allMarket.map((market) => {
                                                    {
                                                        {
                                                            /* console.log(market) */
                                                        }
                                                    }
                                                    return (
                                                        <div
                                                            key={market.id}
                                                            className='flex items-start'
                                                        >
                                                            <span>
                                                                <input
                                                                    type='checkbox'
                                                                    id={
                                                                        market.name
                                                                    }
                                                                    value={
                                                                        market.id
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        onMarketChange(
                                                                            e,
                                                                            market.name
                                                                        )
                                                                    }}
                                                                />
                                                            </span>
                                                            <label
                                                                htmlFor={
                                                                    market.name
                                                                }
                                                                className='align-middle pl-4 inline-block mt-[-3px]'
                                                            >
                                                                {market.name}
                                                            </label>
                                                        </div>
                                                    )
                                                })}
                                        </div>
                                    </div>
                                    <div className='border-r border-b last:border-r-none border-white-shade-100 py-6 px-10'>
                                        <span className='text-primaryColor-shade-100'>
                                            Category
                                        </span>
                                        <div className='mt-6'>
                                            <div className='flex'>
                                                <input
                                                    type='text'
                                                    className='form-field border border-primaryColor h-[40px] p-2 px-4'
                                                    id='name'
                                                    placeholder='Search ...'
                                                    name='name'
                                                />
                                                <button
                                                    type='button'
                                                    className='btn h-[40px] p-2'
                                                >
                                                    <SearchIconWhite />
                                                </button>
                                            </div>
                                        </div>
                                        <div className='mt-6 space-y-8'>
                                            {allCategory?.length > 0 &&
                                                allCategory.map((category) => {
                                                    {
                                                        {
                                                            /* console.log(category) */
                                                        }
                                                    }
                                                    return (
                                                        <div
                                                            key={category.id}
                                                            className='flex items-start'
                                                        >
                                                            <span>
                                                                <input
                                                                    type='checkbox'
                                                                    id={
                                                                        category.name
                                                                    }
                                                                    value={
                                                                        category.id
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        onCategoryChange(
                                                                            e,
                                                                            category.name
                                                                        )
                                                                    }}
                                                                />
                                                            </span>
                                                            <label
                                                                htmlFor={
                                                                    category.name
                                                                }
                                                                className='align-middle pl-4 inline-block mt-[-3px]'
                                                            >
                                                                {category.name}
                                                            </label>
                                                        </div>
                                                    )
                                                })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='modal-footer p-4 flex justify-end gap-4'>
                                <button
                                    type='reset'
                                    className='btn bg-transparent px-5 font-normal border border-primaryColor text-primaryColor'
                                    onClick={resetFilters}
                                >
                                    <Refresh />
                                </button>
                                <button
                                    type='button'
                                    className='btn flex justify-between items-center'
                                    onClick={(e) => {
                                        e.preventDefault()
                                        onFilterSubmit()
                                    }}
                                    data-bs-toggle='modal'
                                    data-bs-target='#SortFilter'
                                >
                                    <span>Filter Now</span>
                                    <span className='ml-2'>
                                        <OkWhite />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

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
                                            onClick={(e) =>
                                                (e.target.value = null)
                                            }
                                            onChange={(e) => onFileChange(e)}
                                        />
                                        <label
                                            htmlFor='input-file'
                                            className='w-full justify-between'
                                        >
                                            <span className='mr-4'>
                                                Browse Moodboard
                                            </span>
                                            <UploadIcon />
                                        </label>
                                    </div>
                                </div>
                                <div className='input-group'>
                                    <label className='label'>
                                        uploaded file
                                    </label>
                                    <div className='space-y-3'>
                                        {selectedFile?.length > 0 &&
                                            selectedFile.map((file, index) => (
                                                <div
                                                    key={index}
                                                    className='text-base font-normal p-4 px-5 bg-white-shade-100 flex items-center justify-between'
                                                >
                                                    <div className='flex items-center'>
                                                        <span>
                                                            <img
                                                                src={Pdf}
                                                                alt=''
                                                            />
                                                        </span>
                                                        <span className='text-base ml-4'>
                                                            {file.name}{' '}
                                                        </span>
                                                    </div>
                                                    <span className='cursor-pointer'>
                                                        <Dlt
                                                            onClick={(e) =>
                                                                removeFile(
                                                                    index
                                                                )
                                                            }
                                                        />
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
