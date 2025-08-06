/** 

------------------------------------------------------------ +
Rutas de productos - Router express
------------------------------------------------------------ +

src/routes/products.js 
  
*/
const express = require('express');
const ProductManager = require('../dao/productsManager');

const router = express.Router();

// GET /api/products - Obtener todos los productos (con query param limit opcional)
router.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await ProductManager.getProductsWithLimit(limit);
        
        res.json({
            status: 'success',
            data: products,
            message: limit ? `Mostrando los primeros ${limit} productos` : 'Todos los productos'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener productos',
            error: error.message
        });
    }
});

// GET /api/products/:pid - Obtener producto por ID
router.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await ProductManager.getProductById(pid);
        
        if (!product) {
            return res.status(404).json({
                status: 'error',
                message: 'Producto no encontrado'
            });
        }

        res.json({
            status: 'success',
            data: product
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener producto',
            error: error.message
        });
    }
});

// POST /api/products - Crear nuevo producto
router.post('/', async (req, res) => {
    try {
        const productData = req.body;
        const newProduct = await ProductManager.createProduct(productData);
        
        res.status(201).json({
            status: 'success',
            data: newProduct,
            message: 'Producto creado exitosamente'
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Error al crear producto',
            error: error.message
        });
    }
});

module.exports = router;
