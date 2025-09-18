
import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export function MenuEditor({ value, onChange }:{ value:any[], onChange:(v:any[])=>void }){
  const addSection = ()=> onChange([ ...value, { section: 'Nuova sezione', items: [] } ]);
  const addItem = (i:number)=>{
    const copy = value.slice();
    copy[i].items.push({ title:'Nuovo piatto', price:0, desc:'' });
    onChange(copy);
  };
  return (
    <View style={{ backgroundColor:'#0b1220', borderRadius:12, padding:12 }}>
      <Text style={{ color:'white', fontSize:18, fontWeight:'700', marginBottom:8 }}>Menù</Text>
      {value.map((sec, i)=> (
        <View key={i} style={{ marginBottom:12, backgroundColor:'#0f172a', borderRadius:12, padding:12 }}>
          <TextInput value={sec.section} onChangeText={(t)=>{ const copy=value.slice(); copy[i].section=t; onChange(copy); }} style={{ backgroundColor:'#1f2937', color:'white', padding:10, borderRadius:10, marginBottom:8 }} />
          {sec.items.map((it:any, j:number)=> (
            <View key={j} style={{ marginBottom:8 }}>
              <TextInput value={it.title} onChangeText={(t)=>{ const c=value.slice(); c[i].items[j].title=t; onChange(c);} } style={{ backgroundColor:'#111827', color:'white', padding:10, borderRadius:10, marginBottom:6 }} />
              <TextInput value={String(it.price)} onChangeText={(t)=>{ const c=value.slice(); c[i].items[j].price=Number(t)||0; onChange(c);} } keyboardType='numeric' style={{ backgroundColor:'#111827', color:'white', padding:10, borderRadius:10, marginBottom:6 }} />
              <TextInput value={it.desc||''} onChangeText={(t)=>{ const c=value.slice(); c[i].items[j].desc=t; onChange(c);} } style={{ backgroundColor:'#111827', color:'white', padding:10, borderRadius:10 }} />
            </View>
          ))}
          <TouchableOpacity onPress={()=> addItem(i)} style={{ backgroundColor:'#374151', padding:10, borderRadius:10, alignItems:'center' }}>
            <Text style={{ color:'white' }}>Aggiungi piatto</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity onPress={addSection} style={{ backgroundColor:'#22c55e', padding:12, borderRadius:12, alignItems:'center' }}>
        <Text style={{ color:'white', fontWeight:'700' }}>Aggiungi sezione</Text>
      </TouchableOpacity>
    </View>
  );
}
