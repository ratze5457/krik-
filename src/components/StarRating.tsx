import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors } from '../theme/theme';
import { StarIcon } from './Icons';

export function StarRating({ rating, onRate }: { rating: number; onRate: (n: number) => void }) {
  return (
    <View style={styles.row}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Pressable key={i} onPress={() => onRate(i)} hitSlop={6}>
          <StarIcon size={40} color={i <= rating ? colors.star : colors.border} />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
  },
});
