import React from 'react';
import { Provider } from 'react-redux';
import { TouchableOpacity, Text, StyleSheet} from 'react-native';
import store from './store/store';
import EventComponentList from './components/eventListComponent';
import EventView from './components/eventViewComponent';
import CategorySelection from './components/categoryComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Amplify } from 'aws-amplify';
import {createEvent} from './src/graphql/mutations';
import {listEvents} from './src/graphql/queries';

import awsExports from './src/aws-exports';
Amplify.configure(awsExports);


const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
    headerTitleAlign: 'center',
  }}>
          <Stack.Screen name="Home" component={EventComponentList} />
          <Stack.Screen name="Event Details">
            {(props) => <EventView {...props}/>}
          </Stack.Screen>
          <Stack.Screen
            name="Category Selection"
            component={CategorySelection}
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Home'); // Replace 'Home' with the name of your home screen
                  }}
                >
                  <Text style={styles.headerText}>Next</Text>
                </TouchableOpacity>
              ),
              headerBackVisible: true,
              headerTitleStyle: styles.headerText,
            })}
          />
      </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 18,
    fontWeight: '300',
    fontFamily: 'sans-serif',
  },
});


const Stack = createNativeStackNavigator();

export default App;
