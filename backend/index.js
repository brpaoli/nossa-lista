// backend/index.js
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// Inicialize o Firebase Admin
const serviceAccount = require('./firebaseServiceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

// Exemplo de Rota: Criar um novo mercado
app.post('/market', async (req, res) => {
  try {
    const marketData = req.body;
    const marketRef = db.collection('markets').add(marketData);
    res.status(201).send(`Market criado com ID: ${marketRef.id}`);
  } catch (error) {
    res.status(500).send('Erro ao criar mercado');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
