import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import MoodboardThunks from '../../redux_toolkit/Moodboard/MoodboardThunks'
import { MoodboardActions } from '../../redux_toolkit/Moodboard'

import SelectComponent from '../../../app/common/SelectComponent'
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg'
import { ReactComponent as SearchIconWhite } from '../../../assets/images/search-white.svg'
import { ReactComponent as OkWhite } from '../../../assets/images/ok-white.svg'
import { ReactComponent as Refresh } from '../../../assets/images/refresh.svg'

import {
    GET_ALL_MATERIAL_CATEGORY,
    GET_ALL_MATERIAL_SUB_CATEGORY,
    GET_MOODBOARD_FABRICS
} from '../../redux_toolkit/@types/thunk.types'

import Slider from '@mui/material/Slider'
import { SET_FABRIC_SEARCH_FILTER } from '../../redux_toolkit/@types/action.types'
// import Slider from '@material-ui/core/Slider';

const FabricFilter = (props) => {
    const toClose = props.toClose

    const fabricTypesRef = React.useRef()
    const fabricSubTypesRef = React.useRef()

    const allMaterialCategory = useSelector(
        (state) => state.moodboard.allMaterialCategory
    )

    const allMaterialSubCategory = useSelector(
        (state) => state.moodboard.allMaterialSubCategory
    )

    const dispatch = useDispatch()
    // fabricTypes
    // constructions
    // maxGsm
    // minGsm
    // search

    const [fabricSearchFilters, setFabricSearchFilters] = React.useState({
        fabricTypes: '',
        constructions: '',
        maxGsm: '',
        minGsm: '',
        search: ''
    })

    const [gsmValue, setGsmValue] = React.useState([0, 100])

    const onFabricFilterCategoryChange = (value) => {
        console.log(value)
        setFabricSearchFilters({
            ...fabricSearchFilters,
            fabricTypes: value
        })
    }
    const onFabricFilterSubCategoryChange = (value) => {
        console.log(value)
        setFabricSearchFilters({
            ...fabricSearchFilters,
            constructions: value
        })
    }
    const onFabricFilterStringChange = (e) => {
        setFabricSearchFilters({
            ...fabricSearchFilters,
            search: e.target.value
        })
    }

    const onFilterRefreshButtonClick = (e) => {
        setFabricSearchFilters({
            fabricTypes: '',
            constructions: '',
            maxGsm: '',
            minGsm: '',
            search: ''
        })
    }

    const onApplyButtonClick = (e) => {
        dispatch(MoodboardThunks[GET_MOODBOARD_FABRICS]())
    }

    // we will make api calls once and they will save fields on state
    // it will improve performance significantly
    useEffect(() => {
        if (allMaterialCategory.length === 0) {
            dispatch(MoodboardThunks[GET_ALL_MATERIAL_CATEGORY]())
        }
        if (allMaterialSubCategory.length === 0) {
            dispatch(MoodboardThunks[GET_ALL_MATERIAL_SUB_CATEGORY]())
        }
    }, [dispatch])

    // this useEffect triggeres a lot of times
    useEffect(() => {
        dispatch({
            type: MoodboardActions[SET_FABRIC_SEARCH_FILTER],
            payload: fabricSearchFilters
        })
    }, [fabricSearchFilters])

    // a weird bug starts here
    const valuetext = (value) => {
        return `${value}°C`
    }

    const handleGsmChange = (event, newValue) => {
        console.log('Bug: ', newValue)
        setGsmValue(newValue)
        // let values = {};
        // if (newValue[0] >= newValue[1]) {
        // 	values.max = newValue[0];
        // 	values.min = newValue[1];
        // } else {
        // 	values.max = newValue[1];
        // 	values.min = newValue[0];
        // }
        // onChangeRange(values);
    }
    return (
        <div className='common-filter-popup absolute left-0 top-40 w-[435px] bg-white shadow-lg'>
            <div className='color-popup-header flex justify-between p-5 bg-[#F5F5F5]'>
                <h5 className='font-bold uppercase'>Filter Fabric</h5>
                <span>
                    <CloseIcon
                        onClick={(e) => {
                            toClose(e)
                        }}
                    />
                </span>
            </div>
            <div className='common-color-popup-body p-5'>
                <div className='flex'>
                    <input
                        type='text'
                        className='form-field w-full border border-primaryColor  p-2 px-4'
                        id='name'
                        placeholder='Search ...'
                        name='name'
                        onChange={onFabricFilterStringChange}
                        value={fabricSearchFilters.search}
                    />
                    <button
                        type='button'
                        className='btn w-[60px] min-w-[60px] flex items-center justify-center p-2'
                    >
                        <SearchIconWhite />
                    </button>
                </div>

                <div className='mt-5'>
                    <div className='input-group select-bg-gray-style w-full'>
                        <SelectComponent
                            selectedItem={fabricSearchFilters.fabricTypes}
                            options={allMaterialCategory}
                            onChange={onFabricFilterCategoryChange}
                        />
                    </div>
                </div>

                <div className='mt-5'>
                    <div className='input-group select-bg-gray-style w-full'>
                        <SelectComponent
                            selectedItem={fabricSearchFilters.constructions}
                            options={allMaterialSubCategory}
                            onChange={onFabricFilterSubCategoryChange}
                        />
                    </div>
                </div>

                <div className='mt-5'>
                    <div className='input-group w-full'>
                        <div>
                            <label
                                htmlFor='points'
                                className='w-full block mb-3'
                            >
                                GSM
                            </label>
                            {/* <input
                                type='range'
                                id='points'
                                name='points'
                                min={0}
                                max={100}
                                className='w-full block'
                            /> */}
                            <Slider
                                getAriaLabel={() => 'Temperature range'}
                                value={gsmValue}
                                onChange={handleGsmChange}
                                valueLabelDisplay='auto'
                                // min={20}
                                // max={200}
                                getAriaValueText={valuetext}
                            />
                        </div>
                    </div>
                </div>
                <div className='modal-footer mt-5 flex justify-end gap-4'>
                    <button
                        type='button'
                        className='btn bg-transparent px-5 font-normal border border-primaryColor text-primaryColor'
                        onClick={onFilterRefreshButtonClick}
                    >
                        <Refresh />
                    </button>
                    <button
                        type='button ='
                        className='btn w-full flex justify-between items-center'
                        onClick={onApplyButtonClick}
                    >
                        <span>Apply</span>
                        <span className='ml-2'>
                            <OkWhite />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FabricFilter
