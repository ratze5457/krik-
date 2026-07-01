import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AdminDossiersStackParamList } from '../../navigation/types';
import { Screen } from '../../components/Screen';
import { ChevronRightIcon } from '../../components/Icons';
import { colors, fontFamily, radii, shadow } from '../../theme/theme';
import { useAppStore } from '../../store/useAppStore';
import { ApplicationStatus } from '../../store/types';

type Props = NativeStackScreenProps<AdminDossiersStackParamList, 'DossierList'>;

const STATUS_META: Record<ApplicationStatus, { label: string; bg: string; color: string }> = {
  pending: { label: 'En attente', bg: colors.warningTint, color: colors.warning },
  approved: { label: 'Validé', bg: colors.tiffanyTint, color: colors.tiffanyDarker },
  refused: { label: 'Refusé', bg: colors.dangerTint, color: colors.danger },
};

export function DossierListScreen({ navigation }: Props) {
  const applications = useAppStore((s) => s.applications);
  const openApplication = useAppStore((s) => s.openApplication);
  const pending = applications.filter((a) => a.status === 'pending').length;

  const open = (id: string) => {
    openApplication(id);
    navigation.navigate('DossierDetail');
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>Dossiers dépanneurs</Text>
        <Text style={styles.subtitle}>{pending} en attente de validation</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        {applications.map((a) => {
          const meta = STATUS_META[a.status];
          const received = a.docs.filter((d) => d.received).length;
          return (
            <Pressable key={a.id} onPress={() => open(a.id)} style={styles.card}>
              <View style={styles.cardTop}>
                <View style={styles.logo}>
                  <Text style={styles.logoText}>{a.societe.charAt(0)}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.societe}>{a.societe}</Text>
                  <Text style={styles.meta}>{a.responsable} · {a.submitted}</Text>
                </View>
                <View style={[styles.chip, { backgroundColor: meta.bg }]}>
                  <Text style={[styles.chipText, { color: meta.color }]}>{meta.label}</Text>
                </View>
              </View>
              <View style={styles.cardBottom}>
                <Text style={styles.docCount}>
                  {received}/{a.docs.length} pièces · {a.vehicles.length} véhicule{a.vehicles.length > 1 ? 's' : ''}
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
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  logo: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: { color: '#fff', fontFamily: fontFamily.extraBold, fontSize: 18 },
  societe: { fontFamily: fontFamily.extraBold, fontSize: 15, color: colors.ink },
  meta: { fontFamily: fontFamily.medium, fontSize: 12, color: colors.inkSoft, marginTop: 2 },
  chip: { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5 },
  chipText: { fontFamily: fontFamily.bold, fontSize: 11 },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  docCount: { fontFamily: fontFamily.semiBold, fontSize: 12, color: colors.inkSoft },
});
