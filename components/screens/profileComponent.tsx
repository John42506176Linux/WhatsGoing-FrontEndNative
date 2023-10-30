import React,{ useCallback } from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../actions/userActions';
import { ScrollView, View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import { themeFonts,themeColors } from '../../styles/themeVariables';

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
    categories: string[];
    signOut: () => void;
}

const ProfileComponent: React.FC<Props> = ({ 
    navigation, user, savedEventsNum, location, categories, signOut
}) => {

    const handleSignOut = useCallback(() => { 
        signOut();
        navigation.navigate('Login');
    }, [signOut]);
    return (
        <ScrollView >
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
                <Text style={styles.sectionTitle}>Selected Categories</Text>
                {categories.map((category, index) => (
                <Text key={index} style={styles.category}>{category}</Text>
                ))}
            </View>
            <View style={styles.settingsContainer}>
                <Text style={styles.settingLabel}>Primary city</Text>
                <Text style={styles.settingValue}>{location}</Text>
            </View>
            <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: screenWidth * 0.05,
    },
    signOutButton: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50, // Adjust as needed
        borderRadius: 25, // Make the button round
        backgroundColor: themeColors.danger, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 1, // Add an outline
        borderColor: '#000',
    },
    signOutText: {
        fontSize: screenWidth * 0.05,
        fontFamily: themeFonts.primary,
        color: 'white',
    },
    time: {
        fontSize: screenWidth * 0.05,
        fontFamily: themeFonts.primary,
        color: themeColors.secondary,
    },
    categoriesContainer: {
        marginTop: 20,
    },
    category: {
        fontSize: 16,
        marginBottom: 5,
        fontFamily: themeFonts.secondary,
        color: themeColors.secondary,
    },
    email: {
        fontSize: screenWidth * 0.04,
        fontFamily: themeFonts.secondary,
        color: themeColors.secondary,
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
        fontFamily: themeFonts.primary,
        color: themeColors.secondary,
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
        fontFamily: themeFonts.secondary,
        color: themeColors.secondary,
    },
    statLabel: {
        fontSize: screenWidth * 0.04,
        fontFamily: themeFonts.primary,
        color: themeColors.secondary,
    },
    sectionTitle: {
        fontSize: screenWidth * 0.05,
        marginBottom: screenWidth * 0.03,
        fontFamily: themeFonts.primary,
        color: themeColors.secondary,
    },
    settingsContainer: {
        padding: screenWidth * 0.03,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: screenWidth * 0.02,
        backgroundColor: '#F9F9F9',
        marginBottom: screenWidth * 0.03,
    },
    settingLabel: {
        fontSize: screenWidth * 0.04,
        fontFamily: themeFonts.primary,
        marginBottom: screenWidth * 0.01,
        color: themeColors.secondary
    },
    settingValue: {
        fontSize: screenWidth * 0.05,
        fontFamily: themeFonts.secondary,
        marginBottom: screenWidth * 0.03,
        color: themeColors.secondary,
    },
});

const mapStateToProps = (state:any) => ({
    user: state.user.user,
    savedEventsNum: state.savedEvents.savedEvents.length,
    location: state.location.data,
    categories: state.categories.submittedCategories,
});

const mapDispatchToProps = {
    signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);
