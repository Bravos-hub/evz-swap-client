import { apiRequest } from './apiClient';

function collection(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.vehicles)) return payload.vehicles;
  return [];
}

export const vehiclesApi = {
  async getVehicles(filters = {}) {
    const payload = await apiRequest('/vehicles', { query: filters });
    return collection(payload);
  },

  async createVehicle(vehicle) {
    return apiRequest('/vehicles', {
      method: 'POST',
      body: vehicle,
    });
  },

  async getActiveVehicle() {
    return apiRequest('/vehicles/active/me');
  },

  async setActiveVehicle(vehicleId) {
    return apiRequest('/vehicles/active/me', {
      method: 'PUT',
      body: { vehicleId },
    });
  },
};

