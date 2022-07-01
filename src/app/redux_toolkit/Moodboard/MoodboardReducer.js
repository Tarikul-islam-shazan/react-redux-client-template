import { SET_MOODBOARD_LIST, SET_MOODBOARD_BY_ID } from '../@types/action.types'

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
    }
}
