
import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';

export default function Payment() {
  const router = useRouter();
  const url = process.env.EXPO_PUBLIC_STRIPE_CHECKOUT_URL;

  const openCheckout = async () => {
    if (!url) {
      Alert.alert('Config mancante', 'Imposta EXPO_PUBLIC_STRIPE_CHECKOUT_URL in .env');
      return;
    }
    const returnScheme = process.env.EXPO_PUBLIC_RETURN_SCHEME || 'restappfactory';
    const returnUrl = `${returnScheme}://payment/success`;
    const finalUrl = `${url}?prefilled_email=&client_reference_id=${Date.now()}&success_url=${encodeURIComponent(returnUrl)}&cancel_url=${encodeURIComponent(returnUrl)}`;
    await Linking.openURL(finalUrl);
  };

  return (
    <View style={{ flex:1, backgroundColor:'#0f172a', padding:16, justifyContent:'center' }}>
      <Text style={{ color:'white', fontSize:22, fontWeight:'800', marginBottom:12 }}>Pagamento</Text>
      <Text style={{ color:'#cbd5e1', marginBottom:24 }}>Completa il pagamento. Verrai reindirizzato di nuovo in app.</Text>
      <TouchableOpacity onPress={openCheckout} style={{ backgroundColor:'#22c55e', padding:14, borderRadius:12, alignItems:'center' }}>
        <Text style={{ color:'white', fontWeight:'700' }}>Paga ora</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> router.push('/postpay')} style={{ padding:14, alignItems:'center', marginTop:8 }}>
        <Text style={{ color:'#93c5fd' }}>Ho già pagato</Text>
      </TouchableOpacity>
    </View>
  );
}
