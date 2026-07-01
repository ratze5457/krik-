import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SuiviStackParamList } from '../navigation/types';
import { Screen } from '../components/Screen';
import { PrimaryButton } from '../components/ui';
import { CheckIcon } from '../components/Icons';
import { StarRating } from '../components/StarRating';
import { colors, fontFamily, gradients, radii, shadow } from '../theme/theme';
import { useAppStore } from '../store/useAppStore';
import { computePricing } from '../store/selectors';

type Props = NativeStackScreenProps<SuiviStackParamList, 'Done'>;

export function DoneScreen({ navigation }: Props) {
  const s = useAppStore();
  const pricing = computePricing(s.dep, s.tow);

  const onFinish = () => {
    s.resetRating();
    (navigation.getParent() as any)?.navigate('Signaler', { screen: 'Home' });
  };

  const ratingLabel = s.rating > 0 ? `${s.rating}/5 — merci pour votre note !` : 'Touchez les étoiles pour noter';

  return (
    <Screen>
      <View style={styles.body}>
        <View style={styles.checkCircle}>
          <LinearGradient colors={gradients.tiffany} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
          <View style={{ zIndex: 1 }}>
            <CheckIcon color="#fff" size={44} strokeWidth={3} />
          </View>
        </View>
        <Text style={styles.title}>Dépannage terminé</Text>
        <Text style={styles.subtitle}>Ton véhicule est reparti. Note ton expérience avec {pricing.dep.name}.</Text>

        <View style={styles.stars}>
          <StarRating rating={s.rating} onRate={s.rate} />
        </View>
        <Text style={styles.ratingLabel}>{ratingLabel}</Text>

        <View style={styles.statsCard}>
          <View>
            <Text style={styles.statLabel}>Payé</Text>
            <Text style={styles.statValue}>{pricing.dep.price}</Text>
          </View>
          <View style={styles.statDivider} />
          <View>
            <Text style={styles.statLabel}>Durée</Text>
            <Text style={styles.statValue}>34 min</Text>
          </View>
        </View>

        <PrimaryButton title="Terminer" onPress={onFinish} icon={false} style={styles.finishBtn} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  checkCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    ...shadow.glow,
  },
  title: {
    fontFamily: fontFamily.extraBold,
    fontSize: 25,
    color: colors.ink,
    marginTop: 24,
  },
  subtitle: {
    fontFamily: fontFamily.medium,
    fontSize: 15,
    color: colors.inkSoft,
    marginTop: 6,
    maxWidth: 280,
    textAlign: 'center',
  },
  stars: {
    marginTop: 24,
  },
  ratingLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 13,
    color: colors.tiffany,
    marginTop: 12,
    minHeight: 18,
  },
  statsCard: {
    backgroundColor: colors.panel,
    borderRadius: radii.md,
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginTop: 28,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  statLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.grey,
  },
  statValue: {
    fontFamily: fontFamily.extraBold,
    fontSize: 18,
    color: colors.ink,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.greySoft,
  },
  finishBtn: {
    marginTop: 32,
    width: '100%',
    maxWidth: 300,
  },
});
