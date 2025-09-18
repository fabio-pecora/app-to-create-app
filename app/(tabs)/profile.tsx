
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useSession } from '../../src/lib/session';

export default function Profile() {
  const { user, saveProfile, profile } = useSession();
  const [businessName, setBusinessName] = useState(profile?.businessName || '');
  const [paymentMethod, setPaymentMethod] = useState(profile?.paymentMethod || 'Stripe Checkout');

  return (
    <View style={{ flex:1, backgroundColor:'#0f172a', padding:16 }}>
      <Text style={{ color:'white', fontSize:20, fontWeight:'700', marginBottom:12 }}>Profilo</Text>
      <Text style={{ color:'#cbd5e1', marginBottom:8 }}>Email</Text>
      <TextInput editable={false} value={user?.email || ''} style={{ backgroundColor:'#1f2937', color:'#9ca3af', padding:12, borderRadius:12, marginBottom:12 }} />

      <Text style={{ color:'#cbd5e1', marginBottom:8 }}>Nome attività</Text>
      <TextInput value={businessName} onChangeText={setBusinessName} style={{ backgroundColor:'#1f2937', color:'white', padding:12, borderRadius:12, marginBottom:12 }} />

      <Text style={{ color:'#cbd5e1', marginBottom:8 }}>Metodo di pagamento</Text>
      <TextInput value={paymentMethod} onChangeText={setPaymentMethod} style={{ backgroundColor:'#1f2937', color:'white', padding:12, borderRadius:12, marginBottom:24 }} />

      <TouchableOpacity onPress={async()=>{ await saveProfile({ businessName, paymentMethod }); Alert.alert('Salvato', 'Profilo aggiornato'); }} style={{ backgroundColor:'#22c55e', padding:14, borderRadius:12, alignItems:'center' }}>
        <Text style={{ color:'white', fontWeight:'700' }}>Salva</Text>
      </TouchableOpacity>
    </View>
  );
}
