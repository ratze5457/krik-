import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { ProTabParamList } from '../../navigation/types';
import { Screen } from '../../components/Screen';
import { Card, Field, ForgotPasswordRow, PasswordField, PrimaryButton, SectionLabel } from '../../components/ui';
import { CameraIcon, CheckIcon, ChevronRightIcon, PlusIconSvg, SwitchRoleIcon } from '../../components/Icons';
import { colors, fontFamily, radii, shadow } from '../../theme/theme';
import { useAppStore } from '../../store/useAppStore';
import { MIN_BASE } from '../../store/constants';

type Props = BottomTabScreenProps<ProTabParamList, 'ProfilPro'>;

const VALIDATED_DOCS = ['Assurance pro', 'Agrément préfecture', 'Extrait KBIS'];

export function ProfilProScreen({ navigation }: Props) {
  const s = useAppStore();
  const [pwReset, setPwReset] = useState(false);
  const initial = (s.pSociete || 'D').charAt(0).toUpperCase();
  const kmLabel = String(s.tarifKm).replace('.', ',');
  const example = s.tarifBase + Math.round(s.tarifKm * 8.4);

  return (
    <Screen>
      <Text style={styles.title}>Profil</Text>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.identityCard}>
          <View style={styles.logoWrap}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>{initial}</Text>
            </View>
            <View style={styles.camBadge}>
              <CameraIcon size={14} color="#fff" />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.company}>{s.pSociete}</Text>
            <View style={styles.verifiedRow}>
              <CheckIcon size={14} />
              <Text style={styles.verifiedText}>Entreprise vérifiée</Text>
            </View>
            <Text style={styles.logoHint}>Touchez le logo pour le changer</Text>
          </View>
        </View>

        <View>
          <SectionLabel>Mon entreprise</SectionLabel>
          <Card style={styles.cardGap}>
            <Field label="Raison sociale" value={s.pSociete} onChangeText={(t) => s.setField('pSociete', t)} />
            <Field label="SIRET" value={s.pSiret} onChangeText={(t) => s.setField('pSiret', t)} keyboardType="numeric" />
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Field label="Prénom resp." value={s.pPrenom} onChangeText={(t) => s.setField('pPrenom', t)} />
              </View>
              <View style={{ flex: 1 }}>
                <Field label="Nom resp." value={s.pNom} onChangeText={(t) => s.setField('pNom', t)} />
              </View>
            </View>
            <Field label="Téléphone" value={s.pTel} onChangeText={(t) => s.setField('pTel', t)} keyboardType="phone-pad" />
            <Field label="E-mail pro" value={s.pEmail} onChangeText={(t) => s.setField('pEmail', t)} keyboardType="email-address" autoCapitalize="none" />
          </Card>
        </View>

        <View>
          <SectionLabel>Mes véhicules</SectionLabel>
          <View style={{ gap: 12 }}>
            {s.fleet.map((v) => {
              const active = v.id === s.activeVeh;
              const editing = v.id === s.editVehId;
              return (
                <View key={v.id} style={[styles.vehCard, active && styles.vehCardActive]}>
                  <View style={styles.vehTop}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.vehModele}>{v.modele || 'Nouveau véhicule'}</Text>
                      <Text style={styles.vehMeta}>{[v.plaque, v.type].filter(Boolean).join(' · ') || 'À compléter'}</Text>
                    </View>
                    {active ? (
                      <View style={styles.serviceBadge}>
                        <Text style={styles.serviceBadgeText}>En service</Text>
                      </View>
                    ) : null}
                    <Pressable onPress={() => s.toggleEditVeh(v.id)} hitSlop={8}>
                      <Text style={styles.editLink}>{editing ? 'Fermer' : 'Modifier'}</Text>
                    </Pressable>
                  </View>

                  {editing && (
                    <View style={styles.vehEdit}>
                      <View style={styles.row}>
                        <View style={{ flex: 2 }}>
                          <Field label="Modèle" value={v.modele} onChangeText={(t) => s.updateVeh(v.id, { modele: t })} />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Field label="Plaque" autoCapitalize="characters" value={v.plaque} onChangeText={(t) => s.updateVeh(v.id, { plaque: t })} />
                        </View>
                      </View>
                      <Field label="Type" value={v.type} onChangeText={(t) => s.updateVeh(v.id, { type: t })} />
                      <View style={styles.vehActions}>
                        {!active && (
                          <Pressable onPress={() => s.setActiveVeh(v.id)} style={styles.setActiveBtn}>
                            <Text style={styles.setActiveText}>Mettre en service</Text>
                          </Pressable>
                        )}
                        {s.fleet.length > 1 && (
                          <Pressable onPress={() => s.removeVeh(v.id)} style={styles.removeBtn}>
                            <Text style={styles.removeText}>Supprimer</Text>
                          </Pressable>
                        )}
                      </View>
                    </View>
                  )}
                </View>
              );
            })}
            <Pressable onPress={s.addVehicle} style={styles.addVehBtn}>
              <PlusIconSvg />
              <Text style={styles.addVehText}>Ajouter un véhicule</Text>
            </Pressable>
          </View>
        </View>

        <View>
          <SectionLabel right={<Text style={styles.freePriceTag}>Prix libre · le client choisit</Text>}>Mes tarifs</SectionLabel>
          <Card style={{ gap: 16 }}>
            <View>
              <View style={styles.tarifRow}>
                <View>
                  <Text style={styles.tarifTitle}>Forfait d'intervention</Text>
                  <Text style={styles.tarifSub}>Prise en charge sur place</Text>
                </View>
                <Stepper value={`${s.tarifBase}`} unit="€" onDec={s.decBase} onInc={s.incBase} />
              </View>
              <View style={styles.minBanner}>
                <Text style={styles.minText}>Minimum imposé par Krik : {MIN_BASE} € par intervention</Text>
              </View>
            </View>
            <View style={styles.tarifDivider} />
            <View style={styles.tarifRow}>
              <View>
                <Text style={styles.tarifTitle}>Prix au kilomètre</Text>
                <Text style={styles.tarifSub}>Pour le remorquage (A → B)</Text>
              </View>
              <Stepper value={kmLabel} unit="€/km" onDec={s.decKm} onInc={s.incKm} />
            </View>
            <View style={styles.exampleBanner}>
              <Text style={styles.exampleLabel}>Exemple : intervention + remorquage 8,4 km</Text>
              <Text style={styles.exampleValue}>{example} €</Text>
            </View>
          </Card>
        </View>

        <View>
          <SectionLabel>Sécurité</SectionLabel>
          <Card style={styles.cardGap}>
            <PasswordField value={s.pPwd} onChangeText={(t) => s.setField('pPwd', t)} show={s.showPw} onToggle={s.togglePw} />
            <ForgotPasswordRow done={pwReset} onPress={() => setPwReset(true)} />
          </Card>
        </View>

        <View>
          <SectionLabel>Documents</SectionLabel>
          <View style={styles.docCard}>
            {VALIDATED_DOCS.map((d, i) => (
              <View key={d} style={[styles.docRow, i === VALIDATED_DOCS.length - 1 && { borderBottomWidth: 0 }]}>
                <Text style={styles.docLabel}>{d}</Text>
                <View style={styles.docValid}>
                  <CheckIcon size={16} />
                  <Text style={styles.docValidText}>Validé</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <Pressable style={styles.switchRow} onPress={() => navigation.getParent()?.navigate('Role' as never)}>
          <View style={styles.switchIcon}>
            <SwitchRoleIcon />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.switchTitle}>Passer en mode Client</Text>
            <Text style={styles.switchSubtitle}>J'ai une panne</Text>
          </View>
          <ChevronRightIcon />
        </Pressable>
      </ScrollView>
    </Screen>
  );
}

