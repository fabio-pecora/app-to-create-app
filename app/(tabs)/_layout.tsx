
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerStyle:{ backgroundColor:'#111827' }, headerTintColor:'#fff', tabBarStyle:{ backgroundColor:'#0b1220' }, tabBarActiveTintColor:'#22c55e' }}>
      <Tabs.Screen name="create" options={{ title:'Crea' }} />
      <Tabs.Screen name="profile" options={{ title:'Profilo' }} />
      <Tabs.Screen name="orders" options={{ title:'Ordini' }} />
    </Tabs>
  );
}
