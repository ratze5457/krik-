import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../navigation/types';
import { Screen } from '../components/Screen';
import { RoundIconButton } from '../components/ui';
import { ChevronLeftIcon } from '../components/Icons';
import { colors, fontFamily, radii, shadow } from '../theme/theme';
import { HISTORY } from '../store/constants';

type Props = BottomTabScreenProps<MainTabParamList, 'Historique'>;

export function HistoriqueScreen({ navigation }: Props) {
  return (
    <Screen>
      <View style={styles.header}>
        <RoundIconButton onPress={() => navigation.navigate('Signaler' as never)}>
          <ChevronLeftIcon />
        </RoundIconButton>
        <Text style={styles.title}>Mes dépannages</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {HISTORY.map((h) => (
          <View key={h.id} style={styles.card}>
            <View style={styles.topRow}>
              <View>
                <Text style={styles.cardTitle}>{h.title}</Text>
                <Text style={styles.cardDate}>{h.date} · {h.provider}</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Terminé</Text>
              </View>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.meta}>★ {h.rating}</Text>
              <Text style={styles.meta}>· {h.duration}</Text>
              <Text style={styles.price}>{h.price}</Text>
            </View>
          </View>
        ))}
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
  title: {
    fontFamily: fontFamily.extraBold,
    fontSize: 21,
    color: colors.ink,
  },
  scroll: {
    padding: 18,
    paddingTop: 10,
    gap: 12,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.xl,
    padding: 16,
    ...shadow.soft,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontFamily: fontFamily.extraBold,
    fontSize: 15,
    color: colors.ink,
  },
  cardDate: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.grey,
    marginTop: 2,
  },
  badge: {
    backgroundColor: colors.tiffanyTint,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    fontFamily: fontFamily.bold,
    fontSize: 11,
    color: colors.tiffanyDarker,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 12,
    alignItems: 'center',
  },
  meta: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    color: colors.inkSoft,
  },
  price: {
    fontFamily: fontFamily.extraBold,
    fontSize: 12,
    color: colors.ink,
    marginLeft: 'auto',
  },
});
