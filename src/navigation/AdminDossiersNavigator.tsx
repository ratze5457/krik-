import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AdminDossiersStackParamList } from './types';
import { DossierListScreen } from '../screens/admin/DossierListScreen';
import { DossierDetailScreen } from '../screens/admin/DossierDetailScreen';

const Stack = createNativeStackNavigator<AdminDossiersStackParamList>();

export function AdminDossiersNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="DossierList" component={DossierListScreen} />
      <Stack.Screen name="DossierDetail" component={DossierDetailScreen} />
    </Stack.Navigator>
  );
}
