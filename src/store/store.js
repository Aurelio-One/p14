import { configureStore } from '@reduxjs/toolkit'
import errorReducer from '../slices/error/errorSlice'
import formReducer from '../slices/form/formSlice'
import userReducer from '../slices/user/userSlice'

/**
 * Configures and creates the Redux store with reducers.
 * The store integrates reducers from different slices: error, form, and user.
 *
 * errorReducer manages the state related to error messages.
 * formReducer manages the state related to form data and submission status.
 * userReducer manages the state related to user data.
 */
export const store = configureStore({
  reducer: {
    error: errorReducer,
    form: formReducer,
    user: userReducer,
  },
})
