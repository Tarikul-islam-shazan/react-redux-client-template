import { createSlice } from '@reduxjs/toolkit';
import { MaterialReducers } from './MaterialReducers';
import { useSelector } from 'react-redux';

const initialState = {
  fabricType: { label: 'Premium Fabric Base', value: 'PREMIUM' },
  data: [],
  selectedMaterialId: null
}

const materialSlice = createSlice({
  name: 'materials',
  initialState,
  reducers: MaterialReducers
})

export const materialActions = materialSlice.actions

export const useMaterialSelector = () => useSelector(state => state.material)

export default materialSlice.reducer
