import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';
import { MainTabParamList } from './types';
import { SignalerNavigator } from './SignalerNavigator';
import { SuiviNavigator } from './SuiviNavigator';
import { HistoriqueScreen } from '../screens/HistoriqueScreen';
import { ProfilScreen } from '../screens/ProfilScreen';
import { KrikTabBar } from '../components/KrikTabBar';

const Tab = createBottomTabNavigator<MainTabParamList>();

const SIGNALER_VISIBLE_ROUTES = ['Home', 'Select'];

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <KrikTabBar {...props} />}
    >
      <Tab.Screen
        name="Signaler"
        component={SignalerNavigator}
        options={({ route }) => {
          const focused = getFocusedRouteNameFromRoute(route) ?? 'Home';
          return { tabBarStyle: SIGNALER_VISIBLE_ROUTES.includes(focused) ? undefined : { display: 'none' } };
        }}
      />
      <Tab.Screen name="Historique" component={HistoriqueScreen} />
      <Tab.Screen name="Suivi" component={SuiviNavigator} options={{ tabBarStyle: { display: 'none' } }} />
      <Tab.Screen name="Profil" component={ProfilScreen} />
    </Tab.Navigator>
  );
}
