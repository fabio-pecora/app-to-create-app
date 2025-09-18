
import { SessionProvider } from './src/lib/session';
import { Slot } from 'expo-router';

export default function App(){
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
