import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignalerStackParamList } from '../navigation/types';
import { Screen } from '../components/Screen';
import { KrikLogo } from '../components/KrikLogo';
import { RoundIconButton } from '../components/ui';
import { ChevronLeftIcon, JackIcon, PinIcon, ProfileIcon } from '../components/Icons';
import { MapBackgroundSmall, PulsingUserDot } from '../components/MapAssets';
import { colors, fontFamily, radii, shadow } from '../theme/theme';
import { useAppStore } from '../store/useAppStore';

type Props = NativeStackScreenProps<SignalerStackParamList, 'Home'>;

const PINS: { left: `${number}%`; top: `${number}%` }[] = [
  { left: '17.8%', top: '23.3%' },
  { left: '69.4%', top: '45.8%' },
  { left: '79.4%', top: '26.7%' },
];

export function HomeScreen({ navigation }: Props) {
  const zoom = useAppStore((s) => s.zoom);
  const cycleZoom = useAppStore((s) => s.cycleZoom);
  const zoomIn = useAppStore((s) => s.zoomIn);
  const zoomOut = useAppStore((s) => s.zoomOut);

  const radius = (3 / zoom).toFixed(1).replace('.', ',');

  const pulse = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1200, easing: Easing.out(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 1200, easing: Easing.in(Easing.ease), useNativeDriver: true }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [pulse]);
  const glowScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.06] });
  const glowOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.55, 0] });

  return (
    <Screen>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <RoundIconButton onPress={() => navigation.navigate('Role' as never)}>
            <ChevronLeftIcon />
          </RoundIconButton>
          <KrikLogo height={34} />
          <View>
            <Text style={styles.brand}>KRIK</Text>
            <Text style={styles.brandSub}>Île-de-France</Text>
          </View>
        </View>
        <RoundIconButton onPress={() => navigation.navigate('Profil' as never)}>
          <ProfileIcon />
        </RoundIconButton>
      </View>

      <View style={styles.titleWrap}>
        <Text style={styles.title}>Une panne ?</Text>
        <Text style={styles.subtitle}>On envoie un dépanneur en quelques minutes.</Text>
      </View>

      <Pressable onPress={cycleZoom} style={styles.mapCard}>
        <View
          style={[
            StyleSheet.absoluteFill,
            { transform: [{ scale: zoom }] },
          ]}
        >
          <MapBackgroundSmall />
          {PINS.map((p, i) => (
            <View key={i} style={[styles.pin, { left: p.left, top: p.top }]}>
              <PinIcon size={26} />
            </View>
          ))}
          <View style={styles.radiusCircle} />
          <View style={styles.userDotWrap}>
            <PulsingUserDot />
          </View>
        </View>

        <View style={styles.mapBadge}>
          <View style={styles.dot} />
          <Text style={styles.mapBadgeText}>8 dépanneurs disponibles</Text>
        </View>
        <View style={styles.radiusBadge}>
          <Text style={styles.radiusBadgeText}>Rayon {radius} km</Text>
        </View>
        <View style={styles.zoomControls}>
          <Pressable onPress={zoomIn} style={styles.zoomBtn}>
            <Text style={styles.zoomBtnText}>+</Text>
          </Pressable>
          <View style={styles.zoomDivider} />
          <Pressable onPress={zoomOut} style={styles.zoomBtn}>
            <Text style={[styles.zoomBtnText, { fontSize: 26 }]}>−</Text>
          </Pressable>
        </View>
      </Pressable>

      <View style={styles.ctaWrap}>
        <Animated.View
          pointerEvents="none"
          style={[styles.ctaGlow, { transform: [{ scale: glowScale }], opacity: glowOpacity }]}
        />
        <Pressable onPress={() => navigation.navigate('Panne')} style={[styles.cta, { zIndex: 1 }]}>
          <JackIcon size={22} />
          <Text style={styles.ctaText}>J'ai une panne !</Text>
        </Pressable>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Dépanneurs à proximité</Text>
          <View style={styles.statValueRow}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statUnit}>&lt; 3 km</Text>
          </View>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Temps moyen d'arrivée</Text>
          <View style={styles.statValueRow}>
            <Text style={styles.statValue}>21</Text>
            <Text style={styles.statUnitInk}>min</Text>
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  brand: {
    fontFamily: fontFamily.extraBold,
    fontSize: 19,
    color: colors.tiffany,
    letterSpacing: 1,
  },
  brandSub: {
    fontFamily: fontFamily.medium,
    fontSize: 10,
    color: colors.grey,
    marginTop: 2,
  },
  titleWrap: {
    paddingHorizontal: 22,
    paddingTop: 4,
  },
  title: {
    fontFamily: fontFamily.extraBold,
    fontSize: 24,
    color: colors.ink,
  },
  subtitle: {
    fontFamily: fontFamily.medium,
    fontSize: 15,
    color: colors.inkSoft,
  },
  mapCard: {
    marginHorizontal: 18,
    marginTop: 12,
    borderRadius: 26,
    overflow: 'hidden',
    height: 236,
    ...shadow.card,
  },
  pin: {
    position: 'absolute',
    marginLeft: -13,
    marginTop: -18,
  },
  radiusCircle: {
    position: 'absolute',
    left: '30%',
    top: '20%',
    width: '41.7%',
    height: '62.5%',
    borderRadius: 999,
    borderWidth: 2,
    borderColor: 'rgba(18,167,173,.7)',
    borderStyle: 'dashed',
    backgroundColor: 'rgba(31,190,196,.12)',
  },
  userDotWrap: {
    position: 'absolute',
    left: '50.8%',
    top: '51.2%',
    marginLeft: -11,
    marginTop: -11,
  },
  mapBadge: {
    position: 'absolute',
    left: 14,
    top: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: 'rgba(255,255,255,.92)',
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 30,
    ...shadow.soft,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
  mapBadgeText: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    color: colors.ink,
  },
  radiusBadge: {
    position: 'absolute',
    left: 14,
    bottom: 14,
    backgroundColor: 'rgba(255,255,255,.92)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    ...shadow.soft,
  },
  radiusBadgeText: {
    fontFamily: fontFamily.bold,
    fontSize: 11,
    color: colors.tiffanyDarker,
  },
  zoomControls: {
    position: 'absolute',
    right: 14,
    top: '50%',
    marginTop: -39,
    borderRadius: 14,
    overflow: 'hidden',
    ...shadow.soft,
  },
  zoomBtn: {
    width: 38,
    height: 38,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomBtnText: {
    fontSize: 22,
    fontFamily: fontFamily.bold,
    color: colors.ink,
  },
  zoomDivider: {
    height: 1,
    backgroundColor: colors.border,
  },
  ctaWrap: {
    paddingHorizontal: 18,
    paddingTop: 16,
  },
  ctaGlow: {
    position: 'absolute',
    left: 18,
    right: 18,
    top: 16,
    bottom: 0,
    borderRadius: radii.xl,
    backgroundColor: colors.tiffany,
  },
  cta: {
    height: 62,
    borderRadius: radii.xl,
    backgroundColor: colors.tiffany,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    ...shadow.glow,
  },
  ctaText: {
    fontFamily: fontFamily.extraBold,
    fontSize: 18,
    color: '#fff',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 18,
    paddingTop: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: 14,
    ...shadow.soft,
  },
  statLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.grey,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 5,
    marginTop: 6,
  },
  statValue: {
    fontFamily: fontFamily.extraBold,
    fontSize: 26,
    color: colors.ink,
  },
  statUnit: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    color: colors.tiffany,
  },
  statUnitInk: {
    fontFamily: fontFamily.bold,
    fontSize: 13,
    color: colors.ink,
  },
});
