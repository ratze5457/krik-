import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { Card, Field, PrimaryButton, SectionLabel } from '../../components/ui';
import { CheckIcon, InfoIcon } from '../../components/Icons';
import { colors, fontFamily, radii, shadow } from '../../theme/theme';
import { useAppStore } from '../../store/useAppStore';
import { computeEarnings } from '../../store/selectors';
import { EarnPeriod } from '../../store/types';

const PERIODS: { key: EarnPeriod; label: string }[] = [
  { key: 'jour', label: 'Jour' },
  { key: 'semaine', label: 'Semaine' },
  { key: 'mois', label: 'Mois' },
];

export function RevenusScreen() {
  const s = useAppStore();
  const e = computeEarnings(s.earnPeriod);
  const ibanMasked = s.ribIban ? '•••• •••• •••• ' + s.ribIban.replace(/\s/g, '').slice(-4) : '';

  return (
    <Screen>
      <Text style={styles.title}>Revenus</Text>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.segment}>
          {PERIODS.map((p) => {
            const active = s.earnPeriod === p.key;
            return (
              <Pressable
                key={p.key}
                onPress={() => s.setEarnPeriod(p.key)}
                style={[styles.segmentItem, active && styles.segmentItemActive]}
              >
                <Text style={[styles.segmentText, { color: active ? '#fff' : colors.inkSoft }]}>{p.label}</Text>
              </Pressable>
            );
          })}
        </View>

        <Card>
          <Text style={styles.heroLabel}>{e.label}</Text>
          <View style={styles.heroRow}>
            <Text style={styles.heroCaLabel}>Chiffre d'affaires</Text>
            <Text style={styles.heroCa}>{e.caLabel}</Text>
          </View>
          <View style={styles.heroRow}>
            <Text style={styles.heroSubLabel}>Commission Krik (15 %)</Text>
            <Text style={styles.heroNeg}>{e.commissionLabel}</Text>
          </View>
          <View style={styles.heroDivider} />
          <View style={styles.heroRow}>
            <Text style={styles.heroNetLabel}>Net versé</Text>
            <Text style={styles.heroNet}>{e.netLabel}</Text>
          </View>

          <View style={styles.chart}>
            {e.barsPct.map((b) => (
              <View key={b.name} style={styles.barCol}>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { height: `${Math.max(b.pct, 6)}%` }]} />
                </View>
                <Text style={styles.barLabel}>{b.name}</Text>
              </View>
            ))}
          </View>
        </Card>

        <View style={styles.payoutCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.payoutLabel}>Prochain versement</Text>
            <Text style={styles.payoutValue}>{e.netLabel}</Text>
            <Text style={styles.payoutSub}>Lundi 6 juil. · virement hebdo</Text>
          </View>
          <View style={styles.payoutBadge}>
            <Text style={styles.payoutBadgeText}>Auto</Text>
          </View>
        </View>
        <View style={styles.infoBanner}>
          <InfoIcon />
          <Text style={styles.infoText}>Versé automatiquement chaque lundi sur votre RIB.</Text>
        </View>

        <View>
          <SectionLabel>Compte de versement (RIB)</SectionLabel>
          <Card style={{ gap: 12 }}>
            {!s.editRib ? (
              <>
                <View style={styles.ribRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.ribName}>{s.ribTitulaire}</Text>
                    <Text style={styles.ribIban}>{ibanMasked}</Text>
                  </View>
                  <View style={styles.verified}>
                    <CheckIcon size={14} />
                    <Text style={styles.verifiedText}>Vérifié</Text>
                  </View>
                </View>
                <Pressable onPress={s.toggleEditRib} style={styles.ribEditBtn}>
                  <Text style={styles.ribEditText}>Modifier le RIB</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Field label="Titulaire" value={s.ribTitulaire} onChangeText={(t) => s.setField('ribTitulaire', t)} />
                <Field label="IBAN" value={s.ribIban} onChangeText={(t) => s.setField('ribIban', t)} autoCapitalize="characters" />
                <PrimaryButton title="Enregistrer le RIB" icon={false} onPress={s.saveRib} />
              </>
            )}
          </Card>
        </View>

        <View style={styles.statsGrid}>
          <StatTile value={e.inter} label="Interventions" />
          <StatTile value={e.avg} label="Ticket moyen" />
          <StatTile value={e.hours} label="Temps en ligne" />
          <StatTile value={`★ ${e.note}`} label="Note moyenne" />
        </View>

        <View>
          <SectionLabel>Dernières interventions</SectionLabel>
          <View style={styles.histCard}>
            <HistRow title="Batterie à plat" meta="Aujourd'hui · 14:20" price="39 €" />
            <HistRow title="Pneu crevé" meta="Aujourd'hui · 11:05" price="52 €" />
            <HistRow title="Panne d'essence" meta="Hier · 18:40" price="45 €" last />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.statTile}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function HistRow({ title, meta, price, last }: { title: string; meta: string; price: string; last?: boolean }) {
  return (
    <View style={[styles.histRow, last && { borderBottomWidth: 0 }]}>
      <View style={{ flex: 1 }}>
        <Text style={styles.histTitle}>{title}</Text>
        <Text style={styles.histMeta}>{meta}</Text>
      </View>
      <Text style={styles.histPrice}>{price}</Text>
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
  segment: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: radii.md,
    padding: 4,
    ...shadow.soft,
  },
  segmentItem: { flex: 1, height: 38, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  segmentItemActive: { backgroundColor: colors.ink },
  segmentText: { fontFamily: fontFamily.bold, fontSize: 14 },
  heroLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    color: colors.tiffany,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  heroRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 },
  heroCaLabel: { fontFamily: fontFamily.semiBold, fontSize: 14, color: colors.inkSoft },
  heroCa: { fontFamily: fontFamily.extraBold, fontSize: 22, color: colors.ink },
  heroSubLabel: { fontFamily: fontFamily.medium, fontSize: 13, color: colors.inkSoft },
  heroNeg: { fontFamily: fontFamily.bold, fontSize: 14, color: colors.danger },
  heroDivider: { height: 1, backgroundColor: colors.divider, marginVertical: 6 },
  heroNetLabel: { fontFamily: fontFamily.bold, fontSize: 14, color: colors.ink },
  heroNet: { fontFamily: fontFamily.extraBold, fontSize: 20, color: colors.tiffany },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 110,
    marginTop: 18,
    gap: 6,
  },
  barCol: { flex: 1, alignItems: 'center', height: '100%', justifyContent: 'flex-end' },
  barTrack: { width: '70%', flex: 1, justifyContent: 'flex-end' },
  barFill: { width: '100%', backgroundColor: colors.tiffany, borderRadius: 5, minHeight: 6 },
  barLabel: { fontFamily: fontFamily.semiBold, fontSize: 10, color: colors.grey, marginTop: 6 },
  payoutCard: {
    backgroundColor: colors.ink,
    borderRadius: radii.xxl,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadow.soft,
  },
  payoutLabel: { fontFamily: fontFamily.semiBold, fontSize: 12, color: '#9FB0BC' },
  payoutValue: { fontFamily: fontFamily.extraBold, fontSize: 26, color: '#fff', marginTop: 2 },
  payoutSub: { fontFamily: fontFamily.medium, fontSize: 12, color: '#9FB0BC', marginTop: 4 },
  payoutBadge: { backgroundColor: colors.tiffany, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  payoutBadgeText: { fontFamily: fontFamily.bold, fontSize: 12, color: '#fff' },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.tiffanyTint,
    borderRadius: radii.md,
    padding: 12,
  },
  infoText: { flex: 1, fontFamily: fontFamily.semiBold, fontSize: 12, color: colors.tiffanyDarker },
  ribRow: { flexDirection: 'row', alignItems: 'center' },
  ribName: { fontFamily: fontFamily.bold, fontSize: 15, color: colors.ink },
  ribIban: { fontFamily: fontFamily.semiBold, fontSize: 13, color: colors.inkSoft, marginTop: 3 },
  verified: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  verifiedText: { fontFamily: fontFamily.bold, fontSize: 12, color: colors.tiffanyDarker },
  ribEditBtn: {
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.tiffanyTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ribEditText: { fontFamily: fontFamily.bold, fontSize: 13, color: colors.tiffanyDarker },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 12 },
  statTile: {
    width: '48.5%',
    backgroundColor: '#fff',
    borderRadius: radii.lg,
    padding: 14,
    ...shadow.soft,
  },
  statValue: { fontFamily: fontFamily.extraBold, fontSize: 20, color: colors.ink },
  statLabel: { fontFamily: fontFamily.semiBold, fontSize: 11, color: colors.grey, marginTop: 4 },
  histCard: { backgroundColor: '#fff', borderRadius: radii.xl, paddingHorizontal: 16, ...shadow.soft },
  histRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  histTitle: { fontFamily: fontFamily.bold, fontSize: 14, color: colors.ink },
  histMeta: { fontFamily: fontFamily.medium, fontSize: 12, color: colors.grey, marginTop: 2 },
  histPrice: { fontFamily: fontFamily.extraBold, fontSize: 15, color: colors.ink },
});
