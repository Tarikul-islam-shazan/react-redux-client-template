import { FETCH_ORDER_LIST } from '../@types/action.types'

export const OrderReducers = {
  [FETCH_ORDER_LIST]: (state, { payload }) => {
    if (payload.merge === false) {
      state.activeTab = payload.activeTab
      state.countResponse = payload.countResponse
      state.orderResponse = payload.response
    } else {
      let prevOrderResponse = []
      if (state.orderResponse.data) {
        prevOrderResponse = state.orderResponse.data
      }
      if (payload.response.data) {
        prevOrderResponse = [...prevOrderResponse, ...payload.response.data]
      }
      state.activeTab = payload.activeTab
      state.countResponse = payload.countResponse
      state.orderResponse = { ...payload.response, data: prevOrderResponse }
    }
  }
}
