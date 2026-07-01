import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AdminDossiersStackParamList } from '../../navigation/types';
import { Screen } from '../../components/Screen';
import { PrimaryButton, RoundIconButton, SectionLabel } from '../../components/ui';
import { CheckIcon, ChevronLeftIcon } from '../../components/Icons';
import { colors, fontFamily, radii, shadow } from '../../theme/theme';
import { useAppStore } from '../../store/useAppStore';

type Props = NativeStackScreenProps<AdminDossiersStackParamList, 'DossierDetail'>;

export function DossierDetailScreen({ navigation }: Props) {
  const app = useAppStore((s) => s.applications.find((a) => a.id === s.adminAppId));
  const approve = useAppStore((s) => s.approveApplication);
  const refuse = useAppStore((s) => s.refuseApplication);
  const [refusing, setRefusing] = useState(false);
  const [reason, setReason] = useState('');

  if (!app) {
    return (
      <Screen>
        <View style={styles.header}>
          <RoundIconButton onPress={() => navigation.goBack()}>
            <ChevronLeftIcon />
          </RoundIconButton>
          <Text style={styles.title}>Dossier</Text>
        </View>
      </Screen>
    );
  }

  const missing = app.docs.filter((d) => !d.received).length;

  const onApprove = () => {
    approve(app.id);
    navigation.goBack();
  };
  const onRefuse = () => {
    refuse(app.id, reason.trim() || 'Dossier incomplet');
    navigation.goBack();
  };

  return (
    <Screen>
      <View style={styles.header}>
        <RoundIconButton onPress={() => navigation.goBack()}>
          <ChevronLeftIcon />
        </RoundIconButton>
        <View>
          <Text style={styles.title}>{app.societe}</Text>
          <Text style={styles.subtitle}>Soumis {app.submitted.toLowerCase()}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {app.status !== 'pending' && (
          <View style={[styles.statusBanner, app.status === 'approved' ? styles.bannerOk : styles.bannerKo]}>
            <Text style={[styles.statusBannerText, { color: app.status === 'approved' ? colors.tiffanyDarker : colors.danger }]}>
              {app.status === 'approved' ? '✓ Compte validé et actif' : `✕ Dossier refusé${app.refuseReason ? ' — ' + app.refuseReason : ''}`}
            </Text>
          </View>
        )}

        <View>
          <SectionLabel>Entreprise</SectionLabel>
          <View style={styles.card}>
            <Row label="Raison sociale" value={app.societe} />
            <Row label="SIRET" value={app.siret} />
            <Row label="Responsable" value={app.responsable} />
            <Row label="Téléphone" value={app.tel} />
            <Row label="E-mail" value={app.email} last />
          </View>
        </View>

        <View>
          <SectionLabel>Véhicule{app.vehicles.length > 1 ? 's' : ''}</SectionLabel>
          <View style={styles.card}>
            {app.vehicles.map((v, i) => (
              <View key={i} style={[styles.vehRow, i === app.vehicles.length - 1 && { borderBottomWidth: 0 }]}>
                <Text style={styles.vehModele}>{v.modele}</Text>
                <Text style={styles.vehMeta}>{v.plaque} · {v.type}</Text>
              </View>
            ))}
          </View>
        </View>

        <View>
          <SectionLabel right={missing > 0 ? <Text style={styles.missingTag}>{missing} manquante(s)</Text> : undefined}>
            Documents
          </SectionLabel>
          <View style={styles.card}>
            {app.docs.map((d, i) => (
              <View key={d.label} style={[styles.docRow, i === app.docs.length - 1 && { borderBottomWidth: 0 }]}>
                <Text style={styles.docLabel}>{d.label}</Text>
                {d.received ? (
                  <View style={styles.received}>
                    <CheckIcon size={16} />
                    <Text style={styles.receivedText}>Reçu</Text>
                  </View>
                ) : (
                  <Text style={styles.missingText}>Manquant</Text>
                )}
              </View>
            ))}
          </View>
        </View>

        {refusing && (
          <View>
            <SectionLabel>Motif du refus</SectionLabel>
            <TextInput
              value={reason}
              onChangeText={setReason}
              placeholder="Ex : agrément préfectoral manquant, KBIS illisible…"
              placeholderTextColor={colors.grey}
              multiline
              style={styles.reasonInput}
            />
          </View>
        )}
      </ScrollView>

      {app.status === 'pending' && (
        <View style={styles.footer}>
          {!refusing ? (
            <>
              <PrimaryButton title="Refuser" dark icon={false} onPress={() => setRefusing(true)} style={styles.refuseBtn} />
              <View style={{ flex: 1 }}>
                <PrimaryButton title="Valider le compte" icon={false} onPress={onApprove} />
              </View>
            </>
          ) : (
            <>
              <PrimaryButton title="Annuler" dark icon={false} onPress={() => setRefusing(false)} style={styles.refuseBtn} />
              <View style={{ flex: 1 }}>
                <PrimaryButton title="Confirmer le refus" dark icon={false} onPress={onRefuse} style={styles.dangerBtn} />
              </View>
            </>
          )}
        </View>
      )}
    </Screen>
  );
}

function Row({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <View style={[styles.row, last && { borderBottomWidth: 0 }]}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
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
  title: { fontFamily: fontFamily.extraBold, fontSize: 20, color: colors.ink },
  subtitle: { fontFamily: fontFamily.medium, fontSize: 13, color: colors.inkSoft },
  scroll: { padding: 18, gap: 14 },
  statusBanner: { borderRadius: radii.md, padding: 14 },
  bannerOk: { backgroundColor: colors.tiffanyTint },
  bannerKo: { backgroundColor: colors.dangerTint },
  statusBannerText: { fontFamily: fontFamily.bold, fontSize: 13 },
  card: { backgroundColor: '#fff', borderRadius: radii.xl, paddingHorizontal: 16, ...shadow.soft },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  rowLabel: { fontFamily: fontFamily.medium, fontSize: 13, color: colors.inkSoft, flexShrink: 0 },
  rowValue: { fontFamily: fontFamily.bold, fontSize: 13, color: colors.ink, textAlign: 'right', flex: 1 },
  vehRow: { paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: colors.divider },
  vehModele: { fontFamily: fontFamily.bold, fontSize: 14, color: colors.ink },
  vehMeta: { fontFamily: fontFamily.medium, fontSize: 12, color: colors.inkSoft, marginTop: 2 },
  missingTag: { fontFamily: fontFamily.bold, fontSize: 11, color: colors.warning },
  docRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  docLabel: { fontFamily: fontFamily.semiBold, fontSize: 14, color: colors.ink, flex: 1 },
  received: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  receivedText: { fontFamily: fontFamily.bold, fontSize: 12, color: colors.tiffanyDarker },
  missingText: { fontFamily: fontFamily.bold, fontSize: 12, color: colors.danger },
  reasonInput: {
    backgroundColor: '#fff',
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    minHeight: 90,
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.ink,
    textAlignVertical: 'top',
    ...shadow.soft,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 26,
  },
  refuseBtn: { flex: 0.7 },
  dangerBtn: { backgroundColor: colors.danger, shadowColor: colors.danger },
});
