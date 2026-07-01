import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignalerStackParamList } from './types';
import { HomeScreen } from '../screens/HomeScreen';
import { PanneScreen } from '../screens/PanneScreen';
import { LocateScreen } from '../screens/LocateScreen';
import { SelectScreen } from '../screens/SelectScreen';
import { RecapScreen } from '../screens/RecapScreen';

const Stack = createNativeStackNavigator<SignalerStackParamList>();

export function SignalerNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Panne" component={PanneScreen} />
      <Stack.Screen name="Locate" component={LocateScreen} />
      <Stack.Screen name="Select" component={SelectScreen} />
      <Stack.Screen name="Recap" component={RecapScreen} />
    </Stack.Navigator>
  );
}
