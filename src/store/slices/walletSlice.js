import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// --- STORAGE UTILITIES ---
const storage = {
  getJson: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  setJson: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`localStorage setJson error for key ${key}:`, e);
    }
  },
  getString: (key) => localStorage.getItem(key),
  setString: (key, value) => localStorage.setItem(key, String(value)),
  getWalletKey: (email) => `wallet_${email}`,
  getTransactionsKey: (email) => `transactions_list_${email}`,
  getParticipatedKey: (email) => `participated_events_${email}`
};

// --- ASYNC THUNKS ---
export const fetchWalletData = createAsyncThunk(
  'wallet/fetchWalletData',
  async (userEmail, { rejectWithValue }) => {
    try {
      const response = await fetch('/db.json');
      if (!response.ok) throw new Error('Cüzdan verileri yüklenemedi.');
      const data = await response.json();

      const email = userEmail || 'gonullu@gmail.com';
      const walletKey = storage.getWalletKey(email);
      const transactionsKey = storage.getTransactionsKey(email);
      const participatedKey = storage.getParticipatedKey(email);

      // 1. Resolve Wallet Balance
      const storedBalance = storage.getString(walletKey);
      const mockWallet = data.wallets?.[email];
      const balance = storedBalance !== null
        ? parseFloat(storedBalance)
        : (mockWallet ? mockWallet.balance : 0);

      if (storedBalance === null) {
        storage.setString(walletKey, String(balance));
      }

      // 2. Resolve Transactions (Fetched from db.json instead of hardcoding)
      let transactions = storage.getJson(transactionsKey);
      if (!transactions) {
        transactions = mockWallet ? mockWallet.transactions : [];
        storage.setJson(transactionsKey, transactions);
      }

      // 3. Resolve Participated Events (Mapped dynamically from db.json events list)
      let participatedEvents = storage.getJson(participatedKey);
      if (!participatedEvents) {
        const isDefaultEmail = email === 'gonullu@gmail.com' || email === 'koconurbaha@gmail.com';
        participatedEvents = [];
        if (isDefaultEmail && data.events) {
          const defaultIds = ['evt-1', 'evt-2'];
          participatedEvents = data.events
            .filter(evt => defaultIds.includes(evt.id))
            .map(evt => ({
              id: evt.id,
              title: evt.title,
              category: evt.category,
              daysLeft: evt.daysLeft,
              imageUrl: evt.imageUrl,
              contributed: evt.id === 'evt-1' ? 500 : 250
            }));
        }
        storage.setJson(participatedKey, participatedEvents);
      }

      return { balance, transactions, participatedEvents };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const depositMoneyAsync = createAsyncThunk(
  'wallet/depositMoneyAsync',
  async ({ amount, userEmail }, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const cleanAmount = parseFloat(amount) || 0;

      if (!userEmail) return cleanAmount;

      const walletKey = storage.getWalletKey(userEmail);
      const transactionsKey = storage.getTransactionsKey(userEmail);

      // Update cached balance
      const storedBalance = parseFloat(storage.getString(walletKey) || '0');
      storage.setString(walletKey, String(storedBalance + cleanAmount));

      // Append transaction entry
      const list = storage.getJson(transactionsKey) || [];
      list.unshift({
        id: `dep-${Date.now()}`,
        campaignTitle: 'Bakiye Yükleme',
        category: 'Cüzdan',
        amount: cleanAmount,
        date: new Date().toISOString()
      });
      storage.setJson(transactionsKey, list);

      return cleanAmount;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const makeDonationAsync = createAsyncThunk(
  'wallet/makeDonationAsync',
  async ({ amount, eventId, eventTitle, category, userEmail }, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const cleanAmount = parseFloat(amount) || 0;

      // Base case for anonymous/unauthenticated donations
      if (!userEmail) {
        return {
          amount: cleanAmount,
          eventId,
          campaignTitle: eventTitle,
          category: category || 'Genel',
          date: new Date().toISOString()
        };
      }

      const walletKey = storage.getWalletKey(userEmail);
      const participatedKey = storage.getParticipatedKey(userEmail);
      const transactionsKey = storage.getTransactionsKey(userEmail);

      // Deduct balance with early validation check
      const storedBalance = parseFloat(storage.getString(walletKey) || '0');
      if (cleanAmount > storedBalance) {
        throw new Error('Yetersiz Bakiye');
      }
      storage.setString(walletKey, String(storedBalance - cleanAmount));

      // Update internal user contribution records
      const participatedList = storage.getJson(participatedKey);
      if (participatedList) {
        const joined = participatedList.find(e => e.id === eventId);
        if (joined) {
          joined.contributed = (joined.contributed || 0) + cleanAmount;
          storage.setJson(participatedKey, participatedList);
        }
      }

      // Add debit transaction log
      const list = storage.getJson(transactionsKey) || [];
      list.unshift({
        id: `don-${Date.now()}`,
        campaignTitle: eventTitle,
        category: category || 'Genel',
        amount: cleanAmount,
        date: new Date().toISOString()
      });
      storage.setJson(transactionsKey, list);

      return {
        amount: cleanAmount,
        eventId,
        campaignTitle: eventTitle,
        category: category || 'Genel',
        date: new Date().toISOString()
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const joinEventAsync = createAsyncThunk(
  'wallet/joinEventAsync',
  async ({ event, userEmail }, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));

      if (!userEmail) return event;

      const participatedKey = storage.getParticipatedKey(userEmail);
      const list = storage.getJson(participatedKey) || [];

      if (!list.some(e => e.id === event.id)) {
        list.push({
          id: event.id,
          title: event.title,
          category: event.category,
          daysLeft: event.daysLeft,
          imageUrl: event.imageUrl,
          contributed: 0
        });
        storage.setJson(participatedKey, list);
      }

      return event;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// --- SLICE CONFIGURATION ---
const initialState = {
  balance: 0,
  transactions: [],
  participatedEvents: [],
  status: 'idle',
  error: null,
  actionStatus: 'idle'
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    clearWalletError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Wallet Async Reducers
      .addCase(fetchWalletData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWalletData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.balance = action.payload.balance;
        state.transactions = action.payload.transactions;
        state.participatedEvents = action.payload.participatedEvents;
      })
      .addCase(fetchWalletData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Deposit Bakiye Async Reducers
      .addCase(depositMoneyAsync.pending, (state) => {
        state.actionStatus = 'loading';
      })
      .addCase(depositMoneyAsync.fulfilled, (state, action) => {
        state.actionStatus = 'succeeded';
        state.balance += action.payload;
        state.transactions.unshift({
          id: `dep-${Date.now()}`,
          campaignTitle: 'Bakiye Yükleme',
          category: 'Cüzdan',
          amount: action.payload,
          date: new Date().toISOString()
        });
      })
      .addCase(depositMoneyAsync.rejected, (state, action) => {
        state.actionStatus = 'failed';
        state.error = action.payload;
      })

      // Make Donation Async Reducers
      .addCase(makeDonationAsync.pending, (state) => {
        state.actionStatus = 'loading';
      })
      .addCase(makeDonationAsync.fulfilled, (state, action) => {
        state.actionStatus = 'succeeded';
        state.balance -= action.payload.amount;
        state.transactions.unshift({
          id: `don-${Date.now()}`,
          campaignTitle: action.payload.campaignTitle,
          category: action.payload.category,
          amount: action.payload.amount,
          date: action.payload.date
        });
        
        const joinedEvent = state.participatedEvents.find(e => e.id === action.payload.eventId);
        if (joinedEvent) {
          joinedEvent.contributed = (joinedEvent.contributed || 0) + action.payload.amount;
        }
      })
      .addCase(makeDonationAsync.rejected, (state, action) => {
        state.actionStatus = 'failed';
        state.error = action.payload;
      })

      // Join Event Async Reducers
      .addCase(joinEventAsync.pending, (state) => {
        state.actionStatus = 'loading';
      })
      .addCase(joinEventAsync.fulfilled, (state, action) => {
        state.actionStatus = 'succeeded';
        const event = action.payload;
        const alreadyJoined = state.participatedEvents.some(e => e.id === event.id);
        if (!alreadyJoined) {
          state.participatedEvents.push({
            id: event.id,
            title: event.title,
            category: event.category,
            daysLeft: event.daysLeft,
            imageUrl: event.imageUrl,
            contributed: 0
          });
        }
      })
      .addCase(joinEventAsync.rejected, (state) => {
        state.actionStatus = 'failed';
      });
  }
});

export const { clearWalletError } = walletSlice.actions;
export default walletSlice.reducer;
