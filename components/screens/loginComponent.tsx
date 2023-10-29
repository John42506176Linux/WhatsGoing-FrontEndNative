import React, { useEffect, useState } from 'react';
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import { Amplify, Auth, Hub } from "aws-amplify";
import { View, Button, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import bgImage from '../../assets/event_mobile_app_background_contrast.png';
import googleLogo from '../../assets/googleLogo.png';
import { StackNavigationProp } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { getUser, listenAuthEvents } from '../../actions/userActions';

type RootStackParamList = {
    "Home": any;
    "Category Selection" : any;
    // add other screens here
};
type EventDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
    navigation: EventDetailsScreenNavigationProp;
    user: any;
    signedIn: boolean;
    signUp: boolean;
    getUser: () => void;
    listenAuthEvents: () => void;
}


const LoginComponent: React.FC<Props> = ({ navigation, user, signedIn, signUp, getUser, listenAuthEvents }) => {
  useEffect(() => {
    listenAuthEvents();
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser,signedIn]);
  
  useEffect(() => {
    if (user) {
      if(signUp) {
        navigation.navigate('Category Selection');
      }
      else {
        navigation.navigate('Home'); // Navigate to the Event screen when the user is logged in
      }
    }
  }, [user, signUp]);

  return (
    <ImageBackground source={bgImage} style={styles.container}>
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={styles.title}>WhatsGoingOn</Text>
      <Text style={styles.subtitle}>Never be out of the loop again.</Text>
    </View>

    <View style={{ flex: 2, justifyContent: 'flex-end', marginLeft: 40, marginRight: 40 }}>
      <TouchableOpacity style={styles.googleButton} onPress={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })}>
        <Image style={styles.googleLogo} source={googleLogo} />
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupButton}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.facebookButtonText}>Log In </Text>
    </View>
  </ImageBackground>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column', // Set the flexDirection to column
        justifyContent: 'space-between', // Distribute space between title and sign-in elements
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 45,               
        fontWeight: 'bold',        
        color: '#ffffff',          
        textAlign: 'center',       
        marginTop: 50,              
        marginBottom: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.2)',  // Further reduced shadow's opacity
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,                   // Further reduced shadow blur
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Lowered the background opacity
        paddingHorizontal: 15,      
        borderRadius: 7,            
        paddingVertical: 5,         
    },
    subtitle: {
        fontSize: 18,
        color: '#ffffff',       
        textAlign: 'center',    
        marginBottom: 0,
        marginLeft: 40,
        marginRight: 40,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',  
        paddingHorizontal: 0,  // Reduced horizontal padding
        paddingVertical: 2,    // Added a little vertical padding
        borderRadius: 7,       // Adjusted for proportionality with the reduced padding
    },            
    googleButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#131314',
      padding: 15,
      borderRadius: 25,
      marginBottom: 20,
    },
    googleLogo: {
      width: 24,
      height: 24,
      marginRight: 10,
    },
    googleButtonText: {
      color: '#8E918F',
      fontSize: 18,
      fontWeight: '500'
    },
    signupButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',  // Center align the content
        backgroundColor: '#009BFF',  // Estimated shade of blue from the image
        padding: 15,               // Adjusted padding to match the "Sign in with Google" button
        borderRadius: 25,
        marginBottom: 20,          // Kept margin for spacing
    },
    signupButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',  // Center align the text
    },
    facebookButtonText: {
        fontSize: 18,
        color: '#007BFF',               // Blue color
        textDecorationLine: 'underline', // Underline the text
        textAlign: 'center',            // Center-aligning the text
        fontWeight: 'bold',             // Making the text bold
        textShadowColor: 'rgba(0, 0, 0, 0.3)',  // Adding a subtle shadow
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
  });

const mapStateToProps = (state:any) => ({
    user: state.user.user,
    customState: state.user.customState,
    signUp: state.user.signUp, 
    signedIn: state.user.signedIn,
});

const mapDispatchToProps = {
    getUser,
    listenAuthEvents,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);