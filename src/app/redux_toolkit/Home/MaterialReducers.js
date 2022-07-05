import { SET_MATERIAL_LIST, SET_SELECTED_MATERIAL_ID } from '../@types/action.types';

export const MaterialReducers = {
  [SET_MATERIAL_LIST]: (state, action) => {
    state.data = action.payload?.response
    state.fabricType = action.payload?.fabricType
  },
  [SET_SELECTED_MATERIAL_ID]: (state, action) => {
    state.selectedMaterialId = action.payload
  }
}
