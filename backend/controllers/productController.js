const admin = require('firebase-admin');
const db = admin.firestore();

exports.addProduct = async (req, res) => {
  try {
    const productData = req.body;
    const productRef = await db.collection('products').add(productData);
    res.status(201).send(`Produto criado com ID: ${productRef.id}`);
  } catch (error) {
    res.status(500).send('Erro ao adicionar produto');
  }
};

exports.getProducts = async (req, res) => {
  try {
    const productsSnapshot = await db.collection('products').get();
    const products = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send('Erro ao obter produtos');
  }
};
