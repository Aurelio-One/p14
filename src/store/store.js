import { configureStore } from '@reduxjs/toolkit'
import errorReducer from '../slices/error/errorSlice'
import formReducer from '../slices/form/formSlice'
import userReducer from '../slices/user/userSlice'

export const store = configureStore({
  reducer: {
    error: errorReducer,
    form: formReducer,
    user: userReducer,
  },
})
