
import * as FileSystem from 'expo-file-system';
import JSZip from 'jszip';

const baseFiles = (meta:any)=> ({
  'package.json': JSON.stringify({
    name: meta.appSlug,
    version: '1.0.0',
    private: true,
    main: 'index.js',
    scripts: { start: 'expo start', android: 'expo run:android', ios: 'expo run:ios' },
    dependencies: { expo: '^54.0.0', react: '18.2.0', 'react-native': '0.74.2', 'expo-router': '^3.5.16', 'expo-status-bar': '^1.12.1' }
  }, null, 2),
  'app.json': JSON.stringify({ expo: { name: meta.name, slug: meta.appSlug, version:'1.0.0', scheme: meta.appSlug, orientation:'portrait', icon:'./assets/icon.png', splash:{ image:'./assets/splash.png', resizeMode:'cover', backgroundColor: meta.colors.bg }, plugins:[ 'expo-router' ] } }, null, 2),
  'babel.config.js': `module.exports = function(api){ api.cache(true); return { presets:['babel-preset-expo'] }; }` ,
  'index.js': `import 'expo-router/entry';`,
  'README_DEPLOY.md': `1. npm install\n2. npx expo prebuild\n3. npm install -g eas-cli\n4. npx eas build -p android --profile production\n5. npx eas build -p ios --profile production\n6. Pubblica su store seguendo le linee guida.`
});

const screenHome = (data:any)=> `import React from 'react';\nimport { View, Text, ScrollView } from 'react-native';\nexport default function Home(){ return (<ScrollView style={{ backgroundColor:'${data.template.colors.bg}' }} contentContainerStyle={{ padding:16 }}>\n<Text style={{ color:'${data.template.colors.text}', fontSize:28, fontWeight:'800', marginBottom:12 }}>${data.name}</Text>\n<Text style={{ color:'${data.template.colors.muted}', marginBottom:12 }}>${data.homeText}</Text>\n</ScrollView> ); }`;

const screenAbout = (data:any)=> `import React from 'react';\nimport { ScrollView, Text } from 'react-native';\nexport default function About(){ return (<ScrollView style={{ backgroundColor:'${data.template.colors.bg}' }} contentContainerStyle={{ padding:16 }}>\n<Text style={{ color:'${data.template.colors.text}', fontSize:22, fontWeight:'700', marginBottom:8 }}>Chi siamo</Text>\n<Text style={{ color:'${data.template.colors.muted}' }}>${data.about}</Text>\n</ScrollView> ); }`;

const screenMenu = (data:any)=> `import React from 'react';\nimport { ScrollView, View, Text } from 'react-native';\nexport default function Menu(){ return (<ScrollView style={{ backgroundColor:'${data.template.colors.bg}' }} contentContainerStyle={{ padding:16 }}>\n${data.menu.map((sec:any)=>`<Text style={{ color:'${data.template.colors.text}', fontSize:20, fontWeight:'800', marginTop:16 }}>${sec.section}</Text>\n${sec.items.map((it:any)=>`<View style={{ paddingVertical:8, borderBottomWidth:1, borderColor:'${data.template.colors.border}' }}><Text style={{ color:'${data.template.colors.text}', fontSize:16, fontWeight:'700' }}>${it.title} - $${it.price}</Text><Text style={{ color:'${data.template.colors.muted}' }}>${it.desc||''}</Text></View>`).join('\n')}`).join('\n')}\n</ScrollView> ); }`;

const appLayout = (data:any)=> `import { Stack } from 'expo-router';\nexport default function Layout(){ return <Stack screenOptions={{ headerStyle:{ backgroundColor:'${data.template.colors.header}' }, headerTintColor:'#fff' }} /> }`;
const appIndex = ()=> `import { Tabs } from 'expo-router';\nexport default function Tabs(){ return (<Tabs>\n<Tabs.Screen name=\"home\" options={{ title:'Home' }} />\n<Tabs.Screen name=\"menu\" options={{ title:'Menù' }} />\n<Tabs.Screen name=\"about\" options={{ title:'Info' }} />\n</Tabs> ); }`;

export async function generateZipProject(intent:any){
  const data = intent;
  const appSlug = data.name.toLowerCase().replace(/[^a-z0-9]+/g,'-');
  const zip = new JSZip();
  const meta = { name: data.name, appSlug, colors: data.template.colors };

  const files = baseFiles(meta);
  Object.entries(files).forEach(([path, content])=> zip.file(path, content as string));

  zip.file('app/_layout.tsx', appLayout(data));
  zip.file('app/(tabs)/_layout.tsx', '');
  zip.file('app/(tabs)/index.tsx', appIndex());
  zip.file('app/(tabs)/home.tsx', screenHome(data));
  zip.file('app/(tabs)/about.tsx', screenAbout(data));
  zip.file('app/(tabs)/menu.tsx', screenMenu(data));

  zip.file('assets/icon.png', '');
  zip.file('assets/splash.png', '');

  const content = await zip.generateAsync({ type:'base64' });
  const target = FileSystem.documentDirectory + appSlug + '.zip';
  await FileSystem.writeAsStringAsync(target, content, { encoding: FileSystem.EncodingType.Base64 });
  return target;
}
