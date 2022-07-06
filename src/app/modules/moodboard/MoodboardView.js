import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import ColorPicker from '../../common/ColorPicker'

// thunks to get moodboard data and set it into the store
import MoodboardThunks from '../../redux_toolkit/Moodboard/MoodboardThunks'
import {
    GET_MOODBOARD_BY_ID,
    UPDATE_MOODBOARD,
    UPLOAD_MOODBOARD_IMAGES,
    DELETE_COLOR_FROM_MOODBOARD,
    DELETE_PRODUCT_IMAGE,
    GET_MOODBOARD_FABRICS
} from '../../redux_toolkit/@types/thunk.types'

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
import { MoodboardActions } from '../../redux_toolkit/Moodboard'

const MoodboardView = (props) => {
    // getting param data over here
    const { id } = useParams()
    const selectedMoodboard = useSelector(
        (state) => state.moodboard.selectedMoodboard
    )

    const moodboardFabrics = useSelector(
        (state) => state.moodboard.moodboardFabrics
    )

    const [selectedProductView, setSelectedProductView] = useState('moodboard')

    const [titleEdit, setTitleEdit] = useState(false)
    const [descriptionEdit, setDescriptionEdit] = useState(false)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const [selectedFiles, setSelectedFiles] = useState([])

    const [showColorPicker, setShowColorPicker] = useState(false)

    const dispatch = useDispatch()

    const setProductView = (value) => {
        setSelectedProductView(value)
    }
    // for detail look below on description related button
    // it will open your eye for this title
    const onTitleEditButtonClick = (e) => {
        e.preventDefault()
        setTitleEdit(!titleEdit)
        if (titleEdit) {
            dispatch(
                MoodboardThunks[UPDATE_MOODBOARD]({
                    name: title,
                    description: description,
                    id: selectedMoodboard.id
                })
            )
        }
    }
    // this is a clever function
    // it switches text field to edit mode and vice versa
    // and also, if the text field is in edit mode, it updates the state
    // title and description are component scoped state based variables
    const onDescriptionEditButtonClick = (e) => {
        setDescriptionEdit(!descriptionEdit)
        if (descriptionEdit) {
            dispatch(
                MoodboardThunks[UPDATE_MOODBOARD]({
                    name: title,
                    description: description,
                    id: selectedMoodboard.id
                })
            )
        }
    }

    // this function is use to set data on image change
    const onFileChange = async (e) => {
        setSelectedFiles([...e.target.files])

        // console.log(selectedFile)
    }

    // to toggle colot picker
    const toggleColorPicker = () => {
        setShowColorPicker(!showColorPicker)
    }

    // used to upload product images
    const uploadProductImagesAsync = async () => {
        if (selectedFiles.length > 0) {
            await dispatch(
                MoodboardThunks[UPLOAD_MOODBOARD_IMAGES](selectedFiles, id)
            )
            await dispatch(MoodboardThunks[GET_MOODBOARD_BY_ID](id))
        }
    }

    // to delete colos from moodboard
    const deleteColorFromMoodboard = async (colorId, moodboardID) => {
        await dispatch(
            MoodboardThunks[DELETE_COLOR_FROM_MOODBOARD](colorId, moodboardID)
        )
        // await dispatch(MoodboardThunks[GET_MOODBOARD_BY_ID](id))
    }

    // on clicking delete product image
    const onClickDeleteImage = async (id, imageId) => {
        dispatch(MoodboardThunks[DELETE_PRODUCT_IMAGE](id, imageId))
    }

    // used to upload product image instantly
    useEffect(() => {
        uploadProductImagesAsync()
    }, [selectedFiles])

    // calling thunk to get moodboard data in useEffect
    useEffect(() => {
        dispatch(MoodboardThunks[GET_MOODBOARD_BY_ID](id))
    }, [])

    // edits title and description
    useEffect(() => {
        setTitle(selectedMoodboard?.name)
        setDescription(selectedMoodboard?.description)
    }, [selectedMoodboard?.name, selectedMoodboard?.description])

    // on load of moodboardview we have to make a call to get all the fabrics
    // and set it in the store
    useEffect(() => {
        dispatch(MoodboardThunks[GET_MOODBOARD_FABRICS]())
    }, [])

    return (
        <>
            <div className='body-container p-4'>
                <div className='common-moodboard-container'>
                    {/* Moodboard Information */}
                    <div className='moodboard-information'>
                        <div className='left-half'>
                            <div className='title'>
                                {!titleEdit && (
                                    <div className='input-group'>
                                        <label htmlFor='name' className='label'>
                                            Title
                                        </label>
                                        <h4>
                                            {selectedMoodboard?.name}
                                            <span>
                                                <EditIcon
                                                    onClick={
                                                        onTitleEditButtonClick
                                                    }
                                                />
                                            </span>
                                        </h4>
                                    </div>
                                )}

                                {titleEdit && (
                                    <div className='input-group'>
                                        <label htmlFor='name' className='label'>
                                            Title
                                        </label>
                                        <input
                                            onBlur={onTitleEditButtonClick}
                                            onChange={(e) => {
                                                e.preventDefault()
                                                setTitle(e.target.value)
                                            }}
                                            autoFocus
                                            type='text'
                                            className='form-field'
                                            id='name'
                                            placeholder='Enter Name'
                                            name='name'
                                            value={title}
                                        ></input>
                                    </div>
                                )}
                            </div>
                            {!descriptionEdit && (
                                <div className='description'>
                                    <div className='input-group'>
                                        <label htmlFor='name' className='label'>
                                            Description
                                        </label>
                                        <p>
                                            {selectedMoodboard?.description}
                                            <span>
                                                <EditIcon
                                                    onClick={
                                                        onDescriptionEditButtonClick
                                                    }
                                                />
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            )}

                            {descriptionEdit && (
                                <div className='description'>
                                    <div className='input-group'>
                                        <label htmlFor='name' className='label'>
                                            Description
                                        </label>
                                        <textarea
                                            onBlur={
                                                onDescriptionEditButtonClick
                                            }
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                            autoFocus
                                            type='text'
                                            className='form-field'
                                            placeholder='Write Here ...'
                                            value={description}
                                        ></textarea>
                                    </div>
                                </div>
                            )}
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
                                        onClick={() =>
                                            setProductView('moodboard')
                                        }
                                        className={`${
                                            selectedProductView === 'moodboard'
                                                ? 'active'
                                                : ''
                                        }`}
                                    >
                                        Moodboard
                                    </li>
                                    <li
                                        onClick={() => setProductView('images')}
                                        className={`${
                                            selectedProductView === 'images'
                                                ? 'active'
                                                : ''
                                        }`}
                                    >
                                        Images
                                    </li>
                                </ul>
                            </div>
                            {/* Images layout */}
                            <div className='full-moodboard-image'>
                                {selectedProductView === 'moodboard' &&
                                    selectedMoodboard?.moodboardImageList
                                        .length > 0 &&
                                    selectedMoodboard.moodboardImageList.map(
                                        (image, index) => (
                                            <img
                                                key={index}
                                                src={image.docUrl}
                                                alt='product'
                                                className='mb-4'
                                            />
                                        )
                                    )}
                            </div>
                            <div className='moodboard-masonry-container'>
                                {selectedProductView === 'images' && (
                                    <div className='masonry-item add-item inline-block'>
                                        <label
                                            htmlFor='uploadMultiple'
                                            className='w-full h-full block cursor-pointer'
                                        >
                                            <span className=''>+</span>
                                        </label>
                                        <input
                                            multiple
                                            type='file'
                                            id='uploadMultiple'
                                            accept='image/*'
                                            className='hidden'
                                            onClick={(e) =>
                                                (e.target.value = null)
                                            }
                                            onChange={(e) => onFileChange(e)}
                                        />
                                    </div>
                                )}
                                {selectedProductView === 'images' &&
                                    selectedMoodboard?.productImageList.length >
                                        0 &&
                                    selectedMoodboard.productImageList.map(
                                        (image) => (
                                            <div
                                                className='masonry-item'
                                                key={image.id}
                                            >
                                                <img
                                                    src={image.docUrl}
                                                    alt='product'
                                                />
                                                <span className='delete'>
                                                    <DeleteIcon
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            // console.log(image)
                                                            onClickDeleteImage(
                                                                id,
                                                                image.id
                                                            )
                                                        }}
                                                    />
                                                </span>
                                            </div>
                                        )
                                    )}
                            </div>
                        </div>
                        <div className='right-half'>
                            {/* Moodboard colors */}
                            <div className='moodboard-color-container'>
                                <div className='color-single-item'>
                                    <div
                                        className='add-color'
                                        onClick={(e) => {
                                            e.preventDefault()
                                            toggleColorPicker()
                                        }}
                                    >
                                        <span>+</span>
                                    </div>
                                </div>
                                {selectedMoodboard?.colorResponseList.length >
                                    0 &&
                                    selectedMoodboard.colorResponseList.map(
                                        (color) => (
                                            <div
                                                className='color-single-item'
                                                key={color.id}
                                            >
                                                <div
                                                    className='color-view'
                                                    style={{
                                                        background:
                                                            color.hexCode
                                                    }}
                                                >
                                                    <span className='close'>
                                                        <CloseIcon
                                                            onClick={(e) => {
                                                                e.preventDefault()
                                                                deleteColorFromMoodboard(
                                                                    id,
                                                                    color.id
                                                                )
                                                            }}
                                                        />
                                                    </span>
                                                </div>
                                                <div className='color-info'>
                                                    <div className='color-code'>
                                                        {color.code}
                                                    </div>
                                                    <div className='color-name'>
                                                        {color.name}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                {showColorPicker && (
                                    <ColorPicker
                                        toggleColorPicker={toggleColorPicker}
                                        moodboardID={selectedMoodboard?.id}
                                    />
                                )}
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
                                    {selectedMoodboard?.materialResponseList
                                        .length > 0 &&
                                        selectedMoodboard.materialResponseList.map(
                                            (fabric, index) => (
                                                <div
                                                    key={fabric.id}
                                                    className='fabric-single-item'
                                                >
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
                                </div>

                                {/* Suggested Fabrics */}
                                {/* it will be now based on api calls */}
                                <div className='fabric-filter top-border'>
                                    <p>
                                        Suggested <span>Fabrics</span>
                                    </p>
                                    <span>
                                        <FilterIcon />
                                    </span>
                                </div>
                                <div className='fabric-all-items'>
                                    {/* <div className='fabric-single-item'>
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
                                    </div> */}
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
