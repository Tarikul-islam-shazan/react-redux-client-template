/*
This file is created by Dip Chowdhury
Date: 25/06/2022
Email: dipbd1@gmail.com or dip.chowdhury@gmail.com
Language: javascript
A gift link: https://www.youtube.com/watch?v=5UW3oWn60D0
*/
import {
    SET_MOODBOARD_LIST,
    SET_MOODBOARD_BY_ID,
    UPDATE_SELECTED_MOODBOARD_STATE,
    SET_COLOR_CODES,
    SET_MOODBOARD_FABRICS,
    SET_FAVOURITE_MOODBOARD,
    UNSET_FAVOURITE_MOODBOARD,
    SET_ALL_MATERIAL_CATEGORY,
    SET_ALL_MATERIAL_SUB_CATEGORY,
    SET_FABRIC_SEARCH_FILTER,
    SET_ALL_FILTER_DATA,
    SET_MOODBOARD_FILTER_SELECTED_FIELDS,
    SET_TAG_LIST
} from '../@types/action.types'

export const MoodboardReducer = {
    [SET_MOODBOARD_LIST]: (state, action) => {
        // console.log('MoodboardReducer', action.payload)
        // eslint-disable-next-line no-unsafe-optional-chaining
        state.moodboardList = action.payload?.data
        state.currentPage = action.payload?.currentPage
        state.totalPages = action.payload?.totalPages
        state.totalElements = action.payload?.totalElements
    },
    // this reducer will set state.selectedMoodboard
    [SET_MOODBOARD_BY_ID]: (state, action) => {
        // console.log('MoodboardReducer', action.payload)
        // eslint-disable-next-line no-unsafe-optional-chaining
        // console.log('MoodboardReducer', action.payload)
        state.selectedMoodboard = Object.assign({}, action.payload)
    },
    [UPDATE_SELECTED_MOODBOARD_STATE]: (state, action) => {
        state.selectedMoodboard.name = action.payload?.name
        state.selectedMoodboard.description = action.payload?.description
    },
    [SET_COLOR_CODES]: (state, action) => {
        // console.log('MoodboardReducer', action.payload)
        state.colorCodes = action?.payload
    },
    [SET_MOODBOARD_FABRICS]: (state, action) => {
        // console.log('MoodboardReducer', action.payload)
        state.moodboardFabrics = action?.payload
    },
    [SET_FAVOURITE_MOODBOARD]: (state, action) => {
        let moodboardIndex = state.moodboardList.findIndex(
            (moodboard) => moodboard.id === action.payload
        )
        state.moodboardList[moodboardIndex].isFavorite = true
    },
    [UNSET_FAVOURITE_MOODBOARD]: (state, action) => {
        let moodboardIndex = state.moodboardList.findIndex(
            (moodboard) => moodboard.id === action.payload
        )
        state.moodboardList[moodboardIndex].isFavorite = false
    },
    [SET_ALL_MATERIAL_CATEGORY]: (state, action) => {
        // console.log('MoodboardReducer', action.payload)
        state.allMaterialCategory = action.payload
    },
    [SET_ALL_MATERIAL_SUB_CATEGORY]: (state, action) => {
        // console.log('MoodboardReducer', action.payload)
        state.allMaterialSubCategory = action.payload
    },
    [SET_FABRIC_SEARCH_FILTER]: (state, action) => {
        // console.log('MoodboardReducer', action.payload)
        state.fabricSearchFilters = action.payload
    },
    [SET_ALL_FILTER_DATA]: (state, action) => {
        // console.log('MoodboardReducer', action.payload)
        state.moodboardFilters.allCategory = action.payload[0].value.data
        state.moodboardFilters.allSeason = action.payload[1].value.data
        state.moodboardFilters.allMarket = action.payload[2].value.data
    },
    [SET_MOODBOARD_FILTER_SELECTED_FIELDS]: (state, action) => {
        // console.log('MoodboardReducer', action.payload)
        state.moodboardFilters.selectedCategory =
            action.payload.selectedCategory
        state.moodboardFilters.selectedSeason = action.payload.selectedSeason
        state.moodboardFilters.selectedMarket = action.payload.selectedMarket
    },
    [SET_TAG_LIST]: (state, action) => {
        // console.log('MoodboardReducer', action.payload)
        state.tagList = action.payload
    }
}
