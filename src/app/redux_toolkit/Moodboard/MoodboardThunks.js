// action types
import { SET_MOODBOARD_LIST, SET_MOODBOARD_BY_ID } from '../@types/action.types'

// thunk types
import {
  GET_MOODBOARD_LIST,
  GET_MOODBOARD_BY_ID,
  UPLOAD_MOODBOARDS
} from '../@types/thunk.types'

// Service import
import {
  getMoodboardList,
  getMoodboardByID,
  uploadMoodboard
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
  },
  [UPLOAD_MOODBOARDS]: (data) => {
    return async (dispatch, getState) => {
      // console.log('data', data)

      let dataFrame = {
        documentDTOs: []
      }
      data.forEach((element) => {
        let reader = new FileReader()
        reader.readAsDataURL(element)
        reader.onload = () => {
          // data.base64Str = reader.result;
          // onUploadImage(data);
          dataFrame.documentDTOs.push({
            base64Str: reader.result,
            documentType: 'MOODBOARD_FILE',
            docMimeType: element.type,
            name: element.name
          })
        }

        reader.onerror = function (error) {
          // console.log('Error: ', error)
          alert('Error: ' + error.message)
        }
      })
      // we have proper data in dataFrame
      let response = await uploadMoodboard(dataFrame)
      // console.log('response', response)
      return { state: getState().moodboard, response }
    }
  }
}

export default MoodboardThunks
