import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProDemandesStackParamList } from '../../navigation/types';
import { RoundIconButton } from '../../components/ui';
import { ChatIcon, ChevronLeftIcon, PhoneIcon, PinIcon, ShieldQuestionIcon } from '../../components/Icons';
import { MapBackgroundTall } from '../../components/MapAssets';
import { colors, fontFamily, radii, shadow } from '../../theme/theme';
import { useAppStore } from '../../store/useAppStore';
import { computeReqEarnings } from '../../store/selectors';
import { PRO_REQUESTS } from '../../store/constants';

type Props = NativeStackScreenProps<ProDemandesStackParamList, 'ProNav'>;

export function ProNavScreen({ navigation }: Props) {
  const req = useAppStore((s) => s.req) ?? PRO_REQUESTS[0];
  const insets = useSafeAreaInsets();
  const earn = computeReqEarnings(req.price);

  const finish = () => navigation.getParent()?.navigate('Demandes', { screen: 'ProDash' } as never);

  return (
    <View style={{ flex: 1, backgroundColor: colors.mapBg }}>
      <View style={styles.mapZone}>
        <MapBackgroundTall withRoute />
      </View>
      <View style={[styles.topBar, { top: insets.top + 8 }]}>
        <RoundIconButton onPress={() => navigation.goBack()}>
          <ChevronLeftIcon />
        </RoundIconButton>
      </View>

      <View style={[styles.pin, { left: '62.8%', top: '28.8%' }]}>
        <PinIcon size={30} />
      </View>
      <View style={[styles.destDot, { left: '21.9%', top: '73.1%' }]} />

      <View style={styles.sheet}>
        <View style={styles.grabber} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.etaRow}>
            <View>
              <Text style={styles.etaLabel}>En route vers le client</Text>
              <Text style={styles.etaValue}>{req.dist} · ~{req.panne === 'Pneu crevé' ? '9 min' : '6 min'}</Text>
            </View>
            <View style={styles.progressRing}>
              <Text style={styles.progressText}>45%</Text>
            </View>
          </View>

          <View style={styles.clientCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{req.client.charAt(0)}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.clientName}>{req.client}</Text>
              <Text style={styles.clientMeta}>{req.panne} · {req.vehicle}</Text>
            </View>
            <View style={styles.actions}>
              <RoundIconButton size={42} bg={colors.tiffanyTint}>
                <PhoneIcon />
              </RoundIconButton>
              <RoundIconButton size={42} bg={colors.tiffanyTint} onPress={() => navigation.navigate('ProChat')}>
                <ChatIcon />
              </RoundIconButton>
            </View>
          </View>

          <View style={styles.earnCard}>
            <View style={styles.earnRow}>
              <Text style={styles.earnLabel}>Prix client</Text>
              <Text style={styles.earnValue}>{earn.priceLabel}</Text>
            </View>
            <View style={styles.earnRow}>
              <Text style={styles.earnLabel}>Commission Krik (15 %)</Text>
              <Text style={styles.earnNeg}>{earn.commissionLabel}</Text>
            </View>
            <View style={styles.earnDivider} />
            <View style={styles.earnRow}>
              <Text style={styles.earnNetLabel}>Vous touchez</Text>
              <Text style={styles.earnNet}>{earn.netLabel}</Text>
            </View>
          </View>

          <View style={styles.addrBanner}>
            <PinIcon size={22} />
            <Text style={styles.addrText}>{req.addr}</Text>
          </View>

          <Pressable onPress={finish} style={styles.finishBtn}>
            <Text style={styles.finishText}>J'ai terminé</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('ProAssist')} style={styles.assistRow}>
            <ShieldQuestionIcon />
            <Text style={styles.assistText}>Un problème ? Assistance Krik</Text>
          </Pressable>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapZone: { position: 'absolute', top: 0, left: 0, right: 0, height: '55%' },
  topBar: { position: 'absolute', left: 22 },
  pin: { position: 'absolute' },
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
    maxHeight: '62%',
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
  etaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  etaLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    color: colors.tiffany,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  etaValue: { fontFamily: fontFamily.extraBold, fontSize: 22, color: colors.ink, marginTop: 2 },
  progressRing: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 5,
    borderColor: colors.tiffany,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: { fontFamily: fontFamily.extraBold, fontSize: 13, color: colors.ink },
  clientCard: {
    backgroundColor: '#fff',
    borderRadius: radii.xl,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginTop: 16,
    ...shadow.soft,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontFamily: fontFamily.extraBold, fontSize: 20 },
  clientName: { fontFamily: fontFamily.extraBold, fontSize: 15, color: colors.ink },
  clientMeta: { fontFamily: fontFamily.semiBold, fontSize: 12, color: colors.inkSoft, marginTop: 2 },
  actions: { flexDirection: 'row', gap: 8 },
  earnCard: {
    backgroundColor: '#fff',
    borderRadius: radii.xl,
    padding: 16,
    marginTop: 12,
    ...shadow.soft,
  },
  earnRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5 },
  earnLabel: { fontFamily: fontFamily.medium, fontSize: 13, color: colors.inkSoft },
  earnValue: { fontFamily: fontFamily.bold, fontSize: 14, color: colors.ink },
  earnNeg: { fontFamily: fontFamily.bold, fontSize: 14, color: colors.danger },
  earnDivider: { height: 1, backgroundColor: colors.divider, marginVertical: 6 },
  earnNetLabel: { fontFamily: fontFamily.bold, fontSize: 14, color: colors.ink },
  earnNet: { fontFamily: fontFamily.extraBold, fontSize: 20, color: colors.tiffany },
  addrBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.tiffanyTint,
    borderRadius: radii.md,
    padding: 12,
    marginTop: 12,
  },
  addrText: { flex: 1, fontFamily: fontFamily.semiBold, fontSize: 13, color: colors.tiffanyDarker },
  finishBtn: {
    marginTop: 12,
    height: 52,
    borderRadius: radii.md,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  finishText: { color: '#fff', fontFamily: fontFamily.bold, fontSize: 15 },
  assistRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  assistText: { fontFamily: fontFamily.bold, fontSize: 13, color: colors.inkSoft },
});
