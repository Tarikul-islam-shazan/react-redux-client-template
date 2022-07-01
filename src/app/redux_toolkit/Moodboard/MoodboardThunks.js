// action types
import { SET_MOODBOARD_LIST, SET_MOODBOARD_BY_ID } from '../@types/action.types'

// thunk types
import { GET_MOODBOARD_LIST, GET_MOODBOARD_BY_ID } from '../@types/thunk.types'

// Service import
import {
    getMoodboardList,
    getMoodboardByID
} from '../../services/Moodboard/index'

// import actions to execute
import { MoodboardActions } from '.'

const MoodboardThunks = {
    [GET_MOODBOARD_LIST]: () => {
        return async (dispatch, getState) => {
            let data = await getMoodboardList()
            dispatch({
                type: MoodboardActions[SET_MOODBOARD_LIST],
                payload: data.data
            })
            return getState().moodboard
        }
    },
    [GET_MOODBOARD_BY_ID]: (id) => {
        return async (dispatch, getState) => {
            let data = await getMoodboardByID(id)
            // console.log('data', data)
            dispatch({
                type: MoodboardActions[SET_MOODBOARD_BY_ID],
                payload: data.data
            })
            return getState().moodboard
        }
    }
}

export default MoodboardThunks
