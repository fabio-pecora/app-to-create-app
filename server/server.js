
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';

const app = express();
app.use(cors());
app.use(express.json({ type: '*/*' }));

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

app.post('/webhook/stripe', express.raw({ type: 'application/json' }), (req, res)=>{
  console.log('Ricevuto evento Stripe');
  res.json({ ok:true });
});

app.get('/', (req,res)=> res.json({ ok:true }));

app.listen(8787, ()=> console.log('Server avviato su :8787'));
