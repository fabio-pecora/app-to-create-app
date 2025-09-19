import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { StyleCard, stylesCatalog } from '../../src/templates/templates';
import { MenuEditor } from '../../src/ui/MenuEditor';
import { Preview } from '../../src/ui/Preview';
import { useSession } from '../../src/lib/session';
import type { MenuSection } from '../../src/types';

export default function Create() {
  const [selected, setSelected] = useState(stylesCatalog[0].id);
  const style = useMemo(() => stylesCatalog.find(s => s.id === selected)!, [selected]);

  const [name, setName] = useState('Il Mio Ristorante');
  const [homeText, setHomeText] = useState('Benvenuto nel nostro ristorante.');
  const [about, setAbout] = useState('Siamo una famiglia che cucina con amore.');
  const [menu, setMenu] = useState<MenuSection[]>([
    {
      section: 'Antipasti',
      items: [{ title: 'Bruschetta', price: 8, desc: 'Pane, pomodoro, basilico', ingredients: [{ name: 'Glutine', allergen: true }, { name: 'Pomodoro' }] }]
    }
  ]);

  const { markIntentToPay } = useSession();

  const dataForPreview = { name, homeText, about, menu, style };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0f172a' }} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ color: 'white', fontSize: 22, fontWeight: '800', marginBottom: 12 }}>1) Scegli lo stile</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
        {stylesCatalog.map(s => (
          <StyleCard key={s.id} styleDef={s} selected={selected === s.id} onPress={() => setSelected(s.id)} />
        ))}
      </ScrollView>

      <Text style={{ color: 'white', fontSize: 22, fontWeight: '800', marginBottom: 12 }}>2) Contenuti base</Text>
      <Text style={{ color: '#cbd5e1', marginBottom: 8 }}>Nome ristorante</Text>
      <TextInput value={name} onChangeText={setName} style={{ backgroundColor: '#1f2937', color: 'white', padding: 12, borderRadius: 12, marginBottom: 12 }} />
      <Text style={{ color: '#cbd5e1', marginBottom: 8 }}>Testo Home</Text>
      <TextInput value={homeText} onChangeText={setHomeText} multiline numberOfLines={3} style={{ backgroundColor: '#1f2937', color: 'white', padding: 12, borderRadius: 12, marginBottom: 12 }} />
      <Text style={{ color: '#cbd5e1', marginBottom: 8 }}>Chi siamo</Text>
      <TextInput value={about} onChangeText={setAbout} multiline numberOfLines={3} style={{ backgroundColor: '#1f2937', color: 'white', padding: 12, borderRadius: 12, marginBottom: 12 }} />

      <MenuEditor value={menu} onChange={setMenu} />

      <Text style={{ color: 'white', fontSize: 18, fontWeight: '700', marginTop: 16, marginBottom: 8 }}>3) Anteprima stile</Text>
      <Preview data={dataForPreview} />

      <TouchableOpacity
        onPress={async () => {
          await markIntentToPay({
            name, homeText, about, menu, templateId: selected, // legacy field
            // salviamo anche lo stile completo
            style
          } as any);
        }}
        style={{ backgroundColor: '#374151', padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 16 }}
      >
        <Text style={{ color: 'white', fontWeight: '700' }}>Salva bozza</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={async () => {
          await markIntentToPay({ name, homeText, about, menu, templateId: selected, style } as any);
        }}
        style={{ backgroundColor: style.colors.accent, padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 12, marginBottom: 28 }}
      >
        <Text style={{ color: 'white', fontWeight: '700' }}>Procedi al pagamento</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
