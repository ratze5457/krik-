import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AdminLitigesStackParamList } from '../../navigation/types';
import { Screen } from '../../components/Screen';
import { RoundIconButton, SectionLabel } from '../../components/ui';
import { ChevronLeftIcon, ChevronRightIcon } from '../../components/Icons';
import { colors, fontFamily, radii, shadow } from '../../theme/theme';
import { useAppStore } from '../../store/useAppStore';
import { DisputeStatus } from '../../store/types';

type Props = NativeStackScreenProps<AdminLitigesStackParamList, 'LitigeDetail'>;

const RESOLVED_LABEL: Record<Exclude<DisputeStatus, 'open'>, string> = {
  refunded: 'Client remboursé',
  reassigned: 'Intervention réattribuée',
  closed: 'Litige clôturé sans suite',
};

export function LitigeDetailScreen({ navigation }: Props) {
  const dispute = useAppStore((s) => s.disputes.find((d) => d.id === s.adminDisputeId));
  const resolve = useAppStore((s) => s.resolveDispute);

  if (!dispute) {
    return (
      <Screen>
        <View style={styles.header}>
          <RoundIconButton onPress={() => navigation.goBack()}>
            <ChevronLeftIcon />
          </RoundIconButton>
          <Text style={styles.title}>Litige</Text>
        </View>
      </Screen>
    );
  }

  const act = (status: DisputeStatus) => {
    resolve(dispute.id, status);
    navigation.goBack();
  };

  return (
    <Screen>
      <View style={styles.header}>
        <RoundIconButton onPress={() => navigation.goBack()}>
          <ChevronLeftIcon />
        </RoundIconButton>
        <View>
          <Text style={styles.title}>Litige</Text>
          <Text style={styles.subtitle}>Ouvert par {dispute.from === 'client' ? 'un client' : 'un dépanneur'} · {dispute.submitted.toLowerCase()}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {dispute.status !== 'open' && (
          <View style={styles.resolvedBanner}>
            <Text style={styles.resolvedText}>✓ {RESOLVED_LABEL[dispute.status as Exclude<DisputeStatus, 'open'>]}</Text>
          </View>
        )}

        <View style={styles.motifCard}>
          <Text style={styles.motifLabel}>Motif signalé</Text>
          <Text style={styles.motif}>{dispute.motif}</Text>
        </View>

        <View>
          <SectionLabel>Détails</SectionLabel>
          <View style={styles.card}>
            <Row label="Signalé par" value={`${dispute.party} (${dispute.from === 'client' ? 'client' : 'dépanneur'})`} />
            <Row label="Autre partie" value={dispute.counterparty} />
            <Row label="Intervention" value={dispute.intervention} />
            <Row label="Montant" value={dispute.amount} last />
          </View>
        </View>

        {dispute.status === 'open' && (
          <View>
            <SectionLabel>Arbitrage</SectionLabel>
            <View style={{ gap: 10 }}>
              <ActionCard
                title="Rembourser le client"
                sub={`${dispute.amount} recrédités`}
                color={colors.tiffany}
                onPress={() => act('refunded')}
              />
              <ActionCard
                title="Réattribuer un dépanneur"
                sub="Relancer une recherche pour le client"
                color={colors.tiffany}
                onPress={() => act('reassigned')}
              />
              <ActionCard
                title="Clôturer sans suite"
                sub="Aucune action, litige archivé"
                color={colors.inkSoft}
                onPress={() => act('closed')}
              />
            </View>
            <Text style={styles.note}>
              L'équipe Krik tranche : le remboursement est prélevé sur la commission, la réattribution relance une demande côté client.
            </Text>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}

function Row({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <View style={[styles.row, last && { borderBottomWidth: 0 }]}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

function ActionCard({ title, sub, color, onPress }: { title: string; sub: string; color: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.actionCard, { borderColor: color }]}>
      <View style={{ flex: 1 }}>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionSub}>{sub}</Text>
      </View>
      <ChevronRightIcon color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 4,
  },
  title: { fontFamily: fontFamily.extraBold, fontSize: 20, color: colors.ink },
  subtitle: { fontFamily: fontFamily.medium, fontSize: 13, color: colors.inkSoft },
  scroll: { padding: 18, gap: 14 },
  resolvedBanner: { backgroundColor: colors.tiffanyTint, borderRadius: radii.md, padding: 14 },
  resolvedText: { fontFamily: fontFamily.bold, fontSize: 13, color: colors.tiffanyDarker },
  motifCard: { backgroundColor: colors.ink, borderRadius: radii.xl, padding: 18 },
  motifLabel: { fontFamily: fontFamily.semiBold, fontSize: 12, color: '#9FB0BC' },
  motif: { fontFamily: fontFamily.extraBold, fontSize: 18, color: '#fff', marginTop: 4 },
  card: { backgroundColor: '#fff', borderRadius: radii.xl, paddingHorizontal: 16, ...shadow.soft },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  rowLabel: { fontFamily: fontFamily.medium, fontSize: 13, color: colors.inkSoft },
  rowValue: { fontFamily: fontFamily.bold, fontSize: 13, color: colors.ink, textAlign: 'right', flex: 1 },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderRadius: radii.xl,
    padding: 16,
    ...shadow.soft,
  },
  actionTitle: { fontFamily: fontFamily.extraBold, fontSize: 15, color: colors.ink },
  actionSub: { fontFamily: fontFamily.medium, fontSize: 12, color: colors.inkSoft, marginTop: 2 },
  note: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    color: colors.grey,
    marginTop: 10,
    marginHorizontal: 4,
    lineHeight: 15,
  },
});
