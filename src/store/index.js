import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import eventReducer from './slices/eventSlice'
import walletReducer from './slices/walletSlice'
import financialReducer from './slices/financialSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
    wallet: walletReducer,
    financial: financialReducer,
  },
})
