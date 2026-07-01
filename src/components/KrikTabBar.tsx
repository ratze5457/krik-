import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontFamily } from '../theme/theme';
import { ClockIcon, JackIcon, ProfileIcon } from './Icons';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

function SignalerIcon({ active }: { active: boolean }) {
  const color = active ? colors.tiffany : colors.grey;
  return (
    <Svg width={23} height={23} viewBox="0 0 24 24" fill="none">
      <Path d="M12 2L2 21h20L12 2Z" stroke={color} strokeWidth={2.2} strokeLinejoin="round" fill={active ? colors.tiffanyTint : 'none'} />
      <Path d="M12 9v5" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Circle cx={12} cy={17.5} r={1.2} fill={color} />
    </Svg>
  );
}

function SuiviIcon({ active }: { active: boolean }) {
  const color = active ? colors.tiffany : colors.grey;
  return (
    <Svg width={23} height={23} viewBox="0 0 24 24" fill="none">
      <Path d="M5 18l5-2 4 2 5-2" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx={5} cy={18} r={1.6} fill={color} />
      <Circle cx={19} cy={16} r={1.6} fill={color} />
    </Svg>
  );
}

function DemandesIcon({ active }: { active: boolean }) {
  const color = active ? colors.tiffany : colors.grey;
  return (
    <Svg width={23} height={23} viewBox="0 0 24 24" fill="none">
      <Path d="M5 6h14l1 7v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4L5 6Z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
      <Path d="M3 13h5l1 2h6l1-2h5" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function RevenusIcon({ active }: { active: boolean }) {
  const color = active ? colors.tiffany : colors.grey;
  return (
    <Svg width={23} height={23} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={2} />
      <Path d="M15 9.5a4 4 0 100 5M8 11h5M8 13h5" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

function ApercuIcon({ active }: { active: boolean }) {
  const color = active ? colors.tiffany : colors.grey;
  return (
    <Svg width={23} height={23} viewBox="0 0 24 24" fill="none">
      <Rect x={3} y={3} width={7} height={7} rx={2} stroke={color} strokeWidth={2} />
      <Rect x={14} y={3} width={7} height={7} rx={2} stroke={color} strokeWidth={2} />
      <Rect x={3} y={14} width={7} height={7} rx={2} stroke={color} strokeWidth={2} />
      <Rect x={14} y={14} width={7} height={7} rx={2} stroke={color} strokeWidth={2} />
    </Svg>
  );
}

function DossiersIcon({ active }: { active: boolean }) {
  const color = active ? colors.tiffany : colors.grey;
  return (
    <Svg width={23} height={23} viewBox="0 0 24 24" fill="none">
      <Path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7Z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
    </Svg>
  );
}

function LitigesIcon({ active }: { active: boolean }) {
  const color = active ? colors.tiffany : colors.grey;
  return (
    <Svg width={23} height={23} viewBox="0 0 24 24" fill="none">
      <Path d="M12 3l8 4v5c0 5-3.4 8.4-8 9-4.6-.6-8-4-8-9V7l8-4Z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
      <Path d="M12 9v4" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Circle cx={12} cy={16} r={1} fill={color} />
    </Svg>
  );
}

const TAB_META: Record<string, { label: string; icon: (active: boolean) => React.ReactNode }> = {
  Signaler: { label: 'Signaler', icon: (a) => <SignalerIcon active={a} /> },
  Historique: { label: 'Historique', icon: (a) => <ClockIcon size={23} color={a ? colors.tiffany : colors.grey} filled={a} /> },
  Suivi: { label: 'Suivi', icon: (a) => <SuiviIcon active={a} /> },
  Profil: {
    label: 'Profil',
    icon: (a) => <ProfileIcon size={23} color={a ? colors.tiffany : colors.grey} />,
  },
  Demandes: { label: 'Demandes', icon: (a) => <DemandesIcon active={a} /> },
  Revenus: { label: 'Revenus', icon: (a) => <RevenusIcon active={a} /> },
  ProfilPro: {
    label: 'Profil',
    icon: (a) => <ProfileIcon size={23} color={a ? colors.tiffany : colors.grey} />,
  },
  Apercu: { label: 'Aperçu', icon: (a) => <ApercuIcon active={a} /> },
  Dossiers: { label: 'Dossiers', icon: (a) => <DossiersIcon active={a} /> },
  Litiges: { label: 'Litiges', icon: (a) => <LitigesIcon active={a} /> },
  Finances: { label: 'Finances', icon: (a) => <RevenusIcon active={a} /> },
};

const RESET_ROUTE: Record<string, string> = {
  Signaler: 'Home',
  Suivi: 'Track',
  Demandes: 'ProDash',
  Dossiers: 'DossierList',
  Litiges: 'LitigeList',
};

export function KrikTabBar({ state, navigation, descriptors }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const hidden = (focusedOptions.tabBarStyle as { display?: string } | undefined)?.display === 'none';
  if (hidden) return null;

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 14) }]}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const meta = TAB_META[route.name] ?? { label: route.name, icon: () => null };
        const resetTo = RESET_ROUTE[route.name];
        return (
          <Pressable
            key={route.key}
            onPress={() => navigation.navigate(resetTo ? { name: route.name, params: { screen: resetTo } } : { name: route.name, params: undefined })}
            style={styles.item}
          >
            {meta.icon(focused)}
            <Text style={[styles.label, { color: focused ? colors.tiffany : colors.grey, fontFamily: focused ? fontFamily.bold : fontFamily.semiBold }]}>
              {meta.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,.98)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(20,40,50,.06)',
    paddingTop: 12,
    paddingHorizontal: 24,
  },
  item: {
    alignItems: 'center',
    gap: 5,
    flex: 1,
  },
  label: {
    fontSize: 10,
  },
});
