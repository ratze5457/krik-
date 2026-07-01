import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignalerStackParamList } from '../navigation/types';
import { Screen } from '../components/Screen';
import { PrimaryButton, RoundIconButton } from '../components/ui';
import {
  AccidentIcon,
  BatteryIcon,
  ChevronLeftIcon,
  FuelIcon,
  InfoIcon,
  KeyIcon,
  OtherIcon,
  TireIcon,
} from '../components/Icons';
import { PhotoSlot } from '../components/PhotoSlot';
import { colors, fontFamily, radii, shadow } from '../theme/theme';
import { useAppStore } from '../store/useAppStore';
import { PanneKey, FuelType, BatteryState as BatteryStateT, SpareWheel } from '../store/types';

type Props = NativeStackScreenProps<SignalerStackParamList, 'Panne'>;

const vehiclePhoto = require('../assets/vehicle-photo.png');
const tirePhoto = require('../assets/tire-photo.png');
const batteryPhoto = require('../assets/battery-photo.png');

const PANNE_TYPES: { key: PanneKey; label: string; icon: (color: string) => React.ReactNode; tint: string; color: string }[] = [
  { key: 'accident', label: 'Accident', icon: (c) => <AccidentIcon color={c} />, tint: '#FFEDE9', color: colors.danger },
  { key: 'pneu', label: 'Pneu crevé', icon: (c) => <TireIcon color={c} />, tint: colors.tiffanyTint, color: colors.tiffany },
  { key: 'essence', label: "Panne d'essence", icon: (c) => <FuelIcon color={c} />, tint: colors.tiffanyTint, color: colors.tiffany },
  { key: 'batterie', label: 'Batterie à plat', icon: (c) => <BatteryIcon color={c} />, tint: colors.tiffanyTint, color: colors.tiffany },
  { key: 'cles', label: 'Clés enfermées', icon: (c) => <KeyIcon color={c} />, tint: colors.tiffanyTint, color: colors.tiffany },
  { key: 'autre', label: 'Autre', icon: (c) => <OtherIcon color={c} />, tint: colors.tiffanyTint, color: colors.tiffany },
];

const FUELS: { key: FuelType; label: string }[] = [
  { key: 'SP95', label: 'Essence SP95' },
  { key: 'SP98', label: 'Essence SP98' },
  { key: 'Diesel', label: 'Diesel / Gazole' },
  { key: 'E85', label: 'Superéthanol E85' },
];

