import React, { useEffect,  useState, useCallback } from 'react';
import { FlatList, View, Text, Button, ActivityIndicator,StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { fetchEvent,updateEventSaved } from '../../actions/eventActions';
import EventComponent from '../eventComponent';
import { Event } from '../../models/event';
import SavedErrorComponent from '../popUps/savedEventErrorComponent';
import LocationDisplay from '../locationComponent';
import {StackNavigationProp} from '@react-navigation/stack';
import { getLocation } from '../../actions/locationActions';
import { loadCategories } from '../../actions/categoriesActions';

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
  fetchEvent: (userLocation: string, event_preferences: string[]) => void;
  loadCategories: () => void;
}

const EventComponentList: React.FC<Props> = ({ navigation, 
  event_loading, event_data, event_error,
  location,  categories,
  fetchEvent, loadCategories}) => {

  useEffect(() => {
    getLocation();
    loadCategories();
    fetchEvent(location, categories);
  }, [fetchEvent]);

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
        <ActivityIndicator size="large" color="#0000ff" />
      ) : event_error ? (
        <>
          <Button title="Fetch New Tweets" onPress={handleFetch} />
          <Text>Error: {event_error}</Text>
        </>
      ) : (
        <View style={styles.top_container}>
          <Text style={{ ...styles.header, textAlign: 'center' }}>{categories[0]} Events happening in {location}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Reload Tweets" onPress={handleFetch} />
          </View>
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
    location: state.location.data,
    categories: state.categories.submittedCategories,
  });
}

const mapDispatchToProps = {
  fetchEvent,
  loadCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventComponentList);
