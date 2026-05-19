import { render, screen, waitFor } from '@testing-library/react';
import StationMapListScreen from './StationMapListScreen';
import { stationsApi } from '../../shared/api/stationsApi';

jest.mock(
  'react-router-dom',
  () => ({
    useNavigate: () => jest.fn(),
  }),
  { virtual: true },
);

jest.mock('../../shared/api/stationsApi', () => ({
  stationsApi: {
    getNearbyStations: jest.fn(),
  },
}));

describe('StationMapListScreen', () => {
  let consoleError;

  beforeEach(() => {
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    stationsApi.getNearbyStations.mockReset();
    window.localStorage.clear();
    window.localStorage.setItem('evz.providerId', 'gogo');
    window.localStorage.setItem('evz.providerName', 'GoGo');
  });

  afterEach(() => {
    consoleError.mockRestore();
  });

  it('renders nearby stations returned from the backend', async () => {
    stationsApi.getNearbyStations.mockResolvedValueOnce([
      {
        id: 's-backend',
        provider: 'gogo',
        name: 'GoGo Backend Station',
        area: 'Kampala',
        distanceKm: 1.4,
        ready: 4,
        charging: 2,
      },
    ]);

    render(<StationMapListScreen />);

    await waitFor(() => {
      expect(screen.getByText('GoGo Backend Station')).toBeInTheDocument();
    });
    expect(stationsApi.getNearbyStations).toHaveBeenCalled();
  });

  it('shows an empty state when no backend or cached stations exist', async () => {
    stationsApi.getNearbyStations.mockResolvedValueOnce([]);
    window.localStorage.setItem('evz.providerId', 'unknown');

    render(<StationMapListScreen />);

    await waitFor(() => {
      expect(screen.getByText(/Continue/i)).toBeDisabled();
    });
  });
});
