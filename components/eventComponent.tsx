import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Event } from '../models/event';
import CustomImageComponent from './imageSourceComponent';
import { formatDate } from '../utilities/utilities';
import { connect } from 'react-redux'; 
import { addSavedEvent } from '../actions/savedEventActions'; 
import Icon from 'react-native-vector-icons/Ionicons';
import { updateEventSaved } from '../actions/eventActions';
import AntIcon from "react-native-vector-icons/AntDesign";
import { themeColors,themeFonts } from '../styles/themeVariables';

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
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <View style={styles.card}>
        <View style={styles.cardContentRow}>
          <View style={styles.iconContainer}>
            <CustomImageComponent source={event.source} />
          </View>
          <View style={styles.cardContent}>
            <View style={styles.cardTextContainer}>
              {event.is_event_date_available &&
                <Text style={styles.eventDate}>{formatDate(event.event_date)}</Text>
              }
              <Text style={styles.eventTitle}>{event.event_title}</Text>
              <Text style={styles.eventLocation}>{event.event_location}</Text>
            </View>
            <View style={styles.iconCounts}>
              <AntIcon name="heart" size={15} color={themeColors.primary} style={styles.icon} />
              <Text style={styles.countText}>{event.favorite_count}</Text>
              <AntIcon name="retweet" size={15} color={themeColors.secondary} style={styles.icon} />
              <Text style={styles.countText}>{event.retweet_count}</Text>
            </View>
          </View>
          {showHeartIcon && (
            <TouchableOpacity onPress={handlePress} style={styles.heartIcon}>
              {event.is_saved ? <Icon name="heart" size={30} color={themeColors.primary} /> : <Icon name="heart-outline" size={30} color={themeColors.primary} />}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};



const styles = StyleSheet.create({
  cardContent: {
    padding: 10,
    width: '80%',
  },
  eventLocation: {
    fontSize: 16,
    color: themeColors.secondary,
    fontFamily: themeFonts.secondary,
    marginBottom: 5,
  },
  iconCounts: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  cardTextContainer: {
    width: '90%',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: themeColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  favoriteCount: {
    margin: 5, // Add a margin
  },
  card: {
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 15,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    padding: 15,
  },
  cardContentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align to the top, looks more organized
  },
  eventTitle: {
    fontSize: 20,
    fontFamily: themeFonts.primary,
    color: themeColors.secondary,
    marginBottom: 5,
    marginHorizontal: 5,
    width: '70%',
  },
  eventDate: {
    fontSize: 14,
    color: themeColors.primary,
    fontFamily: themeFonts.secondary,
    marginBottom: 5, 
  },
  countText: {
    marginHorizontal: 5,
    fontFamily: themeFonts.secondary,
  },
});

const mapDispatchToProps = {
  addSavedEvent,
  updateEventSaved,
};

export default connect(null,mapDispatchToProps)(EventComponent);
