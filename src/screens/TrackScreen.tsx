import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SuiviStackParamList } from '../navigation/types';
import { RoundIconButton } from '../components/ui';
import { ChatIcon, ChevronLeftIcon, PhoneIcon, PinIcon, ShieldQuestionIcon } from '../components/Icons';
import { MapBackgroundTall } from '../components/MapAssets';
import { colors, fontFamily, radii, shadow } from '../theme/theme';
import { useAppStore } from '../store/useAppStore';
import { computePricing } from '../store/selectors';
import { DEP_PHONE } from '../store/constants';

type Props = NativeStackScreenProps<SuiviStackParamList, 'Track'>;

export function TrackScreen({ navigation }: Props) {
  const s = useAppStore();
  const insets = useSafeAreaInsets();
  const pricing = computePricing(s.dep, s.tow);
  const dep = pricing.dep;

  const onBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      (navigation.getParent() as any)?.navigate('Signaler', { screen: 'Home' });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.mapBg }}>
      <View style={styles.mapZone}>
        <MapBackgroundTall withRoute />
      </View>
      <View style={[styles.topBar, { top: insets.top + 8 }]}>
        <RoundIconButton onPress={onBack}>
          <ChevronLeftIcon />
        </RoundIconButton>
      </View>

      <View style={[styles.truckPin, { left: '62.8%', top: '28.8%' }]}>
        <PinIcon size={30} />
      </View>
      <View style={[styles.destDot, { left: '21.9%', top: '73.1%' }]} />

      <View style={styles.sheet}>
        <View style={styles.grabber} />
        <View style={styles.etaRow}>
          <View>
            <Text style={styles.etaLabel}>En route vers vous</Text>
            <Text style={styles.etaValue}>Arrivée dans {dep.eta}</Text>
          </View>
          <View style={styles.progressRing}>
            <Text style={styles.progressText}>62%</Text>
          </View>
        </View>

        <View style={styles.stepsRow}>
          <View style={styles.stepDotActive} />
          <View style={styles.stepLineActive} />
          <View style={styles.stepDotActive} />
          <View style={styles.stepLineHalf} />
          <View style={styles.stepDotInactive} />
        </View>
        <View style={styles.stepsLabels}>
          <Text style={styles.stepLabelActive}>Confirmé</Text>
          <Text style={styles.stepLabelActive}>En route</Text>
          <Text style={styles.stepLabelInactive}>Arrivée</Text>
        </View>

        <View style={styles.depCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>M</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.depName}>Marc · {dep.name}</Text>
            <Text style={styles.depMeta}>★ {dep.rating} · {dep.sub} · GH-742-KR</Text>
          </View>
          <View style={styles.depActions}>
            <RoundIconButton size={42} bg={colors.tiffanyTint}>
              <PhoneIcon />
            </RoundIconButton>
            <RoundIconButton size={42} bg={colors.tiffanyTint} onPress={() => navigation.navigate('Chat')}>
              <ChatIcon />
            </RoundIconButton>
          </View>
        </View>

        <View style={styles.phoneBanner}>
          <View style={styles.phoneIconWrap}>
            <PhoneIcon />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.phoneLabel}>Numéro du dépanneur</Text>
            <Text style={styles.phoneValue}>{DEP_PHONE}</Text>
          </View>
          <View style={styles.callBtn}>
            <Text style={styles.callBtnText}>Appeler</Text>
          </View>
        </View>

        <Pressable onPress={() => navigation.navigate('Done')} style={styles.arrivedBtn}>
          <Text style={styles.arrivedText}>Le dépanneur est arrivé</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Assist')} style={styles.assistRow}>
          <ShieldQuestionIcon />
          <Text style={styles.assistText}>Un problème ? Assistance Krik</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapZone: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '62%',
  },
  topBar: {
    position: 'absolute',
    left: 22,
  },
  truckPin: {
    position: 'absolute',
  },
  destDot: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.ink,
    borderWidth: 3,
    borderColor: '#fff',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.bg,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 22,
    paddingBottom: 26,
    ...shadow.card,
  },
  grabber: {
    width: 44,
    height: 5,
    borderRadius: 5,
    backgroundColor: colors.greySoft,
    alignSelf: 'center',
    marginBottom: 16,
  },
  etaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  etaLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    color: colors.tiffany,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  etaValue: {
    fontFamily: fontFamily.extraBold,
    fontSize: 24,
    color: colors.ink,
    marginTop: 2,
  },
  progressRing: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 5,
    borderColor: colors.tiffany,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
  },
  progressText: {
    fontFamily: fontFamily.extraBold,
    fontSize: 13,
    color: colors.ink,
  },
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 6,
  },
  stepDotActive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.tiffany,
  },
  stepDotInactive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: colors.greySoft,
  },
  stepLineActive: {
    flex: 1,
    height: 3,
    backgroundColor: colors.tiffany,
  },
  stepLineHalf: {
    flex: 1,
    height: 3,
    backgroundColor: colors.greySoft,
  },
  stepsLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  stepLabelActive: {
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
    color: colors.ink,
  },
  stepLabelInactive: {
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
    color: colors.inkSoft,
  },
  depCard: {
    backgroundColor: '#fff',
    borderRadius: radii.xl,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    ...shadow.soft,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.tiffany,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontFamily: fontFamily.extraBold,
    fontSize: 20,
  },
  depName: {
    fontFamily: fontFamily.extraBold,
    fontSize: 15,
    color: colors.ink,
  },
  depMeta: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    color: colors.inkSoft,
    marginTop: 2,
  },
  depActions: {
    flexDirection: 'row',
    gap: 8,
  },
  phoneBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.tiffanyTint,
    borderRadius: radii.md,
    padding: 11,
    marginTop: 12,
  },
  phoneIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.tiffanyDarker,
  },
  phoneValue: {
    fontFamily: fontFamily.extraBold,
    fontSize: 15,
    color: colors.ink,
  },
  callBtn: {
    backgroundColor: colors.tiffany,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  callBtnText: {
    color: '#fff',
    fontFamily: fontFamily.bold,
    fontSize: 13,
  },
  arrivedBtn: {
    marginTop: 12,
    height: 52,
    borderRadius: radii.md,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrivedText: {
    color: '#fff',
    fontFamily: fontFamily.bold,
    fontSize: 15,
  },
  assistRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  assistText: {
    fontFamily: fontFamily.bold,
    fontSize: 13,
    color: colors.inkSoft,
  },
});
