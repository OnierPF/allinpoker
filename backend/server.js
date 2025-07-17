const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());

const IA_LEVEL = parseInt(process.env.IA_LEVEL || '50');
const TOKEN_ADMIN = process.env.TOKEN_ADMIN || 'superclave123';
const CURRENCY = process.env.CURRENCY || 'CUP';

let tournaments = [];
let players = [];
let cards = [];
let logs = [];

app.get('/', (req, res) => {
  res.send('AllInPoker Backend Activo');
});

app.post('/admin/login', (req, res) => {
  const { token } = req.body;
  if (token === TOKEN_ADMIN) {
    res.json({ access: true });
  } else {
    res.json({ access: false });
  }
});

app.post('/tournament/create', (req, res) => {
  const { name, prize, blinds } = req.body;
  tournaments.push({ name, prize, blinds });
  res.json({ status: 'torneo creado' });
});

app.get('/ia/evaluate', (req, res) => {
  const { hand, stage } = req.query;
  let equity = Math.floor(Math.random() * IA_LEVEL);
  let suggestion = equity > 50 ? 'raise' : 'fold';
  res.json({ equity: equity + '%', suggestion });
});

app.post('/player/register', (req, res) => {
  const { name } = req.body;
  let stack = 100000;
  players.push({ name, stack });
  res.json({ status: 'registrado', stack });
});

app.get('/logs', (req, res) => {
  res.json({ tournaments, players, cards, logs });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log('Backend AllInPoker activo en puerto', port);
});
