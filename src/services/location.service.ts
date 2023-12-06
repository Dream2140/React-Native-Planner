import axios from "axios";
import { LocationType } from "../types/taskTypes";

interface OpenCageApiResponse {
  results: Array<{
    components: {
      country?: string;
      city?: string;
      road?: string;
      house_number?: string;
    };
    formatted: string;
    geometry: {
      lat: number;
      lng: number;
    };
  }>;
}

const API_KEY = 'b3161ab34299469583fa06dac91a3cc8';
class LocationService{
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getLocationByCoordinates(
    latitude: number,
    longitude: number
  ): Promise< LocationType | null> {
    try {
      const response = await axios.get<OpenCageApiResponse>(
        `https://api.opencagedata.com/geocode/v1/json?key=${this.apiKey}&q=${latitude}+${longitude}&pretty=1&no_annotations=1`
      );

      const firstResult = response.data.results[0];
      if (firstResult) {
        const { country, city, road, house_number } = firstResult.components;
        const formattedAddress = firstResult.formatted;
        return {
          latitude,
          longitude,
          country,
          city,
          street: road,
          houseNumber: house_number,
          formattedAddress,
        };
      }

      return null;
    } catch (error) {
      console.error('Error fetching location:', error);
      throw new Error('Unable to fetch location information');
    }
  }
}

export default new LocationService(API_KEY);
