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
    SET_MOODBOARD_FABRICS
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
    }
}
