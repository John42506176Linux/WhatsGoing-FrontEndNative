import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Event } from '../models/event';
import CustomImageComponent from './imageSourceComponent';
import { formatDate } from '../utilities/utilities';
import { connect } from 'react-redux'; 
import { addSavedEvent } from '../actions/savedEventActions'; 
import Icon from 'react-native-vector-icons/Ionicons';
import { updateEventSaved } from '../actions/eventActions';

interface Props {
  event: Event;
  onPress: () => void;
  addSavedEvent: (event: Event) => Promise<void>;
  updateEventSaved: (eventId: string, isSaved: boolean) => void;
  showHeartIcon: boolean;
}

const EventComponent: React.FC<Props> = ({ event, onPress, addSavedEvent, updateEventSaved, showHeartIcon}) => {
  
  const handlePress = useCallback(() => {
    addSavedEvent(Event.fromJSON(event));
    updateEventSaved(event.id, !event.is_saved);
  }, [addSavedEvent,updateEventSaved]);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
      <View style={styles.cardContentRow}>
        <View style={styles.iconContainer}>
          <CustomImageComponent source={event.source} />
        </View>
        <View style={styles.cardContent}>
          {event.is_event_date_available &&
            <Text style={styles.eventDate}>{formatDate(event.event_date)}</Text>
          }
          <Text style={styles.eventTitle}>{event.event_title}</Text>
          <Text style={styles.eventLocation}>{event.event_location}</Text>
          <View style={styles.iconCounts}>
            <Image source={require('../assets/favorite_icon.png')} style={styles.icon} />
            <Text>{event.favorite_count}</Text>
            <Image source={require('../assets/retweet_icon.png')} style={styles.icon} />
            <Text>{event.retweet_count}</Text>
          </View>
        </View>
        { showHeartIcon && (
          <TouchableOpacity onPress={handlePress} style={styles.heartIcon}>
          {event.is_saved ? <Icon name="heart" size={30} color="#FF0000" /> : <Icon name="heart-outline" size={30} color="#FF0000" />}
        </TouchableOpacity>
        )}
        
      </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginVertical: 10,
    elevation: 3, // for Android
    shadowColor: 'black', // for iOS
    shadowOffset: { width: 0, height: 1 },
    paddingLeft: '5%',
  },
  cardContent: {
    padding: 10,
  },
  cardContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventDate: {
    fontSize: 14,
    color: 'blue',
  },
  eventLocation: {
    fontSize: 16,
    color: 'gray',
  },
  iconCounts: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1DA1F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

const mapDispatchToProps = {
  addSavedEvent,
  updateEventSaved,
};

export default connect(null,mapDispatchToProps)(EventComponent);
