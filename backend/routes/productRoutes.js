const express = require('express');
const router = express.Router();
const { addProduct, getProducts } = require('../controllers/productController');

// Rota para adicionar um novo produto
router.post('/add', addProduct);

// Rota para listar todos os produtos
router.get('/', getProducts);

module.exports = router;
