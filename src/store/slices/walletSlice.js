import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchWalletData = createAsyncThunk(
  'wallet/fetchWalletData',
  async (userEmail, { rejectWithValue }) => {
    try {
      const response = await fetch('/events.json')
      if (!response.ok) throw new Error('Cüzdan verileri yüklenemedi.')
      const data = await response.json()

      const email = userEmail || 'gonullu@gmail.com'
      const walletKey = 'wallet_' + email
      const storedBalance = sessionStorage.getItem(walletKey)
      const mockWallet = data.wallets?.[email]

      let balance = 0
      if (storedBalance !== null) {
        balance = parseFloat(storedBalance)
      } else {
        balance = mockWallet ? mockWallet.balance : 0
        sessionStorage.setItem(walletKey, String(balance))
      }

      const transactionsKey = 'transactions_list_' + email
      const storedTransactions = localStorage.getItem(transactionsKey)
      let transactions = []
      if (storedTransactions) {
        try {
          transactions = JSON.parse(storedTransactions)
        } catch (e) {
          transactions = []
        }
      } else {
        const dbTransactions = mockWallet ? mockWallet.transactions : []
        const defaultTransactions = [
          { id: 'd1', campaignTitle: 'Geleceğe Nefes: Orman Yangını Sonrası Rehabilitasyon', category: 'Çevre', date: '2026-06-26T22:14:00Z', amount: 500 },
          { id: 'd2', campaignTitle: 'Köy Okullarına Bilgisayar Laboratuvarı', category: 'Eğitim', date: '2026-06-24T18:45:00Z', amount: 250 },
          { id: 'd3', campaignTitle: 'Sokak Hayvanları Mobil Klinik', category: 'Hayvanlar', date: '2026-06-20T11:30:00Z', amount: 1000 },
          { id: 'd4', campaignTitle: 'Kırsal Bölgelere Temiz Su Kuyusu', category: 'Su', date: '2026-06-15T09:05:00Z', amount: 150 },
          { id: 'd5', campaignTitle: 'Deprem Bölgesi Çocukları için Geçici Okul', category: 'Afet', date: '2026-06-10T14:22:00Z', amount: 750 },
          { id: 'd6', campaignTitle: 'Yaşlı Bakım Merkezi Rehabilitasyon', category: 'Yaşlı', date: '2026-06-05T16:58:00Z', amount: 300 },
          { id: 'd7', campaignTitle: 'Çocuk Kanseri Destek Bağışı', category: 'Sağlık', date: '2026-06-01T08:00:00Z', amount: 500 }
        ]
        transactions = [...dbTransactions]
        defaultTransactions.forEach(dt => {
          if (!transactions.some(t => t.id === dt.id)) {
            transactions.push(dt)
          }
        })
        localStorage.setItem(transactionsKey, JSON.stringify(transactions))
      }

      const participatedKey = 'participated_events_' + email
      const storedParticipated = localStorage.getItem(participatedKey)
      let participatedEvents = []
      if (storedParticipated) {
        try {
          participatedEvents = JSON.parse(storedParticipated)
        } catch (e) {
          participatedEvents = []
        }
      } else {
        participatedEvents = email === 'gonullu@gmail.com' || email === 'koconurbaha@gmail.com' ? [
          {
            id: 'evt-1',
            title: 'Geleceğe Nefes: Orman Yangını Sonrası Rehabilitasyon',
            category: 'Çevre',
            daysLeft: 45,
            imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=200&q=80',
            contributed: 500,
          },
          {
            id: 'evt-2',
            title: 'Köy Okullarına Bilgisayar Laboratuvarı',
            category: 'Eğitim',
            daysLeft: 22,
            imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=200&q=80',
            contributed: 250,
          }
        ] : []
        localStorage.setItem(participatedKey, JSON.stringify(participatedEvents))
      }

      return {
        balance,
        transactions,
        participatedEvents
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const depositMoneyAsync = createAsyncThunk(
  'wallet/depositMoneyAsync',
  async ({ amount, userEmail }, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const cleanAmount = parseFloat(amount) || 0

      if (userEmail) {
        const walletKey = 'wallet_' + userEmail
        const storedBalance = parseFloat(sessionStorage.getItem(walletKey) || '0')
        sessionStorage.setItem(walletKey, String(storedBalance + cleanAmount))

        // Add to transactions list in localStorage
        const transactionsKey = 'transactions_list_' + userEmail
        const stored = localStorage.getItem(transactionsKey)
        let list = stored ? JSON.parse(stored) : []
        list.unshift({
          id: 'dep-' + Date.now(),
          campaignTitle: 'Bakiye Yükleme',
          category: 'Cüzdan',
          amount: cleanAmount,
          date: new Date().toISOString()
        })
        localStorage.setItem(transactionsKey, JSON.stringify(list))
      }

      return cleanAmount
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const makeDonationAsync = createAsyncThunk(
  'wallet/makeDonationAsync',
  async ({ amount, eventId, eventTitle, category, userEmail }, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const cleanAmount = parseFloat(amount) || 0

      if (userEmail) {
        const walletKey = 'wallet_' + userEmail
        const storedBalance = parseFloat(sessionStorage.getItem(walletKey) || '0')
        if (cleanAmount > storedBalance) {
          throw new Error('Yetersiz Bakiye')
        }
        sessionStorage.setItem(walletKey, String(storedBalance - cleanAmount))

        const participatedKey = 'participated_events_' + userEmail
        const storedParticipated = localStorage.getItem(participatedKey)
        if (storedParticipated) {
          try {
            let list = JSON.parse(storedParticipated)
            const joined = list.find(e => e.id === eventId)
            if (joined) {
              joined.contributed = (joined.contributed || 0) + cleanAmount
              localStorage.setItem(participatedKey, JSON.stringify(list))
            }
          } catch (e) {
            console.error('Failed to update contribution in localStorage:', e)
          }
        }

        const transactionsKey = 'transactions_list_' + userEmail
        const stored = localStorage.getItem(transactionsKey)
        let list = stored ? JSON.parse(stored) : []
        list.unshift({
          id: 'don-' + Date.now(),
          campaignTitle: eventTitle,
          category: category || 'Genel',
          amount: cleanAmount,
          date: new Date().toISOString()
        })
        localStorage.setItem(transactionsKey, JSON.stringify(list))
      }

      return {
        amount: cleanAmount,
        eventId,
        campaignTitle: eventTitle,
        category: category || 'Genel',
        date: new Date().toISOString()
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const joinEventAsync = createAsyncThunk(
  'wallet/joinEventAsync',
  async ({ event, userEmail }, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 400))
      if (userEmail) {
        const participatedKey = 'participated_events_' + userEmail
        const stored = localStorage.getItem(participatedKey)
        let list = stored ? JSON.parse(stored) : []
        if (!list.some(e => e.id === event.id)) {
          list.push({
            id: event.id,
            title: event.title,
            category: event.category,
            daysLeft: event.daysLeft,
            imageUrl: event.imageUrl,
            contributed: 0
          })
          localStorage.setItem(participatedKey, JSON.stringify(list))
        }
      }
      return event
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  balance: 0,
  transactions: [],
  participatedEvents: [],
  status: 'idle',
  error: null,
  actionStatus: 'idle',
}

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    clearWalletError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchWalletData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchWalletData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.balance = action.payload.balance
        state.transactions = action.payload.transactions
        state.participatedEvents = action.payload.participatedEvents
      })
      .addCase(fetchWalletData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(depositMoneyAsync.pending, (state) => {
        state.actionStatus = 'loading'
      })
      .addCase(depositMoneyAsync.fulfilled, (state, action) => {
        state.actionStatus = 'succeeded'
        state.balance += action.payload
        state.transactions.unshift({
          id: 'dep-' + Date.now(),
          campaignTitle: 'Bakiye Yükleme',
          category: 'Cüzdan',
          amount: action.payload,
          date: new Date().toISOString()
        })
      })
      .addCase(depositMoneyAsync.rejected, (state, action) => {
        state.actionStatus = 'failed'
        state.error = action.payload
      })
      .addCase(makeDonationAsync.pending, (state) => {
        state.actionStatus = 'loading'
      })
      .addCase(makeDonationAsync.fulfilled, (state, action) => {
        state.actionStatus = 'succeeded'
        state.balance -= action.payload.amount
        state.transactions.unshift({
          id: 'don-' + Date.now(),
          campaignTitle: action.payload.campaignTitle,
          category: action.payload.category,
          amount: action.payload.amount,
          date: action.payload.date
        })
        const joinedEvent = state.participatedEvents.find(e => e.id === action.payload.eventId)
        if (joinedEvent) {
          joinedEvent.contributed = (joinedEvent.contributed || 0) + action.payload.amount
        }
      })
      .addCase(makeDonationAsync.rejected, (state, action) => {
        state.actionStatus = 'failed'
        state.error = action.payload
      })
      // Join Event
      .addCase(joinEventAsync.pending, (state) => {
        state.actionStatus = 'loading'
      })
      .addCase(joinEventAsync.fulfilled, (state, action) => {
        state.actionStatus = 'succeeded'
        const event = action.payload
        if (!state.participatedEvents.some(e => e.id === event.id)) {
          state.participatedEvents.push({
            id: event.id,
            title: event.title,
            category: event.category,
            daysLeft: event.daysLeft,
            imageUrl: event.imageUrl,
            contributed: 0
          })
        }
      })
      .addCase(joinEventAsync.rejected, (state) => {
        state.actionStatus = 'failed'
      })
  }
})

export const { clearWalletError } = walletSlice.actions
export default walletSlice.reducer

