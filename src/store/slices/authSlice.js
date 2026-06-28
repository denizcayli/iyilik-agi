import { createSlice } from '@reduxjs/toolkit'

const getInitialUser = () => {
  try {
    const rawUser = localStorage.getItem('user')
    return rawUser ? JSON.parse(rawUser) : null
  } catch {
    return null
  }
}

const initialState = {
  user: getInitialUser(),
  isAuthenticated: localStorage.getItem('isLoggedIn') === 'true',
  activeTab: 'login',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true
      state.user = {
        name: action.payload.name || 'Gönüllü Kullanıcı',
        email: action.payload.email,
        role: action.payload.role || 'gönüllü',
      }
      state.activeTab = 'login'
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.activeTab = 'login'
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload
    },
  },
})

export const { login, logout, setActiveTab } = authSlice.actions
export default authSlice.reducer
