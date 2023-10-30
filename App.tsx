import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet} from 'react-native';
import store from './store/store';
import EventView from './components/screens/eventViewComponent';
import BottomTabNavigator from './components/bottomNavBarComponent';
import LoginComponent from './components/screens/loginComponent';
import CategorySelection from './components/screens/categoryComponent';
import { NavigationContainer } from '@react-navigation/native';
import { SQLiteAdapter } from '@aws-amplify/datastore-storage-adapter/SQLiteAdapter';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Amplify, DataStore } from 'aws-amplify';
import { urlOpener } from './utilities/utilities';
import 'core-js/full/symbol/async-iterator';
import awsconfig from './src/aws-exports';


Amplify.Logger.LOG_LEVEL = 'ERROR';

Amplify.configure({
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    urlOpener,
  },
});


DataStore.configure({
  storageAdapter: SQLiteAdapter
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
          <Stack.Screen 
            name="Event Details"
          >
            {(props: any) => <EventView {...props} />}
          </Stack.Screen>
          <Stack.Screen
            name="Category Selection"
            component={CategorySelection}
          />
      </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 10,
  },
});

const Stack = createNativeStackNavigator();

export default App;
