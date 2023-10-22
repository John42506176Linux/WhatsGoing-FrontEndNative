import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Event } from '../models/event';
import CustomImageComponent from './imageSourceComponent';
import { formatDate } from '../utilities/utilities';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux'; // Import connect from react-redux
import { addSavedEvent } from '../actions/savedEventActions'; // Import our addSavedEvent action

interface Props {
  event: Event;
  onPress: () => void;
  addSavedEvent: (event: Event) => void; // Add this line
}

const EventComponent: React.FC<Props> = ({ event, onPress, addSavedEvent }) => {
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
});

const mapDispatchToProps = {
  addSavedEvent, // Add this line
};

export default connect(null,mapDispatchToProps)(EventComponent);
