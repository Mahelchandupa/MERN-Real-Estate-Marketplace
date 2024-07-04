import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSilce'

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
})