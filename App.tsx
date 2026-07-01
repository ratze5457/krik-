import React, { useCallback } from 'react';
import { View } from 'react-native';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { RootStackParamList } from './src/navigation/types';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from '@expo-google-fonts/plus-jakarta-sans';
import { RootNavigator } from './src/navigation/RootNavigator';

SplashScreen.preventAutoHideAsync().catch(() => {});

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [],
  config: {
    screens: {
      Splash: '',
      Role: 'role',
      SignupClient: 'inscription-client',
      SignupPro: 'inscription-pro',
      ProPending: 'pro-attente',
      Main: 'app',
      ProMain: 'pro',
      AdminMain: {
        path: 'admin',
        screens: {
          Apercu: '',
          Dossiers: 'dossiers',
          Litiges: 'litiges',
          Finances: 'finances',
        },
      },
    },
  },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <NavigationContainer linking={linking}>
          <RootNavigator />
        </NavigationContainer>
        <StatusBar style="dark" />
      </View>
    </SafeAreaProvider>
  );
}
