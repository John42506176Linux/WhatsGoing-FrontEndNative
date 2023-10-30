import React,{ useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EventComponentList from './screens/eventListComponent';
import SavedEventComponentList from './screens/savedEventListComponent';
import ProfileComponent from './screens/profileComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import { themeColors,themeFonts } from '../styles/themeVariables';
import { listSavedEvents } from '../actions/savedEventActions';
import { connect } from 'react-redux';

const Tab = createBottomTabNavigator();

interface Props {
    listSavedEvents: () => void;
}

const BottomTabNavigator: React.FC<Props> = ({listSavedEvents}) => { 
   useEffect(() => {
        listSavedEvents();
   }, [listSavedEvents]);
   
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
        tabBarActiveTintColor: themeColors.primary,
        tabBarInactiveTintColor: themeColors.secondary,
        tabBarStyle: {
            backgroundColor: '#f8f8f8',
            borderTopWidth: 1,
            borderTopColor: '#999999',
            paddingBottom: 5,
            height: 80,
          },
        tabBarLabelStyle: {
            fontSize: 12, 
            fontFamily: themeFonts.secondary, 
            marginTop: 5,
            marginBottom: 5
        },
        tabBarIcon: ({ focused, color, size }) => {
        let iconName = '';
        color = focused ? themeColors.primary : themeColors.secondary;
        if (route.name === 'Event List') {
            iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Saved Events') {
            iconName = focused ? 'heart' : 'heart-outline';
        }
        else {
            iconName = focused ? 'person' : 'person-outline';
        }
        return <Icon name= {iconName} size={30} color={color} />;
        },
    })}
    >
    <Tab.Screen name="Event List" component={EventComponentList} />
    <Tab.Screen name="Saved Events" component={SavedEventComponentList} />
    <Tab.Screen name="Profile" component={ProfileComponent} />
    </Tab.Navigator>
  );
};

const mapDispatchToProps = {
    listSavedEvents,
};

export default connect(null,mapDispatchToProps)(BottomTabNavigator);