import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignalerStackParamList } from '../navigation/types';
import { Screen } from '../components/Screen';
import { RoundIconButton } from '../components/ui';
import { ChevronLeftIcon, WrenchTruckIcon } from '../components/Icons';
import { colors, fontFamily, radii, shadow } from '../theme/theme';
import { useAppStore } from '../store/useAppStore';
import { DEPANNEURS } from '../store/constants';
import { DepId } from '../store/types';

type Props = NativeStackScreenProps<SignalerStackParamList, 'Select'>;

const ORDER: { id: DepId; eta: string }[] = [
  { id: 'express', eta: '12 min' },
  { id: 'allo', eta: '18 min' },
  { id: 'sos', eta: '24 min' },
];

export function SelectScreen({ navigation }: Props) {
  const chooseDep = useAppStore((s) => s.chooseDep);

  const onPick = (id: DepId) => {
    chooseDep(id);
    navigation.navigate('Recap');
  };

  return (
    <Screen>
      <View style={styles.header}>
        <RoundIconButton onPress={() => navigation.goBack()}>
          <ChevronLeftIcon />
        </RoundIconButton>
        <View>
          <Text style={styles.title}>Choisis ton dépanneur</Text>
          <Text style={styles.subtitle}>8 disponibles · triés par distance</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {ORDER.map(({ id, eta }) => {
          const dep = DEPANNEURS[id];
          const recommended = !!dep.recommended;
          return (
            <Pressable
              key={id}
              onPress={() => onPick(id)}
              style={[styles.card, recommended && styles.cardRecommended]}
            >
              <View style={[styles.iconWrap, { backgroundColor: recommended ? colors.tiffanyTint : colors.panel }]}>
                <WrenchTruckIcon color={recommended ? colors.tiffany : colors.grey} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.nameRow}>
                  <Text style={styles.name}>{dep.name}</Text>
                  {recommended && (
                    <View style={styles.recBadge}>
                      <Text style={styles.recBadgeText}>Recommandé</Text>
                    </View>
                  )}
                </View>
                <View style={styles.metaRow}>
                  <Text style={styles.metaStrong}>★ {dep.rating}</Text>
                  <Text style={styles.meta}>· {dep.dist}</Text>
                </View>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.eta}>{eta}</Text>
                <Text style={[styles.price, recommended && { color: colors.tiffany }]}>dès {dep.price}</Text>
              </View>
            </Pressable>
          );
        })}
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
    fontSize: 20,
    color: colors.ink,
  },
  subtitle: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: colors.inkSoft,
  },
  scroll: {
    padding: 18,
    paddingTop: 10,
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.card,
    borderRadius: radii.xxl,
    padding: 14,
    ...shadow.soft,
  },
  cardRecommended: {
    borderWidth: 2,
    borderColor: colors.tiffany,
    shadowColor: colors.tiffany,
    shadowOpacity: 0.35,
  },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  name: {
    fontFamily: fontFamily.extraBold,
    fontSize: 16,
    color: colors.ink,
  },
  recBadge: {
    backgroundColor: colors.tiffany,
    borderRadius: 20,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  recBadgeText: {
    color: '#fff',
    fontFamily: fontFamily.bold,
    fontSize: 10,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 3,
  },
  metaStrong: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    color: colors.ink,
  },
  meta: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    color: colors.inkSoft,
  },
  eta: {
    fontFamily: fontFamily.extraBold,
    fontSize: 18,
    color: colors.ink,
  },
  price: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.inkSoft,
    marginTop: 2,
  },
});
