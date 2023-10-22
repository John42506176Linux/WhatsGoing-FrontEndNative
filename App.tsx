import React from 'react';
import { Provider } from 'react-redux';
import { Linking, TouchableOpacity, Text, StyleSheet} from 'react-native';
import store from './store/store';
import EventComponentList from './components/eventListComponent';
import EventView from './components/eventViewComponent';
import LoginComponent from './components/loginComponent';
import CategorySelection from './components/categoryComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Amplify } from 'aws-amplify';
import {createEvent} from './src/graphql/mutations';
import {listEvents} from './src/graphql/queries';
import InAppBrowser from 'react-native-inappbrowser-reborn';


import awsconfig from './src/aws-exports';
async function urlOpener(url: string, redirectUrl: string): Promise<void> {
  await InAppBrowser.isAvailable();
  const authSessionResult = await InAppBrowser.openAuth(url, redirectUrl, {
    showTitle: false,
    enableUrlBarHiding: true,
    enableDefaultShare: false,
    ephemeralWebSession: false,
  });

  if (authSessionResult.type === 'success') {
    console.log("success");
    Linking.openURL(authSessionResult.url);
  }
}

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
