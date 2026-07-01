import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function ChevronLeftIcon({ size = 18, color = '#16202B', strokeWidth = 2.4 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M15 5l-7 7 7 7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function ChevronRightIcon({ size = 18, color = '#9AA6B0', strokeWidth = 2.4 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M9 5l7 7-7 7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function JackIcon({ size = 32, color = '#fff' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 2L2 21h20L12 2Z" stroke={color} strokeWidth={2.2} strokeLinejoin="round" />
      <Path d="M12 9v5" stroke={color} strokeWidth={2.2} strokeLinecap="round" />
      <Circle cx={12} cy={17.5} r={1.3} fill={color} />
    </Svg>
  );
}

export function WrenchTruckIcon({ size = 32, color = '#29C9CE' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M3 13h7l2-4h4l3 4v3h-2" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx={7} cy={16} r={2} stroke={color} strokeWidth={2} />
      <Circle cx={17} cy={16} r={2} stroke={color} strokeWidth={2} />
    </Svg>
  );
}

export function ProfileIcon({ size = 20, color = '#16202B' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={8} r={3.4} stroke={color} strokeWidth={2} />
      <Path d="M5 20c0-3.3 3.1-5 7-5s7 1.7 7 5" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function PhoneIcon({ size = 20, color = '#12A7AD' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 5c0 9 6 15 15 15l1-4-5-2-2 2c-2-1-4-3-5-5l2-2-2-5L4 5Z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
    </Svg>
  );
}

export function ChatIcon({ size = 20, color = '#12A7AD' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10Z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
    </Svg>
  );
}

export function ClockIcon({ size = 23, color = '#9AA6B0', filled = false }: IconProps & { filled?: boolean }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={2} fill={filled ? '#E6F8F8' : 'none'} />
      <Path d="M12 7v5l3 2" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function CheckIcon({ size = 16, color = '#12A7AD', strokeWidth = 2.6 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M5 13l4 4 10-10" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function CameraIcon({ size = 20, color = '#12A7AD' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M3 8a2 2 0 012-2h2l1.5-2h7L18 6h2a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V8Z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
      <Circle cx={12} cy={13} r={3.5} stroke={color} strokeWidth={2} />
    </Svg>
  );
}

export function EyeIcon({ size = 20, color = '#9AA6B0' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
      <Circle cx={12} cy={12} r={3} stroke={color} strokeWidth={2} />
    </Svg>
  );
}

export function EyeOffIcon({ size = 20, color = '#12A7AD' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 3l18 18M10.6 10.6A3 3 0 0014 14M9.9 5.2A9.6 9.6 0 0112 5c6 0 10 7 10 7a17 17 0 01-3 3.6M6.3 6.3A16.8 16.8 0 002 12s4 7 10 7a9.5 9.5 0 003.8-.8"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function InfoIcon({ size = 18, color = '#0E7E84' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 8v5" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Circle cx={12} cy={16} r={1.1} fill={color} />
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={2} />
    </Svg>
  );
}

export function PinIcon({ size = 30, color = '#12A7AD' }: IconProps) {
  return (
    <Svg width={size} height={(size * 36) / 30} viewBox="0 0 30 36" fill="none">
      <Path d="M15 1C8 1 2.5 6.3 2.5 13c0 8.5 12.5 22 12.5 22S27.5 21.5 27.5 13C27.5 6.3 22 1 15 1Z" fill={color} />
      <Circle cx={15} cy={13} r={9} fill="#fff" />
      <Path d="M8 15h5l1.4-2.6h3l2 2.6v2h-1.4" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <Circle cx={11} cy={17} r={1.4} stroke={color} strokeWidth={1.4} />
      <Circle cx={18} cy={17} r={1.4} stroke={color} strokeWidth={1.4} />
    </Svg>
  );
}

export function UserPinIcon({ size = 34, color = '#12A7AD' }: IconProps) {
  return (
    <Svg width={size} height={(size * 36) / 30} viewBox="0 0 30 36" fill="none">
      <Path d="M15 1C8 1 2.5 6.3 2.5 13c0 8.5 12.5 22 12.5 22S27.5 21.5 27.5 13C27.5 6.3 22 1 15 1Z" fill={color} />
      <Circle cx={15} cy={13} r={5} fill="#fff" />
    </Svg>
  );
}

export function StarIcon({ size = 40, color = '#E4EAEC' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path d="M12 2l3 6.3 6.9.9-5 4.8 1.2 6.8L12 17.6 5.9 20.8 7.1 14l-5-4.8 6.9-.9L12 2Z" />
    </Svg>
  );
}

export function PlusIconSvg({ size = 20, color = '#12A7AD' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 5v14M5 12h14" stroke={color} strokeWidth={2.4} strokeLinecap="round" />
    </Svg>
  );
}

export function TowIcon({ size = 22, color = '#12A7AD' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M2 14h6l2-3h5l4 3v3h-2" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx={7} cy={17} r={2} stroke={color} strokeWidth={2} />
      <Circle cx={17} cy={17} r={2} stroke={color} strokeWidth={2} />
      <Path d="M2 11h6" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function SwitchRoleIcon({ size = 22, color = '#12A7AD' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 8h12l-3-3M20 16H8l3 3" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function ShieldQuestionIcon({ size = 16, color = '#9AA6B0' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={2} />
      <Path d="M9.5 9.5a2.5 2.5 0 113.5 2.3c-.8.4-1 .8-1 1.7" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Circle cx={12} cy={17} r={1} fill={color} />
    </Svg>
  );
}

export function LocationPersonIcon({ size = 20, color = '#12A7AD' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12Z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
      <Path d="M9.5 10.5l5 0M12 8v5" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function NoSignalIcon({ size = 20, color = '#7A8794' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 4l16 16M8 4c0 4 1 7 3 9M4 8c4 0 7 1 9 3" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function CardIcon({ size = 18, color = '#16202B' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={3} y={6} width={18} height={13} rx={3} stroke={color} strokeWidth={2} />
      <Path d="M3 10h18" stroke={color} strokeWidth={2} />
    </Svg>
  );
}

export function ShieldCheckIcon({ size = 18, color = '#fff' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 2l8 4v6c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-4Z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
      <Path d="M9 12l2 2 4-4" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function SendIcon({ size = 20, color = '#fff' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 12l16-7-7 16-2-7-7-2Z" stroke={color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
    </Svg>
  );
}

export function XIcon({ size = 24, color = '#E8704F' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M6 6l12 12M18 6L6 18" stroke={color} strokeWidth={2.2} strokeLinecap="round" />
    </Svg>
  );
}

export function AccidentIcon({ size = 24, color = '#E8704F' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 3L2 20h20L12 3Z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
      <Path d="M12 10v4" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Circle cx={12} cy={17} r={1.2} fill={color} />
    </Svg>
  );
}

export function TireIcon({ size = 24, color = '#12A7AD' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={2} />
      <Circle cx={12} cy={12} r={3.4} stroke={color} strokeWidth={2} />
    </Svg>
  );
}

export function FuelIcon({ size = 24, color = '#12A7AD' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={5} y={4} width={9} height={16} rx={2} stroke={color} strokeWidth={2} />
      <Path d="M14 9h3v7a2 2 0 01-4 0M8 8h3" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function BatteryIcon({ size = 24, color = '#12A7AD' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={3} y={7} width={16} height={11} rx={2} stroke={color} strokeWidth={2} />
      <Path d="M19 11h2v3h-2M7 4h3M8 4v3" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function KeyIcon({ size = 24, color = '#12A7AD' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={8} cy={8} r={4} stroke={color} strokeWidth={2} />
      <Path d="M11 11l8 8-2 2-2-2 1-1-1-1 1-1" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function OtherIcon({ size = 24, color = '#12A7AD' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 20h4L18 10l-4-4L4 16v4Z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
      <Path d="M13 7l4 4" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function DocIcon({ size = 20, color = '#9AA6B0' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9l-6-6Z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
      <Path d="M14 3v6h6" stroke={color} strokeWidth={2} strokeLinejoin="round" />
    </Svg>
  );
}
