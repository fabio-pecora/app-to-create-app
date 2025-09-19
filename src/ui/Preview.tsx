import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import type { AppStyle, MenuSection } from '../types';

type PreviewData = {
  name: string;
  homeText: string;
  about: string;
  menu: MenuSection[];
  style: AppStyle;
};

export function Preview({ data }: { data: PreviewData }) {
  const C = data.style.colors;
  const card = (children: React.ReactNode) => (
    <View style={{ backgroundColor: '#00000020', borderRadius: data.style.effects.rounded, padding: 12, marginBottom: 10 }}>{children}</View>
  );

  // layout-specific mini-mock
  const Header = () => (
    <View style={{ backgroundColor: C.header, padding: 12 }}>
      <Text style={{ color: '#fff', fontWeight: '800' }}>{data.name}</Text>
    </View>
  );

  const Home = () => card(
    <>
      <Text style={{ color: C.text, fontWeight: '700' }}>Home</Text>
      <Text style={{ color: C.muted }}>{data.homeText}</Text>
    </>
  );

  const About = () => card(
    <>
      <Text style={{ color: C.text, fontWeight: '700' }}>Chi siamo</Text>
      <Text style={{ color: C.muted }}>{data.about}</Text>
    </>
  );

  const Menu = () => card(
    <>
      <Text style={{ color: C.text, fontWeight: '700' }}>Menù</Text>
      {data.menu.map((s, i) => (
        <View key={i} style={{ marginTop: 6 }}>
          <Text style={{ color: C.text, fontWeight: '800' }}>{s.section}</Text>
          {s.items.map((it, j) => (
            <View key={j} style={{ paddingVertical: 6, borderBottomWidth: 1, borderColor: C.border }}>
              <Text style={{ color: C.text, fontWeight: '700' }}>{it.title} - €{it.price}</Text>
              {!!it.desc && <Text style={{ color: C.muted }}>{it.desc}</Text>}
              {!!it.ingredients?.length && (
                <Text style={{ color: C.muted, fontStyle: 'italic' }}>
                  Ingredienti: {it.ingredients.map(ing => `${ing.name}${ing.allergen ? ' (all.)' : ''}`).join(', ')}
                </Text>
              )}
            </View>
          ))}
        </View>
      ))}
    </>
  );

  // 4 layout diversi
  const renderByLayout = () => {
    switch (data.style.layout) {
      case 'tab-top':
        return (
          <View style={{ borderWidth: 1, borderColor: C.border, borderRadius: 12, overflow: 'hidden' }}>
            <Header />
            <View style={{ flexDirection: 'row', backgroundColor: C.bg, paddingHorizontal: 8, paddingVertical: 6 }}>
              <Text style={{ color: C.accent, marginRight: 12 }}>HOME</Text>
              <Text style={{ color: C.muted, marginRight: 12 }}>MENÙ</Text>
              <Text style={{ color: C.muted }}>INFO</Text>
            </View>
            <ScrollView style={{ height: 260, backgroundColor: C.bg }} contentContainerStyle={{ padding: 12 }}>
              <Home /><Menu /><About />
            </ScrollView>
          </View>
        );
      case 'drawer':
        return (
          <View style={{ borderWidth: 1, borderColor: C.border, borderRadius: 12, overflow: 'hidden' }}>
            <Header />
            <View style={{ backgroundColor: C.bg, flexDirection: 'row' }}>
              <View style={{ width: 70, backgroundColor: C.header, padding: 8 }}>
                {['HOME', 'MENÙ', 'INFO'].map((t, i) => (
                  <Text key={i} style={{ color: i === 0 ? C.accent : '#fff', marginVertical: 8 }}>{t}</Text>
                ))}
              </View>
              <ScrollView style={{ height: 260, flex: 1, backgroundColor: C.bg }} contentContainerStyle={{ padding: 12 }}>
                <Home /><Menu /><About />
              </ScrollView>
            </View>
          </View>
        );
      case 'hero-scroll':
        return (
          <View style={{ borderWidth: 1, borderColor: C.border, borderRadius: 12, overflow: 'hidden' }}>
            <View style={{ backgroundColor: C.header, padding: 18 }}>
              <Text style={{ color: '#fff', fontWeight: '900', fontSize: 18 }}>{data.name}</Text>
              <Text style={{ color: C.muted }}>Esperienza gourmet</Text>
            </View>
            <ScrollView style={{ height: 260, backgroundColor: C.bg }} contentContainerStyle={{ padding: 12 }}>
              {card(<Text style={{ color: C.text, fontWeight: '800' }}>HERO con parallax</Text>)}
              <Home /><Menu /><About />
            </ScrollView>
          </View>
        );
      case 'bottom-cards':
      default:
        return (
          <View style={{ borderWidth: 1, borderColor: C.border, borderRadius: 12, overflow: 'hidden' }}>
            <Header />
            <ScrollView style={{ height: 260, backgroundColor: C.bg }} contentContainerStyle={{ padding: 12 }}>
              <Home />
              {card(<Text style={{ color: C.text, fontWeight: '800' }}>Promo famiglia</Text>)}
              <Menu />
              <About />
            </ScrollView>
          </View>
        );
    }
  };

  return renderByLayout();
}
