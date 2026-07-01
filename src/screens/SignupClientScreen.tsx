import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { Screen } from '../components/Screen';
import { Card, Field, PasswordField, PrimaryButton, RoundIconButton, SectionLabel } from '../components/ui';
import { ChevronLeftIcon } from '../components/Icons';
import { ColorSwatchGrid } from '../components/ColorSwatchGrid';
import { colors, fontFamily } from '../theme/theme';
import { useAppStore } from '../store/useAppStore';

type Props = NativeStackScreenProps<RootStackParamList, 'SignupClient'>;

export function SignupClientScreen({ navigation }: Props) {
  const s = useAppStore();

  const onSubmit = () => {
    s.registerClient();
    navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Main' }] }));
  };

  return (
    <Screen bg={colors.bgAlt}>
      <View style={styles.header}>
        <RoundIconButton onPress={() => navigation.goBack()}>
          <ChevronLeftIcon />
        </RoundIconButton>
        <View>
          <Text style={styles.title}>Créer mon compte</Text>
          <Text style={styles.subtitle}>30 secondes, vous êtes pressé</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View>
          <SectionLabel>Mon profil</SectionLabel>
          <Card style={styles.cardGap}>
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Field label="Prénom" placeholder="Rayan" value={s.cPrenom} onChangeText={(t) => s.setField('cPrenom', t)} />
              </View>
              <View style={{ flex: 1 }}>
                <Field label="Nom" placeholder="Benali" value={s.cNom} onChangeText={(t) => s.setField('cNom', t)} />
              </View>
            </View>
            <Field label="Téléphone" placeholder="+33 6 12 34 56 78" keyboardType="phone-pad" value={s.cTel} onChangeText={(t) => s.setField('cTel', t)} />
            <Field label="E-mail" placeholder="rayan@email.com" keyboardType="email-address" autoCapitalize="none" value={s.cEmail} onChangeText={(t) => s.setField('cEmail', t)} />
            <PasswordField value={s.cPwd} onChangeText={(t) => s.setField('cPwd', t)} show={s.showPw} onToggle={s.togglePw} />
          </Card>
        </View>

        <View>
          <SectionLabel>Mon véhicule</SectionLabel>
          <Card style={styles.cardGap}>
            <View style={styles.row}>
              <View style={{ flex: 2 }}>
                <Field label="Modèle" placeholder="Peugeot 208" value={s.cVehModele} onChangeText={(t) => s.setField('cVehModele', t)} />
              </View>
              <View style={{ flex: 1 }}>
                <Field
                  label="Plaque"
                  placeholder="GH-742-KR"
                  autoCapitalize="characters"
                  value={s.cVehPlaque}
                  onChangeText={(t) => s.setField('cVehPlaque', t)}
                />
              </View>
            </View>
            <ColorSwatchGrid value={s.vehColor} valueName={s.vehColorName} onPick={s.pickColor} />
          </Card>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton title="Créer mon compte" onPress={onSubmit} />
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
    paddingTop: 10,
    gap: 18,
  },
  cardGap: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  footer: {
    padding: 18,
    paddingBottom: 26,
    backgroundColor: colors.bgAlt,
  },
});
