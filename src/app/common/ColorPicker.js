import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import {
    ADD_COLOR_CODE,
    GET_COLOR_CODES
} from '../redux_toolkit/@types/thunk.types'

import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg'
import { ReactComponent as IconColorPicker } from '../../assets/icons/color-picker.svg'
import { ReactComponent as IconSearch } from '../../assets/icons/search-white.svg'
import MoodboardThunks from '../redux_toolkit/Moodboard/MoodboardThunks'

const ColorPicker = (props) => {
    const dispatch = useDispatch()

    const toggleView = props.toggleColorPicker
    const moodboardID = props.moodboardID

    const [activeArray, setActiveArray] = useState([])
    const [searchString, setSearchString] = useState('')

    const colorCodes = useSelector((state) => state.moodboard.colorCodes)

    const onColorClick = (e, colorID) => {
        setActiveArray(activeArray.concat(colorID))
        dispatch(MoodboardThunks[ADD_COLOR_CODE](moodboardID, colorID))
    }

    const searchColor = () => {
        dispatch(MoodboardThunks[GET_COLOR_CODES](moodboardID, searchString))
    }

    useEffect(() => {
        dispatch(MoodboardThunks[GET_COLOR_CODES](moodboardID))
    }, [])

    return (
        <>
            {/* Color popup */}
            <div className='common-color-popup z-10 right-full left-auto'>
                <div className='color-popup-header'>
                    <h5>Add color</h5>
                    <span>
                        <CloseIcon
                            onClick={(e) => {
                                e.preventDefault()
                                toggleView()
                            }}
                        />
                    </span>
                </div>
                <div className='common-color-popup-body'>
                    <div className='search-color'>
                        <div className='color-picker'>
                            <span>
                                <IconColorPicker />
                            </span>
                        </div>
                        <div className='search-by-name'>
                            <input
                                type='text'
                                className='form-field'
                                placeholder='Search Color'
                                onChange={(e) => {
                                    setSearchString(e.target.value)
                                    searchColor(searchString)
                                }}
                            />
                            <span>
                                <IconSearch
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        searchColor(searchString)}}
                                />
                            </span>
                        </div>
                    </div>
                    <div className='all-available-colors overflow-x-hidden overflow-y-auto h-[360px] pb-14'>
                        <p>Search Result</p>
                        <div className='common-color-list'>
                            {/* <span
                                className='color-item'
                                style={{
                                    background: '#B7B548'
                                }}
                            ></span>
                            <span
                                className='color-item active'
                                style={{
                                    background: '#B7B548'
                                }}
                            ></span> */}
                            {colorCodes?.length > 0 &&
                                colorCodes.map((color, index) => {
                                    return (
                                        <span
                                            onClick={(e) =>
                                                onColorClick(e, color.id)
                                            }
                                            key={color.id}
                                            className={`color-item ${
                                                activeArray.includes(color.id)
                                                    ? 'active'
                                                    : ''
                                            }`}
                                            style={{
                                                background: color.hexCode
                                            }}
                                        ></span>
                                    )
                                })}
                        </div>
                    </div>
                    <button
                        className='btn select-btn'
                        onClick={(e) => {
                            e.preventDefault()
                            toggleView()
                        }}
                    >
                        Select
                    </button>
                </div>
            </div>
        </>
    )
}

export default ColorPicker
