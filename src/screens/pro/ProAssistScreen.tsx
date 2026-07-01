import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { ProDemandesStackParamList } from '../../navigation/types';
import { Screen } from '../../components/Screen';
import { RoundIconButton } from '../../components/ui';
import {
  ChatIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LocationPersonIcon,
  NoSignalIcon,
  PhoneIcon,
  XIcon,
} from '../../components/Icons';
import { colors, fontFamily, gradients, radii, shadow } from '../../theme/theme';
import { KRIK_ASSIST_PHONE } from '../../store/constants';

type Props = NativeStackScreenProps<ProDemandesStackParamList, 'ProAssist'>;

export function ProAssistScreen({ navigation }: Props) {
  const cancelMission = () => navigation.getParent()?.navigate('Demandes', { screen: 'ProDash' } as never);

  return (
    <Screen bg={colors.bgAlt}>
      <View style={styles.header}>
        <RoundIconButton onPress={() => navigation.goBack()}>
          <ChevronLeftIcon />
        </RoundIconButton>
        <View>
          <Text style={styles.title}>Assistance Krik</Text>
          <Text style={styles.subtitle}>Un souci avec le client ? On vous aide.</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View>
          <Text style={styles.sectionLabel}>Quel est le problème ?</Text>
          <View style={styles.card}>
            <View style={styles.optionRow}>
              <View style={[styles.optionIcon, { backgroundColor: colors.warningTint }]}>
                <PhoneIcon color={colors.warning} />
              </View>
              <Text style={styles.optionText}>Le client ne répond pas</Text>
            </View>
            <View style={styles.optionRow}>
              <View style={[styles.optionIcon, { backgroundColor: colors.tiffanyTint }]}>
                <LocationPersonIcon />
              </View>
              <Text style={styles.optionText}>On n'arrive pas à se trouver</Text>
            </View>
            <View style={[styles.optionRow, { borderBottomWidth: 0 }]}>
              <View style={[styles.optionIcon, { backgroundColor: colors.panel }]}>
                <NoSignalIcon />
              </View>
              <Text style={styles.optionText}>Plus de réseau / appel impossible</Text>
            </View>
          </View>
        </View>

        <View>
          <Text style={styles.sectionLabel}>Contacter l'équipe Krik</Text>
          <View style={[styles.card, styles.contactCard]}>
            <View style={styles.contactIcon}>
              <LinearGradient colors={gradients.tiffany} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
              <View style={{ zIndex: 1 }}>
                <PhoneIcon color="#fff" />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.contactLabel}>Assistance Krik · 24h/24</Text>
              <Text style={styles.contactPhone}>{KRIK_ASSIST_PHONE}</Text>
            </View>
            <View style={styles.contactActions}>
              <RoundIconButton size={42} bg={colors.tiffany}>
                <PhoneIcon color="#fff" />
              </RoundIconButton>
              <RoundIconButton size={42} bg={colors.tiffanyTint} onPress={() => navigation.navigate('ProChat')}>
                <ChatIcon />
              </RoundIconButton>
            </View>
          </View>
        </View>

        <View>
          <Text style={styles.sectionLabel}>Résoudre la situation</Text>
          <Pressable onPress={cancelMission} style={styles.resolveCard}>
            <View style={styles.resolveIcon}>
              <XIcon />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.resolveTitle}>Annuler la mission</Text>
              <Text style={styles.resolveSubtitle}>Vous redevenez disponible pour d'autres demandes</Text>
            </View>
            <ChevronRightIcon color={colors.danger} />
          </Pressable>
          <Text style={styles.footerNote}>
            En cas de litige, l'équipe Krik tranche et peut rembourser ou réattribuer l'intervention.
          </Text>
        </View>
      </ScrollView>
    </Screen>
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
  title: { fontFamily: fontFamily.extraBold, fontSize: 21, color: colors.ink },
  subtitle: { fontFamily: fontFamily.medium, fontSize: 13, color: colors.inkSoft },
  scroll: { padding: 18, paddingTop: 12, gap: 16 },
  sectionLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    color: colors.grey,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginHorizontal: 4,
  },
  card: { backgroundColor: '#fff', borderRadius: radii.xl, paddingHorizontal: 16, ...shadow.soft },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  optionIcon: { width: 38, height: 38, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  optionText: { flex: 1, fontFamily: fontFamily.bold, fontSize: 14, color: colors.ink },
  contactCard: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16 },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  contactLabel: { fontFamily: fontFamily.semiBold, fontSize: 11, color: colors.grey },
  contactPhone: { fontFamily: fontFamily.extraBold, fontSize: 16, color: colors.ink },
  contactActions: { flexDirection: 'row', gap: 8 },
  resolveCard: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: colors.danger,
    borderRadius: radii.xl,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    shadowColor: colors.danger,
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
  },
  resolveIcon: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
    backgroundColor: colors.dangerTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resolveTitle: { fontFamily: fontFamily.extraBold, fontSize: 16, color: colors.ink },
  resolveSubtitle: { fontFamily: fontFamily.medium, fontSize: 12, color: colors.inkSoft, marginTop: 2 },
  footerNote: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    color: colors.grey,
    marginTop: 10,
    marginHorizontal: 4,
    lineHeight: 15,
  },
});
