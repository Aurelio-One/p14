import { configureStore } from '@reduxjs/toolkit'
import errorReducer from '../features/error/errorSlice'
import formReducer from '../features/form/formSlice'

export const store = configureStore({
  reducer: {
    error: errorReducer,
    form: formReducer,
  },
})
