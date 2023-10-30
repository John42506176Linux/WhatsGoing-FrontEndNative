import React from 'react';
import { Image, ImageStyle} from 'react-native';

interface LogoProps {
  style: ImageStyle;
}

const Logo: React.FC<LogoProps> = ({  style }) => {
  return (
    <Image
    style={style}
    source={require('../assets/title_logo.png')}
    />
  );
};

export default Logo;