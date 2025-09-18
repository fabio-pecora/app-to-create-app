
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useSession } from '../src/lib/session';
import { generateZipProject } from '../src/lib/generator';
import * as Sharing from 'expo-sharing';

export default function PostPay() {
  const { intentData } = useSession();
  const [busy, setBusy] = useState(false);

  const onGenerate = async () => {
    try {
      setBusy(true);
      const zipPath = await generateZipProject(intentData);
      const canShare = await Sharing.isAvailableAsync();
      if (canShare) await Sharing.shareAsync(zipPath);
      else Alert.alert('Creato', `Pacchetto generato: ${zipPath}`);
    } catch (e) {
      Alert.alert('Errore', String(e));
    } finally {
      setBusy(false);
    }
  };

  if (!intentData) {
    return (
      <View style={{ flex:1, backgroundColor:'#0f172a', padding:16, justifyContent:'center' }}>
        <Text style={{ color:'white' }}>Nessun ordine in corso. Torna alla creazione.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex:1, backgroundColor:'#0f172a', padding:16 }}>
      <Text style={{ color:'white', fontSize:22, fontWeight:'800', marginBottom:12 }}>Grazie per il pagamento</Text>
      <Text style={{ color:'#cbd5e1', marginBottom:24 }}>Genera il pacchetto completo della tua app e condividilo o salvalo.</Text>
      <TouchableOpacity disabled={busy} onPress={onGenerate} style={{ backgroundColor: busy?'#374151':'#22c55e', padding:14, borderRadius:12, alignItems:'center' }}>
        <Text style={{ color:'white', fontWeight:'700' }}>{busy?'Generazione in corso...':'Genera pacchetto'}</Text>
      </TouchableOpacity>
    </View>
  );
}
