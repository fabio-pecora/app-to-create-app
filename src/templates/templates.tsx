import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { AppStyle, StyleId } from '../types';

export const stylesCatalog: AppStyle[] = [
  {
    id: 'neoBistro',
    name: 'Neo Bistro',
    vibe: 'Minimal elegante con tab in alto',
    layout: 'tab-top',
    colors: { bg:'#0f172a', text:'#ffffff', muted:'#cbd5e1', border:'#1f2937', header:'#111827', accent:'#22c55e' },
    effects: { rounded: 14, elevation: 2, shadow: true, parallax: false }
  },
  {
    id: 'streetFood',
    name: 'Street Food',
    vibe: 'Energetico, drawer laterale + badge prezzi',
    layout: 'drawer',
    colors: { bg:'#0b1220', text:'#fef3c7', muted:'#fde68a', border:'#2a1c00', header:'#7c2d12', accent:'#f59e0b' },
    effects: { rounded: 8, elevation: 4, shadow: true, parallax: false }
  },
  {
    id: 'fineDining',
    name: 'Fine Dining',
    vibe: 'Hero + parallax, tipografia serif',
    layout: 'hero-scroll',
    colors: { bg:'#0b1026', text:'#e0e7ff', muted:'#c7d2fe', border:'#1e293b', header:'#111827', accent:'#60a5fa' },
    effects: { rounded: 18, elevation: 1, shadow: false, parallax: true }
  },
  {
    id: 'familyTrattoria',
    name: 'Trattoria',
    vibe: 'Card bottom-heavy + accenti rossi',
    layout: 'bottom-cards',
    colors: { bg:'#1b100f', text:'#ffebe6', muted:'#ffd1c4', border:'#3b2a28', header:'#7a2e1b', accent:'#ef4444' },
    effects: { rounded: 16, elevation: 3, shadow: true, parallax: false }
  },
];

export function StyleCard({
  styleDef, selected, onPress,
}: { styleDef: AppStyle; selected: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 220, height: 120, borderRadius: 16, marginRight: 12,
        backgroundColor: styleDef.colors.bg,
        borderWidth: selected ? 2 : 1,
        borderColor: selected ? styleDef.colors.accent : styleDef.colors.border,
        padding: 12, justifyContent: 'space-between'
      }}
    >
      <Text style={{ color: styleDef.colors.text, fontWeight: '800', fontSize: 16 }}>{styleDef.name}</Text>
      <Text style={{ color: styleDef.colors.muted, fontSize: 12 }}>{styleDef.vibe}</Text>
      <View style={{ flexDirection: 'row', gap: 6, marginTop: 6 }}>
        <View style={{ backgroundColor: styleDef.colors.header, height: 6, flex: 1, borderRadius: 4 }} />
        <View style={{ backgroundColor: styleDef.colors.border, height: 6, flex: 1, borderRadius: 4 }} />
        <View style={{ backgroundColor: styleDef.colors.accent, height: 6, flex: 1, borderRadius: 4 }} />
      </View>
    </TouchableOpacity>
  );
}
