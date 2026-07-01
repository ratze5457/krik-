import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Svg, { Circle, Path } from 'react-native-svg';
import { RootStackParamList } from '../../navigation/types';
import { Screen } from '../../components/Screen';
import { GhostButton, PrimaryButton } from '../../components/ui';
import { CheckIcon, InfoIcon } from '../../components/Icons';
import { colors, fontFamily, radii, shadow } from '../../theme/theme';
import { useAppStore } from '../../store/useAppStore';
import { PRO_DOCS } from '../../store/constants';

type Props = NativeStackScreenProps<RootStackParamList, 'ProPending'>;

export function ProPendingScreen({ navigation }: Props) {
  const validatePro = useAppStore((s) => s.validatePro);

  const validate = () => {
    validatePro();
    (navigation as any).replace('ProMain');
  };

  return (
    <Screen bg={colors.bgAlt}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.clockWrap}>
          <Svg width={46} height={46} viewBox="0 0 24 24" fill="none">
            <Circle cx={12} cy={12} r={9} stroke={colors.warning} strokeWidth={2} />
            <Path d="M12 7v5l3 2" stroke={colors.warning} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </View>
        <Text style={styles.title}>Dossier envoyé !</Text>
        <Text style={styles.subtitle}>
          Votre compte dépanneur est en attente de validation. L'équipe Krik vérifie vos documents sous 24 à 48h.
        </Text>

        <View style={styles.docCard}>
          {PRO_DOCS.map(([key, label], i) => (
            <View key={key} style={[styles.docRow, i === PRO_DOCS.length - 1 && { borderBottomWidth: 0 }]}>
              <Text style={styles.docLabel}>{label}</Text>
              <View style={styles.received}>
                <CheckIcon size={16} />
                <Text style={styles.receivedText}>Reçu</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.infoBanner}>
          <InfoIcon />
          <Text style={styles.infoText}>
            Vous recevrez une notification dès l'activation de votre compte sur la plateforme.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton title="Simuler la validation (démo)" icon={false} onPress={validate} />
        <GhostButton title="Retour à l'accueil" onPress={() => navigation.navigate('Splash')} style={{ marginTop: 10 }} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 22, alignItems: 'center' },
  clockWrap: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: colors.warningTint,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },
  title: {
    fontFamily: fontFamily.extraBold,
    fontSize: 24,
    color: colors.ink,
    marginTop: 22,
  },
  subtitle: {
    fontFamily: fontFamily.medium,
    fontSize: 15,
    color: colors.inkSoft,
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 21,
    maxWidth: 290,
  },
  docCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: radii.xl,
    paddingHorizontal: 16,
    marginTop: 24,
    ...shadow.soft,
  },
  docRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  docLabel: { flex: 1, fontFamily: fontFamily.semiBold, fontSize: 14, color: colors.ink },
  received: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  receivedText: { fontFamily: fontFamily.bold, fontSize: 12, color: colors.tiffanyDarker },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    backgroundColor: colors.tiffanyTint,
    borderRadius: radii.md,
    padding: 13,
    marginTop: 16,
  },
  infoText: {
    flex: 1,
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    color: colors.tiffanyDarker,
    lineHeight: 16,
  },
  footer: {
    paddingHorizontal: 18,
    paddingBottom: 26,
    paddingTop: 8,
  },
});
