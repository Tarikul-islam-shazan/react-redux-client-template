import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// thunks to get moodboard data and set it into the store
import MoodboardThunks from '../../redux_toolkit/Moodboard/MoodboardThunks'
import { GET_MOODBOARD_BY_ID } from '../../redux_toolkit/@types/thunk.types'

import { ReactComponent as FilterIcon } from '../../../assets/icons/Filter-24.svg'
import { ReactComponent as AddIcon } from '../../../assets/icons/add-white.svg'
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg'
import { ReactComponent as TickIcon } from '../../../assets/icons/tick.svg'
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg'
import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg'
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { ReactComponent as MenuIcon } from '../../../assets/images/home/humbargerMenu.svg'
import { ReactComponent as NitexIcon } from '../../../assets/images/home/nitexLogo.svg'
import { ReactComponent as IconFavourite } from '../../../assets/images/home/favourite.svg'
import { ReactComponent as IconNotification } from '../../../assets/images/home/notification.svg'

const MoodboardView = (props) => {
  // getting param data over here
  const { id } = useParams()
  const selectedMoodboard = useSelector(
    (state) => state.moodboard.selectedMoodboard
  )
  const [selectedProductView, setSelectedProductView] = useState('moodboard')
  const dispatch = useDispatch()

  const setProductView = (value) => {
    setSelectedProductView(value)
  }

  // calling thunk to get moodboard data in useEffect
  useEffect(() => {
    dispatch(MoodboardThunks[GET_MOODBOARD_BY_ID](id))
  }, [])

  return (
    <>
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
                  <h4>
                    {selectedMoodboard?.name}
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
                    {selectedMoodboard?.description}
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
                className='btn bg-white text-black float-right'
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
                  <li
                    onClick={() => setProductView('moodboard')}
                    className={`${
                      selectedProductView === 'moodboard' ? 'active' : ''
                    }`}
                  >
                    Moodboard
                  </li>
                  <li
                    onClick={() => setProductView('images')}
                    className={`${
                      selectedProductView === 'images' ? 'active' : ''
                    }`}
                  >
                    Images
                  </li>
                </ul>
              </div>
              {/* Images layout */}
              <div className='full-moodboard-image'>
                {selectedProductView === 'moodboard' &&
                  selectedMoodboard?.moodboardImageList.length > 0 &&
                  selectedMoodboard.moodboardImageList.map((image, index) => (
                    <img
                      key={index}
                      src={image.docUrl}
                      alt='product'
                      className='mb-4'
                    />
                  ))}
              </div>
              <div className='moodboard-masonry-container'>
                {selectedProductView === 'images' && (
                  <div className='masonry-item add-item'>
                    <span className=''>+</span>
                  </div>
                )}
                {selectedProductView === 'images' &&
                  selectedMoodboard?.productImageList.length > 0 &&
                  selectedMoodboard.productImageList.map((image) => (
                    <div className='masonry-item' key={image.id}>
                      <img src={image.docUrl} alt='product' />
                      <span className='delete'>
                        <DeleteIcon />
                      </span>
                    </div>
                  ))}
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
                {selectedMoodboard?.colorResponseList.length > 0 &&
                  selectedMoodboard.colorResponseList.map((color) => (
                    <div className='color-single-item' key={color.id}>
                      <div
                        className='color-view'
                        style={{
                          background: color.hexCode
                        }}
                      >
                        <span className='close'>
                          <CloseIcon />
                        </span>
                      </div>
                      <div className='color-info'>
                        <div className='color-code'>TCX 16-1288</div>
                        <div className='color-name'>Dark Blue</div>
                      </div>
                    </div>
                  ))}
              </div>
              {/* Moodboard fabrics */}
              <div className='moodboard-fabric-container'>
                <h3>Fabrics</h3>

                {/* Selcted Fabrics */}
                <div className='fabric-filter'>
                  <p>
                    Selected <span>Fabrics</span>
                  </p>
                  <span>
                    <FilterIcon />
                  </span>
                </div>
                <div className='fabric-all-items'>
                  {selectedMoodboard?.materialResponseList.length > 0 &&
                    selectedMoodboard.materialResponseList.map(
                      (fabric, index) => (
                        <div key={fabric.id} className='fabric-single-item'>
                          <div className='fabric-image'>
                            <img
                              src='/images/moodboard/fabric1.png'
                              alt='fabric'
                            />
                            <span className='close'>
                              <CloseIcon />
                            </span>
                          </div>

                          <p>{fabric.name}</p>
                        </div>
                      )
                    )}
                  {/* <div className='fabric-single-item'>
                    <div className='fabric-image'>
                      <img src='/images/moodboard/fabric1.png' alt='fabric' />
                      <span className='close'>
                        <CloseIcon />
                      </span>
                    </div>

                    <p>Single Jersey CO(35%), PL(65%)</p>
                  </div>
                  <div className='fabric-single-item'>
                    <div className='fabric-image'>
                      <img src='/images/moodboard/fabric2.png' alt='fabric' />
                      <span className='close'>
                        <CloseIcon />
                      </span>
                    </div>
                    <p>Single Jersey CO(35%), PL(65%)</p>
                  </div> */}
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
                      <img src='/images/moodboard/fabric2.png' alt='fabric' />
                      <span className='select'>
                        <TickIcon />
                      </span>
                    </div>

                    <p>Single Jersey CO(35%), PL(65%)</p>
                  </div>
                  <div className='fabric-single-item'>
                    <div className='fabric-image'>
                      <img src='/images/moodboard/fabric1.png' alt='fabric' />
                      <span className='select'>
                        <TickIcon />
                      </span>
                    </div>
                    <p>Single Jersey CO(35%), PL(65%)</p>
                  </div>
                  <div className='fabric-single-item'>
                    <div className='fabric-image'>
                      <img src='/images/moodboard/fabric3.png' alt='fabric' />
                      <span className='select'>
                        <TickIcon />
                      </span>
                    </div>
                    <p>Single Jersey CO(35%), PL(65%)</p>
                  </div>
                  <div className='fabric-single-item'>
                    <div className='fabric-image'>
                      <img src='/images/moodboard/fabric1.png' alt='fabric' />
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
    </>
  )
}

export default MoodboardView
