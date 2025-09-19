import * as FileSystem from 'expo-file-system';
import JSZip from 'jszip';
import type { AppStyle, MenuSection } from '../types';

// base files
const baseFiles = (meta: any) => ({
  'package.json': JSON.stringify({
    name: meta.appSlug, version: '1.0.0', private: true, main: 'index.js',
    scripts: { start: 'expo start', android: 'expo run:android', ios: 'expo run:ios' },
    dependencies: { expo: '^54.0.0', react: '19.1.0', 'react-native': '0.81.4', 'expo-router': '~6.0.7', 'expo-status-bar': '~3.0.8' }
  }, null, 2),
  'app.json': JSON.stringify({
    expo: {
      name: meta.name, slug: meta.appSlug, version: '1.0.0', scheme: meta.appSlug, orientation: 'portrait',
      icon: './assets/icon.png', splash: { image: './assets/splash.png', resizeMode: 'cover', backgroundColor: meta.colors.bg },
      plugins: ['expo-router']
    }
  }, null, 2),
  'babel.config.js': `module.exports=function(api){api.cache(true);return{presets:['babel-preset-expo'],plugins:['react-native-worklets/plugin']}}`,
  'index.js': `import 'expo-router/entry';`,
  'README_DEPLOY.md': `1. npm install\n2. npx expo prebuild\n3. npm i -g eas-cli\n4. npx eas build -p android --profile production\n5. npx eas build -p ios --profile production`
});

// pages
const screenHome = (name: string, text: string, style: AppStyle) =>
`import React from 'react';
import { ScrollView, Text, View } from 'react-native';
export default function Home(){
  return (<ScrollView style={{backgroundColor:'${style.colors.bg}'}} contentContainerStyle={{padding:16}}>
    <View style={{padding:16,borderRadius:${style.effects.rounded},backgroundColor:'#00000020',marginBottom:12}}>
      <Text style={{color:'${style.colors.text}',fontSize:28,fontWeight:'800',marginBottom:4}}>${name}</Text>
      <Text style={{color:'${style.colors.muted}'}}>${text}</Text>
    </View>
  </ScrollView>);
}`;

const screenAbout = (about: string, style: AppStyle) =>
`import React from 'react';
import { ScrollView, Text, View } from 'react-native';
export default function About(){
  return (<ScrollView style={{backgroundColor:'${style.colors.bg}'}} contentContainerStyle={{padding:16}}>
    <View style={{padding:16,borderRadius:${style.effects.rounded},backgroundColor:'#00000020'}}>
      <Text style={{color:'${style.colors.text}',fontSize:22,fontWeight:'700',marginBottom:8}}>Chi siamo</Text>
      <Text style={{color:'${style.colors.muted}'}}>${about}</Text>
    </View>
  </ScrollView>);
}`;

const screenMenu = (menu: MenuSection[], style: AppStyle) =>
`import React from 'react';
import { ScrollView, View, Text } from 'react-native';
export default function Menu(){
  return (<ScrollView style={{backgroundColor:'${style.colors.bg}'}} contentContainerStyle={{padding:16}}>
    ${menu.map(sec => `
      <Text style={{color:'${style.colors.text}',fontSize:20,fontWeight:'800',marginTop:16}}>${sec.section}</Text>
      ${sec.items.map(it => `
        <View style={{paddingVertical:8,borderBottomWidth:1,borderColor:'${style.colors.border}'}}>
          <Text style={{color:'${style.colors.text}',fontSize:16,fontWeight:'700'}}>${it.title} - €${it.price}</Text>
          ${it.desc ? `<Text style={{color:'${style.colors.muted}'}}>${it.desc}</Text>` : ``}
          ${(it.ingredients && it.ingredients.length) ? `<Text style={{color:'${style.colors.muted}',fontStyle:'italic'}}>Ingredienti: ${it.ingredients.map(ing => `${ing.name}${ing.allergen ? ' (all.)' : ''}`).join(', ')}</Text>` : ``}
        </View>
      `).join('')}
    `).join('')}
  </ScrollView>);
}`;

const stackLayout = (style: AppStyle) =>
`import { Stack } from 'expo-router';
export default function Layout(){
  return <Stack screenOptions={{ headerStyle:{backgroundColor:'${style.colors.header}'}, headerTintColor:'#fff' }} />;
}`;

const tabsTop = () =>
`import { Tabs } from 'expo-router';
export default function Tabs(){ return (
  <Tabs screenOptions={{ tabBarPosition:'top' }}>
    <Tabs.Screen name='home' options={{title:'Home'}}/>
    <Tabs.Screen name='menu' options={{title:'Menù'}}/>
    <Tabs.Screen name='about' options={{title:'Info'}}/>
  </Tabs>
); }`;

const drawerLayout = () =>
`import { Drawer } from 'expo-router/drawer';
export default function DrawerLayout(){ return (
  <Drawer>
    <Drawer.Screen name="home" options={{title:'Home'}} />
    <Drawer.Screen name="menu" options={{title:'Menù'}} />
    <Drawer.Screen name="about" options={{title:'Info'}} />
  </Drawer>
); }`;

export async function generateZipProject(intent: any) {
  const data = intent;
  const style: AppStyle = data.style ?? data.template; // retro-compat
  const appSlug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const zip = new JSZip();
  const meta = { name: data.name, appSlug, colors: style.colors };

  // base
  const b = baseFiles(meta);
  Object.entries(b).forEach(([p, c]) => zip.file(p, c as string));
  zip.file('assets/icon.png', ''); zip.file('assets/splash.png', '');

  // layout per stile
  switch (style.layout) {
    case 'drawer':
      zip.file('app/_layout.tsx', stackLayout(style));
      zip.file('app/(drawer)/_layout.tsx', drawerLayout());
      zip.file('app/(drawer)/home.tsx', screenHome(data.name, data.homeText, style));
      zip.file('app/(drawer)/menu.tsx', screenMenu(data.menu, style));
      zip.file('app/(drawer)/about.tsx', screenAbout(data.about, style));
      zip.file('app/index.tsx', `export { default } from './(drawer)/_layout';`);
      break;
    case 'bottom-cards':
    case 'hero-scroll':
    case 'tab-top':
    default:
      zip.file('app/_layout.tsx', stackLayout(style));
      // tabs
      zip.file('app/(tabs)/_layout.tsx', tabsTop());
      zip.file('app/(tabs)/home.tsx', screenHome(data.name, data.homeText, style));
      zip.file('app/(tabs)/menu.tsx', screenMenu(data.menu, style));
      zip.file('app/(tabs)/about.tsx', screenAbout(data.about, style));
      zip.file('app/index.tsx', `import { Redirect } from 'expo-router'; export default function Index(){ return <Redirect href="/(tabs)/home" /> }`);
  }

  // build zip
  const content = await zip.generateAsync({ type: 'base64' });
  const target = FileSystem.documentDirectory + appSlug + '.zip';
  await FileSystem.writeAsStringAsync(target, content, { encoding: FileSystem.EncodingType.Base64 });
  return target;
}
