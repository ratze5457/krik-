import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, radii, shadow } from '../theme/theme';
import { VEHICLE_COLORS } from '../store/colors';

export function ColorSwatchGrid({
  value,
  valueName,
  onPick,
}: {
  value: string;
  valueName: string;
  onPick: (hex: string, name: string) => void;
}) {
  return (
    <View>
      <Text style={styles.label}>Couleur du véhicule</Text>
      <View style={styles.previewRow}>
        <View style={[styles.previewSwatch, { backgroundColor: value }]} />
        <View>
          <Text style={styles.previewCaption}>Sélection</Text>
          <Text style={styles.previewName}>{valueName}</Text>
        </View>
      </View>
      <View style={styles.grid}>
        {VEHICLE_COLORS.map((c) => (
          <Pressable
            key={c.hex}
            onPress={() => onPick(c.hex, c.name)}
            style={[
              styles.swatch,
              { backgroundColor: c.hex },
              value === c.hex ? styles.swatchActive : styles.swatchInactive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    color: colors.inkSoft,
    marginBottom: 10,
  },
  previewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  previewSwatch: {
    width: 60,
    height: 60,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(20,40,50,.1)',
    ...shadow.soft,
  },
  previewCaption: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.grey,
  },
  previewName: {
    fontFamily: fontFamily.extraBold,
    fontSize: 19,
    color: colors.ink,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
    marginTop: 14,
  },
  swatch: {
    width: '18%',
    aspectRatio: 1,
    borderRadius: 12,
  },
  swatchActive: {
    borderWidth: 3,
    borderColor: colors.tiffany,
  },
  swatchInactive: {
    borderWidth: 1,
    borderColor: colors.border,
  },
});
