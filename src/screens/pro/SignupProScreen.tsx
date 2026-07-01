import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Screen } from '../../components/Screen';
import { Card, Field, PasswordField, PrimaryButton, RoundIconButton, SectionLabel } from '../../components/ui';
import { CheckIcon, ChevronLeftIcon, DocIcon } from '../../components/Icons';
import { colors, fontFamily, radii, shadow } from '../../theme/theme';
import { useAppStore } from '../../store/useAppStore';
import { PRO_DOCS } from '../../store/constants';

type Props = NativeStackScreenProps<RootStackParamList, 'SignupPro'>;

export function SignupProScreen({ navigation }: Props) {
  const s = useAppStore();
  const docCount = Object.values(s.docs).filter(Boolean).length;

  const submit = () => {
    s.registerPro();
    navigation.replace('ProPending');
  };

  return (
    <Screen bg={colors.bgAlt}>
      <View style={styles.header}>
        <RoundIconButton onPress={() => navigation.goBack()}>
          <ChevronLeftIcon />
        </RoundIconButton>
        <View>
          <Text style={styles.title}>Devenir dépanneur Krik</Text>
          <Text style={styles.subtitle}>Dossier vérifié avant activation</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View>
          <SectionLabel>Mon entreprise</SectionLabel>
          <Card style={styles.cardGap}>
            <Field label="Raison sociale" placeholder="Dépann'Express SARL" value={s.pSociete} onChangeText={(t) => s.setField('pSociete', t)} />
            <Field label="SIRET" placeholder="123 456 789 00012" keyboardType="numeric" value={s.pSiret} onChangeText={(t) => s.setField('pSiret', t)} />
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Field label="Prénom resp." placeholder="Marc" value={s.pPrenom} onChangeText={(t) => s.setField('pPrenom', t)} />
              </View>
              <View style={{ flex: 1 }}>
                <Field label="Nom resp." placeholder="Dubois" value={s.pNom} onChangeText={(t) => s.setField('pNom', t)} />
              </View>
            </View>
            <Field label="Téléphone" placeholder="+33 6 51 24 87 03" keyboardType="phone-pad" value={s.pTel} onChangeText={(t) => s.setField('pTel', t)} />
            <Field label="E-mail pro" placeholder="contact@depann-express.fr" keyboardType="email-address" autoCapitalize="none" value={s.pEmail} onChangeText={(t) => s.setField('pEmail', t)} />
            <PasswordField value={s.pPwd} onChangeText={(t) => s.setField('pPwd', t)} show={s.showPw} onToggle={s.togglePw} />
          </Card>
        </View>

        <View>
          <SectionLabel>Véhicule d'intervention</SectionLabel>
          <Card style={styles.cardGap}>
            <View style={styles.row}>
              <View style={{ flex: 2 }}>
                <Field label="Modèle" placeholder="Renault Master" value={s.fleet[0]?.modele ?? ''} onChangeText={(t) => s.updateVeh(s.fleet[0]?.id ?? 1, { modele: t })} />
              </View>
              <View style={{ flex: 1 }}>
                <Field label="Plaque" autoCapitalize="characters" placeholder="GH-742-KR" value={s.fleet[0]?.plaque ?? ''} onChangeText={(t) => s.updateVeh(s.fleet[0]?.id ?? 1, { plaque: t })} />
              </View>
            </View>
            <Field label="Type" placeholder="Plateau de dépannage" value={s.fleet[0]?.type ?? ''} onChangeText={(t) => s.updateVeh(s.fleet[0]?.id ?? 1, { type: t })} />
          </Card>
        </View>

        <View>
          <SectionLabel right={<Text style={styles.count}>{docCount}/5</Text>}>Documents requis</SectionLabel>
          <View style={styles.docCard}>
            {PRO_DOCS.map(([key, label], i) => {
              const added = !!s.docs[key];
              return (
                <Pressable
                  key={key}
                  onPress={() => s.toggleDoc(key)}
                  style={[styles.docRow, i === PRO_DOCS.length - 1 && { borderBottomWidth: 0 }]}
                >
                  <View style={styles.docIcon}>
                    <DocIcon />
                  </View>
                  <Text style={styles.docLabel}>{label}</Text>
                  {added ? (
                    <View style={styles.docAdded}>
                      <CheckIcon size={16} />
                      <Text style={styles.docAddedText}>Ajouté</Text>
                    </View>
                  ) : (
                    <Text style={styles.docAdd}>+ Ajouter</Text>
                  )}
                </Pressable>
              );
            })}
          </View>
          <Text style={styles.note}>
            Ces pièces sont vérifiées manuellement par l'équipe Krik avant l'activation de votre compte.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton title="Soumettre mon dossier" dark onPress={submit} />
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
  title: { fontFamily: fontFamily.extraBold, fontSize: 21, color: colors.ink },
  subtitle: { fontFamily: fontFamily.medium, fontSize: 13, color: colors.inkSoft },
  scroll: { padding: 18, paddingTop: 10, gap: 18 },
  cardGap: { gap: 12 },
  row: { flexDirection: 'row', gap: 10 },
  count: { fontFamily: fontFamily.bold, fontSize: 12, color: colors.tiffany },
  docCard: {
    backgroundColor: '#fff',
    borderRadius: radii.xl,
    paddingHorizontal: 16,
    ...shadow.soft,
  },
  docRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  docIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: colors.panel,
    alignItems: 'center',
    justifyContent: 'center',
  },
  docLabel: { flex: 1, fontFamily: fontFamily.semiBold, fontSize: 14, color: colors.ink },
  docAdded: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  docAddedText: { fontFamily: fontFamily.bold, fontSize: 12, color: colors.tiffanyDarker },
  docAdd: { fontFamily: fontFamily.bold, fontSize: 12, color: colors.tiffany },
  note: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    color: colors.grey,
    marginTop: 8,
    marginHorizontal: 4,
    lineHeight: 15,
  },
  footer: {
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 26,
    backgroundColor: colors.bgAlt,
  },
});
