import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProDemandesStackParamList, ProTabParamList } from '../../navigation/types';
import { Screen } from '../../components/Screen';
import { KrikLogo } from '../../components/KrikLogo';
import { RoundIconButton, ToggleSwitch } from '../../components/ui';
import { ChevronLeftIcon, ChevronRightIcon } from '../../components/Icons';
import { colors, fontFamily, radii, shadow } from '../../theme/theme';
import { useAppStore } from '../../store/useAppStore';
import { PRO_REQUESTS } from '../../store/constants';

type Props = CompositeScreenProps<
  NativeStackScreenProps<ProDemandesStackParamList, 'ProDash'>,
  BottomTabScreenProps<ProTabParamList>
>;

export function ProDashScreen({ navigation }: Props) {
  const s = useAppStore();

  return (
    <Screen>
      <View style={styles.topRow}>
        <View style={styles.brandRow}>
          <RoundIconButton size={38} onPress={() => navigation.getParent()?.getParent()?.navigate('Role' as never)}>
            <ChevronLeftIcon />
          </RoundIconButton>
          <KrikLogo height={30} />
          <View>
            <Text style={styles.brand}>Espace Pro</Text>
            <Text style={styles.brandSub}>{s.pSociete}</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={[styles.statusCard, { backgroundColor: s.online ? colors.ink : '#fff' }]}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.statusTitle, { color: s.online ? '#fff' : colors.ink }]}>
              {s.online ? 'Vous êtes en ligne' : 'Vous êtes hors ligne'}
            </Text>
            <Text style={[styles.statusSub, { color: s.online ? '#9FB0BC' : colors.grey }]}>
              {s.online ? 'Vous recevez les demandes proches' : 'Aucune demande ne vous sera envoyée'}
            </Text>
          </View>
          <ToggleSwitch value={s.online} onValueChange={s.toggleOnline} />
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statTile}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Interventions</Text>
          </View>
          <View style={styles.statTile}>
            <Text style={styles.statValue}>184 €</Text>
            <Text style={styles.statLabel}>Aujourd'hui</Text>
          </View>
          <View style={styles.statTile}>
            <Text style={styles.statValue}>★ 4,9</Text>
            <Text style={styles.statLabel}>Note</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Demandes entrantes</Text>
        {s.online ? (
          PRO_REQUESTS.map((req, i) => (
            <Pressable
              key={req.id}
              onPress={() => {
                s.openReq(req);
                navigation.navigate('ProReq');
              }}
              style={[styles.reqCard, i === 0 && styles.reqCardAccent]}
            >
              <View style={styles.reqTop}>
                <View>
                  <Text style={styles.reqPanne}>{req.panne}</Text>
                  <Text style={styles.reqMeta}>{req.client} · {req.vehicle}</Text>
                </View>
                <Text style={styles.reqPrice}>{req.price}</Text>
              </View>
              <View style={styles.reqBottom}>
                <Text style={styles.reqDist}>📍 {req.dist} · {req.addr.split(',')[0]}</Text>
                <ChevronRightIcon color={colors.tiffany} />
              </View>
            </Pressable>
          ))
        ) : (
          <View style={styles.offlineCard}>
            <Text style={styles.offlineText}>Passez en ligne pour recevoir des demandes.</Text>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topRow: {
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 6,
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  brand: { fontFamily: fontFamily.extraBold, fontSize: 18, color: colors.tiffany, lineHeight: 20 },
  brandSub: { fontFamily: fontFamily.medium, fontSize: 10, color: colors.grey, marginTop: 2 },
  scroll: { padding: 18, paddingTop: 8, gap: 14 },
  statusCard: {
    borderRadius: radii.xxl,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    ...shadow.soft,
  },
  statusTitle: { fontFamily: fontFamily.extraBold, fontSize: 17 },
  statusSub: { fontFamily: fontFamily.medium, fontSize: 12, marginTop: 3 },
  statsRow: { flexDirection: 'row', gap: 12 },
  statTile: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: radii.lg,
    padding: 14,
    ...shadow.soft,
  },
  statValue: { fontFamily: fontFamily.extraBold, fontSize: 20, color: colors.ink },
  statLabel: { fontFamily: fontFamily.semiBold, fontSize: 11, color: colors.grey, marginTop: 4 },
  sectionLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    color: colors.grey,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginHorizontal: 4,
    marginTop: 4,
  },
  reqCard: {
    backgroundColor: '#fff',
    borderRadius: radii.xl,
    padding: 16,
    ...shadow.soft,
  },
  reqCardAccent: {
    borderWidth: 2,
    borderColor: colors.tiffany,
  },
  reqTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  reqPanne: { fontFamily: fontFamily.extraBold, fontSize: 16, color: colors.ink },
  reqMeta: { fontFamily: fontFamily.medium, fontSize: 12, color: colors.inkSoft, marginTop: 2 },
  reqPrice: { fontFamily: fontFamily.extraBold, fontSize: 18, color: colors.ink },
  reqBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  reqDist: { fontFamily: fontFamily.semiBold, fontSize: 12, color: colors.inkSoft },
  offlineCard: {
    backgroundColor: '#fff',
    borderRadius: radii.xl,
    padding: 24,
    alignItems: 'center',
    ...shadow.soft,
  },
  offlineText: { fontFamily: fontFamily.medium, fontSize: 13, color: colors.grey, textAlign: 'center' },
});
