import { apiRequest } from './apiClient';

function collection(payload, key) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.[key])) return payload[key];
  return [];
}

export const walletApi = {
  async getBalance() {
    return apiRequest('/wallet/balance');
  },

  async getTransactions(page = 1, limit = 20) {
    const payload = await apiRequest('/wallet/transactions', {
      query: { page, limit },
    });
    return {
      ...payload,
      transactions: collection(payload, 'transactions'),
      total: payload?.total ?? payload?.meta?.total ?? collection(payload, 'transactions').length,
    };
  },

  async topUp(amount, paymentMethodId) {
    return apiRequest('/wallet/topup', {
      method: 'POST',
      body: { amount, paymentMethodId },
    });
  },

  async createPaymentIntent(data) {
    return apiRequest('/wallet/payment-intents', {
      method: 'POST',
      body: data,
    });
  },

  async getPaymentIntent(id) {
    return apiRequest(`/wallet/payment-intents/${encodeURIComponent(id)}`);
  },

  async reconcilePaymentIntent(id, data = {}) {
    return apiRequest(`/wallet/payment-intents/${encodeURIComponent(id)}/reconcile`, {
      method: 'PATCH',
      body: data,
    });
  },

  async getPaymentMethods() {
    const payload = await apiRequest('/payment-methods');
    return collection(payload, 'paymentMethods');
  },

  async addPaymentMethod(paymentMethodData) {
    return apiRequest('/payment-methods', {
      method: 'POST',
      body: paymentMethodData,
    });
  },
};

