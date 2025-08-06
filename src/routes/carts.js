/**
------------------------------------------------------------ +
Rutas de carritos - Router express 
------------------------------------------------------------ +
src/routes/carts.js 

*/

const express = require('express');
const CartsManager = require('../dao/cartsManager');
const ProductManager = require('../dao/productsManager');

const router = express.Router();

// ------------------------------------------------------------ +
// GET /api/carts - Obtener todos los carritos
router.get('/', async (req, res) => {
    try {
        const carts = await CartsManager.getCarts();
        
        res.json({
            status: 'success',
            data: carts,
            message: 'Carritos obtenidos exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener carritos',
            error: error.message
        });
    }
});

// ------------------------------------------------------------ +
// GET /api/carts/:cid - Obtener carrito por ID
router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await CartsManager.getCartById(cid);
        
        if (!cart) {
            return res.status(404).json({
                status: 'error',
                message: 'Carrito no encontrado'
            });
        }

        res.json({
            status: 'success',
            data: cart
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener carrito',
            error: error.message
        });
    }
});

// ------------------------------------------------------------ +
// POST /api/carts - Crear nuevo carrito
router.post('/', async (req, res) => {
    try {
        const newCart = await CartsManager.createCart();
        
        res.status(201).json({
            status: 'success',
            data: newCart,
            message: 'Carrito creado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al crear carrito',
            error: error.message
        });
    }
});

// ------------------------------------------------------------ +
// POST /api/carts/:cid/product/:pid - Agregar producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity = 1 } = req.body;

        // Verificar que el producto existe
        const product = await ProductManager.getProductById(pid);
        if (!product) {
            return res.status(404).json({
                status: 'error',
                message: 'Producto no encontrado'
            });
        }

        const updatedCart = await CartsManager.addProductToCart(cid, pid, quantity);
        
        res.json({
            status: 'success',
            data: updatedCart,
            message: 'Producto agregado al carrito exitosamente'
        });
    } catch (error) {
        const statusCode = error.message === 'Carrito no encontrado' ? 404 : 400;
        res.status(statusCode).json({
            status: 'error',
            message: 'Error al agregar producto al carrito',
            error: error.message
        });
    }
});

// ------------------------------------------------------------ +
// PUT /api/carts/:cid/product/:pid - Actualizar cantidad de producto en carrito
router.put('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        if (!quantity || isNaN(quantity)) {
            return res.status(400).json({
                status: 'error',
                message: 'La cantidad debe ser un número válido'
            });
        }

        const updatedCart = await CartsManager.updateProductQuantity(cid, pid, quantity);
        
        res.json({
            status: 'success',
            data: updatedCart,
            message: 'Cantidad actualizada exitosamente'
        });
    } catch (error) {
        const statusCode = error.message.includes('no encontrado') ? 404 : 400;
        res.status(statusCode).json({
            status: 'error',
            message: 'Error al actualizar cantidad',
            error: error.message
        });
    }
});

// ------------------------------------------------------------ +
// DELETE /api/carts/:cid/product/:pid - Eliminar producto del carrito
router.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const result = await CartsManager.removeProductFromCart(cid, pid);
        
        res.json({
            status: 'success',
            data: result.cart,
            message: 'Producto eliminado del carrito exitosamente',
            removedProduct: result.removedProduct
        });
    } catch (error) {
        const statusCode = error.message.includes('no encontrado') ? 404 : 500;
        res.status(statusCode).json({
            status: 'error',
            message: 'Error al eliminar producto del carrito',
            error: error.message
        });
    }
});

// ------------------------------------------------------------ +
// DELETE /api/carts/:cid - Vaciar carrito
router.delete('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const clearedCart = await CartsManager.clearCart(cid);
        
        res.json({
            status: 'success',
            data: clearedCart,
            message: 'Carrito vaciado exitosamente'
        });
    } catch (error) {
        const statusCode = error.message === 'Carrito no encontrado' ? 404 : 500;
        res.status(statusCode).json({
            status: 'error',
            message: 'Error al vaciar carrito',
            error: error.message
        });
    }
});

// ------------------------------------------------------------ +
// DELETE /api/carts/:cid/delete - Eliminar carrito completamente
router.delete('/:cid/delete', async (req, res) => {
    try {
        const { cid } = req.params;
        const deletedCart = await CartsManager.deleteCart(cid);
        
        res.json({
            status: 'success',
            data: deletedCart,
            message: 'Carrito eliminado exitosamente'
        });
    } catch (error) {
        const statusCode = error.message === 'Carrito no encontrado' ? 404 : 500;
        res.status(statusCode).json({
            status: 'error',
            message: 'Error al eliminar carrito',
            error: error.message
        });
    }
});

module.exports = router;
