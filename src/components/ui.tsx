import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fontFamily, radii, shadow } from '../theme/theme';
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon, EyeIcon, EyeOffIcon } from './Icons';

export function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function SectionLabel({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <View style={styles.sectionLabelRow}>
      <Text style={styles.sectionLabel}>{children}</Text>
      {right}
    </View>
  );
}

interface FieldProps extends TextInputProps {
  label: string;
}

export function Field({ label, style, ...props }: FieldProps) {
  return (
    <View>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        placeholderTextColor={colors.grey}
        style={[styles.input, style]}
        {...props}
      />
    </View>
  );
}

export function PasswordField({
  value,
  onChangeText,
  show,
  onToggle,
  label = 'Mot de passe',
}: {
  value: string;
  onChangeText: (t: string) => void;
  show: boolean;
  onToggle: () => void;
  label?: string;
}) {
  return (
    <View>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={{ position: 'relative' }}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!show}
          placeholder="••••••••"
          placeholderTextColor={colors.grey}
          style={[styles.input, { paddingRight: 46 }]}
        />
        <Pressable onPress={onToggle} style={styles.eyeToggle} hitSlop={8}>
          {show ? <EyeOffIcon /> : <EyeIcon />}
        </Pressable>
      </View>
    </View>
  );
}

export function ForgotPasswordRow({ done, onPress }: { done: boolean; onPress: () => void }) {
  return (
    <View style={styles.forgotRow}>
      {done ? (
        <View style={styles.forgotDone}>
          <CheckIcon size={14} />
          <Text style={styles.forgotDoneText}>Lien de réinitialisation envoyé</Text>
        </View>
      ) : (
        <View />
      )}
      <Pressable onPress={onPress}>
        <Text style={styles.forgotLink}>Mot de passe oublié ?</Text>
      </Pressable>
    </View>
  );
}

export function PrimaryButton({
  title,
  onPress,
  disabled,
  icon = true,
  dark,
  light,
  loading,
  style,
}: {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  icon?: boolean;
  dark?: boolean;
  light?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}) {
  if (disabled) {
    return (
      <View style={[styles.btnBase, styles.btnDisabled, style]}>
        <Text style={styles.btnDisabledText}>{title}</Text>
      </View>
    );
  }
  if (dark) {
    return (
      <Pressable onPress={onPress} style={[styles.btnBase, styles.btnDark, style]}>
        {loading ? <ActivityIndicator color="#fff" /> : (
          <>
            <Text style={styles.btnText}>{title}</Text>
            {icon && <ChevronRightIcon color="#fff" size={18} />}
          </>
        )}
      </Pressable>
    );
  }
  if (light) {
    return (
      <Pressable onPress={onPress} style={[styles.btnBase, styles.btnLight, style]}>
        {loading ? <ActivityIndicator color={colors.tiffanyDark} /> : (
          <>
            <Text style={styles.btnLightText}>{title}</Text>
            {icon && <ChevronRightIcon color={colors.tiffanyDark} size={18} />}
          </>
        )}
      </Pressable>
    );
  }
  return (
    <Pressable onPress={onPress} style={[styles.btnBase, style]}>
      <LinearGradient
        colors={[colors.tiffanyLight, colors.tiffany]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[StyleSheet.absoluteFill, { borderRadius: radii.lg }]}
      />
      <View style={styles.btnContent}>
        {loading ? <ActivityIndicator color="#fff" /> : (
          <>
            <Text style={styles.btnText}>{title}</Text>
            {icon && <ChevronRightIcon color="#fff" size={18} />}
          </>
        )}
      </View>
    </Pressable>
  );
}

export function GhostButton({ title, onPress, style, textStyle }: { title: string; onPress?: () => void; style?: ViewStyle; textStyle?: TextStyle }) {
  return (
    <Pressable onPress={onPress} style={[styles.btnGhost, style]}>
      <Text style={[styles.btnGhostText, textStyle]}>{title}</Text>
    </Pressable>
  );
}

export function RoundIconButton({
  children,
  onPress,
  size = 40,
  bg = '#fff',
  style,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  size?: number;
  bg?: string;
  style?: ViewStyle;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          width: size,
          height: size,
          borderRadius: size * 0.35,
          backgroundColor: bg,
          alignItems: 'center',
          justifyContent: 'center',
        },
        bg === '#fff' ? shadow.soft : null,
        style,
      ]}
    >
      {children}
    </Pressable>
  );
}

export function ToggleSwitch({ value, onValueChange }: { value: boolean; onValueChange: () => void }) {
  return (
    <Pressable
      onPress={onValueChange}
      style={[styles.switchTrack, { backgroundColor: value ? colors.tiffany : colors.greySoft }]}
    >
      <View style={[styles.switchThumb, { alignSelf: value ? 'flex-end' : 'flex-start' }]} />
    </Pressable>
  );
}

export function Divider() {
  return <View style={styles.divider} />;
}

export function ScreenHeader({
  title,
  subtitle,
  onBack,
}: {
  title: string;
  subtitle?: string;
  onBack?: () => void;
}) {
  return (
    <View style={styles.headerRow}>
      {onBack && (
        <RoundIconButton onPress={onBack}>
          <ChevronLeftIcon />
        </RoundIconButton>
      )}
      <View style={{ flex: 1 }}>
        <Text style={styles.headerTitle}>{title}</Text>
        {subtitle ? <Text style={styles.headerSubtitle}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.xl,
    padding: 16,
    ...shadow.card,
  },
  sectionLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 4,
    marginBottom: 6,
  },
  sectionLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    color: colors.grey,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  fieldLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    color: colors.inkSoft,
    marginBottom: 7,
  },
  eyeToggle: {
    position: 'absolute',
    right: 7,
    top: 0,
    bottom: 0,
    width: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 9,
  },
  forgotDone: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  forgotDoneText: {
    fontFamily: fontFamily.bold,
    fontSize: 11,
    color: colors.tiffanyDarker,
  },
  forgotLink: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    color: colors.tiffany,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 13,
    paddingVertical: 12,
    paddingHorizontal: 13,
    fontSize: 14,
    fontFamily: fontFamily.semiBold,
    color: colors.ink,
    backgroundColor: colors.fieldBg,
  },
  btnBase: {
    height: 60,
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    ...shadow.glow,
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    zIndex: 1,
  },
  btnDark: {
    backgroundColor: colors.ink,
    shadowColor: '#142832',
  },
  btnLight: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.3,
  },
  btnLightText: {
    fontFamily: fontFamily.extraBold,
    fontSize: 17,
    color: colors.tiffanyDark,
  },
  btnDisabled: {
    backgroundColor: colors.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  btnDisabledText: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: colors.grey,
  },
  btnText: {
    fontFamily: fontFamily.extraBold,
    fontSize: 17,
    color: '#fff',
  },
  btnGhost: {
    height: 48,
    borderRadius: radii.md,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnGhostText: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    color: colors.inkSoft,
  },
  switchTrack: {
    width: 46,
    height: 28,
    borderRadius: 20,
    padding: 3,
    justifyContent: 'center',
  },
  switchThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#fff',
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 4,
  },
  headerTitle: {
    fontFamily: fontFamily.extraBold,
    fontSize: 21,
    color: colors.ink,
  },
  headerSubtitle: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: colors.inkSoft,
    marginTop: 2,
  },
});
