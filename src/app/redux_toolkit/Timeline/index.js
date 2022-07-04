import { createSlice } from '@reduxjs/toolkit'
import { TimelineReducers } from './TimelineReducers'


const initialState = {}

const timeLineSlice = createSlice({
  name: 'timeline',
  initialState,
  reducers: TimelineReducers
})

export const TimelineActions = timeLineSlice.actions

export default timeLineSlice.reducer
