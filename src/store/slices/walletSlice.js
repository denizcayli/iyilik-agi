import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Storage error [${key}]:`, e);
    }
  },
  keys: {
    wallet: (email) => `wallet_${email}`,
    txs: (email) => `transactions_list_${email}`,
    events: (email) => `participated_events_${email}`,
  }
};


export const fetchWalletData = createAsyncThunk(
  'wallet/fetchData',
  async (userEmail, { rejectWithValue }) => {
    try {
      const email = userEmail || 'gonullu@gmail.com';
      const res = await fetch('/db.json');
      if (!res.ok) throw new Error('Cüzdan verileri yüklenemedi.');
      const db = await res.json();

      const mockWallet = db.wallets?.[email];

      const balance = storage.get(storage.keys.wallet(email)) ?? (mockWallet?.balance || 0);
      const transactions = storage.get(storage.keys.txs(email)) || (mockWallet?.transactions || []);
      
      let participatedEvents = storage.get(storage.keys.events(email));
      if (!participatedEvents) {
        const defaultIds = ['evt-1', 'evt-2'];
        const isDefaultUser = ['gonullu@gmail.com', 'koconurbaha@gmail.com'].includes(email);
        
        participatedEvents = isDefaultUser && db.events
          ? db.events
              .filter((evt) => defaultIds.includes(evt.id))
              .map((evt) => ({
                ...evt,
                contributed: evt.id === 'evt-1' ? 500 : 250
              }))
          : [];
      }

      storage.set(storage.keys.wallet(email), balance);
      storage.set(storage.keys.txs(email), transactions);
      storage.set(storage.keys.events(email), participatedEvents);

      return { balance, transactions, participatedEvents };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const depositMoneyAsync = createAsyncThunk(
  'wallet/deposit',
  async ({ amount, userEmail }, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const cleanAmount = parseFloat(amount) || 0;

      if (userEmail) {
        const currentBalance = storage.get(storage.keys.wallet(userEmail)) || 0;
        const txs = storage.get(storage.keys.txs(userEmail)) || [];

        const newTx = {
          id: `dep-${Date.now()}`,
          campaignTitle: 'Bakiye Yükleme',
          category: 'Cüzdan',
          amount: cleanAmount,
          date: new Date().toISOString()
        };

        storage.set(storage.keys.wallet(userEmail), currentBalance + cleanAmount);
        storage.set(storage.keys.txs(userEmail), [newTx, ...txs]);
      }

      return cleanAmount;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const makeDonationAsync = createAsyncThunk(
  'wallet/donate',
  async ({ amount, eventId, eventTitle, category, userEmail }, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const cleanAmount = parseFloat(amount) || 0;

      const newTx = {
        id: `don-${Date.now()}`,
        campaignTitle: eventTitle,
        category: category || 'Genel',
        amount: cleanAmount,
        date: new Date().toISOString()
      };

      if (userEmail) {
        const balance = storage.get(storage.keys.wallet(userEmail)) || 0;
        if (cleanAmount > balance) throw new Error('Yetersiz Bakiye');

        storage.set(storage.keys.wallet(userEmail), balance - cleanAmount);
        
        const txs = storage.get(storage.keys.txs(userEmail)) || [];
        storage.set(storage.keys.txs(userEmail), [newTx, ...txs]);

        const events = storage.get(storage.keys.events(userEmail)) || [];
        const updatedEvents = events.map(e => e.id === eventId ? { ...e, contributed: (e.contributed || 0) + cleanAmount } : e);
        storage.set(storage.keys.events(userEmail), updatedEvents);
      }

      return { amount: cleanAmount, eventId, tx: newTx };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const joinEventAsync = createAsyncThunk(
  'wallet/joinEvent',
  async ({ event, userEmail }, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));

      if (userEmail) {
        const events = storage.get(storage.keys.events(userEmail)) || [];
        if (!events.some(e => e.id === event.id)) {
          const newEvent = { ...event, contributed: 0 };
          storage.set(storage.keys.events(userEmail), [...events, newEvent]);
        }
      }
      return event;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const initialState = {
  balance: 0,
  transactions: [],
  participatedEvents: [],
  status: 'idle',       
  actionStatus: 'idle', 
  error: null,
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
      .addCase(fetchWalletData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
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

      .addCase(makeDonationAsync.pending, (state) => {
        state.actionStatus = 'loading';
      })
      .addCase(makeDonationAsync.fulfilled, (state, action) => {
        state.actionStatus = 'succeeded';
        state.balance -= action.payload.amount;
        state.transactions.unshift(action.payload.tx);
        
        const event = state.participatedEvents.find(e => e.id === action.payload.eventId);
        if (event) {
          event.contributed = (event.contributed || 0) + action.payload.amount;
        }
      })
      .addCase(makeDonationAsync.rejected, (state, action) => {
        state.actionStatus = 'failed';
        state.error = action.payload;
      })

      .addCase(joinEventAsync.pending, (state) => {
        state.actionStatus = 'loading';
      })
      .addCase(joinEventAsync.fulfilled, (state, action) => {
        state.actionStatus = 'succeeded';
        const alreadyJoined = state.participatedEvents.some(e => e.id === action.payload.id);
        if (!alreadyJoined) {
          state.participatedEvents.push({ ...action.payload, contributed: 0 });
        }
      })
      .addCase(joinEventAsync.rejected, (state) => {
        state.actionStatus = 'failed';
      });
  },
});

export const { clearWalletError } = walletSlice.actions;
export default walletSlice.reducer;