import { GET_ORDER_LIST } from '../@types/thunk.types'
import Http from '../../services/Http'
import { orderActionTypes } from './index'
import { FETCH_ORDER_LIST } from '../@types/action.types'

const OrderThunks = {
  [GET_ORDER_LIST]: (params, merge, activeTab) => async (dispatch, getState) => {
    await Http.GET('statusWiseCount').then(async (countResponse) => {
      await Http.GET('getOrderList', params).then((response) => {
        console.log('==== in the thunk')
        dispatch({
          type: orderActionTypes[FETCH_ORDER_LIST],
          payload: { response: response.data, merge: merge, activeTab: activeTab, countResponse: countResponse.data }
        })
      })
    })
  }
}

export default OrderThunks
