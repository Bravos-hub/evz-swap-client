import { authApi } from './authApi';
import { bookingApi } from './bookingApi';
import { providersApi } from './providersApi';
import { stationsApi } from './stationsApi';
import { swapApi } from './swapApi';
import { vehiclesApi } from './vehiclesApi';
import { walletApi } from './walletApi';
import { clearSession, readSession } from './sessionStorage';

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

describe('endpoint-backed API modules', () => {
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

  it('logs in through /auth/login and stores the session', async () => {
    fetch.mockResolvedValueOnce(
      jsonResponse({ accessToken: 'token-1', user: { name: 'Amina' } }),
    );

    const result = await authApi.login({
      identifier: 'amina@example.com',
      password: 'secret',
      type: 'email',
    });

    expect(fetch.mock.calls[0][0]).toBe('http://api.test/api/v1/auth/login');
    expect(JSON.parse(fetch.mock.calls[0][1].body)).toMatchObject({
      email: 'amina@example.com',
      password: 'secret',
    });
    expect(result.success).toBe(true);
    expect(readSession().accessToken).toBe('token-1');
  });

  it('loads stations and station details from backend station endpoints', async () => {
    fetch
      .mockResolvedValueOnce(jsonResponse({ data: [{ id: 's1' }] }))
      .mockResolvedValueOnce(jsonResponse({ id: 's1', name: 'Kira Road' }));

    await expect(stationsApi.getNearbyStations(1, 2, 5)).resolves.toEqual([
      { id: 's1' },
    ]);
    await expect(stationsApi.getStationDetails('s1')).resolves.toMatchObject({
      name: 'Kira Road',
    });

    expect(fetch.mock.calls[0][0]).toContain('/stations/nearby?');
    expect(fetch.mock.calls[1][0]).toBe('http://api.test/api/v1/stations/s1');
  });

  it('creates and cancels bookings through /bookings', async () => {
    fetch
      .mockResolvedValueOnce(jsonResponse({ id: 'b1' }))
      .mockResolvedValueOnce(jsonResponse({ id: 'b1', status: 'canceled' }));

    await bookingApi.createBooking({ stationId: 's1' });
    await bookingApi.cancelBooking('b1');

    expect(fetch.mock.calls[0][0]).toBe('http://api.test/api/v1/bookings');
    expect(fetch.mock.calls[0][1].method).toBe('POST');
    expect(fetch.mock.calls[1][0]).toBe('http://api.test/api/v1/bookings/b1/cancel');
    expect(fetch.mock.calls[1][1].method).toBe('PATCH');
  });

  it('loads swap sessions, technical events, and BMS telemetry', async () => {
    fetch
      .mockResolvedValueOnce(jsonResponse({ swaps: [{ id: 'sw1' }] }))
      .mockResolvedValueOnce(jsonResponse({ data: [{ event: 'door_opened' }] }))
      .mockResolvedValueOnce(jsonResponse({ soc: 87 }));

    await expect(swapApi.getSwapSessions()).resolves.toEqual([{ id: 'sw1' }]);
    await expect(swapApi.getSwapTechnicalEvents('sw1')).resolves.toEqual([
      { event: 'door_opened' },
    ]);
    await expect(swapApi.getPackTelemetry('pack1')).resolves.toEqual({ soc: 87 });

    expect(fetch.mock.calls[0][0]).toContain('/cpo/battery-provider/swaps');
    expect(fetch.mock.calls[1][0]).toContain('/technical-events');
    expect(fetch.mock.calls[2][0]).toContain('/v1/bms/packs/pack1/telemetry');
  });

  it('loads wallet balance, transactions, and creates top-ups', async () => {
    fetch
      .mockResolvedValueOnce(jsonResponse({ balance: 2000 }))
      .mockResolvedValueOnce(jsonResponse({ transactions: [{ id: 'tx1' }], total: 1 }))
      .mockResolvedValueOnce(jsonResponse({ id: 'top1' }));

    await expect(walletApi.getBalance()).resolves.toEqual({ balance: 2000 });
    await expect(walletApi.getTransactions()).resolves.toMatchObject({
      transactions: [{ id: 'tx1' }],
      total: 1,
    });
    await walletApi.topUp(5000, 'pm1');

    expect(fetch.mock.calls[0][0]).toBe('http://api.test/api/v1/wallet/balance');
    expect(fetch.mock.calls[1][0]).toContain('/wallet/transactions?');
    expect(fetch.mock.calls[2][0]).toBe('http://api.test/api/v1/wallet/topup');
  });

  it('loads vehicles and providers from onboarding endpoints', async () => {
    fetch
      .mockResolvedValueOnce(jsonResponse({ vehicles: [{ id: 'v1' }] }))
      .mockResolvedValueOnce(jsonResponse({ providers: [{ id: 'p1' }] }));

    await expect(vehiclesApi.getVehicles()).resolves.toEqual([{ id: 'v1' }]);
    await expect(providersApi.getEligibleProviders()).resolves.toEqual([{ id: 'p1' }]);

    expect(fetch.mock.calls[0][0]).toBe('http://api.test/api/v1/vehicles');
    expect(fetch.mock.calls[1][0]).toBe('http://api.test/api/v1/providers/eligible');
  });
});

