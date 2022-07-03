import { createSlice } from '@reduxjs/toolkit';
const initialState = false

const LoaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    openLoader: state => true,
    closeLoader: state => false
  }
})

export const { openLoader, closeLoader } = LoaderSlice.actions

export default LoaderSlice.reducer
