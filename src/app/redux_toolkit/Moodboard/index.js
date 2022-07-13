import { createSlice, createReducer } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import { MoodboardReducer } from './MoodboardReducer'

const initialState = {
    currentPage: 0,
    moodboardList: [],
    totalPages: 0,
    totalElements: 0,
    selectedMoodboard: null,
    colorCodes: [],
    moodboardFabrics: [],
    allMaterialCategory: [],
    allMaterialSubCategory: [],
    fabricSearchFilters: {
        // fabricTypes
        // constructions
        // maxGsm
        // minGsm
        // search
        fabricTypes: '',
        constructions: '',
        maxGsm: '',
        minGsm: '',
        search: ''
    },
    moodboardFilters: {
        selectedOrder: [],
        allCategory: [],
        selectedCategory: [],
        allSeason: [],
        selectedSeason: [],
        allMarket: [],
        selectedMarket: []
    },
    tagList: {}
}

const MoodboardSlice = createSlice({
    name: 'moodboard',
    initialState,
    reducers: MoodboardReducer
})

export const MoodboardActions = MoodboardSlice.actions

export const useMoodboardSelector = () =>
    useSelector((state) => state.moodboard)

export default MoodboardSlice.reducer
