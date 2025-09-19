
import { supabase } from './supabase';
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';
export async function signInWithEmail(email:string, password:string){
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if(error) throw error;
  await SecureStore.setItemAsync('session', JSON.stringify({ email }));
}
export async function signUpWithEmail(email:string, password:string){
  const { error } = await supabase.auth.signUp({ email, password });
  if(error) throw error;
  await SecureStore.setItemAsync('session', JSON.stringify({ email }));
}
export async function signInLocal(email:string, password:string){
  const hash = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, email+password);
  await SecureStore.setItemAsync('session', JSON.stringify({ email, hash }));
}
export async function signOut(){ await SecureStore.deleteItemAsync('session'); }
