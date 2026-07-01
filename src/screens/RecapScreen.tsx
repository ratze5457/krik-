import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignalerStackParamList } from '../navigation/types';
import { Screen } from '../components/Screen';
import { RoundIconButton } from '../components/ui';
import { ChevronLeftIcon, ChevronRightIcon, ShieldCheckIcon, WrenchTruckIcon } from '../components/Icons';
import { colors, fontFamily, gradients, radii, shadow } from '../theme/theme';
import { useAppStore } from '../store/useAppStore';
import { computePricing, describePanneDetails } from '../store/selectors';

type Props = NativeStackScreenProps<SignalerStackParamList, 'Recap'>;

export function RecapScreen({ navigation }: Props) {
  const s = useAppStore();
  const pricing = computePricing(s.dep, s.tow);
  const panneLabel = s.panne?.label ?? 'Panne signalée';
  const descLabel = describePanneDetails(s);
  const hasDesc = descLabel.length > 0;

  const onConfirm = () => {
    (navigation as any).navigate('Suivi', { screen: 'Track' });
  };

  return (
    <Screen>
      <View style={styles.header}>
        <RoundIconButton onPress={() => navigation.goBack()}>
          <ChevronLeftIcon />
        </RoundIconButton>
        <Text style={styles.title}>Récapitulatif</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.depCard}>
          <View style={styles.depIconWrap}>
            <WrenchTruckIcon color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.depName}>{pricing.dep.name}</Text>
            <Text style={styles.depMeta}>★ {pricing.dep.rating} · arrivée ~{pricing.dep.eta}</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Row label="Problème" value={panneLabel} />
          {hasDesc && <Row label="Détails" value={descLabel} multiline />}
          <Row label="Départ (A)" value={s.addrA} multiline />
          {s.tow && (
            <>
              <Row label="Destination (B)" value={s.addrB} multiline />
              <Row label={`Remorquage · ${pricing.towKmLabel}`} value={pricing.towCostLabel} strong />
            </>
          )}
          <Row label="Intervention" value={pricing.dep.price} strong last />
        </View>

        <View style={styles.payCard}>
          <View style={styles.visaBadge}>
            <Text style={styles.visaText}>VISA</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.payNumber}>•••• •••• •••• 0042</Text>
            <Text style={styles.paySub}>Paiement in-app sécurisé</Text>
          </View>
          <ChevronRightIcon />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total estimé</Text>
          <Text style={styles.totalValue}>{pricing.totalLabel}</Text>
        </View>
        <Text style={styles.transparency}>
          Prix fixé par le dépanneur. Vous payez ce montant ; Krik prélève sa commission auprès du dépanneur.
        </Text>
        <Pressable onPress={onConfirm} style={styles.payBtn}>
          <LinearGradient colors={gradients.tiffany} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
          <View style={styles.payBtnContent}>
            <ShieldCheckIcon />
            <Text style={styles.payBtnText}>Confirmer et payer</Text>
          </View>
        </Pressable>
      </View>
    </Screen>
  );
}

function Row({ label, value, strong, multiline, last }: { label: string; value: string; strong?: boolean; multiline?: boolean; last?: boolean }) {
  return (
    <View style={[styles.row, !last && styles.rowDivider, multiline && { alignItems: 'flex-start' }]}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={[styles.rowValue, strong && styles.rowValueStrong, multiline && styles.rowValueMultiline]}>{value}</Text>
    </View>
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
  title: {
    fontFamily: fontFamily.extraBold,
    fontSize: 21,
    color: colors.ink,
  },
  scroll: {
    padding: 18,
    paddingTop: 10,
    gap: 12,
  },
  depCard: {
    backgroundColor: colors.card,
    borderRadius: radii.xl,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    ...shadow.soft,
  },
  depIconWrap: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
    backgroundColor: colors.tiffany,
    alignItems: 'center',
    justifyContent: 'center',
  },
  depName: {
    fontFamily: fontFamily.extraBold,
    fontSize: 16,
    color: colors.ink,
  },
  depMeta: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    color: colors.inkSoft,
    marginTop: 2,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: radii.xl,
    paddingHorizontal: 16,
    ...shadow.soft,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  rowLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: colors.inkSoft,
    flexShrink: 0,
  },
  rowValue: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    color: colors.ink,
    textAlign: 'right',
  },
  rowValueStrong: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
  },
  rowValueMultiline: {
    flex: 1,
    lineHeight: 18,
  },
  payCard: {
    backgroundColor: colors.card,
    borderRadius: radii.xl,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    ...shadow.soft,
  },
  visaBadge: {
    width: 42,
    height: 30,
    borderRadius: 7,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  visaText: {
    color: '#fff',
    fontSize: 9,
    fontFamily: fontFamily.extraBold,
    letterSpacing: 0.5,
  },
  payNumber: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    color: colors.ink,
  },
  paySub: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    color: colors.grey,
  },
  footer: {
    padding: 18,
    paddingBottom: 26,
    backgroundColor: colors.bg,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: 4,
    paddingBottom: 6,
  },
  totalLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: colors.inkSoft,
  },
  totalValue: {
    fontFamily: fontFamily.extraBold,
    fontSize: 24,
    color: colors.ink,
  },
  transparency: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    color: colors.grey,
    paddingHorizontal: 4,
    paddingBottom: 12,
    lineHeight: 15,
  },
  payBtn: {
    height: 60,
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.glow,
  },
  payBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    zIndex: 1,
  },
  payBtnText: {
    color: '#fff',
    fontFamily: fontFamily.extraBold,
    fontSize: 17,
  },
});
