import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/theme';

export function Screen({
  children,
  bg = colors.bg,
  edges = ['top', 'left', 'right'],
  style,
}: {
  children: React.ReactNode;
  bg?: string;
  edges?: ('top' | 'left' | 'right' | 'bottom')[];
  style?: ViewStyle;
}) {
  return (
    <SafeAreaView edges={edges} style={[styles.flex, { backgroundColor: bg }, style]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
});
