import React from 'react';
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, radii, shadow } from '../theme/theme';
import { CameraIcon, CheckIcon } from './Icons';

export function PhotoSlot({
  taken,
  onTake,
  onRetake,
  image,
  height = 140,
  label = 'Prendre une photo',
  addedLabel = 'Ajoutée',
}: {
  taken: boolean;
  onTake: () => void;
  onRetake: () => void;
  image: ImageSourcePropType;
  height?: number;
  label?: string;
  addedLabel?: string;
}) {
  if (!taken) {
    return (
      <Pressable onPress={onTake} style={styles.dashed}>
        <View style={styles.dashedIconWrap}>
          <CameraIcon />
        </View>
        <Text style={styles.dashedLabel}>{label}</Text>
      </Pressable>
    );
  }
  return (
    <View style={[styles.photoWrap, { height }]}>
      <Image source={image} style={StyleSheet.absoluteFill} resizeMode="cover" />
      <View style={styles.addedBadge}>
        <CheckIcon color="#fff" size={13} />
        <Text style={styles.addedText}>{addedLabel}</Text>
      </View>
      <Pressable onPress={onRetake} style={styles.retakeBadge}>
        <Text style={styles.retakeText}>Reprendre</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  dashed: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 2,
    borderColor: '#B9D9DA',
    borderStyle: 'dashed',
    borderRadius: radii.md,
    padding: 12,
  },
  dashedIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 11,
    backgroundColor: colors.tiffanyTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashedLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 13,
    color: colors.tiffany,
  },
  photoWrap: {
    borderRadius: radii.md,
    overflow: 'hidden',
    ...shadow.soft,
  },
  addedBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(18,167,173,.95)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  addedText: {
    color: '#fff',
    fontFamily: fontFamily.bold,
    fontSize: 11,
  },
  retakeBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,.95)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  retakeText: {
    color: colors.ink,
    fontFamily: fontFamily.bold,
    fontSize: 11,
  },
});
