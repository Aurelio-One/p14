import { configureStore } from '@reduxjs/toolkit'
import dateReducer from '../features/date/dateSlice'
import errorReducer from '../features/error/errorSlice'
import formReducer from '../features/form/formSlice'

export const store = configureStore({
  reducer: {
    date: dateReducer,
    error: errorReducer,
    form: formReducer,
  },
})
