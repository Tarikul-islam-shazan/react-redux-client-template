// action types
import { SET_MOODBOARD_LIST } from '../@types/action.types'

// thunk types
import { GET_MOODBOARD_LIST } from '../@types/thunk.types'

// Service import
import { getMoodboardList } from '../../services/Moodboard/index'

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
    }
}

export default MoodboardThunks
