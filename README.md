
# Restaurant App Factory (Expo SDK 54)

Pronto per VS Code. Nessun costo, nessun pagamento richiesto per testare.

## Avvio rapido
1) Copia `.env.example` in `.env` e (se vuoi) inserisci URL e ANON KEY di Supabase.
2) Installa e avvia:
   ```bash
   npm install
   npx expo start
   ```
3) Apri con **Expo Go**.

## Note
- Se non metti Supabase, il login usa la modalità locale di test.
- Il pagamento è disattivato di fatto: `EXPO_PUBLIC_STRIPE_CHECKOUT_URL` punta a `https://example.com`.
- Puoi generare lo zip dell'app del ristorante dalla schermata *Post pagamento*.

## Vendita
Quando vorrai vendere, metti un Payment Link Stripe reale in `.env` e (opzionale) collega un webhook nel server di esempio.
