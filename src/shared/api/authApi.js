import { apiRequest } from './apiClient';
import { clearSession, updateSession, writeSession } from './sessionStorage';

function normalizeAuthResult(payload) {
  const session = writeSession(payload);
  return {
    ...payload,
    ...session,
    success: true,
  };
}

function loginBody({ identifier, password, type }) {
  const field = type === 'phone' ? 'phone' : 'email';
  return {
    identifier,
    [field]: identifier,
    password,
  };
}

export const authApi = {
  async sendOtp(phoneNumber) {
    return apiRequest('/auth/otp/send', {
      method: 'POST',
      auth: false,
      body: {
        phoneNumber,
        phone: phoneNumber,
        msisdn: phoneNumber,
      },
    });
  },

  async verifyOtp(phoneNumber, otp) {
    const payload = await apiRequest('/auth/otp/verify', {
      method: 'POST',
      auth: false,
      body: {
        phoneNumber,
        phone: phoneNumber,
        msisdn: phoneNumber,
        otp,
        code: otp,
      },
    });
    return normalizeAuthResult(payload);
  },

  async logout() {
    try {
      await apiRequest('/auth/logout', { method: 'POST' });
    } finally {
      clearSession();
    }
    return { success: true };
  },

  async login(credentials) {
    const payload = await apiRequest('/auth/login', {
      method: 'POST',
      auth: false,
      body: loginBody(credentials),
    });
    return normalizeAuthResult(payload);
  },

  async signup(userDetails) {
    const payload = await apiRequest('/auth/register', {
      method: 'POST',
      auth: false,
      body: {
        name: userDetails.name,
        email: userDetails.email,
        phone: userDetails.phone,
        password: userDetails.password,
      },
    });
    return normalizeAuthResult(payload);
  },

  async getCurrentUser() {
    const payload = await apiRequest('/users/me');
    const user = payload?.user || payload?.data || payload;
    updateSession({ user });
    return user;
  },

  async updateProfile(profile) {
    const payload = await apiRequest('/users/me', {
      method: 'PATCH',
      body: {
        name: profile.displayName || profile.name,
        displayName: profile.displayName,
        bio: profile.bio,
        location: profile.location,
      },
    });
    const user = payload?.user || payload?.data || payload;
    updateSession({ user });
    return { success: true, user };
  },

  async socialLogin() {
    throw new Error('Social login is not connected to a verified backend endpoint yet.');
  },
};

