import { useState, useEffect } from "react";
import Geolocation, { GeolocationResponse } from "@react-native-community/geolocation";
import { LatLng } from "react-native-maps/lib/sharedTypes";

interface UseCurrentLocationProps {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

const defaultOptions: UseCurrentLocationProps = {
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 10000
};

const useCurrentLocation = (options: UseCurrentLocationProps = defaultOptions) => {
  const [location, setLocation] = useState<LatLng | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const getCurrentLocation = async () => {
      try {
        const watchId = Geolocation.watchPosition(
          (position: GeolocationResponse) => {
            if (isMounted) {
              setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              });
            }
          },
          (error) => {
            if (isMounted) {
              setError(error.message);
            }
          },
          {
            enableHighAccuracy: options.enableHighAccuracy,
            timeout: options.timeout,
            maximumAge: options.maximumAge
          }
        );

        return () => {
          if (isMounted) {
            Geolocation.clearWatch(watchId);
          }
        };
      } catch (error: any) {
        if (isMounted) {
          setError(error.message);
        }
      }
    };

    getCurrentLocation();

    return () => {
      isMounted = false;
    };
  }, [options]);

  return { location, error };
};

export default useCurrentLocation;
