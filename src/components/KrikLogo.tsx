import React from 'react';
import { Image, ImageStyle } from 'react-native';

const logo = require('../assets/krik-logo.png');

export function KrikLogo({ height = 34, style }: { height?: number; style?: ImageStyle }) {
  return <Image source={logo} style={[{ height, width: height * (210 / 202), resizeMode: 'contain' }, style]} />;
}
