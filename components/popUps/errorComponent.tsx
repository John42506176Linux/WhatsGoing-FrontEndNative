import React, { useEffect, useState } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

interface ErrorPopupProps {
    message?: string | null;
    actionTime?: number | null;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({ message, actionTime }) => {
  const [popupOpacity] = useState(new Animated.Value(0));

  useEffect(() => {
    if (message) {
      // Show popup
      Animated.timing(popupOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Hide popup after 2 seconds
        setTimeout(() => {
          Animated.timing(popupOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }, 2000);
      });
    }
  }, [message, actionTime]);

  return (
    <Animated.View style={[styles.container, { opacity: popupOpacity }]}>
      <Text style={styles.errorText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    padding: 15,
    backgroundColor: 'red',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ErrorPopup;