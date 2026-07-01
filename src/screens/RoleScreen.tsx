import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../navigation/types';
import { Screen } from '../components/Screen';
import { KrikLogo } from '../components/KrikLogo';
import { RoundIconButton } from '../components/ui';
import { ChevronLeftIcon, ChevronRightIcon, JackIcon, WrenchTruckIcon } from '../components/Icons';
import { colors, fontFamily, gradients, radii, shadow } from '../theme/theme';
import { useAppStore } from '../store/useAppStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Role'>;

export function RoleScreen({ navigation }: Props) {
  const clientRegistered = useAppStore((s) => s.clientRegistered);
  const proStatus = useAppStore((s) => s.proStatus);
  const setRole = useAppStore((s) => s.setRole);

  const chooseClient = () => {
    setRole('client');
    if (clientRegistered) {
      navigation.navigate('Main' as never);
    } else {
      navigation.navigate('SignupClient');
    }
  };

  const choosePro = () => {
    setRole('pro');
    if (proStatus === 'active') {
      navigation.navigate('ProMain' as never);
    } else if (proStatus === 'pending') {
      navigation.navigate('ProPending');
    } else {
      navigation.navigate('SignupPro');
    }
  };

  return (
    <Screen bg={colors.bgAlt}>
      <RoundIconButton onPress={() => navigation.navigate('Splash' as never)} style={styles.back}>
        <ChevronLeftIcon />
      </RoundIconButton>
      <View style={styles.header}>
        <KrikLogo height={58} />
        <Text style={styles.wordmark}>KRIK</Text>
        <Text style={styles.subtitle}>Comment souhaitez-vous continuer ?</Text>
      </View>
      <View style={styles.body}>
        <Pressable onPress={chooseClient} style={styles.clientCard}>
          <LinearGradient
            colors={gradients.tiffany}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.cardContent}>
            <View style={styles.iconWrapLight}>
              <JackIcon size={32} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Je suis en panne</Text>
              <Text style={styles.cardSubtitleLight}>Trouver un dépanneur maintenant</Text>
            </View>
            <ChevronRightIcon color="#fff" size={22} />
          </View>
        </Pressable>
        <Pressable onPress={choosePro} style={styles.proCard}>
          <View style={styles.iconWrapDark}>
            <WrenchTruckIcon size={36} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Je suis dépanneur pro</Text>
            <Text style={styles.cardSubtitleDark}>Recevoir des demandes près de moi</Text>
          </View>
          <ChevronRightIcon color={colors.inkSoft} size={22} />
        </Pressable>
      </View>
      <Text style={styles.footer}>Paris &amp; Île-de-France · 24h/24</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  back: {
    marginTop: 8,
    marginLeft: 22,
  },
  header: {
    paddingHorizontal: 26,
    paddingTop: 20,
    alignItems: 'center',
  },
  wordmark: {
    fontFamily: fontFamily.extraBold,
    fontSize: 30,
    color: colors.tiffany,
    letterSpacing: 2,
    marginTop: 12,
  },
  subtitle: {
    fontFamily: fontFamily.medium,
    fontSize: 15,
    color: colors.inkSoft,
    marginTop: 6,
    textAlign: 'center',
  },
  body: {
    flex: 1,
    paddingHorizontal: 22,
    gap: 18,
    justifyContent: 'center',
  },
  clientCard: {
    borderRadius: 26,
    padding: 24,
    overflow: 'hidden',
    ...shadow.glow,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    zIndex: 1,
  },
  proCard: {
    borderRadius: 26,
    padding: 24,
    backgroundColor: colors.ink,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    shadowColor: '#142832',
    shadowOffset: { width: 0, height: 22 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 6,
  },
  iconWrapLight: {
    width: 64,
    height: 64,
    borderRadius: radii.xl,
    backgroundColor: 'rgba(255,255,255,.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapDark: {
    width: 64,
    height: 64,
    borderRadius: radii.xl,
    backgroundColor: 'rgba(255,255,255,.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontFamily: fontFamily.extraBold,
    fontSize: 20,
    color: '#fff',
  },
  cardSubtitleLight: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: 'rgba(255,255,255,.9)',
    marginTop: 3,
  },
  cardSubtitleDark: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: '#9FB0BC',
    marginTop: 3,
  },
  footer: {
    textAlign: 'center',
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: '#9AA6B0',
    paddingBottom: 30,
  },
});
