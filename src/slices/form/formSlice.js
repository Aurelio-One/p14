import { createSlice } from '@reduxjs/toolkit'

/**
 * Redux slice for managing form state.
 * It handles the data of a form and its submission status.
 */
export const formSlice = createSlice({
  name: 'form',
  initialState: {
    // Initial state with empty form fields and submission status
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
    isSubmitted: false,
  },
  reducers: {
    /**
     * Reducer for setting form data.
     * Merges existing form data with new data.
     *
     * @param {object} state - The current state of the form slice.
     * @param {object} action - The action object containing payload with form data.
     */
    setData: (state, action) => {
      state.data = { ...state.data, ...action.payload }
    },
    /**
     * Reducer for setting the form submission status.
     *
     * @param {object} state - The current state of the form slice.
     * @param {object} action - The action object containing payload with submission status.
     */
    setIsSubmitted: (state, action) => {
      state.isSubmitted = action.payload
    },
  },
})

export const { setData, setIsSubmitted } = formSlice.actions
export default formSlice.reducer
