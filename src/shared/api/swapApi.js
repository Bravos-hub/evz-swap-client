import { apiRequest } from './apiClient';

function collection(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.swaps)) return payload.swaps;
  return [];
}

export const swapApi = {
  async getSwapSessions(filters = {}) {
    const payload = await apiRequest('/cpo/battery-provider/swaps', { query: filters });
    return collection(payload);
  },

  async getSwapSession(swapSessionId) {
    return apiRequest(
      `/cpo/battery-provider/swaps/${encodeURIComponent(swapSessionId)}`,
    );
  },

  async getSwapTechnicalEvents(swapSessionId) {
    const payload = await apiRequest(
      `/cpo/battery-provider/swaps/${encodeURIComponent(
        swapSessionId,
      )}/technical-events`,
    );
    return collection(payload);
  },

  async getPackTelemetry(packId) {
    return apiRequest(`/v1/bms/packs/${encodeURIComponent(packId)}/telemetry`);
  },

  async startSwap(stationId, batteryId) {
    return apiRequest('/bookings', {
      method: 'POST',
      body: {
        stationId,
        batteryId,
        bookingType: 'battery_swap',
      },
    });
  },

  async completeSwap() {
    throw new Error('Completing swap sessions is not supported by the current backend API.');
  },
};

