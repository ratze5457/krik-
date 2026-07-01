import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AdminLitigesStackParamList } from './types';
import { LitigeListScreen } from '../screens/admin/LitigeListScreen';
import { LitigeDetailScreen } from '../screens/admin/LitigeDetailScreen';

const Stack = createNativeStackNavigator<AdminLitigesStackParamList>();

export function AdminLitigesNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="LitigeList" component={LitigeListScreen} />
      <Stack.Screen name="LitigeDetail" component={LitigeDetailScreen} />
    </Stack.Navigator>
  );
}
