import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import { colors, fontFamily } from '../theme/theme';
import { UserPinIcon } from './Icons';

export function MapBackgroundSmall() {
  return (
    <Svg viewBox="0 0 360 240" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={StyleSheet.absoluteFill}>
      <Rect width={360} height={240} fill={colors.mapBg} />
      <Path d="M-20 70 C80 60 120 120 200 110 S320 70 400 90" stroke={colors.mapRoad} strokeWidth={22} fill="none" opacity={0.7} />
      <Path d="M40 -10 L90 250" stroke="#fff" strokeWidth={9} />
      <Path d="M-10 180 L380 150" stroke="#fff" strokeWidth={11} />
      <Path d="M260 -10 L210 250" stroke="#fff" strokeWidth={8} />
      <Path d="M-10 215 C120 190 240 230 380 200" stroke={colors.mapWater} strokeWidth={14} fill="none" opacity={0.8} />
    </Svg>
  );
}

export function MapBackgroundTall({ withRoute = false }: { withRoute?: boolean }) {
  return (
    <Svg viewBox="0 0 366 520" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={StyleSheet.absoluteFill}>
      <Rect width={366} height={520} fill={colors.mapBg} />
      <Path d="M50 -10 L120 530" stroke="#fff" strokeWidth={11} />
      <Path d="M-10 160 L380 120" stroke="#fff" strokeWidth={13} />
      <Path d="M300 -10 L250 530" stroke="#fff" strokeWidth={9} />
      <Path d="M-10 360 L380 330" stroke="#fff" strokeWidth={10} />
      <Path d="M-10 460 C120 420 240 460 380 430" stroke={colors.mapWater} strokeWidth={16} fill="none" opacity={0.8} />
      {withRoute && (
        <Path
          d="M90 430 C120 330 200 300 250 150"
          stroke={colors.tiffany}
          strokeWidth={5}
          strokeDasharray="2 9"
          strokeLinecap="round"
          fill="none"
        />
      )}
    </Svg>
  );
}

export function PulsingUserDot() {
  const scale = useRef(new Animated.Value(0.6)).current;
  const opacity = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.parallel([
        Animated.timing(scale, { toValue: 2.4, duration: 2000, easing: Easing.out(Easing.ease), useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0, duration: 2000, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [opacity, scale]);

  return (
    <View style={{ width: 22, height: 22, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View
        style={{
          position: 'absolute',
          width: 22,
          height: 22,
          borderRadius: 11,
          backgroundColor: 'rgba(31,190,196,0.4)',
          transform: [{ scale }],
          opacity,
        }}
      />
      <View style={styles.userDotCore} />
    </View>
  );
}

export function UserPinLabel({ label }: { label: string }) {
  return (
    <View pointerEvents="none" style={styles.pinLabelWrap}>
      <View style={styles.pinLabelBubble}>
        <Text style={styles.pinLabelText}>{label}</Text>
      </View>
      <UserPinIcon size={34} />
    </View>
  );
}

const styles = StyleSheet.create({
  pinLabelWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '31%',
    alignItems: 'center',
    transform: [{ translateY: -74 }],
  },
  pinLabelBubble: {
    backgroundColor: colors.ink,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginBottom: 2,
  },
  pinLabelText: {
    color: '#fff',
    fontFamily: fontFamily.bold,
    fontSize: 12,
  },
  userDotCore: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.tiffany,
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
});
