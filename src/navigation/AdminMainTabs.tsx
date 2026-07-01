import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';
import { AdminTabParamList } from './types';
import { AdminDossiersNavigator } from './AdminDossiersNavigator';
import { AdminLitigesNavigator } from './AdminLitigesNavigator';
import { ApercuScreen } from '../screens/admin/ApercuScreen';
import { FinancesScreen } from '../screens/admin/FinancesScreen';
import { KrikTabBar } from '../components/KrikTabBar';

const Tab = createBottomTabNavigator<AdminTabParamList>();

export function AdminMainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <KrikTabBar {...props} />}
    >
      <Tab.Screen name="Apercu" component={ApercuScreen} />
      <Tab.Screen
        name="Dossiers"
        component={AdminDossiersNavigator}
        options={({ route }) => {
          const focused = getFocusedRouteNameFromRoute(route) ?? 'DossierList';
          return { tabBarStyle: focused === 'DossierList' ? undefined : { display: 'none' } };
        }}
      />
      <Tab.Screen
        name="Litiges"
        component={AdminLitigesNavigator}
        options={({ route }) => {
          const focused = getFocusedRouteNameFromRoute(route) ?? 'LitigeList';
          return { tabBarStyle: focused === 'LitigeList' ? undefined : { display: 'none' } };
        }}
      />
      <Tab.Screen name="Finances" component={FinancesScreen} />
    </Tab.Navigator>
  );
}
