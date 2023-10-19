import {
  GET_LOCATION_REQUEST,
  GET_LOCATION_SUCCESS,
  GET_LOCATION_FAILURE,
} from './actionTypes';
import Geolocation from 'react-native-geolocation-service';
// import Geocoder from 'react-native-geocoding';
import {PermissionsAndroid} from 'react-native';

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
      console.log('granted', granted);
      if (granted === 'granted') {
          Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            dispatch(getLocationSuccess(position.coords))
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            dispatch(getLocationFailure('Permission to access location was denied'));
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        console.log('You cannot use Geolocation');
      }
    } catch (err) {
      dispatch(getLocationFailure("Error"));
    }
  };
};