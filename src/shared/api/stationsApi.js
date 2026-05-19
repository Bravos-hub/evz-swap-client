import { apiRequest } from './apiClient';

function collection(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.stations)) return payload.stations;
  return [];
}

export const stationsApi = {
  async getNearbyStations(latitude, longitude, radius = 10, filters = {}) {
    const payload = await apiRequest('/stations/nearby', {
      query: {
        lat: latitude,
        lng: longitude,
        latitude,
        longitude,
        radius,
        ...filters,
      },
    });
    return collection(payload);
  },

  async getStations(filters = {}) {
    const payload = await apiRequest('/stations', { query: filters });
    return collection(payload);
  },

  async getStationDetails(stationId) {
    return apiRequest(`/stations/${encodeURIComponent(stationId)}`);
  },

  async getStationByCode(code) {
    return apiRequest(`/stations/code/${encodeURIComponent(code)}`);
  },

  async searchStations(query, filters = {}) {
    const payload = await apiRequest('/stations', {
      query: {
        q: query,
        search: query,
        ...filters,
      },
    });
    return collection(payload);
  },
};

