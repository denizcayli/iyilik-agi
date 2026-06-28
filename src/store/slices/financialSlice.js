import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchEvents,
  addEventAsync,
  editEventAsync,
  deleteEventAsync,
  addDonationToEventAsync
} from './eventSlice';

const getLocalStorageRecords = () => {
  try {
    const stored = localStorage.getItem('financial_records');
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : null;
  } catch {
    return null;
  }
};

const saveToLocalStorage = (records) => {
  localStorage.setItem('financial_records', JSON.stringify(records));
};

const determineStatus = (raised, target) => (raised >= target ? 'Onaylandı' : 'Süreçte');

const createRecordFromEvent = (evt) => ({
  id: `rec-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
  eventId: evt.id,
  project: evt.title,
  sponsor: 0,
  raised: evt.raisedAmount || 0,
  spent: 0,
  status: determineStatus(evt.raisedAmount, evt.targetAmount)
});


export const fetchRecords = createAsyncThunk(
  'financial/fetchRecords',
  async (_, { rejectWithValue }) => {
    try {
      const cache = getLocalStorageRecords();
      if (cache) return cache;

      const response = await fetch('/db.json');
      if (!response.ok) throw new Error('Finansal rapor verileri yüklenemedi.');

      const data = await response.json();
      const list = data.financial_record || data.financial_records || [];
      saveToLocalStorage(list);
      return list;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addRecordAsync = createAsyncThunk(
  'financial/addRecordAsync',
  async (recordData, { getState, rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newRecord = { id: `rec-${Date.now()}`, sponsor: 0, raised: 0, spent: 0, status: 'Süreçte', ...recordData };
      const newList = [newRecord, ...getState().financial.records];
      saveToLocalStorage(newList);
      return newRecord;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editRecordAsync = createAsyncThunk(
  'financial/editRecordAsync',
  async (recordData, { getState, rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newList = getState().financial.records.map(r => r.id === recordData.id ? { ...r, ...recordData } : r);
      saveToLocalStorage(newList);
      return recordData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteRecordAsync = createAsyncThunk(
  'financial/deleteRecordAsync',
  async (recordId, { getState, rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newList = getState().financial.records.filter(r => r.id !== recordId);
      saveToLocalStorage(newList);
      return recordId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const initialState = {
  records: [],
  status: 'idle',
  error: null,
  actionStatus: 'idle'
};

const financialSlice = createSlice({
  name: 'financial',
  initialState,
  reducers: {
    setRecordsState: (state, action) => {
      state.records = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Core Actions
      .addCase(fetchRecords.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchRecords.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.records = action.payload;
      })
      .addCase(fetchRecords.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Direct CRUD Reducers
      .addCase(addRecordAsync.fulfilled, (state, action) => {
        state.records.unshift(action.payload);
      })
      .addCase(editRecordAsync.fulfilled, (state, action) => {
        const index = state.records.findIndex(r => r.id === action.payload.id);
        if (index !== -1) state.records[index] = { ...state.records[index], ...action.payload };
      })
      .addCase(deleteRecordAsync.fulfilled, (state, action) => {
        state.records = state.records.filter(r => r.id !== action.payload);
      })

      // --- CROSS-SLICE SYNCHRONIZATION (Cleaned up Loops) ---
      .addCase(fetchEvents.fulfilled, (state, action) => {
        const events = action.payload || [];
        if (events.length === 0) return;

        let isStateChanged = false;
        const currentRecords = [...state.records];

        events.forEach(evt => {
          const matchedIndex = currentRecords.findIndex(r => r.eventId === evt.id || r.project === evt.title);

          if (matchedIndex === -1) {
            currentRecords.push(createRecordFromEvent(evt));
            isStateChanged = true;
          } else {
            const existing = currentRecords[matchedIndex];
            const updatedRaised = evt.raisedAmount ?? 0;
            const updatedStatus = determineStatus(updatedRaised, evt.targetAmount);

            if (existing.raised !== updatedRaised || existing.project !== evt.title || existing.status !== updatedStatus) {
              currentRecords[matchedIndex] = {
                ...existing,
                eventId: evt.id,
                project: evt.title,
                raised: updatedRaised,
                status: updatedStatus
              };
              isStateChanged = true;
            }
          }
        });

        // Remove records whose event no longer exists
        const finalSyncedRecords = currentRecords.filter(r =>
          events.some(evt => evt.id === r.eventId || evt.title === r.project)
        );

        if (isStateChanged || finalSyncedRecords.length !== state.records.length || state.records.length === 0) {
          state.records = finalSyncedRecords;
          saveToLocalStorage(finalSyncedRecords);
        }
      })

      .addCase(addEventAsync.fulfilled, (state, action) => {
        state.records.unshift(createRecordFromEvent(action.payload));
        saveToLocalStorage(state.records);
      })

      .addCase(editEventAsync.fulfilled, (state, action) => {
        const updatedEvent = action.payload;
        state.records = state.records.map(r => {
          if (r.eventId !== updatedEvent.id && r.project !== updatedEvent.title) return r;
          return {
            ...r,
            eventId: updatedEvent.id,
            project: updatedEvent.title,
            raised: updatedEvent.raisedAmount,
            status: determineStatus(updatedEvent.raisedAmount, updatedEvent.targetAmount)
          };
        });
        saveToLocalStorage(state.records);
      })

      .addCase(deleteEventAsync.fulfilled, (state, action) => {
        state.records = state.records.filter(r => r.eventId !== action.payload);
        saveToLocalStorage(state.records);
      })

      .addCase(addDonationToEventAsync.fulfilled, (state, action) => {
        const { eventId, updatedEvent } = action.payload;
        if (!updatedEvent) return;

        state.records = state.records.map(r => {
          if (r.eventId !== eventId && r.project !== updatedEvent.title) return r;
          return {
            ...r,
            raised: updatedEvent.raisedAmount,
            status: determineStatus(updatedEvent.raisedAmount, updatedEvent.targetAmount)
          };
        });
        saveToLocalStorage(state.records);
      });
  }
});

export const { setRecordsState } = financialSlice.actions;
export default financialSlice.reducer;