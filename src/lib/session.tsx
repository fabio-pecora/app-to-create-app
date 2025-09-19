import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import type { AppStyle, MenuSection } from '../types';

type Profile = { businessName?: string; paymentMethod?: string };
type Intent = { name: string; homeText: string; about: string; menu: MenuSection[]; templateId: string; style?: AppStyle };

const Ctx = createContext<any>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile>({});
  const [intentData, setIntentData] = useState<Intent | null>(null);

  useEffect(() => { (async () => { const s = await SecureStore.getItemAsync('session'); if (s) setUser(JSON.parse(s)); })(); }, []);
  const saveProfile = async (p: Profile) => { setProfile(p); await SecureStore.setItemAsync('profile', JSON.stringify(p)); };
  useEffect(() => { (async () => { const p = await SecureStore.getItemAsync('profile'); if (p) setProfile(JSON.parse(p)); })(); }, []);

  const markIntentToPay = async (data: Intent) => { setIntentData(data); await SecureStore.setItemAsync('intent', JSON.stringify(data)); };
  useEffect(() => { (async () => { const d = await SecureStore.getItemAsync('intent'); if (d) setIntentData(JSON.parse(d)); })(); }, []);

  return <Ctx.Provider value={{ user, profile, saveProfile, intentData, markIntentToPay }}>{children}</Ctx.Provider>;
}
export const useSession = () => useContext(Ctx);
