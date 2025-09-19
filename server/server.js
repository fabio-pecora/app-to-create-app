
import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json({ type: '*/*' }));
app.post('/webhook/stripe', (req,res)=>{ console.log('Stripe webhook'); res.json({ok:true}); });
app.get('/', (req,res)=> res.json({ok:true}));
app.listen(8787, ()=> console.log('Server su :8787'));