function Segmented<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T | null;
  onChange: (v: T) => void;
  options: { key: T; label: string }[];
}) {
  return (
    <View style={styles.segRow}>
      {options.map((o) => {
        const active = value === o.key;
        return (
          <Pressable
            key={o.key}
            onPress={() => onChange(o.key)}
            style={[styles.segBtn, { backgroundColor: active ? colors.tiffany : colors.border }]}
          >
            <Text style={[styles.segText, { color: active ? '#fff' : colors.ink }]}>{o.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function PanneScreen({ navigation }: Props) {
  const s = useAppStore();
  const panneKey = s.panne?.key ?? null;

  return (
    <Screen>
      <View style={styles.header}>
        <RoundIconButton onPress={() => navigation.goBack()}>
          <ChevronLeftIcon />
        </RoundIconButton>
        <View>
          <Text style={styles.title}>Quel est le problème ?</Text>
          <Text style={styles.subtitle}>Sélectionne ta situation</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.grid}>
          {PANNE_TYPES.map((p) => {
            const active = panneKey === p.key;
            return (
              <Pressable
                key={p.key}
                onPress={() => s.selectPanne(p.key)}
                style={[styles.card, { borderColor: active ? p.color : 'transparent' }]}
              >
                <View style={[styles.iconBox, { backgroundColor: p.tint }]}>{p.icon(p.color)}</View>
                <Text style={styles.cardLabel}>{p.label}</Text>
              </Pressable>
            );
          })}
        </View>

        {panneKey === 'accident' && (
          <View style={styles.diagCard}>
            <Text style={styles.diagTitle}>Photo du véhicule (dégâts visibles)</Text>
            <Text style={styles.diagHint}>Aide le dépanneur à anticiper (carrosserie, roues, fuite).</Text>
            <View style={{ marginTop: 12 }}>
              <PhotoSlot taken={s.diagPhoto} onTake={s.takeDiagPhoto} onRetake={s.retakeDiagPhoto} image={vehiclePhoto} />
            </View>
          </View>
        )}

        {panneKey === 'pneu' && (
          <View style={styles.diagCard}>
            <Text style={styles.diagTitle}>Photo du pneu, de profil</Text>
            <Text style={styles.diagHint}>Pour lire la dimension (ex : 205/55 R16) et les écrous.</Text>
            <View style={{ marginTop: 12 }}>
              <PhotoSlot taken={s.diagPhoto} onTake={s.takeDiagPhoto} onRetake={s.retakeDiagPhoto} image={tirePhoto} />
            </View>
            <Text style={styles.diagHint2}>Roue de secours disponible ?</Text>
            <Segmented<SpareWheel> value={s.spareWheel} onChange={s.setSpareWheel} options={[{ key: 'oui', label: 'Oui' }, { key: 'non', label: 'Non' }]} />
          </View>
        )}

        {panneKey === 'batterie' && (
          <View style={styles.diagCard}>
            <Text style={styles.diagTitle}>Photo de la batterie</Text>
            <Text style={styles.diagHint}>Pour identifier le type (12V, ampérage) et les bornes.</Text>
            <View style={{ marginTop: 12 }}>
              <PhotoSlot taken={s.diagPhoto} onTake={s.takeDiagPhoto} onRetake={s.retakeDiagPhoto} image={batteryPhoto} />
            </View>
            <Text style={styles.diagHint2}>Votre batterie est…</Text>
            <Segmented<BatteryStateT>
              value={s.batteryState}
              onChange={s.setBatteryState}
              options={[
                { key: 'boost', label: 'Juste déchargée (boost / câbles)' },
                { key: 'replace', label: 'À remplacer (HS)' },
              ]}
            />
          </View>
        )}

        {panneKey === 'essence' && (
          <View style={styles.diagCard}>
            <Text style={styles.diagTitle}>Type de carburant</Text>
            <Text style={styles.diagHint}>Important : le dépanneur apporte le bon carburant.</Text>
            <View style={styles.fuelGrid}>
              {FUELS.map((f) => {
                const active = s.fuel === f.key;
                return (
                  <Pressable
                    key={f.key}
                    onPress={() => s.setFuel(f.key)}
                    style={[styles.fuelBtn, { backgroundColor: active ? colors.tiffany : colors.border }]}
                  >
                    <Text style={[styles.fuelText, { color: active ? '#fff' : colors.ink }]}>{f.label}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}

        <View style={styles.descWrap}>
          <Text style={styles.descLabel}>
            Précisez votre problème <Text style={styles.descOptional}>(recommandé)</Text>
          </Text>
          <TextInput
            value={s.panneDesc}
            onChangeText={s.setPanneDesc}
            placeholder="Ex : voyant moteur allumé, bruit anormal au freinage, véhicule immobilisé sur la voie, fumée sous le capot…"
            placeholderTextColor={colors.grey}
            multiline
            numberOfLines={4}
            style={styles.textarea}
          />
          <View style={styles.infoBanner}>
            <InfoIcon />
            <Text style={styles.infoText}>Plus de détails = un dépanneur mieux préparé et plus rapide.</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {panneKey ? (
          <PrimaryButton title="Continuer" onPress={() => navigation.navigate('Locate')} />
        ) : (
          <PrimaryButton title="Sélectionnez votre problème" disabled />
        )}
      </View>
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
  title: {
    fontFamily: fontFamily.extraBold,
    fontSize: 21,
    color: colors.ink,
  },
  subtitle: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: colors.inkSoft,
  },
  scroll: {
    padding: 18,
    paddingTop: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  card: {
    width: '48.5%',
    backgroundColor: colors.card,
    borderRadius: radii.xl,
    borderWidth: 2,
    padding: 16,
    ...shadow.soft,
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
    color: colors.ink,
    marginTop: 12,
  },
  diagCard: {
    marginTop: 16,
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: 14,
    ...shadow.soft,
  },
  diagTitle: {
    fontFamily: fontFamily.extraBold,
    fontSize: 13,
    color: colors.ink,
  },
  diagHint: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.grey,
    marginTop: 2,
  },
  diagHint2: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    color: colors.inkSoft,
    marginTop: 14,
    marginBottom: 8,
  },
  segRow: {
    flexDirection: 'row',
    gap: 10,
  },
  segBtn: {
    flex: 1,
    minHeight: 44,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  segText: {
    fontFamily: fontFamily.bold,
    fontSize: 13,
    textAlign: 'center',
  },
  fuelGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
    marginTop: 12,
  },
  fuelBtn: {
    width: '48.5%',
    height: 48,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fuelText: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
  },
  descWrap: {
    marginTop: 16,
  },
  descLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    color: colors.inkSoft,
    marginBottom: 8,
  },
  descOptional: {
    color: colors.grey,
    fontFamily: fontFamily.semiBold,
  },
  textarea: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: 14,
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.ink,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
    minHeight: 96,
    ...shadow.soft,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.tiffanyTint,
    borderRadius: radii.md,
    padding: 12,
    marginTop: 10,
  },
  infoText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    color: colors.tiffanyDarker,
    flex: 1,
  },
  footer: {
    padding: 18,
    paddingBottom: 26,
    backgroundColor: colors.bg,
  },
});
