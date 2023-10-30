import React,{ useEffect }from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import LocationErrorPopup from './popUps/locationErrorComponent';
import { getLocation } from '../actions/locationActions';
import { themeFonts } from '../styles/themeVariables';


interface Props {
    location_data: any;
    location_loading: boolean;
    location_error: string | null;
    getLocation: () => void;
}
  
const LocationDisplay: React.FC<Props> = ({ location_data, location_loading, location_error, getLocation }) => {
    useEffect(() => {
        if(!location_data)
            getLocation();
    }, [getLocation]);

    if (location_loading) {
        return (
        <View style={styles.container}>
            <Icon name="spinner" size={30} color="#000" />
            <Text style={styles.locationText}>Loading...</Text>
        </View>
        );
    }

    if (location_error) {
        return (
        <View style={styles.errorContainer}>
            <Icon name="exclamation-triangle" size={30} color="#FF0000" />
            <Text style={styles.locationText}>Error loading location</Text>
            <LocationErrorPopup />
        </View>
        );
    }

    return (
        <TouchableOpacity style={styles.container}>
            <Icon name="map-marker" size={20} color="#1DA1F2" style={styles.pinIcon} />
            <Text style={styles.locationText}>{location_data}</Text>
            <Icon name="angle-down" size={12} color="black" style={styles.dropdownIcon} />
        </TouchableOpacity>
    );
};
  
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      borderRadius: 20,
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      justifyContent: 'space-between',
      position: 'absolute',
    bottom: 20, 
    alignSelf: 'center' 
    
    },
    pinIcon: {
      marginRight: 5,
    },
    locationText: {
      fontSize: 16,
      color: '#1DA1F2',
      marginRight: 5,
      textAlign: 'center', 
      fontFamily: themeFonts.secondary,
      marginLeft: 5,
    },
    dropdownIcon: {
      marginLeft: 5,
    },
    loadingContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      borderRadius: 20,
      backgroundColor: 'white',
    },
    errorContainer: {
      padding: 10,
      borderRadius: 20,
      backgroundColor: 'red',
    },
    errorText: {
      color: 'white',
      textAlign: 'center',
    }
});

const mapStateToProps = (state: any) => ({
    location_data: state.location.data,
    location_loading: state.location.loading,
    location_error: state.location.error,
});

// We don't need any dispatch method for this specific example.
// However, if you need to dispatch actions, you can add them here.
const mapDispatchToProps = {
    getLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationDisplay);