import { GET_MATERIAL_LIST_BY_FABRIC_TYPE } from '../@types/thunk.types'
import { closeLoader, openLoader } from '../Loader'
import Http from '../../services/Http'
import { SET_MATERIAL_LIST } from '../@types/action.types'
import { toast } from 'react-toastify'
import { materialActions } from './index'

const MaterialThunks = {
  [GET_MATERIAL_LIST_BY_FABRIC_TYPE]: (postData) => async (dispatch, getState) => {
    dispatch(openLoader())
    await Http.GET_WITH_ID_PARAM('fetchMaterialsByFabric', postData.params, postData.fabricType.value).then(({ data }) => {
      dispatch({
        type: materialActions[SET_MATERIAL_LIST],
        payload: { response: data.data, fabricType: postData.fabricType }
      })
      dispatch(closeLoader())
    }).catch((error) => {
      dispatch(closeLoader())
      toast.error(error.response.data.message)
    })
  }
}

export default MaterialThunks
