import { apiRequest, ApiError } from './apiClient';
import {
  clearSession,
  readSession,
  writeSession,
} from './sessionStorage';

function jsonResponse(body, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: status >= 200 && status < 300 ? 'OK' : 'Error',
    headers: {
      get: () => 'application/json',
    },
    text: jest.fn().mockResolvedValue(body == null ? '' : JSON.stringify(body)),
  };
}

describe('apiRequest', () => {
  const originalBaseUrl = process.env.REACT_APP_API_BASE_URL;

  beforeEach(() => {
    process.env.REACT_APP_API_BASE_URL = 'http://api.test/api/v1';
    global.fetch = jest.fn();
    clearSession();
  });

  afterEach(() => {
    process.env.REACT_APP_API_BASE_URL = originalBaseUrl;
    clearSession();
    jest.resetAllMocks();
  });

  it('sends JSON and the stored bearer token', async () => {
    writeSession({ accessToken: 'access-1' });
    fetch.mockResolvedValueOnce(jsonResponse({ ok: true }));

    await apiRequest('/stations', {
      method: 'POST',
      body: { q: 'Kampala' },
    });

    expect(fetch).toHaveBeenCalledWith(
      'http://api.test/api/v1/stations',
      expect.objectContaining({
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ q: 'Kampala' }),
        headers: expect.objectContaining({
          Authorization: 'Bearer access-1',
          'Content-Type': 'application/json',
        }),
      }),
    );
  });

  it('normalizes backend errors', async () => {
    fetch.mockResolvedValueOnce(jsonResponse({ message: 'Station not found' }, 404));

    await expect(apiRequest('/stations/missing')).rejects.toMatchObject({
      name: 'ApiError',
      message: 'Station not found',
      status: 404,
    });
  });

  it('refreshes once on 401 and retries the original request', async () => {
    writeSession({ accessToken: 'old-token', refreshToken: 'refresh-1' });
    fetch
      .mockResolvedValueOnce(jsonResponse({ message: 'expired' }, 401))
      .mockResolvedValueOnce(
        jsonResponse({ accessToken: 'new-token', refreshToken: 'refresh-2' }),
      )
      .mockResolvedValueOnce(jsonResponse({ data: ['station'] }));

    const result = await apiRequest('/stations');

    expect(result).toEqual({ data: ['station'] });
    expect(fetch).toHaveBeenCalledTimes(3);
    expect(fetch.mock.calls[1][0]).toBe('http://api.test/api/v1/auth/refresh');
    expect(fetch.mock.calls[2][1].headers.Authorization).toBe('Bearer new-token');
    expect(readSession().accessToken).toBe('new-token');
  });

  it('clears session when refresh fails', async () => {
    writeSession({ accessToken: 'old-token', refreshToken: 'refresh-1' });
    fetch
      .mockResolvedValueOnce(jsonResponse({ message: 'expired' }, 401))
      .mockResolvedValueOnce(jsonResponse({ message: 'refresh failed' }, 401));

    await expect(apiRequest('/wallet/balance')).rejects.toBeInstanceOf(ApiError);

    expect(readSession()).toBeNull();
    expect(window.localStorage.getItem('evz.session')).toBeNull();
  });
});

