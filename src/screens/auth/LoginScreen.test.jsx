import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import LoginScreen from './LoginScreen';
import { ROUTES } from '../../router/routes';
import { authApi } from '../../shared/api/authApi';

const mockNavigate = jest.fn();

jest.mock(
  'react-router-dom',
  () => ({
    useNavigate: () => mockNavigate,
  }),
  { virtual: true },
);

jest.mock('../../shared/api/authApi', () => ({
  authApi: {
    login: jest.fn(),
    socialLogin: jest.fn(),
  },
}));

describe('LoginScreen', () => {
  let consoleError;

  beforeEach(() => {
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockNavigate.mockReset();
    authApi.login.mockReset();
  });

  afterEach(() => {
    consoleError.mockRestore();
  });

  it('navigates to dashboard on successful backend login', async () => {
    authApi.login.mockResolvedValueOnce({ success: true });

    const { container } = render(<LoginScreen />);
    fireEvent.change(screen.getByPlaceholderText(/name@email/i), {
      target: { value: 'rider@example.com' },
    });
    fireEvent.change(container.querySelector('input[type="password"]'), {
      target: { value: 'secret123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith(ROUTES.DASHBOARD));
    expect(authApi.login).toHaveBeenCalledWith({
      identifier: 'rider@example.com',
      password: 'secret123',
      type: 'email',
    });
  });

  it('shows an error and stays on the screen when login fails', async () => {
    authApi.login.mockRejectedValueOnce(new Error('Invalid credentials'));

    const { container } = render(<LoginScreen />);
    fireEvent.change(screen.getByPlaceholderText(/name@email/i), {
      target: { value: 'rider@example.com' },
    });
    fireEvent.change(container.querySelector('input[type="password"]'), {
      target: { value: 'wrong-password' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalledWith(ROUTES.DASHBOARD);
  });
});
