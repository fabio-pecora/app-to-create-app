
import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function Support() {
  return (
    <ScrollView style={{ flex:1, backgroundColor:'#0f172a' }} contentContainerStyle={{ padding:16 }}>
      <Text style={{ color:'white', fontSize:22, fontWeight:'800', marginBottom:12 }}>Supporto</Text>
      <Text style={{ color:'#cbd5e1', marginBottom:8 }}>Documentazione di pubblicazione</Text>
      <Text style={{ color:'#cbd5e1' }}>
        1. Apri lo zip generato in una nuova cartella.
        2. Esegui npm install.
        3. EAS Build per ottenere i binari firmati.
        4. Crea schede app su App Store Connect e Google Play Console.
        5. Carica i pacchetti e completa le informazioni richieste.
      </Text>
    </ScrollView>
  );
}
