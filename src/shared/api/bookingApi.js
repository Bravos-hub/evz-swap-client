import { apiRequest } from './apiClient';

export const bookingApi = {
  async createBooking(booking) {
    return apiRequest('/bookings', {
      method: 'POST',
      body: booking,
    });
  },

  async getBooking(bookingId) {
    return apiRequest(`/bookings/${encodeURIComponent(bookingId)}`);
  },

  async extendBooking(bookingId, data = {}) {
    return apiRequest(`/bookings/${encodeURIComponent(bookingId)}/extend`, {
      method: 'PATCH',
      body: data,
    });
  },

  async cancelBooking(bookingId, data = {}) {
    return apiRequest(`/bookings/${encodeURIComponent(bookingId)}/cancel`, {
      method: 'PATCH',
      body: data,
    });
  },
};

