import React, { useEffect, useCallback } from 'react';
import { FlatList, View, Text, Button, ActivityIndicator,StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { fetchEvent,updateEventSaved } from '../../actions/eventActions';
import EventComponent from '../eventComponent';
import { Event } from '../../models/event';
import SavedErrorComponent from '../popUps/savedEventErrorComponent';
import LocationDisplay from '../locationComponent';
import {StackNavigationProp} from '@react-navigation/stack';
import { getLocation } from '../../actions/locationActions';
import { loadCategories } from '../../actions/categoriesActions';
import { themeColors,themeFonts } from '../../styles/themeVariables';
import Logo from '../logoComponent';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
type RootStackParamList = {
  "Event Details": { event: Event };
  // add other screens here
};
type EventDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Event Details'>;

interface Props {
  navigation: EventDetailsScreenNavigationProp;
  event_loading: boolean;
  event_data: any;
  event_error: string | null;
  location: any;
  categories: string[];
  picture: string;
  fetchEvent: (userLocation: string, event_preferences: string[]) => void;
  loadCategories: () => void;
}

const EventComponentList: React.FC<Props> = ({ navigation, 
  event_loading, event_data, event_error,
  location,  categories, picture,
  fetchEvent, loadCategories}) => {

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Logo
          style={{ width: 75, height: 75 }} // // Replace with the path to your image
        />
      ),
      headerRight: () => (
        <Image
          style={{ width: 40, height: 40, marginRight: 10,borderRadius: 40 }} // Adjust the size and margin as needed
          source={{ uri: picture }}// Replace with the path to your image
        />
      ),
      headerTitleAlign: 'center',
      // Add any other options you want...
    });
    getLocation();
    loadCategories();
    fetchEvent(location, categories);
  }, [fetchEvent,getLocation,loadCategories]);

  const handleFetch = useCallback(() => { // # TODO: see if this is needed 
    fetchEvent(location, categories);
  }, [fetchEvent]);

  const handleEventPress = (event: Event) => {
    navigation.navigate('Event Details', {
       event });
  };

  return (
    <View style={styles.container}>
      {event_loading ? (
        <ActivityIndicator size="large" color={themeColors.primary} />
      ) : event_error ? (
        <>
          <Button title="Fetch New Tweets" onPress={handleFetch} />
          <Text>Error: {event_error}</Text>
        </>
      ) : (
        <View style={styles.top_container}>
          <Text style={{ ...styles.header, textAlign: 'center' }}>{categories[0]} Events happening in {location}</Text>
          <Text style={styles.header}>Tweets</Text>
          <FlatList
            data={event_data}
            renderItem={({ item }) => {
              if (item.is_in_state) {
                return <EventComponent showHeartIcon={true} event={item} onPress={() => handleEventPress(item)} />;
              } else {
                return null;
              }
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        < LocationDisplay />
        <SavedErrorComponent />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    top_container: {
      flex: 1,
      paddingTop: 50,
      width: '90%',
    },
    header : {
      fontSize: 20,
      marginBottom: 10,
      fontFamily: themeFonts.primary,
      color: themeColors.secondary
    },
    buttonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      color: themeColors.primary,
    },
  });

const mapStateToProps = (state: any) => {
  return ({
    event_data: state.events.data,
    event_loading: state.events.loading,
    event_error: state.events.error,
    location: state.location.data,
    categories: state.categories.submittedCategories,
    picture: state.user.user.picture,
  });
}

const mapDispatchToProps = {
  fetchEvent,
  loadCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventComponentList);
