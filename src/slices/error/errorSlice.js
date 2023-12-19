import { createSlice } from '@reduxjs/toolkit'

export const errorSlice = createSlice({
  name: 'error',
  initialState: {
    errorsMsg: {
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
  },
  reducers: {
    setErrorsMsg: (state, action) => {
      state.errorsMsg = { ...state.errorsMsg, ...action.payload }
    },
  },
})

export const { setErrorsMsg } = errorSlice.actions
export default errorSlice.reducer
