import React, { useEffect, useCallback } from 'react';
import { FlatList, View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { listSavedEvents } from '../../actions/savedEventActions';
import EventComponent from '../eventComponent';
import { Event } from '../../models/event';
import SavedErrorComponent from '../popUps/savedEventErrorComponent';
import LocationDisplay from '../locationComponent';
import { StackNavigationProp } from '@react-navigation/stack';
import { themeColors, themeFonts } from '../../styles/themeVariables';

type RootStackParamList = {
    "Event Details": { event: Event };
};

type EventDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Event Details'>;

interface Props {
    navigation: EventDetailsScreenNavigationProp;
    saved_event_loading: boolean;
    saved_event_data: any;
    saved_event_error: string | null;
    listSavedEvents: () => void;
}

const EventComponentList: React.FC<Props> = ({ navigation,
    saved_event_loading, saved_event_data, saved_event_error,
    listSavedEvents }) => {

    useEffect(() => {
        listSavedEvents();
    }, [listSavedEvents]);

    const handleFetch = useCallback(() => {
        listSavedEvents();
    }, [listSavedEvents]);

    const handleEventPress = (event: Event) => {
        navigation.navigate('Event Details', {
            event
        });
    };

    return (
        <View style={styles.container}>
            {saved_event_loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : saved_event_error ? (
                <>
                    <Button title="Fetch New Tweets" onPress={handleFetch} />
                    <Text>Error: {saved_event_error}</Text>
                </>
            ) : (
                <View style={styles.top_container}>
                    <FlatList
                        data={saved_event_data}
                        renderItem={({ item }) => {
                            if (item.is_in_state) {
                                return <EventComponent showHeartIcon={false} event={item} onPress={() => handleEventPress(item)} />;
                            } else {
                                return null;
                            }
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <LocationDisplay />
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
    header: {
        fontSize: 20,
        fontFamily: themeFonts.quaternary,
        marginBottom: 10,
        color :themeColors.secondary,
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
});

const mapStateToProps = (state: any) => {
    return ({
        saved_event_data: state.savedEvents.savedEvents,
        saved_event_loading: state.savedEvents.loading,
        saved_event_error: state.savedEvents.error,
    });
}

const mapDispatchToProps = {
    listSavedEvents,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventComponentList);
