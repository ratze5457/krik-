import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProDemandesStackParamList } from '../../navigation/types';
import { Screen } from '../../components/Screen';
import { PrimaryButton, RoundIconButton } from '../../components/ui';
import { ChevronLeftIcon } from '../../components/Icons';
import { colors, fontFamily, radii, shadow } from '../../theme/theme';
import { useAppStore } from '../../store/useAppStore';
import { PRO_REQUESTS } from '../../store/constants';

const vehiclePhoto = require('../../assets/vehicle-photo.png');

type Props = NativeStackScreenProps<ProDemandesStackParamList, 'ProReq'>;

export function ProReqScreen({ navigation }: Props) {
  const req = useAppStore((s) => s.req) ?? PRO_REQUESTS[0];

  const refuse = () => navigation.getParent()?.navigate('Demandes', { screen: 'ProDash' } as never);

  return (
    <Screen>
      <View style={styles.header}>
        <RoundIconButton onPress={() => navigation.goBack()}>
          <ChevronLeftIcon />
        </RoundIconButton>
        <View>
          <Text style={styles.title}>Nouvelle demande</Text>
          <Text style={styles.subtitle}>À {req.dist} de vous</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.photoWrap}>
          <Image source={vehiclePhoto} style={styles.photo} resizeMode="cover" />
          <View style={styles.photoBadge}>
            <Text style={styles.photoBadgeText}>Photo du véhicule</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Row label="Problème" value={req.panne} />
          <Row label="Client" value={req.client} />
          <Row label="Véhicule" value={req.vehicle} />
          <Row label="Position" value={req.addr} last />
        </View>

        <View style={styles.priceCard}>
          <Text style={styles.priceLabel}>Prix de la course</Text>
          <Text style={styles.priceValue}>{req.price}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable onPress={refuse} style={styles.refuseBtn}>
          <Text style={styles.refuseText}>Refuser</Text>
        </Pressable>
        <View style={{ flex: 1 }}>
          <PrimaryButton title="Accepter" icon={false} onPress={() => navigation.navigate('ProNav')} />
        </View>
      </View>
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
  scroll: { padding: 18, gap: 14 },
  photoWrap: { borderRadius: radii.xl, overflow: 'hidden', ...shadow.card },
  photo: { width: '100%', height: 180 },
  photoBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(18,167,173,.95)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  photoBadgeText: { color: '#fff', fontFamily: fontFamily.bold, fontSize: 11 },
  card: {
    backgroundColor: '#fff',
    borderRadius: radii.xl,
    paddingHorizontal: 16,
    ...shadow.soft,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  rowLabel: { fontFamily: fontFamily.medium, fontSize: 13, color: colors.inkSoft, flexShrink: 0 },
  rowValue: { fontFamily: fontFamily.bold, fontSize: 13, color: colors.ink, textAlign: 'right', flex: 1 },
  priceCard: {
    backgroundColor: colors.tiffanyTint,
    borderRadius: radii.xl,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: { fontFamily: fontFamily.semiBold, fontSize: 14, color: colors.tiffanyDarker },
  priceValue: { fontFamily: fontFamily.extraBold, fontSize: 22, color: colors.ink },
  footer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 26,
  },
  refuseBtn: {
    flex: 1,
    height: 60,
    borderRadius: radii.lg,
    backgroundColor: colors.dangerTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refuseText: { fontFamily: fontFamily.extraBold, fontSize: 17, color: colors.danger },
});
