
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
export function Preview({ data }:{ data:any }){
  return (
    <View style={{ borderWidth:1, borderColor:'#1f2937', borderRadius:12, overflow:'hidden' }}>
      <View style={{ backgroundColor:data.template.colors.header, padding:12 }}><Text style={{ color:'#fff', fontWeight:'800' }}>{data.name}</Text></View>
      <ScrollView style={{ height:240, backgroundColor:data.template.colors.bg }} contentContainerStyle={{ padding:12 }}>
        <Text style={{ color:data.template.colors.text, fontWeight:'700' }}>Home</Text>
        <Text style={{ color:data.template.colors.muted, marginBottom:8 }}>{data.homeText}</Text>
        <Text style={{ color:data.template.colors.text, fontWeight:'700' }}>Chi siamo</Text>
        <Text style={{ color:data.template.colors.muted, marginBottom:8 }}>{data.about}</Text>
        <Text style={{ color:data.template.colors.text, fontWeight:'700' }}>Menù</Text>
        {data.menu.map((s:any,i:number)=>(
          <View key={i} style={{ marginTop:6 }}>
            <Text style={{ color:data.template.colors.text, fontWeight:'800' }}>{s.section}</Text>
            {s.items.map((it:any,j:number)=>(<Text key={j} style={{ color:data.template.colors.muted }}>{it.title} - ${it.price}</Text>))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
