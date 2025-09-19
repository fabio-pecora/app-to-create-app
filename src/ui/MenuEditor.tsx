import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import type { MenuSection } from '../types';

export function MenuEditor({ value, onChange }: { value: MenuSection[], onChange: (v: MenuSection[]) => void }) {
  const addSection = () => onChange([...value, { section: 'Nuova sezione', items: [] }]);
  const addItem = (i: number) => {
    const copy = value.slice();
    copy[i].items.push({ title: 'Nuovo piatto', price: 0, desc: '', ingredients: [] });
    onChange(copy);
  };
  const addIngredient = (i: number, j: number) => {
    const copy = value.slice();
    copy[i].items[j].ingredients = copy[i].items[j].ingredients || [];
    copy[i].items[j].ingredients!.push({ name: 'Ingrediente', allergen: false });
    onChange(copy);
  };

  return (
    <View style={{ backgroundColor: '#0b1220', borderRadius: 12, padding: 12 }}>
      <Text style={{ color: 'white', fontSize: 18, fontWeight: '700', marginBottom: 8 }}>Menù</Text>
      {value.map((sec, i) => (
        <View key={i} style={{ marginBottom: 12, backgroundColor: '#0f172a', borderRadius: 12, padding: 12 }}>
          <TextInput
            value={sec.section}
            onChangeText={(t) => { const c = value.slice(); c[i].section = t; onChange(c); }}
            style={{ backgroundColor: '#1f2937', color: 'white', padding: 10, borderRadius: 10, marginBottom: 8 }}
          />
          {sec.items.map((it, j) => (
            <View key={j} style={{ marginBottom: 10, padding: 10, borderRadius: 10, backgroundColor: '#111827' }}>
              <TextInput
                value={it.title}
                onChangeText={(t) => { const c = value.slice(); c[i].items[j].title = t; onChange(c); }}
                placeholder="Nome piatto"
                style={{ backgroundColor: '#0f172a', color: 'white', padding: 10, borderRadius: 8, marginBottom: 6 }}
              />
              <TextInput
                value={String(it.price)}
                onChangeText={(t) => { const c = value.slice(); c[i].items[j].price = Number(t) || 0; onChange(c); }}
                keyboardType="numeric"
                placeholder="Prezzo"
                style={{ backgroundColor: '#0f172a', color: 'white', padding: 10, borderRadius: 8, marginBottom: 6 }}
              />
              <TextInput
                value={it.desc || ''}
                onChangeText={(t) => { const c = value.slice(); c[i].items[j].desc = t; onChange(c); }}
                placeholder="Descrizione"
                style={{ backgroundColor: '#0f172a', color: 'white', padding: 10, borderRadius: 8 }}
              />

              {/* INGREDIENTI */}
              <View style={{ marginTop: 8, gap: 6 }}>
                <Text style={{ color: '#cbd5e1', fontWeight: '700' }}>Ingredienti</Text>
                {(it.ingredients || []).map((ing, k) => (
                  <View key={k} style={{ flexDirection: 'row', gap: 8 }}>
                    <TextInput
                      value={ing.name}
                      onChangeText={(t) => {
                        const c = value.slice();
                        c[i].items[j].ingredients![k].name = t;
                        onChange(c);
                      }}
                      placeholder="Ingrediente"
                      style={{ flex: 1, backgroundColor: '#0f172a', color: 'white', padding: 8, borderRadius: 8 }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        const c = value.slice();
                        c[i].items[j].ingredients![k].allergen = !c[i].items[j].ingredients![k].allergen;
                        onChange(c);
                      }}
                      style={{
                        backgroundColor: (ing.allergen ? '#ef4444' : '#374151'),
                        paddingHorizontal: 10, borderRadius: 8, justifyContent: 'center'
                      }}
                    >
                      <Text style={{ color: 'white' }}>{ing.allergen ? 'Allergene' : 'Normale'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        const c = value.slice();
                        c[i].items[j].ingredients!.splice(k, 1);
                        onChange(c);
                      }}
                      style={{ backgroundColor: '#7f1d1d', paddingHorizontal: 10, borderRadius: 8, justifyContent: 'center' }}
                    >
                      <Text style={{ color: 'white' }}>X</Text>
                    </TouchableOpacity>
                  </View>
                ))}
                <TouchableOpacity
                  onPress={() => addIngredient(i, j)}
                  style={{ backgroundColor: '#374151', padding: 10, borderRadius: 10, alignItems: 'center' }}
                >
                  <Text style={{ color: 'white' }}>Aggiungi ingrediente</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <TouchableOpacity onPress={() => addItem(i)} style={{ backgroundColor: '#374151', padding: 10, borderRadius: 10, alignItems: 'center' }}>
            <Text style={{ color: 'white' }}>Aggiungi piatto</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity onPress={addSection} style={{ backgroundColor: '#22c55e', padding: 12, borderRadius: 12, alignItems: 'center' }}>
        <Text style={{ color: 'white', fontWeight: '700' }}>Aggiungi sezione</Text>
      </TouchableOpacity>
    </View>
  );
}
