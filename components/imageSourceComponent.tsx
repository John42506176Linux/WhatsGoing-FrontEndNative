import React from 'react';
import { Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  source: string;
}

const ImageSourceComponent: React.FC<Props> = ({ source }) => {
  switch (source) {
    case 'Twitter':
      return <Ionicons name="logo-twitter" size={30} color="white" />;
    case 'meetup':
      return <Ionicons name="logo-meetup" size={30} />;
    default:
      return <Image source={require('../assets/default.png')} />;
  }
};

export default ImageSourceComponent;