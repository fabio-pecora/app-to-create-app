
import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { TemplateCard, templates } from '../../src/templates/templates';
import { MenuEditor } from '../../src/ui/MenuEditor';
import { Preview } from '../../src/ui/Preview';
import { useSession } from '../../src/lib/session';

export default function Create(){
  const [selected,setSelected]=useState(templates[0].id);
  const [name,setName]=useState('Il Mio Ristorante');
  const [homeText,setHomeText]=useState('Benvenuto nel nostro ristorante.');
  const [about,setAbout]=useState('Siamo una famiglia che cucina con amore.');
  const [menu,setMenu]=useState([{section:'Antipasti',items:[{title:'Bruschetta',price:8,desc:'Pane, pomodoro, basilico'}]}]);
  const { markIntentToPay } = useSession();
  const tpl=useMemo(()=>templates.find(t=>t.id===selected)!,[selected]);

  return (
    <ScrollView style={{flex:1,backgroundColor:'#0f172a'}} contentContainerStyle={{padding:16}}>
      <Text style={{color:'white',fontSize:22,fontWeight:'800',marginBottom:12}}>Crea la tua app</Text>

      <Text style={{color:'#cbd5e1',marginBottom:8}}>Nome ristorante</Text>
      <TextInput value={name} onChangeText={setName} style={{backgroundColor:'#1f2937',color:'white',padding:12,borderRadius:12,marginBottom:12}}/>

      <Text style={{color:'#cbd5e1',marginBottom:8}}>Testo Home</Text>
      <TextInput value={homeText} onChangeText={setHomeText} multiline numberOfLines={3} style={{backgroundColor:'#1f2937',color:'white',padding:12,borderRadius:12,marginBottom:12}}/>

      <Text style={{color:'#cbd5e1',marginBottom:8}}>Chi siamo</Text>
      <TextInput value={about} onChangeText={setAbout} multiline numberOfLines={3} style={{backgroundColor:'#1f2937',color:'white',padding:12,borderRadius:12,marginBottom:12}}/>

      <Text style={{color:'white',fontSize:18,fontWeight:'700',marginTop:12,marginBottom:8}}>Template</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginBottom:12}}>
        {templates.map(t=>(<TemplateCard key={t.id} tpl={t} selected={selected===t.id} onPress={()=>setSelected(t.id)} />))}
      </ScrollView>

      <MenuEditor value={menu} onChange={setMenu} />

      <Text style={{color:'white',fontSize:18,fontWeight:'700',marginTop:16,marginBottom:8}}>Anteprima</Text>
      <Preview data={{name,homeText,about,menu,template:tpl}}/>

      <TouchableOpacity onPress={async()=>{ await markIntentToPay({name,homeText,about,menu,templateId:selected}); }} style={{backgroundColor:'#374151',padding:14,borderRadius:12,alignItems:'center',marginTop:16}}><Text style={{color:'white',fontWeight:'700'}}>Salva bozza</Text></TouchableOpacity>

      <TouchableOpacity onPress={async()=>{ await markIntentToPay({name,homeText,about,menu,templateId:selected}); }} style={{backgroundColor:'#22c55e',padding:14,borderRadius:12,alignItems:'center',marginTop:12,marginBottom:28}}><Text style={{color:'white',fontWeight:'700'}}>Procedi al pagamento</Text></TouchableOpacity>
    </ScrollView>
  );
}
