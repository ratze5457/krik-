import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SuiviStackParamList } from './types';
import { TrackScreen } from '../screens/TrackScreen';
import { DoneScreen } from '../screens/DoneScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { AssistScreen } from '../screens/AssistScreen';

const Stack = createNativeStackNavigator<SuiviStackParamList>();

export function SuiviNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}>
      <Stack.Screen name="Track" component={TrackScreen} />
      <Stack.Screen name="Done" component={DoneScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Assist" component={AssistScreen} />
    </Stack.Navigator>
  );
}
