
import { Redirect } from 'expo-router';
import { useSession } from '../src/lib/session';

export default function Index() {
  const { user } = useSession();
  if (!user) return <Redirect href="/(auth)/login" />;
  return <Redirect href="/(tabs)/create" />;
}
