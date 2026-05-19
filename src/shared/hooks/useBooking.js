import { useState } from 'react';
import { bookingApi } from '../api/bookingApi';

export function useBooking() {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createBooking = async (bookingData) => {
    setLoading(true);
    try {
      const created = await bookingApi.createBooking(bookingData);
      setBooking(created);
      setError(null);
      return created;
    } catch (error) {
      console.error('Failed to create booking:', error);
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId, data = {}) => {
    setLoading(true);
    try {
      const cancelled = await bookingApi.cancelBooking(bookingId, data);
      setBooking(cancelled);
      setError(null);
      return cancelled;
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    booking,
    loading,
    error,
    createBooking,
    cancelBooking,
  };
}
