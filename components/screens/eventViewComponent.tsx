
import React,{useEffect} from 'react';
import { View, ScrollView, Linking, StyleSheet} from 'react-native';
import TwitterPreview from 'react-native-twitter-preview';
import { useNavigation } from '@react-navigation/native';
import { FAB } from '@rneui/themed';
import { themeFonts,themeColors } from '../../styles/themeVariables';

interface Props {
  route : any;
}

const EventView: React.FC<Props> = ({ route }) => {
  const { event } = route.params;

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontFamily: themeFonts.primary, 
      },
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FAB
        style={styles.floatingButton}
        title="RSVP"
        upperCase
        color={themeColors.primary}
        icon={{ name: 'event', color: '#fff' }}
        onPress={() => Linking.openURL(event.event_link)}
      />
      <TwitterPreview
        style =  {{ top: 20 ,flexGrow: 1, width: '100%', }}
        url={event.url}
        />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    floatingButton: {
        top: 10,
    },
});
export default EventView;
