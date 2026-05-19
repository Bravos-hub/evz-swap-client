import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import OtpVerifyScreen from './OtpVerifyScreen';
import { ROUTES } from '../../router/routes';
import { authApi } from '../../shared/api/authApi';

const mockNavigate = jest.fn();

jest.mock(
  'react-router-dom',
  () => ({
    useNavigate: () => mockNavigate,
    useSearchParams: () => [new URLSearchParams('msisdn=%2B256700000000')],
  }),
  { virtual: true },
);

jest.mock('../../shared/api/authApi', () => ({
  authApi: {
    verifyOtp: jest.fn(),
    sendOtp: jest.fn(),
  },
}));

describe('OtpVerifyScreen', () => {
  let consoleError;

  beforeEach(() => {
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockNavigate.mockReset();
    authApi.verifyOtp.mockReset();
    authApi.sendOtp.mockReset();
    window.localStorage.clear();
  });

  afterEach(() => {
    consoleError.mockRestore();
  });

  it('verifies OTP, writes session compatibility keys, and routes existing users', async () => {
    authApi.verifyOtp.mockResolvedValueOnce({
      success: true,
      accessToken: 'token-1',
      user: { name: 'Amina' },
    });

    render(<OtpVerifyScreen />);
    fireEvent.change(screen.getByLabelText(/one-time code/i), {
      target: { value: '123456' },
    });
    fireEvent.click(screen.getByRole('button', { name: /verify/i }));

    await waitFor(() => expect(authApi.verifyOtp).toHaveBeenCalled());
    expect(window.localStorage.getItem('evz.session')).toBe('active');
    expect(window.localStorage.getItem('evz.auth.verified')).toBe('true');
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.DASHBOARD);
  });
});
