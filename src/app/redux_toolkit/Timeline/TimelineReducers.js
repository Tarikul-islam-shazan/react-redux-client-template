import {
  ADD_NEW_COMMENT,
  ADD_TIMELINE_DATA_BY_INDEX,
  CLEAR_DESIGN_SELECTION,
  CLEAR_TIMELINE_DATA,
  FETCH_ORDER_INFO_LIST,
  FETCH_STEP_INFO,
  FETCH_TIMELINE_LIST,
  SELECT_ALL_DESIGN,
  TOGGLE_DESIGN_SELECTION
} from '../@types/action.types'

export const TimelineReducers = {
  [ADD_TIMELINE_DATA_BY_INDEX]: (state, action) => {
    let timelineData = [...state.data]
    timelineData.splice(action.payload.index, 0, action.payload.data)
    return {
      ...state,
      data: timelineData
    }
  },
  [ADD_NEW_COMMENT]: (state, action) => {
    let data = [action.payload, ...state.data]
    return { ...state, data: data }
  },
  [FETCH_STEP_INFO]: (state, action) => {
    return {
      ...state,
      stepList: action.payload.data,
      selectedDesignNumber: action.payload.selectedDesignNumber
    }
  },
  [TOGGLE_DESIGN_SELECTION]: (state, action) => {
    let designList = []
    designList.push(action.payload)
    return {
      ...state,
      selectedDesignList: designList
    }
  },
  [SELECT_ALL_DESIGN]: (state, action) => {
    return {
      ...state,
      selectedDesignList: action.payload
    }
  },
  [CLEAR_DESIGN_SELECTION]: (state, action) => {
    return {
      ...state,
      selectedDesignList: action.payload
    }
  },
  [FETCH_ORDER_INFO_LIST]: (state, action) => {
    let productList = action.payload?.orderProductList
    let selectedDesignList = []
    if (productList.length > 0) {
      selectedDesignList.push(productList[0].id)
    }
    return {
      ...state,
      orderInfo: action.payload,
      selectedDesignList: selectedDesignList
    }
  },
  [FETCH_TIMELINE_LIST]: (state, action) => {
    let { payload } = action
    if (payload.merge === false) {
      return {
        ...payload.response,
        orderInfo: state.orderInfo,
        selectedDesignList: state.selectedDesignList,
        stepList: state.stepList,
        selectedDesignNumber: state.selectedDesignNumber
      }
    } else {
      return {
        ...payload.response,
        data: [...state.data, ...payload.response.data],
        orderInfo: state.orderInfo,
        selectedDesignList: state.selectedDesignList,
        stepList: state.stepList,
        selectedDesignNumber: state.selectedDesignNumber
      }
    }
  },
  [CLEAR_TIMELINE_DATA]: (state, action) => {
    return {}
  }
}
