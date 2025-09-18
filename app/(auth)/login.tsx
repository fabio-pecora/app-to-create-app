
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { signInWithEmail, signUpWithEmail, signInLocal } from '../../src/lib/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');
  const router = useRouter();

  const onSubmit = async () => {
    try {
      if (process.env.EXPO_PUBLIC_SUPABASE_URL && process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY) {
        if (mode === 'login') await signInWithEmail(email, password);
        else await signUpWithEmail(email, password);
      } else {
        await signInLocal(email, password);
      }
      router.replace('/(tabs)/create');
    } catch (e) {
      Alert.alert('Errore', e.message);
    }
  };

  return (
    <View style={{ flex:1, backgroundColor:'#0f172a', padding:24, justifyContent:'center' }}>
      <Text style={{ color:'white', fontSize:28, fontWeight:'800', marginBottom:24 }}>Restaurant App Factory</Text>
      <Text style={{ color:'#cbd5e1', marginBottom:8 }}>Email</Text>
      <TextInput value={email} onChangeText={setEmail} autoCapitalize='none' keyboardType='email-address' style={{ backgroundColor:'#1f2937', color:'white', padding:12, borderRadius:12, marginBottom:12 }} />
      <Text style={{ color:'#cbd5e1', marginBottom:8 }}>Password</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry style={{ backgroundColor:'#1f2937', color:'white', padding:12, borderRadius:12, marginBottom:24 }} />

      <TouchableOpacity onPress={onSubmit} style={{ backgroundColor:'#22c55e', padding:14, borderRadius:12, alignItems:'center' }}>
        <Text style={{ color:'white', fontWeight:'700' }}>{mode==='login' ? 'Accedi' : 'Registrati'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> setMode(mode==='login'?'signup':'login')} style={{ padding:14, alignItems:'center' }}>
        <Text style={{ color:'#93c5fd' }}>{mode==='login' ? 'Crea un account' : 'Hai già un account? Accedi'}</Text>
      </TouchableOpacity>

      <Link href="/support" style={{ color:'#cbd5e1', textAlign:'center', marginTop:8 }}>Serve aiuto?</Link>
    </View>
  );
}
