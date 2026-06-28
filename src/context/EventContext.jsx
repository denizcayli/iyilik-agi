import React, { createContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, addEventAsync, editEventAsync, deleteEventAsync } from '../store/slices/eventSlice';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const dispatch = useDispatch();
  const reduxList = useSelector((state) => state.events.list);
  const status = useSelector((state) => state.events.status);

  const [events, setEvents] = useState([]);
  const [records, setRecords] = useState([]);

  // Fetch initial events on mount
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Sync context events with Redux events
  useEffect(() => {
    if (reduxList) {
      setEvents(reduxList);
    }
  }, [reduxList]);

  // Fetch initial financial records on mount
  useEffect(() => {
    const loadRecords = async () => {
      const stored = localStorage.getItem('financial_records');
      let currentRecords = [];
      if (stored) {
        try {
          currentRecords = JSON.parse(stored);
        } catch (e) {
          currentRecords = [];
        }
      }
      if (currentRecords.length === 0) {
        try {
          const res = await fetch('/financial_records.json');
          currentRecords = await res.json();
          localStorage.setItem('financial_records', JSON.stringify(currentRecords));
        } catch (e) {
          console.error("financial_records load failed", e);
        }
      }
      setRecords(currentRecords);
    };
    loadRecords();
  }, []);

  // Synchronize financial records with events list so that they are always aligned
  useEffect(() => {
    if (events.length > 0 && records.length > 0) {
      let changed = false;
      const updatedRecords = [...records];
      
      events.forEach(evt => {
        // Try matching by eventId first, then by project title
        const foundIndex = updatedRecords.findIndex(r => r.eventId === evt.id || r.project === evt.title);
        if (foundIndex === -1) {
          updatedRecords.push({
            id: 'rec-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
            eventId: evt.id,
            project: evt.title,
            sponsor: 0,
            raised: evt.raisedAmount || 0,
            spent: 0,
            status: evt.raisedAmount >= evt.targetAmount ? 'Onaylandı' : 'Süreçte'
          });
          changed = true;
        } else {
          // If found, update fields if out of sync
          const found = updatedRecords[foundIndex];
          if (!found.eventId || found.project !== evt.title || found.raised !== evt.raisedAmount) {
            updatedRecords[foundIndex] = {
              ...found,
              eventId: evt.id,
              project: evt.title,
              raised: evt.raisedAmount,
              status: evt.raisedAmount >= evt.targetAmount ? 'Onaylandı' : 'Süreçte'
            };
            changed = true;
          }
        }
      });

      // Filter out records whose events no longer exist
      const filteredRecords = updatedRecords.filter(r => 
        events.some(evt => evt.id === r.eventId || evt.title === r.project)
      );
      
      if (filteredRecords.length !== updatedRecords.length) {
        changed = true;
      }
      
      if (changed) {
        localStorage.setItem('financial_records', JSON.stringify(filteredRecords));
        setRecords(filteredRecords);
      }
    }
  }, [events, records.length]);

  const addEvent = async (eventData) => {
    const resultAction = await dispatch(addEventAsync(eventData));
    if (addEventAsync.fulfilled.match(resultAction)) {
      const newEvent = resultAction.payload;
      
      const stored = localStorage.getItem('financial_records');
      let currentRecords = [];
      try {
        currentRecords = stored ? JSON.parse(stored) : [];
      } catch (e) {}
      
      const newRecord = {
        id: 'rec-' + Date.now(),
        eventId: newEvent.id,
        project: newEvent.title,
        sponsor: 0,
        raised: newEvent.raisedAmount || 0,
        spent: 0,
        status: (newEvent.raisedAmount >= newEvent.targetAmount) ? 'Onaylandı' : 'Süreçte'
      };
      
      const updatedRecords = [newRecord, ...currentRecords];
      localStorage.setItem('financial_records', JSON.stringify(updatedRecords));
      setRecords(updatedRecords);
      return newEvent;
    }
  };

  const updateEvent = async (updatedEvent) => {
    const resultAction = await dispatch(editEventAsync(updatedEvent));
    if (editEventAsync.fulfilled.match(resultAction)) {
      const stored = localStorage.getItem('financial_records');
      let currentRecords = [];
      try {
        currentRecords = stored ? JSON.parse(stored) : [];
      } catch (e) {}
      
      const updatedRecords = currentRecords.map(r => {
        if (r.eventId === updatedEvent.id || r.project === updatedEvent.title) {
          return {
            ...r,
            eventId: updatedEvent.id,
            project: updatedEvent.title,
            raised: updatedEvent.raisedAmount,
            status: (updatedEvent.raisedAmount >= updatedEvent.targetAmount) ? 'Onaylandı' : 'Süreçte'
          };
        }
        return r;
      });
      
      localStorage.setItem('financial_records', JSON.stringify(updatedRecords));
      setRecords(updatedRecords);
    }
  };

  const deleteEvent = async (eventId) => {
    const resultAction = await dispatch(deleteEventAsync(eventId));
    if (deleteEventAsync.fulfilled.match(resultAction)) {
      const stored = localStorage.getItem('financial_records');
      let currentRecords = [];
      try {
        currentRecords = stored ? JSON.parse(stored) : [];
      } catch (e) {}
      
      const deletedEvent = events.find(e => e.id === eventId);
      const updatedRecords = currentRecords.filter(r => 
        r.eventId !== eventId && 
        (!deletedEvent || r.project !== deletedEvent.title)
      );
      
      localStorage.setItem('financial_records', JSON.stringify(updatedRecords));
      setRecords(updatedRecords);
    }
  };

  return (
    <EventContext.Provider value={{ events, records, setRecords, addEvent, updateEvent, deleteEvent, loading: status === 'loading' }}>
      {children}
    </EventContext.Provider>
  );
};
