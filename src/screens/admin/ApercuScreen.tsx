import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { AdminTabParamList } from '../../navigation/types';
import { Screen } from '../../components/Screen';
import { KrikLogo } from '../../components/KrikLogo';
import { ChevronRightIcon } from '../../components/Icons';
import { colors, fontFamily, radii, shadow } from '../../theme/theme';
import { useAppStore } from '../../store/useAppStore';
import { ADMIN_OVERVIEW } from '../../store/adminData';

type Props = BottomTabScreenProps<AdminTabParamList, 'Apercu'>;

export function ApercuScreen({ navigation }: Props) {
  const applications = useAppStore((s) => s.applications);
  const disputes = useAppStore((s) => s.disputes);
  const pending = applications.filter((a) => a.status === 'pending').length;
  const openDisputes = disputes.filter((d) => d.status === 'open').length;

  return (
    <Screen>
      <View style={styles.header}>
        <KrikLogo height={30} />
        <View>
          <Text style={styles.title}>Espace Krik</Text>
          <Text style={styles.subtitle}>Administration de la plateforme</Text>
        </View>
        <View style={styles.adminBadge}>
          <Text style={styles.adminBadgeText}>ADMIN</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.grid}>
          <StatTile value={String(ADMIN_OVERVIEW.activePros)} label="Dépanneurs actifs" />
          <StatTile value={String(pending)} label="Dossiers en attente" accent={pending > 0} />
          <StatTile value={String(ADMIN_OVERVIEW.ongoing)} label="Interventions en cours" />
          <StatTile value={String(openDisputes)} label="Litiges ouverts" danger={openDisputes > 0} />
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteValue}>★ {ADMIN_OVERVIEW.avgNote}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.noteLabel}>Note moyenne de la plateforme</Text>
            <Text style={styles.noteSub}>Sur les 30 derniers jours</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>À traiter</Text>
        <Pressable style={styles.actionRow} onPress={() => navigation.navigate('Dossiers', { screen: 'DossierList' })}>
          <View style={[styles.actionIcon, { backgroundColor: colors.warningTint }]}>
            <Text style={styles.actionIconText}>{pending}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.actionTitle}>Dossiers dépanneurs à valider</Text>
            <Text style={styles.actionSub}>Vérifier les pièces et activer les comptes</Text>
          </View>
          <ChevronRightIcon />
        </Pressable>

        <Pressable style={styles.actionRow} onPress={() => navigation.navigate('Litiges', { screen: 'LitigeList' })}>
          <View style={[styles.actionIcon, { backgroundColor: colors.dangerTint }]}>
            <Text style={[styles.actionIconText, { color: colors.danger }]}>{openDisputes}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.actionTitle}>Litiges à arbitrer</Text>
            <Text style={styles.actionSub}>Rembourser ou réattribuer une intervention</Text>
          </View>
          <ChevronRightIcon />
        </Pressable>

        <Pressable style={styles.actionRow} onPress={() => navigation.navigate('Finances')}>
          <View style={[styles.actionIcon, { backgroundColor: colors.tiffanyTint }]}>
            <Text style={[styles.actionIconText, { color: colors.tiffany }]}>€</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.actionTitle}>Suivi financier</Text>
            <Text style={styles.actionSub}>Commissions, versements hebdo, CA</Text>
          </View>
          <ChevronRightIcon />
        </Pressable>
      </ScrollView>
    </Screen>
  );
}

function StatTile({ value, label, accent, danger }: { value: string; label: string; accent?: boolean; danger?: boolean }) {
  return (
    <View style={styles.statTile}>
      <Text style={[styles.statValue, accent && { color: colors.warning }, danger && { color: colors.danger }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 6,
  },
  title: { fontFamily: fontFamily.extraBold, fontSize: 18, color: colors.tiffany, lineHeight: 20 },
  subtitle: { fontFamily: fontFamily.medium, fontSize: 10, color: colors.grey, marginTop: 2 },
  adminBadge: { marginLeft: 'auto', backgroundColor: colors.ink, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 },
  adminBadgeText: { fontFamily: fontFamily.extraBold, fontSize: 10, color: '#fff', letterSpacing: 1 },
  scroll: { padding: 18, paddingTop: 8, gap: 14 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 12 },
  statTile: { width: '48.5%', backgroundColor: '#fff', borderRadius: radii.lg, padding: 16, ...shadow.soft },
  statValue: { fontFamily: fontFamily.extraBold, fontSize: 26, color: colors.ink },
  statLabel: { fontFamily: fontFamily.semiBold, fontSize: 11, color: colors.grey, marginTop: 4 },
  noteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.ink,
    borderRadius: radii.xxl,
    padding: 18,
    ...shadow.soft,
  },
  noteValue: { fontFamily: fontFamily.extraBold, fontSize: 26, color: colors.star },
  noteLabel: { fontFamily: fontFamily.bold, fontSize: 14, color: '#fff' },
  noteSub: { fontFamily: fontFamily.medium, fontSize: 12, color: '#9FB0BC', marginTop: 2 },
  sectionLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    color: colors.grey,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginHorizontal: 4,
    marginTop: 4,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#fff',
    borderRadius: radii.lg,
    padding: 16,
    ...shadow.soft,
  },
  actionIcon: { width: 44, height: 44, borderRadius: radii.md, alignItems: 'center', justifyContent: 'center' },
  actionIconText: { fontFamily: fontFamily.extraBold, fontSize: 18, color: colors.warning },
  actionTitle: { fontFamily: fontFamily.bold, fontSize: 15, color: colors.ink },
  actionSub: { fontFamily: fontFamily.medium, fontSize: 12, color: colors.grey, marginTop: 2 },
});
