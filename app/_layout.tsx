import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SessionProvider } from "../src/lib/session";

export default function Layout() {
  return (
    <SessionProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#111827" },
          headerTintColor: "#fff",
        }}
      />
    </SessionProvider>
  );
}
