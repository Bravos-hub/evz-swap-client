import { apiRequest } from './apiClient';

function collection(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.providers)) return payload.providers;
  return [];
}

export const providersApi = {
  async getEligibleProviders(filters = {}) {
    const payload = await apiRequest('/providers/eligible', { query: filters });
    return collection(payload);
  },

  async getMarketplaceProviders(filters = {}) {
    const payload = await apiRequest('/providers/marketplace', { query: filters });
    return collection(payload);
  },
};

