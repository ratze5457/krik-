import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';
import { ProTabParamList } from './types';
import { ProDemandesNavigator } from './ProDemandesNavigator';
import { RevenusScreen } from '../screens/pro/RevenusScreen';
import { ProfilProScreen } from '../screens/pro/ProfilProScreen';
import { KrikTabBar } from '../components/KrikTabBar';

const Tab = createBottomTabNavigator<ProTabParamList>();

export function ProMainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <KrikTabBar {...props} />}
    >
      <Tab.Screen
        name="Demandes"
        component={ProDemandesNavigator}
        options={({ route }) => {
          const focused = getFocusedRouteNameFromRoute(route) ?? 'ProDash';
          return { tabBarStyle: focused === 'ProDash' ? undefined : { display: 'none' } };
        }}
      />
      <Tab.Screen name="Revenus" component={RevenusScreen} />
      <Tab.Screen name="ProfilPro" component={ProfilProScreen} />
    </Tab.Navigator>
  );
}
