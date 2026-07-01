import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { SplashScreen } from '../screens/SplashScreen';
import { RoleScreen } from '../screens/RoleScreen';
import { SignupClientScreen } from '../screens/SignupClientScreen';
import { SignupProScreen } from '../screens/pro/SignupProScreen';
import { ProPendingScreen } from '../screens/pro/ProPendingScreen';
import { MainTabs } from './MainTabs';
import { ProMainTabs } from './ProMainTabs';
import { AdminMainTabs } from './AdminMainTabs';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Role" component={RoleScreen} />
      <Stack.Screen name="SignupClient" component={SignupClientScreen} />
      <Stack.Screen name="SignupPro" component={SignupProScreen} />
      <Stack.Screen name="ProPending" component={ProPendingScreen} />
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen name="ProMain" component={ProMainTabs} />
      <Stack.Screen name="AdminMain" component={AdminMainTabs} />
    </Stack.Navigator>
  );
}
