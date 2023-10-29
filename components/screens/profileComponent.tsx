import React,{ useCallback } from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../actions/userActions';
import { View, Text, StyleSheet, Image, Dimensions, Button } from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

const screenWidth = Dimensions.get('window').width;
const avatarSize = screenWidth * 0.25;  // Avatar will be 25% of screen width

type RootStackParamList = {
    "Login": any
};

type EventDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
    navigation: EventDetailsScreenNavigationProp;
    user: any;
    savedEventsNum: number;
    location: string | null;
    signOut: () => void;
}

const ProfileComponent: React.FC<Props> = ({ 
    navigation, user, savedEventsNum, location, signOut
}) => {

    const handleSignOut = useCallback(() => { 
        signOut();
        navigation.navigate('Login');
    }, [signOut]);
    return (
        <View style={styles.container}>
            <View style={styles.profileInfo}>
                <Image source={{ uri: user.picture }} style={{...styles.avatar, width: avatarSize, height: avatarSize}} />
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.email}>{user.email}</Text>
            </View>
            <View style={styles.statsContainer}>
                <View style={styles.stat}>
                    <Text style={styles.statNumber}>{savedEventsNum}</Text>
                    <Text style={styles.statLabel}>Saved Events</Text>
                </View>
            </View>
            <Text style={styles.sectionTitle}>Settings</Text>
            <View style={styles.settingsContainer}>
                <Text style={styles.settingLabel}>Primary city</Text>
                <Text style={styles.settingValue}>{location}</Text>
            </View>
            <Button title="Sign Out" onPress={handleSignOut} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: screenWidth * 0.05,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: screenWidth * 0.05,
    },
    time: {
        fontSize: screenWidth * 0.05,
    },
    email: {
        fontSize: screenWidth * 0.04,
    },
    profileInfo: {
        alignItems: 'center',
        marginBottom: screenWidth * 0.05,
    },
    avatar: {
        borderRadius: avatarSize / 2,
        marginBottom: screenWidth * 0.02,
    },
    name: {
        fontSize: screenWidth * 0.06,
    },
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: screenWidth * 0.05,
    },
    stat: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: screenWidth * 0.05,
    },
    statLabel: {
        fontSize: screenWidth * 0.04,
    },
    sectionTitle: {
        fontSize: screenWidth * 0.05,
        marginBottom: screenWidth * 0.03,
    },
    settingsContainer: {
        padding: screenWidth * 0.03,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: screenWidth * 0.02,
        backgroundColor: '#F9F9F9',
    },
    settingLabel: {
        fontSize: screenWidth * 0.04,
        marginBottom: screenWidth * 0.01,
        color: 'grey'
    },
    settingValue: {
        fontSize: screenWidth * 0.05,
        marginBottom: screenWidth * 0.03,
    },
});

const mapStateToProps = (state:any) => ({
    user: state.user.user,
    savedEventsNum: state.savedEvents.savedEvents.length,
    location: state.location.data,
});

const mapDispatchToProps = {
    signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);
