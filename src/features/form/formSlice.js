import { createSlice } from '@reduxjs/toolkit'

export const formSlice = createSlice({
  name: 'form',
  initialState: {
    data: {
      firstname: '',
      lastname: '',
      dateOfBirth: '',
      startDate: '',
      street: '',
      city: '',
      state: '',
      code: '',
      department: '',
    },
    dataEmployee: [],
    isSubmitted: false,
  },
  reducers: {
    setData: (state, action) => {
      state.data = { ...state.data, ...action.payload }
    },
    setDataEmployee: (state, action) => {
      state.dataEmployee = action.payload
    },
    setIsSubmitted: (state, action) => {
      state.isSubmitted = action.payload
    },
  },
})

export const { setData, setDataEmployee, setIsSubmitted } = formSlice.actions
export default formSlice.reducer
