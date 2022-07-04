// action types
import {
  SET_MOODBOARD_LIST,
  SET_MOODBOARD_BY_ID,
  UPDATE_SELECTED_MOODBOARD_STATE
} from '../@types/action.types'

// thunk types
import {
  GET_MOODBOARD_LIST,
  GET_MOODBOARD_BY_ID,
  UPLOAD_MOODBOARDS,
  UPDATE_MOODBOARD,
  UPLOAD_MOODBOARD_IMAGES
} from '../@types/thunk.types'

// Service import
import {
  getMoodboardList,
  getMoodboardByID,
  uploadMoodboard,
  updateMoodboard,
  uploadMoodboardImages
} from '../../services/Moodboard/index'

// import actions to execute
import { MoodboardActions } from '.'
import { readFileAsync } from '../../services/Util'

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
      try {
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
      } catch (e) {
        console.log(e)
      }
    }
  },
  [UPDATE_MOODBOARD]: (data) => {
    return async (dispatch, getState) => {
      console.log('data', data)
      let dataFrame = {
        name: data.name || null,
        description: data.description || null,
        id: data.id
      }
      try {
        let response = await updateMoodboard(dataFrame)
        //  we have to update state here
        dispatch({
          type: MoodboardActions[UPDATE_SELECTED_MOODBOARD_STATE],
          payload: dataFrame
        })
        return { state: getState().moodboard, response }
      } catch (error) {
        console.log('error', error)
      }
    }
  },
  [UPLOAD_MOODBOARD_IMAGES]: (selectedFiles, id) => {
    return async (dispatch, getState) => {
      try {
        console.log(selectedFiles)
        let dataFrame = []
        for (let i = 0; i < selectedFiles.length; i++) {
          let base64StrResult = await readFileAsync(selectedFiles[i])

          dataFrame.push({
            base64Str: base64StrResult,
            documentType: 'MOODBOARD_PRODUCT_IMAGE',
            docMimeType: selectedFiles[i].type,
            name: selectedFiles[i].name
          })
        }
        // we have proper data in dataFrame
        // console.log('dataFrame', dataFrame)
        let response = await uploadMoodboardImages(
          dataFrame,
          `${id}/product-image`
        )
        // console.log('response', response)
        return { state: getState().moodboard, response }
      } catch (error) {
        console.log('error', error)
      }
    }
  }
}

export default MoodboardThunks
