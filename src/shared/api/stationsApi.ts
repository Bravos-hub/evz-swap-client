/**
 * Stations API functions
 */

export interface Station {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  [key: string]: unknown;
}

export interface StationFilters {
  [key: string]: unknown;
}

export const stationsApi = {
  /**
   * Get nearby stations
   */
  async getNearbyStations(latitude: number, longitude: number, radius: number): Promise<Station[]> {
    // TODO: Implement actual API call
    return [];
  },

  /**
   * Get station details
   */
  async getStationDetails(stationId: string): Promise<Station | null> {
    // TODO: Implement actual API call
    return null;
  },

  /**
   * Search stations
   */
  async searchStations(query: string, filters?: StationFilters): Promise<Station[]> {
    // TODO: Implement actual API call
    return [];
  },
};

