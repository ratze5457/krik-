import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SignalerStackParamList } from '../navigation/types';
import { PrimaryButton, RoundIconButton, ToggleSwitch } from '../components/ui';
import { ChevronLeftIcon, InfoIcon, TowIcon } from '../components/Icons';
import { MapBackgroundTall, UserPinLabel } from '../components/MapAssets';
import { PhotoSlot } from '../components/PhotoSlot';
import { colors, fontFamily, radii, shadow } from '../theme/theme';
import { useAppStore } from '../store/useAppStore';
import { computePricing } from '../store/selectors';

type Props = NativeStackScreenProps<SignalerStackParamList, 'Locate'>;

const vehiclePhoto = require('../assets/vehicle-photo.png');

export function LocateScreen({ navigation }: Props) {
  const s = useAppStore();
  const insets = useSafeAreaInsets();
  const panneLabel = s.panne?.label ?? 'Panne signalée';
  const pricing = computePricing(null, true);

  return (
    <View style={{ flex: 1, backgroundColor: colors.mapBg }}>
      <View style={styles.mapZone}>
        <MapBackgroundTall />
      </View>

      <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}>
        <RoundIconButton onPress={() => navigation.goBack()}>
          <ChevronLeftIcon />
        </RoundIconButton>
      </View>

      <UserPinLabel label="Vous êtes ici" />

      <View style={styles.sheet}>
        <ScrollView contentContainerStyle={styles.sheetInner} keyboardShouldPersistTaps="handled">
          <View style={styles.grabber} />
          <Text style={styles.sectionTitle}>Trajet du dépannage</Text>

          <View style={styles.card}>
            <View style={styles.pointRow}>
              <View style={styles.badgeA}>
                <Text style={styles.badgeText}>A</Text>
              </View>
              <Text style={styles.pointLabelA}>Lieu de la panne</Text>
              <Text style={styles.gpsLabel}>GPS ±5 m</Text>
            </View>
            <TextInput
              value={s.addrA}
              onChangeText={s.setAddrA}
              placeholder="Adresse de la panne"
              placeholderTextColor={colors.grey}
              style={styles.input}
            />
          </View>

          <Pressable onPress={s.toggleTow} style={styles.towRow}>
            <View style={styles.towIconWrap}>
              <TowIcon />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.towTitle}>Remorquer vers une destination</Text>
              <Text style={styles.towSubtitle}>Sinon, réparation sur place</Text>
            </View>
            <ToggleSwitch value={s.tow} onValueChange={s.toggleTow} />
          </Pressable>

          {s.tow && (
            <View style={styles.card}>
              <View style={styles.pointRow}>
                <View style={styles.badgeB}>
                  <Text style={styles.badgeText}>B</Text>
                </View>
                <Text style={styles.pointLabelB}>Destination (garage, domicile…)</Text>
              </View>
              <TextInput
                value={s.addrB}
                onChangeText={s.setAddrB}
                placeholder="Où amener le véhicule ?"
                placeholderTextColor={colors.grey}
                style={styles.input}
              />
              <View style={styles.distBanner}>
                <Text style={styles.distText}>Distance A → B : {pricing.towKmLabel}</Text>
                <Text style={styles.distCost}>remorquage {pricing.towCostLabel}</Text>
              </View>
            </View>
          )}

          <View style={styles.problemChip}>
            <Text style={styles.problemText}>Problème : {panneLabel}</Text>
          </View>

          <View style={{ marginTop: 12 }}>
            <PhotoSlot
              taken={s.photo}
              onTake={s.takePhoto}
              onRetake={s.retakePhoto}
              image={vehiclePhoto}
              height={132}
              label="Prendre une photo du véhicule"
              addedLabel="Photo ajoutée"
            />
          </View>

          <PrimaryButton title="Trouver un dépanneur" onPress={() => navigation.navigate('Select')} style={{ marginTop: 14 }} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapZone: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '62%',
  },
  topBar: {
    paddingHorizontal: 22,
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: '80%',
    backgroundColor: colors.bg,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    ...shadow.card,
  },
  sheetInner: {
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 30,
  },
  grabber: {
    width: 44,
    height: 5,
    borderRadius: 5,
    backgroundColor: colors.greySoft,
    alignSelf: 'center',
    marginBottom: 18,
  },
  sectionTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    color: colors.tiffany,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: radii.lg,
    padding: 14,
    marginTop: 12,
    ...shadow.soft,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  badgeA: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.tiffany,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeB: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontFamily: fontFamily.extraBold,
    fontSize: 12,
  },
  pointLabelA: {
    flex: 1,
    fontFamily: fontFamily.bold,
    fontSize: 11,
    color: colors.tiffany,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  pointLabelB: {
    flex: 1,
    fontFamily: fontFamily.bold,
    fontSize: 11,
    color: colors.ink,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  gpsLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.grey,
  },
  input: {
    marginTop: 9,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 14,
    fontFamily: fontFamily.semiBold,
    color: colors.ink,
    backgroundColor: colors.fieldBg,
  },
  towRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#fff',
    borderRadius: radii.md,
    padding: 14,
    marginTop: 12,
    ...shadow.soft,
  },
  towIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.tiffanyTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  towTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    color: colors.ink,
  },
  towSubtitle: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.grey,
  },
  distBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.tiffanyTint,
    borderRadius: 12,
    padding: 10,
    marginTop: 10,
  },
  distText: {
    flex: 1,
    fontFamily: fontFamily.bold,
    fontSize: 12,
    color: colors.tiffanyDarker,
  },
  distCost: {
    fontFamily: fontFamily.extraBold,
    fontSize: 12,
    color: colors.tiffanyDarker,
  },
  problemChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.tiffanyTint,
    borderRadius: radii.md,
    padding: 13,
    marginTop: 12,
  },
  problemText: {
    flex: 1,
    fontFamily: fontFamily.bold,
    fontSize: 13,
    color: colors.tiffanyDarker,
  },
});
