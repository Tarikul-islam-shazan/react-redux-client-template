import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { OrderReducers } from './OrderReducers'

const initialState = { activeTab: 'RUNNING', orderResponse: {}, countResponse: {} }

const orderListSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: OrderReducers
})

export const orderActionTypes = orderListSlice.actions

export const useOrderSelector = () => useSelector(state => state.orders)

export default orderListSlice.reducer
