import {
  GET_LOCATION_REQUEST,
  GET_LOCATION_SUCCESS,
  GET_LOCATION_FAILURE,
} from './actionTypes';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import { REACT_APP_MAP_API_KEY } from '@env';
import {PermissionsAndroid} from 'react-native';

Geocoder.init(REACT_APP_MAP_API_KEY);

export const getLocationRequest = () => ({
  type: GET_LOCATION_REQUEST,
});

export const getLocationSuccess = (location: any) => ({
  type: GET_LOCATION_SUCCESS,
  payload: location,
});

export const getLocationFailure = (error: string) => ({
  type: GET_LOCATION_FAILURE,
  payload: error,
});

export const getLocation = () => {
  return async (dispatch: any) => {
    dispatch(getLocationRequest());
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === 'granted') {
          Geolocation.getCurrentPosition(
          async position => {
            const location = await Geocoder.from({
              latitude : position.coords.latitude,
              longitude : position.coords.longitude
            });
            const addressComponents = location.results[0].address_components;
            const city = addressComponents.find(component => component.types.includes('locality'))?.long_name;
            const state = addressComponents.find(component => component.types.includes('administrative_area_level_1'))?.short_name;
            const formattedAddress = `${city}, ${state}`;   
            console.log(formattedAddress);         
            dispatch(getLocationSuccess(formattedAddress))
          },
          error => {
            // See error code charts below.
            console.error(error.code, error.message);
            dispatch(getLocationFailure('Permission to access location was denied'));
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        console.error('You cannot use Geolocation');
      }
    } catch (error: any) {
      console.error(error);
      dispatch(getLocationFailure(error.message));
    }
  };
};