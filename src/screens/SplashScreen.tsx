import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors, fontFamily, gradients, radii, shadow } from '../theme/theme';
import { PrimaryButton } from '../components/ui';
import { Screen } from '../components/Screen';

const logo = require('../assets/krik-logo.png');

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export function SplashScreen({ navigation }: Props) {
  return (
    <LinearGradient colors={gradients.splash} style={styles.fill}>
      <Screen bg="transparent" edges={['top', 'bottom', 'left', 'right']}>
        <View style={styles.content}>
          <View style={styles.logoCard}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
          </View>
          <Text style={styles.wordmark}>KRIK</Text>
          <Text style={styles.tagline}>Ton dépanneur en un clic</Text>
          <PrimaryButton
            title="Commencer"
            onPress={() => navigation.navigate('Role')}
            style={styles.cta}
            light
          />
          <Text style={styles.footer}>Paris &amp; Île-de-France · 24h/24</Text>
          <Pressable onPress={() => navigation.navigate('AdminMain' as never)} style={styles.adminLink} hitSlop={10}>
            <Text style={styles.adminLinkText}>Espace Krik · Admin</Text>
          </Pressable>
        </View>
      </Screen>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  logoCard: {
    backgroundColor: '#fff',
    borderRadius: 32,
    paddingHorizontal: 26,
    paddingTop: 26,
    paddingBottom: 18,
    ...shadow.card,
    shadowOpacity: 0.35,
  },
  logo: {
    width: 148,
    height: 142,
  },
  wordmark: {
    fontFamily: fontFamily.extraBold,
    fontSize: 40,
    color: '#fff',
    letterSpacing: 3,
    marginTop: 26,
  },
  tagline: {
    fontFamily: fontFamily.medium,
    fontSize: 15,
    color: 'rgba(255,255,255,.9)',
    marginTop: 4,
  },
  cta: {
    marginTop: 48,
    width: '100%',
    maxWidth: 300,
  },
  footer: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: 'rgba(255,255,255,.75)',
    marginTop: 18,
  },
  adminLink: {
    marginTop: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,.35)',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  adminLinkText: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    color: 'rgba(255,255,255,.9)',
    letterSpacing: 0.3,
  },
});
