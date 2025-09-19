
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
export const templates=[
  { id:'classic', name:'Classic', colors:{ bg:'#0f172a', text:'#ffffff', muted:'#cbd5e1', border:'#1f2937', header:'#111827' } },
  { id:'light', name:'Light', colors:{ bg:'#ffffff', text:'#111827', muted:'#4b5563', border:'#e5e7eb', header:'#1f2937' } },
  { id:'rust', name:'Rust', colors:{ bg:'#1b100f', text:'#ffebe6', muted:'#ffd1c4', border:'#3b2a28', header:'#7a2e1b' } },
  { id:'emerald', name:'Emerald', colors:{ bg:'#06231f', text:'#d1fae5', muted:'#a7f3d0', border:'#134e4a', header:'#065f46' } },
  { id:'royal', name:'Royal', colors:{ bg:'#0b1026', text:'#e0e7ff', muted:'#c7d2fe', border:'#1e293b', header:'#312e81' } }
];
export function TemplateCard({ tpl, selected, onPress }:{ tpl:any, selected:boolean, onPress:()=>void }){
  return (
    <TouchableOpacity onPress={onPress} style={{ width:160, height:100, borderRadius:12, marginRight:12, backgroundColor: tpl.colors.bg, borderWidth: selected?2:1, borderColor: selected? '#22c55e' : tpl.colors.border, padding:12, justifyContent:'space-between' }}>
      <Text style={{ color: tpl.colors.text, fontWeight:'800' }}>{tpl.name}</Text>
      <View style={{ flexDirection:'row', gap:6 }}>
        <View style={{ backgroundColor: tpl.colors.header, height:6, flex:1, borderRadius:4 }} />
        <View style={{ backgroundColor: tpl.colors.border, height:6, flex:1, borderRadius:4 }} />
        <View style={{ backgroundColor: tpl.colors.muted, height:6, flex:1, borderRadius:4 }} />
      </View>
    </TouchableOpacity>
  );
}
