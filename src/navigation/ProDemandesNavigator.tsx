import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProDemandesStackParamList } from './types';
import { ProDashScreen } from '../screens/pro/ProDashScreen';
import { ProReqScreen } from '../screens/pro/ProReqScreen';
import { ProNavScreen } from '../screens/pro/ProNavScreen';
import { ProChatScreen } from '../screens/pro/ProChatScreen';
import { ProAssistScreen } from '../screens/pro/ProAssistScreen';

const Stack = createNativeStackNavigator<ProDemandesStackParamList>();

export function ProDemandesNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="ProDash" component={ProDashScreen} />
      <Stack.Screen name="ProReq" component={ProReqScreen} />
      <Stack.Screen name="ProNav" component={ProNavScreen} />
      <Stack.Screen name="ProChat" component={ProChatScreen} />
      <Stack.Screen name="ProAssist" component={ProAssistScreen} />
    </Stack.Navigator>
  );
}
