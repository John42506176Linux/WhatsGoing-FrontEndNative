import React, { useEffect,  useState, useCallback } from 'react';
import { FlatList, View, Text, Button, ActivityIndicator,StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { fetchEvent } from '../actions/eventActions';
import { getLocation } from '../actions/locationActions';
import EventComponent from '../components/eventComponent';
import { Event } from '../models/event';
import {StackNavigationProp} from '@react-navigation/stack';

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
  location_loading: boolean;
  location_data: any;
  location_error: string | null;
  categories: string[];
  fetchEvent: (userLocation: string, event_preferences: string[]) => void;
  getLocation: () => void;
}

const EventComponentList: React.FC<Props> = ({ navigation, 
  event_loading, event_data, event_error, 
  location_data, location_loading, location_error, categories,
  fetchEvent, getLocation }) => {

  const handlePress = useCallback(() => {
    const eventId = 123; // Replace with the actual event ID
    fetchEvent(location_data, categories);
  }, [fetchEvent]);
  useEffect(() => {
    fetchEvent(location_data, categories);
    getLocation();
  }, [fetchEvent, getLocation]);

  const handleEventPress = (event: Event) => {
    navigation.navigate('Event Details', {
       event });
  };

  return (
    <View style={styles.container}>
      {event_loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : event_error ? (
        <>
          <Button title="Fetch New Tweets" onPress={handlePress} />
          <Text>Error: {event_error}</Text>
        </>
      ) : (
        <View style={styles.top_container}>
          <Text style={{ ...styles.header, textAlign: 'center' }}>Tech Events happening in San Francisco</Text>
          <View style={styles.buttonContainer}>
            <Button title="Reload Tweets" onPress={handlePress} />
          </View>
          <Text style={styles.header}>Tweets</Text>
          <Text>Location:{location_data}</Text>
          <FlatList
            data={event_data}
            renderItem={({ item }) => {
              if (item.is_in_state) {
                return <EventComponent event={item} onPress={() => handleEventPress(item)} />;
              } else {
                return null;
              }
            }}
            keyExtractor={(item, index) => index.toString()}
          />
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
    },
    header : {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    buttonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
  });

const mapStateToProps = (state: any) => {
  return ({
    event_data: state.events.data,
    event_loading: state.events.loading,
    event_error: state.events.error,
    location_data: state.location.data,
    location_loading: state.location.loading,
    location_error: state.location.error,
    categories: state.categories.selectedCategories,
  });
}

const mapDispatchToProps = {
  fetchEvent,
  getLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventComponentList);
