import React, { useEffect } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { ProDemandesStackParamList } from '../../navigation/types';
import { Screen } from '../../components/Screen';
import { RoundIconButton } from '../../components/ui';
import { ChevronLeftIcon, PhoneIcon, SendIcon } from '../../components/Icons';
import { colors, fontFamily, gradients, radii, shadow } from '../../theme/theme';
import { useAppStore } from '../../store/useAppStore';
import { PRO_DEFAULT_CHAT, PRO_REQUESTS } from '../../store/constants';

type Props = NativeStackScreenProps<ProDemandesStackParamList, 'ProChat'>;

export function ProChatScreen({ navigation }: Props) {
  const s = useAppStore();
  const req = s.req ?? PRO_REQUESTS[0];

  useEffect(() => {
    s.ensureChat('pro');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rows = s.chat.length ? s.chat : PRO_DEFAULT_CHAT;

  return (
    <Screen bg="#EEF4F5">
      <View style={styles.header}>
        <RoundIconButton onPress={() => navigation.goBack()} bg={colors.panel}>
          <ChevronLeftIcon />
        </RoundIconButton>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{req.client.charAt(0)}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{req.client}</Text>
          <Text style={styles.online}>En ligne</Text>
        </View>
        <RoundIconButton bg={colors.tiffanyTint}>
          <PhoneIcon />
        </RoundIconButton>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <FlatList
          data={rows}
          keyExtractor={(_, i) => String(i)}
          contentContainerStyle={styles.list}
          ListHeaderComponent={<Text style={styles.dateChip}>Aujourd'hui</Text>}
          renderItem={({ item }) =>
            item.from === 'me' ? (
              <View style={styles.bubbleMeWrap}>
                <LinearGradient colors={gradients.tiffany} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
                <Text style={[styles.bubbleMeText, { zIndex: 1 }]}>{item.text}</Text>
              </View>
            ) : (
              <View style={styles.bubbleThemWrap}>
                <Text style={styles.bubbleThemText}>{item.text}</Text>
              </View>
            )
          }
        />
        <View style={styles.inputRow}>
          <TextInput
            value={s.draft}
            onChangeText={s.setDraft}
            placeholder="Écrire un message…"
            placeholderTextColor={colors.grey}
            style={styles.input}
          />
          <Pressable onPress={s.sendMsg} style={styles.sendBtn}>
            <LinearGradient colors={gradients.tiffany} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
            <View style={{ zIndex: 1 }}>
              <SendIcon />
            </View>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 14,
    ...shadow.soft,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontFamily: fontFamily.extraBold, fontSize: 17 },
  name: { fontFamily: fontFamily.extraBold, fontSize: 15, color: colors.ink },
  online: { fontFamily: fontFamily.semiBold, fontSize: 12, color: colors.success },
  list: { padding: 18, gap: 10 },
  dateChip: {
    alignSelf: 'center',
    backgroundColor: 'rgba(20,40,50,.08)',
    color: colors.inkSoft,
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 10,
    overflow: 'hidden',
  },
  bubbleThemWrap: {
    alignSelf: 'flex-start',
    maxWidth: '78%',
    backgroundColor: '#fff',
    borderRadius: 18,
    borderBottomLeftRadius: 5,
    padding: 12,
    marginBottom: 10,
    ...shadow.soft,
  },
  bubbleThemText: { color: colors.ink, fontFamily: fontFamily.medium, fontSize: 14, lineHeight: 19 },
  bubbleMeWrap: {
    alignSelf: 'flex-end',
    maxWidth: '78%',
    borderRadius: 18,
    borderBottomRightRadius: 5,
    padding: 12,
    marginBottom: 10,
    overflow: 'hidden',
  },
  bubbleMeText: { color: '#fff', fontFamily: fontFamily.medium, fontSize: 14, lineHeight: 19 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: 'rgba(20,40,50,.06)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 22,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.ink,
    backgroundColor: colors.bg,
  },
  sendBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    ...shadow.glow,
  },
});
