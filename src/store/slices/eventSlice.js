import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (_, { rejectWithValue }) => {
    try {
      const stored = localStorage.getItem('events_list')
      if (stored) {
        try {
          return JSON.parse(stored)
        } catch (e) {
          // Fallback
        }
      }
      const response = await fetch('/db.json')
      if (!response.ok) throw new Error('Etkinlik verileri yüklenemedi.')
      const data = await response.json()
      const list = data.events || data
      localStorage.setItem('events_list', JSON.stringify(list))
      return list
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addEventAsync = createAsyncThunk(
  'events/addEventAsync',
  async (eventData, { getState, rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 600))
      const newEvent = {
        id: 'evt-' + Date.now(),
        raisedAmount: 0,
        donorCount: 0,
        donations: [],
        daysLeft: 30,
        hoursLeft: 0,
        minutesLeft: 0,
        secondsLeft: 0,
        ...eventData
      }
      const currentList = getState().events.list
      const newList = [newEvent, ...currentList]
      localStorage.setItem('events_list', JSON.stringify(newList))
      return newEvent
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const editEventAsync = createAsyncThunk(
  'events/editEventAsync',
  async (eventData, { getState, rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 600))
      const currentList = getState().events.list
      const newList = currentList.map(e => e.id === eventData.id ? { ...e, ...eventData } : e)
      localStorage.setItem('events_list', JSON.stringify(newList))
      return eventData
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteEventAsync = createAsyncThunk(
  'events/deleteEventAsync',
  async (eventId, { getState, rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 600))
      const currentList = getState().events.list
      const newList = currentList.filter(e => e.id !== eventId)
      localStorage.setItem('events_list', JSON.stringify(newList))
      return eventId
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addDonationToEventAsync = createAsyncThunk(
  'events/addDonationToEventAsync',
  async ({ eventId, donationAmount, donorName }, { getState, rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 400))
      const cleanAmount = parseFloat(donationAmount) || 0
      const newDonation = {
        id: 'rd-' + Date.now(),
        donorName: donorName || 'Gönüllü Bağışçı',
        amount: cleanAmount,
        timeAgo: 'Az önce'
      }
      const currentList = getState().events.list
      const newList = currentList.map(evt => {
        if (evt.id === eventId) {
          const updatedRaised = evt.raisedAmount + cleanAmount
          const isCompleted = updatedRaised >= evt.targetAmount
          return {
            ...evt,
            raisedAmount: updatedRaised,
            status: isCompleted ? 'TAMAMLANDI' : evt.status,
            donorCount: (evt.donorCount || 0) + 1,
            donations: [newDonation, ...(evt.donations || [])]
          }
        }
        return evt
      })
      localStorage.setItem('events_list', JSON.stringify(newList))
      const updatedEvent = newList.find(evt => evt.id === eventId)
      return {
        eventId,
        donation: newDonation,
        updatedEvent
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  list: [],
  selectedEvent: null,
  categories: ['Tümü', 'Çevre', 'Eğitim', 'Sağlık', 'Hayvanlar', 'Afet', 'Çocuk', 'Yaşlı', 'Su'],
  selectedCategory: 'Tümü',
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  actionStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
}

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload
    },
    selectEventForEdit: (state, action) => {
      state.selectedEvent = action.payload
    },
    clearSelectedEvent: (state) => {
      state.selectedEvent = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      // Add
      .addCase(addEventAsync.pending, (state) => {
        state.actionStatus = 'loading'
      })
      .addCase(addEventAsync.fulfilled, (state, action) => {
        state.actionStatus = 'succeeded'
        state.list.unshift(action.payload)
      })
      .addCase(addEventAsync.rejected, (state) => {
        state.actionStatus = 'failed'
      })
      // Edit
      .addCase(editEventAsync.pending, (state) => {
        state.actionStatus = 'loading'
      })
      .addCase(editEventAsync.fulfilled, (state, action) => {
        state.actionStatus = 'succeeded'
        const index = state.list.findIndex(e => e.id === action.payload.id)
        if (index !== -1) {
          state.list[index] = { ...state.list[index], ...action.payload }
        }
        state.selectedEvent = null
      })
      .addCase(editEventAsync.rejected, (state) => {
        state.actionStatus = 'failed'
      })
      // Delete
      .addCase(deleteEventAsync.pending, (state) => {
        state.actionStatus = 'loading'
      })
      .addCase(deleteEventAsync.fulfilled, (state, action) => {
        state.actionStatus = 'succeeded'
        state.list = state.list.filter(e => e.id !== action.payload)
      })
      .addCase(deleteEventAsync.rejected, (state) => {
        state.actionStatus = 'failed'
      })
      // Add Donation
      .addCase(addDonationToEventAsync.pending, (state) => {
        state.actionStatus = 'loading'
      })
      .addCase(addDonationToEventAsync.fulfilled, (state, action) => {
        state.actionStatus = 'succeeded'
        const { eventId, donation } = action.payload
        const event = state.list.find(e => e.id === eventId)
        if (event) {
          event.raisedAmount += donation.amount
          event.donorCount += 1
          if (!event.donations) {
            event.donations = []
          }
          event.donations.unshift(donation)
        }
      })
      .addCase(addDonationToEventAsync.rejected, (state) => {
        state.actionStatus = 'failed'
      })
  }
})

export const { setSelectedCategory, selectEventForEdit, clearSelectedEvent } = eventSlice.actions
export default eventSlice.reducer
