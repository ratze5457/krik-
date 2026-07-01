import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { SectionLabel } from '../../components/ui';
import { InfoIcon } from '../../components/Icons';
import { colors, fontFamily, radii, shadow } from '../../theme/theme';
import { ADMIN_FINANCE, ADMIN_FINANCE_PERIODS, FinancePeriod, eurAdmin } from '../../store/adminData';

const PERIODS: { key: FinancePeriod; label: string }[] = [
  { key: 'semaine', label: 'Semaine' },
  { key: 'mois', label: 'Mois' },
  { key: 'annee', label: 'Année' },
];

export function FinancesScreen() {
  const [period, setPeriod] = useState<FinancePeriod>('semaine');
  const data = ADMIN_FINANCE_PERIODS[period];
  const commission = Math.round(data.ca * ADMIN_FINANCE.commissionRate);
  const payouts = data.ca - commission;
  const max = Math.max(...data.bars.map((b) => b[1]));

  return (
    <Screen>
      <Text style={styles.title}>Finances</Text>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.segment}>
          {PERIODS.map((p) => {
            const active = period === p.key;
            return (
              <Pressable key={p.key} onPress={() => setPeriod(p.key)} style={[styles.segmentItem, active && styles.segmentItemActive]}>
                <Text style={[styles.segmentText, { color: active ? '#fff' : colors.inkSoft }]}>{p.label}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.hero}>
          <Text style={styles.heroLabel}>{data.label}</Text>
          <Text style={styles.heroCaLabel}>Chiffre d'affaires plateforme</Text>
          <Text style={styles.heroCa}>{eurAdmin(data.ca)}</Text>
          <View style={styles.heroSplit}>
            <View style={styles.heroSplitItem}>
              <Text style={styles.heroSplitValue}>{eurAdmin(commission)}</Text>
              <Text style={styles.heroSplitLabel}>Commissions (15 %)</Text>
            </View>
            <View style={styles.heroDivider} />
            <View style={styles.heroSplitItem}>
              <Text style={styles.heroSplitValue}>{eurAdmin(payouts)}</Text>
              <Text style={styles.heroSplitLabel}>Reversé aux dépanneurs</Text>
            </View>
          </View>

          <View style={styles.chart}>
            {data.bars.map((b, i) => (
              <View key={i} style={styles.barCol}>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { height: `${Math.max((b[1] / max) * 100, 6)}%` }]} />
                </View>
                <Text style={styles.barLabel}>{b[0]}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.statsGrid}>
          <StatTile value={eurAdmin(commission)} label="Commissions encaissées" accent />
          <StatTile value={data.interventions} label="Interventions" />
          <StatTile value={data.prosPaid} label="Dépanneurs payés" />
          <StatTile value={data.avgCommission} label="Commission / course" />
        </View>

        <View>
          <SectionLabel>Détail</SectionLabel>
          <View style={styles.card}>
            <DetailRow label="Chiffre d'affaires plateforme" value={eurAdmin(data.ca)} />
            <DetailRow label="Commissions Krik (15 %)" value={'+ ' + eurAdmin(commission)} kind="in" />
            <DetailRow label="À reverser aux dépanneurs" value={eurAdmin(payouts)} last />
          </View>
        </View>

        <View>
          <SectionLabel right={<Text style={styles.payoutDate}>{ADMIN_FINANCE.payoutDate}</Text>}>
            Versements à effectuer
          </SectionLabel>
          <View style={styles.card}>
            {ADMIN_FINANCE.pendingPayouts.map((p, i) => {
              const noRib = p.amount === 'absente';
              return (
                <View key={p.name} style={[styles.payoutRow, i === ADMIN_FINANCE.pendingPayouts.length - 1 && { borderBottomWidth: 0 }]}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.payoutName}>{p.name}</Text>
                    <Text style={styles.payoutIban}>{noRib ? 'RIB manquant' : `IBAN ${p.iban}`}</Text>
                  </View>
                  {noRib ? (
                    <View style={styles.ribMissing}>
                      <Text style={styles.ribMissingText}>RIB manquant</Text>
                    </View>
                  ) : (
                    <Text style={styles.payoutAmount}>{p.amount}</Text>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.infoBanner}>
          <InfoIcon />
          <Text style={styles.infoText}>
            Les versements partent automatiquement chaque lundi. Un dépanneur sans RIB est mis en attente.
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

function StatTile({ value, label, accent }: { value: string; label: string; accent?: boolean }) {
  return (
    <View style={styles.statTile}>
      <Text style={[styles.statValue, accent && { color: colors.tiffany }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function DetailRow({ label, value, kind, last }: { label: string; value: string; kind?: 'in'; last?: boolean }) {
  return (
    <View style={[styles.detailRow, last && { borderBottomWidth: 0 }]}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={[styles.detailValue, kind === 'in' && { color: colors.tiffanyDarker }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: fontFamily.extraBold,
    fontSize: 24,
    color: colors.ink,
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 4,
  },
  scroll: { padding: 18, paddingTop: 8, gap: 14 },
  segment: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: radii.md, padding: 4, ...shadow.soft },
  segmentItem: { flex: 1, height: 38, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  segmentItemActive: { backgroundColor: colors.ink },
  segmentText: { fontFamily: fontFamily.bold, fontSize: 14 },
  hero: { backgroundColor: colors.ink, borderRadius: radii.xxl, padding: 20, ...shadow.soft },
  heroLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    color: colors.tiffanyLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  heroCaLabel: { fontFamily: fontFamily.medium, fontSize: 13, color: '#9FB0BC', marginTop: 10 },
  heroCa: { fontFamily: fontFamily.extraBold, fontSize: 34, color: '#fff', marginTop: 2 },
  heroSplit: { flexDirection: 'row', alignItems: 'center', marginTop: 18 },
  heroSplitItem: { flex: 1 },
  heroSplitValue: { fontFamily: fontFamily.extraBold, fontSize: 18, color: '#fff' },
  heroSplitLabel: { fontFamily: fontFamily.medium, fontSize: 11, color: '#9FB0BC', marginTop: 3 },
  heroDivider: { width: 1, height: 34, backgroundColor: 'rgba(255,255,255,.15)', marginHorizontal: 14 },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 90,
    marginTop: 20,
    gap: 4,
  },
  barCol: { flex: 1, alignItems: 'center', height: '100%', justifyContent: 'flex-end' },
  barTrack: { width: '68%', flex: 1, justifyContent: 'flex-end' },
  barFill: { width: '100%', backgroundColor: colors.tiffanyLight, borderRadius: 4, minHeight: 6 },
  barLabel: { fontFamily: fontFamily.semiBold, fontSize: 9, color: '#9FB0BC', marginTop: 5 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 12 },
  statTile: { width: '48.5%', backgroundColor: '#fff', borderRadius: radii.lg, padding: 14, ...shadow.soft },
  statValue: { fontFamily: fontFamily.extraBold, fontSize: 19, color: colors.ink },
  statLabel: { fontFamily: fontFamily.semiBold, fontSize: 11, color: colors.grey, marginTop: 4 },
  card: { backgroundColor: '#fff', borderRadius: radii.xl, paddingHorizontal: 16, ...shadow.soft },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  detailLabel: { fontFamily: fontFamily.medium, fontSize: 13, color: colors.inkSoft, flex: 1 },
  detailValue: { fontFamily: fontFamily.extraBold, fontSize: 15, color: colors.ink },
  payoutDate: { fontFamily: fontFamily.bold, fontSize: 11, color: colors.tiffany },
  payoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  payoutName: { fontFamily: fontFamily.bold, fontSize: 14, color: colors.ink },
  payoutIban: { fontFamily: fontFamily.medium, fontSize: 12, color: colors.grey, marginTop: 2 },
  payoutAmount: { fontFamily: fontFamily.extraBold, fontSize: 16, color: colors.ink },
  ribMissing: { backgroundColor: colors.warningTint, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5 },
  ribMissingText: { fontFamily: fontFamily.bold, fontSize: 11, color: colors.warning },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.tiffanyTint,
    borderRadius: radii.md,
    padding: 13,
  },
  infoText: { flex: 1, fontFamily: fontFamily.semiBold, fontSize: 12, color: colors.tiffanyDarker, lineHeight: 16 },
});
