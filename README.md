
# Restaurant App Factory - Expo Mobile App

App mobile Expo che permette a ristoranti di creare la propria app nativa scegliendo un template, inserendo contenuti e generando un pacchetto zip pronto da pubblicare con EAS Build.

Funzioni chiave:
- Autenticazione con email e password tramite Supabase o modalità locale di test
- Profilo utente con metodi di pagamento, nome attività e impostazioni minime
- Creazione app con 5 template, anteprima in tempo reale, gestione menù con sezioni e voci illimitate
- Pagamento con Stripe Checkout link e ritorno in app via deep link
- Generazione pacchetto Expo completo in formato zip con codice dell'app del ristorante pronto per `eas build`
- Documentazione di deploy inclusa

## Requisiti
- Node 18+
- Expo CLI
- Expo Go aggiornato a SDK 54

## Setup rapido
1. Estrai lo zip in una cartella e aprilo in VS Code
2. Crea `.env` in root con:
   ```
   EXPO_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-KEY
   EXPO_PUBLIC_STRIPE_CHECKOUT_URL=https://checkout.stripe.com/c/YOUR_CHECKOUT_LINK
   EXPO_PUBLIC_RETURN_SCHEME=restappfactory
   ```
   Se non imposti Supabase, il login usa la modalità locale di test

3. Installa e avvia:
   ```bash
   npm install
   npx expo start
   ```

## Flusso
- Crea: scegli template, inserisci nome, testi, menù con sezioni e piatti illimitati
- Pagamento: tocca Paga ora, si apre Stripe Checkout. Al successo torni in app
- Genera pacchetto: post pagamento premi Genera pacchetto. Condivide uno zip con il progetto dell'app del ristorante

## Pubblicazione per il cliente
Nel pacchetto generato è incluso `README_DEPLOY.md`. Passi base:
```bash
npm install
npx expo prebuild
npm install -g eas-cli
npx eas login
npx eas build -p android --profile production
npx eas build -p ios --profile production
```

## Backend opzionale
Nella cartella `server/` trovi un esempio Express per webhook Stripe.
