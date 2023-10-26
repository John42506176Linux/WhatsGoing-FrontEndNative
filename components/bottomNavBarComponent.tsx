import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EventComponentList from './screens/eventListComponent';
import SavedEventComponentList from './screens/savedEventListComponent';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: '#f8f8f8',
          borderTopWidth: 1,
          borderTopColor: '#999999',
          paddingBottom: 5,
        },
        tabBarIcon: ({ focused, color, size }) => {
        let iconName = '';
        if (route.name === 'Event List') {
            iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Saved Events') {
            iconName = focused ? 'heart' : 'heart-outline';
        }
        return <Icon name= {iconName} size={30} color="#900" />;
        },
    })}
    >
    <Tab.Screen name="Event List" component={EventComponentList} />
    <Tab.Screen name="Saved Events" component={SavedEventComponentList} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;