function Stepper({ value, unit, onDec, onInc }: { value: string; unit: string; onDec: () => void; onInc: () => void }) {
  return (
    <View style={styles.stepper}>
      <Pressable onPress={onDec} style={styles.stepBtn}>
        <Text style={styles.stepMinus}>−</Text>
      </Pressable>
      <View style={styles.stepValueWrap}>
        <Text style={styles.stepValue}>{value}</Text>
        <Text style={styles.stepUnit}>{unit}</Text>
      </View>
      <Pressable onPress={onInc} style={[styles.stepBtn, styles.stepBtnPlus]}>
        <Text style={styles.stepPlus}>+</Text>
      </Pressable>
    </View>
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
  scroll: { padding: 18, paddingTop: 8, gap: 14 },
  identityCard: {
    backgroundColor: colors.card,
    borderRadius: radii.xxl,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    ...shadow.soft,
  },
  logoWrap: { width: 62, height: 62 },
  logo: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: colors.tiffany,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: { color: '#fff', fontFamily: fontFamily.extraBold, fontSize: 24 },
  camBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.ink,
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  company: { fontFamily: fontFamily.extraBold, fontSize: 17, color: colors.ink },
  verifiedRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 4 },
  verifiedText: { fontFamily: fontFamily.bold, fontSize: 12, color: colors.tiffanyDarker },
  logoHint: { fontFamily: fontFamily.medium, fontSize: 11, color: colors.grey, marginTop: 4 },
  cardGap: { gap: 12 },
  row: { flexDirection: 'row', gap: 10 },
  vehCard: { backgroundColor: '#fff', borderRadius: radii.xl, padding: 16, borderWidth: 1, borderColor: colors.divider, ...shadow.soft },
  vehCardActive: { borderWidth: 2, borderColor: colors.tiffany },
  vehTop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  vehModele: { fontFamily: fontFamily.extraBold, fontSize: 15, color: colors.ink },
  vehMeta: { fontFamily: fontFamily.medium, fontSize: 12, color: colors.inkSoft, marginTop: 2 },
  serviceBadge: { backgroundColor: colors.tiffanyTint, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  serviceBadgeText: { fontFamily: fontFamily.bold, fontSize: 11, color: colors.tiffanyDarker },
  editLink: { fontFamily: fontFamily.bold, fontSize: 13, color: colors.tiffany },
  vehEdit: { gap: 12, marginTop: 14 },
  vehActions: { flexDirection: 'row', gap: 10 },
  setActiveBtn: { flex: 1, height: 42, borderRadius: 12, backgroundColor: colors.tiffanyTint, alignItems: 'center', justifyContent: 'center' },
  setActiveText: { fontFamily: fontFamily.bold, fontSize: 13, color: colors.tiffanyDarker },
  removeBtn: { flex: 1, height: 42, borderRadius: 12, backgroundColor: colors.dangerTint, alignItems: 'center', justifyContent: 'center' },
  removeText: { fontFamily: fontFamily.bold, fontSize: 13, color: colors.danger },
  addVehBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: '#B9D9DA',
    borderStyle: 'dashed',
    borderRadius: radii.lg,
    padding: 14,
  },
  addVehText: { fontFamily: fontFamily.bold, fontSize: 14, color: colors.tiffany },
  freePriceTag: { fontFamily: fontFamily.bold, fontSize: 11, color: colors.tiffany },
  tarifRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tarifTitle: { fontFamily: fontFamily.bold, fontSize: 14, color: colors.ink },
  tarifSub: { fontFamily: fontFamily.medium, fontSize: 12, color: colors.grey, marginTop: 2 },
  tarifDivider: { height: 1, backgroundColor: colors.divider },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  stepBtn: { width: 34, height: 34, borderRadius: 11, backgroundColor: colors.panel, alignItems: 'center', justifyContent: 'center' },
  stepBtnPlus: { backgroundColor: colors.tiffanyTint },
  stepMinus: { fontFamily: fontFamily.bold, fontSize: 20, color: colors.ink, lineHeight: 22 },
  stepPlus: { fontFamily: fontFamily.bold, fontSize: 20, color: colors.tiffany, lineHeight: 22 },
  stepValueWrap: { flexDirection: 'row', alignItems: 'baseline', gap: 2, minWidth: 58, justifyContent: 'center' },
  stepValue: { fontFamily: fontFamily.extraBold, fontSize: 22, color: colors.ink },
  stepUnit: { fontFamily: fontFamily.bold, fontSize: 13, color: colors.ink },
  minBanner: { backgroundColor: colors.bg, borderRadius: 11, padding: 10, marginTop: 10 },
  minText: { fontFamily: fontFamily.semiBold, fontSize: 12, color: colors.inkSoft },
  exampleBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.tiffanyTint,
    borderRadius: radii.md,
    padding: 12,
  },
  exampleLabel: { flex: 1, fontFamily: fontFamily.bold, fontSize: 12, color: colors.tiffanyDarker },
  exampleValue: { fontFamily: fontFamily.extraBold, fontSize: 15, color: colors.ink },
  docCard: { backgroundColor: '#fff', borderRadius: radii.lg, paddingHorizontal: 16, ...shadow.soft },
  docRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  docLabel: { flex: 1, fontFamily: fontFamily.semiBold, fontSize: 14, color: colors.ink },
  docValid: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  docValidText: { fontFamily: fontFamily.bold, fontSize: 12, color: colors.tiffanyDarker },
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
  switchTitle: { fontFamily: fontFamily.bold, fontSize: 15, color: colors.ink },
  switchSubtitle: { fontFamily: fontFamily.medium, fontSize: 12, color: colors.grey },
});
