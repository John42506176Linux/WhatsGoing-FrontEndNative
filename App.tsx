import React from 'react';
import { Provider } from 'react-redux';
import { TouchableOpacity, Text, StyleSheet} from 'react-native';
import store from './store/store';
import EventComponentList from './components/screens/eventListComponent';
import EventView from './components/screens/eventViewComponent';
import BottomTabNavigator from './components/bottomNavBarComponent';
import LoginComponent from './components/screens/loginComponent';
import CategorySelection from './components/screens/categoryComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Amplify } from 'aws-amplify';
import { urlOpener } from './utilities/utilities';
import 'core-js/full/symbol/async-iterator';
import awsconfig from './src/aws-exports';
import { DataStore } from 'aws-amplify';

import { SQLiteAdapter } from '@aws-amplify/datastore-storage-adapter/SQLiteAdapter';

DataStore.configure({
  storageAdapter: SQLiteAdapter
});

Amplify.configure({
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    urlOpener,
  },
});

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
      <Stack.Navigator initialRouteName="Login" screenOptions={{
    headerTitleAlign: 'center',
  }}>
          <Stack.Screen name="Login" component={LoginComponent} options={{ headerShown: false }}/>
          <Stack.Screen name="Home" component={BottomTabNavigator} options={{ headerShown: false }}/>
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
