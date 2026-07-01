import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../navigation/types';
import { Screen } from '../components/Screen';
import { Card, Field, ForgotPasswordRow, PasswordField, SectionLabel } from '../components/ui';
import { ChevronRightIcon, ClockIcon, CardIcon, SwitchRoleIcon } from '../components/Icons';
import { ColorSwatchGrid } from '../components/ColorSwatchGrid';
import { colors, fontFamily, radii, shadow } from '../theme/theme';
import { useAppStore } from '../store/useAppStore';

type Props = BottomTabScreenProps<MainTabParamList, 'Profil'>;

export function ProfilScreen({ navigation }: Props) {
  const s = useAppStore();
  const [pwReset, setPwReset] = useState(false);
  const initial = (s.cPrenom || 'R').charAt(0).toUpperCase();
  const fullName = `${s.cPrenom} ${s.cNom}`.trim();

  return (
    <Screen>
      <Text style={styles.title}>Profil</Text>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.identityCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{fullName}</Text>
            <Text style={styles.phone}>{s.cTel}</Text>
          </View>
        </View>

        <View>
          <SectionLabel>Mes informations</SectionLabel>
          <Card style={styles.cardGap}>
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Field label="Prénom" value={s.cPrenom} onChangeText={(t) => s.setField('cPrenom', t)} />
              </View>
              <View style={{ flex: 1 }}>
                <Field label="Nom" value={s.cNom} onChangeText={(t) => s.setField('cNom', t)} />
              </View>
            </View>
            <Field label="Téléphone" value={s.cTel} onChangeText={(t) => s.setField('cTel', t)} />
            <Field label="E-mail" value={s.cEmail} onChangeText={(t) => s.setField('cEmail', t)} />
          </Card>
        </View>

        <View>
          <SectionLabel>Mon véhicule</SectionLabel>
          <Card style={styles.cardGap}>
            <View style={styles.row}>
              <View style={{ flex: 2 }}>
                <Field label="Modèle" value={s.cVehModele} onChangeText={(t) => s.setField('cVehModele', t)} />
              </View>
              <View style={{ flex: 1 }}>
                <Field label="Plaque" autoCapitalize="characters" value={s.cVehPlaque} onChangeText={(t) => s.setField('cVehPlaque', t)} />
              </View>
            </View>
            <ColorSwatchGrid value={s.vehColor} valueName={s.vehColorName} onPick={s.pickColor} />
          </Card>
        </View>

        <View>
          <SectionLabel>Sécurité</SectionLabel>
          <Card style={styles.cardGap}>
            <PasswordField value={s.cPwd} onChangeText={(t) => s.setField('cPwd', t)} show={s.showPw} onToggle={s.togglePw} />
            <ForgotPasswordRow done={pwReset} onPress={() => setPwReset(true)} />
          </Card>
        </View>

        <Pressable style={styles.linkRow} onPress={() => navigation.navigate('Historique')}>
          <View style={styles.linkIcon}>
            <ClockIcon color={colors.ink} />
          </View>
          <Text style={styles.linkText}>Mes dépannages</Text>
          <ChevronRightIcon />
        </Pressable>

        <View style={styles.linkRow}>
          <View style={styles.linkIcon}>
            <CardIcon />
          </View>
          <Text style={styles.linkText}>Moyens de paiement</Text>
          <ChevronRightIcon />
        </View>

        <Pressable style={styles.switchRow} onPress={() => navigation.navigate('Role' as never)}>
          <View style={styles.switchIcon}>
            <SwitchRoleIcon />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.switchTitle}>Passer en mode Dépanneur</Text>
            <Text style={styles.switchSubtitle}>Espace professionnel</Text>
          </View>
          <ChevronRightIcon />
        </Pressable>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: fontFamily.extraBold,
    fontSize: 24,
    color: colors.ink,
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 4,
  },
  scroll: {
    padding: 18,
    paddingTop: 8,
    gap: 14,
  },
  identityCard: {
    backgroundColor: colors.card,
    borderRadius: radii.xxl,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    ...shadow.soft,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: colors.tiffany,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontFamily: fontFamily.extraBold,
    fontSize: 24,
  },
  name: {
    fontFamily: fontFamily.extraBold,
    fontSize: 18,
    color: colors.ink,
  },
  phone: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: colors.inkSoft,
    marginTop: 2,
  },
  cardGap: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  linkRow: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    ...shadow.soft,
  },
  linkIcon: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    backgroundColor: colors.panel,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkText: {
    flex: 1,
    fontFamily: fontFamily.bold,
    fontSize: 15,
    color: colors.ink,
  },
  switchRow: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    ...shadow.soft,
  },
  switchIcon: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    backgroundColor: colors.tiffanyTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
    color: colors.ink,
  },
  switchSubtitle: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.grey,
  },
});
