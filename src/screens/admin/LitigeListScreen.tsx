import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AdminLitigesStackParamList } from '../../navigation/types';
import { Screen } from '../../components/Screen';
import { ChevronRightIcon } from '../../components/Icons';
import { colors, fontFamily, radii, shadow } from '../../theme/theme';
import { useAppStore } from '../../store/useAppStore';
import { DisputeStatus } from '../../store/types';

type Props = NativeStackScreenProps<AdminLitigesStackParamList, 'LitigeList'>;

const STATUS_META: Record<DisputeStatus, { label: string; bg: string; color: string }> = {
  open: { label: 'Ouvert', bg: colors.dangerTint, color: colors.danger },
  refunded: { label: 'Remboursé', bg: colors.tiffanyTint, color: colors.tiffanyDarker },
  reassigned: { label: 'Réattribué', bg: colors.tiffanyTint, color: colors.tiffanyDarker },
  closed: { label: 'Clôturé', bg: colors.panel, color: colors.inkSoft },
};

export function LitigeListScreen({ navigation }: Props) {
  const disputes = useAppStore((s) => s.disputes);
  const openDispute = useAppStore((s) => s.openDispute);
  const open = disputes.filter((d) => d.status === 'open').length;

  const go = (id: string) => {
    openDispute(id);
    navigation.navigate('LitigeDetail');
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>Litiges</Text>
        <Text style={styles.subtitle}>{open} à arbitrer</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        {disputes.map((d) => {
          const meta = STATUS_META[d.status];
          return (
            <Pressable key={d.id} onPress={() => go(d.id)} style={styles.card}>
              <View style={styles.cardTop}>
                <View style={[styles.tag, { backgroundColor: d.from === 'client' ? colors.tiffanyTint : colors.warningTint }]}>
                  <Text style={[styles.tagText, { color: d.from === 'client' ? colors.tiffanyDarker : colors.warning }]}>
                    {d.from === 'client' ? 'Client' : 'Dépanneur'}
                  </Text>
                </View>
                <View style={[styles.chip, { backgroundColor: meta.bg }]}>
                  <Text style={[styles.chipText, { color: meta.color }]}>{meta.label}</Text>
                </View>
              </View>
              <Text style={styles.motif}>{d.motif}</Text>
              <View style={styles.cardBottom}>
                <Text style={styles.meta}>
                  {d.party} · {d.intervention} · {d.amount} · {d.submitted}
                </Text>
                <ChevronRightIcon />
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 22, paddingTop: 14, paddingBottom: 4 },
  title: { fontFamily: fontFamily.extraBold, fontSize: 24, color: colors.ink },
  subtitle: { fontFamily: fontFamily.medium, fontSize: 13, color: colors.inkSoft, marginTop: 2 },
  scroll: { padding: 18, paddingTop: 8, gap: 12 },
  card: { backgroundColor: '#fff', borderRadius: radii.xl, padding: 16, ...shadow.soft },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tag: { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  tagText: { fontFamily: fontFamily.bold, fontSize: 11 },
  chip: { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5 },
  chipText: { fontFamily: fontFamily.bold, fontSize: 11 },
  motif: { fontFamily: fontFamily.extraBold, fontSize: 15, color: colors.ink, marginTop: 10 },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  meta: { fontFamily: fontFamily.medium, fontSize: 12, color: colors.inkSoft, flex: 1 },
});
