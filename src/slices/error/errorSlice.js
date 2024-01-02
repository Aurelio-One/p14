import { createSlice } from '@reduxjs/toolkit'

/**
 * Redux slice for managing error messages related to form fields.
 * It contains state and reducers to handle error messages in the application.
 */
export const errorSlice = createSlice({
  name: 'error',
  initialState: {
    // Initial state defining error messages for each form field
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
    /**
     * Reducer to set error messages for form fields.
     * It merges existing error messages with new ones.
     *
     * @param {object} state - The current state of the error slice.
     * @param {object} action - The action object containing payload with error messages.
     */
    setErrorsMsg: (state, action) => {
      state.errorsMsg = { ...state.errorsMsg, ...action.payload }
    },
  },
})

// Exporting the actions and reducer from the slice
export const { setErrorsMsg } = errorSlice.actions
export default errorSlice.reducer
