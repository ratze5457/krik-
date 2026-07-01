export const colors = {
  tiffany: '#12A7AD',
  tiffanyLight: '#29C9CE',
  tiffanyDark: '#0E8E94',
  tiffanyDarker: '#0E7E84',
  tiffanyTint: '#E6F8F8',
  ink: '#16202B',
  inkSoft: '#7A8794',
  grey: '#9AA6B0',
  greySoft: '#DCE3E5',
  border: '#E4EAEC',
  fieldBg: '#F8FBFB',
  bg: '#F4F8F9',
  bgAlt: '#F2F6F7',
  card: '#FFFFFF',
  divider: '#EEF2F3',
  panel: '#F1F5F6',
  danger: '#E8704F',
  dangerTint: '#FFEDE9',
  warning: '#E0A23B',
  warningTint: '#FFF3DC',
  success: '#22C55E',
  star: '#FFC53D',
  mapBg: '#E9EEF0',
  mapRoad: '#CBD6DA',
  mapWater: '#BFE9EA',
};

export const gradients = {
  tiffany: [colors.tiffanyLight, colors.tiffanyDark] as const,
  splash: ['#2BCBD0', '#0E8E94'] as const,
};

export const radii = {
  sm: 11,
  md: 14,
  lg: 18,
  xl: 20,
  xxl: 22,
  round: 999,
};

export const shadow = {
  card: {
    shadowColor: '#14283240',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 18,
    elevation: 4,
  },
  soft: {
    shadowColor: '#14283240',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 3,
  },
  glow: {
    shadowColor: '#12A7AD',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.55,
    shadowRadius: 24,
    elevation: 6,
  },
};

export const fontFamily = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semiBold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extraBold: 'PlusJakartaSans_800ExtraBold',
};
