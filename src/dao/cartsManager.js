/*
------------------------------------------------------------ +
CartsManager - Gestion de Carritos
------------------------------------------------------------ +
src/dao/cartsManager.js

            id: Number/String (Autogenerado para asegurar que nunca se dupliquen los ids).   
            products: Array que contendrá objetos que representen cada producto.
                [
                productId: Solo debe contener el ID del producto.    
                quantity: Debe contener el número de ejemplares de dicho producto (se agregará de uno en uno). 
                ]


*/ 

const fs = require('fs').promises;
const path = require('path');

class CartsManager {
    static filePath = path.join(__dirname, '../data/carts.json');

    // ------------------------------------------------------------ +
    // Obtener todos los carritos
    static async getCarts() {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error al leer carritos:', error);
            return [];
        }
    }

    // ------------------------------------------------------------ +
    // Obtener carrito por ID
    static async getCartById(id) {
        try {
            const carts = await this.getCarts();
            const cart = carts.find(c => c.id === parseInt(id));
            return cart || null;
        } catch (error) {
            console.error('Error al obtener carrito por ID:', error);
            return null;
        }
    }

    // ------------------------------------------------------------ +
    // Crear nuevo carrito
    static async createCart() {
        try {
            const carts = await this.getCarts();
                      
            // Generar nuevo ID
            const newId = carts.length > 0 ? Math.max(...carts.map(c => c.id)) + 1 : 1;
            
            const newCart = {
                id: newId,
                products: [],
                timestamp: new Date().toISOString()
            };

            carts.push(newCart);
            await fs.writeFile(this.filePath, JSON.stringify(carts, null, 2));
            
            return newCart;
        } catch (error) {
            console.error('Error al crear carrito:', error);
            throw error;
        }
    }

    // ------------------------------------------------------------ +
    // Agregar producto al carrito
    static async addProductToCart(cartId, productId, quantity = 1) {
        try {
            const carts = await this.getCarts();
            const cartIndex = carts.findIndex(c => c.id === parseInt(cartId));
            
            if (cartIndex === -1) {
                throw new Error('Carrito no encontrado');
            }

            const cart = carts[cartIndex];
            const existingProductIndex = cart.products.findIndex(p => p.product === parseInt(productId));

            if (existingProductIndex >= 0) {
                // Si el producto ya existe, incrementar la cantidad
                cart.products[existingProductIndex].quantity += parseInt(quantity);
            } else {
                // Si no existe, lo agrego
                cart.products.push({
                    product: parseInt(productId),
                    quantity: parseInt(quantity)
                });
            }

            // Actualizar timestamp
            cart.timestamp = new Date().toISOString();

            await fs.writeFile(this.filePath, JSON.stringify(carts, null, 2));
            
            return cart;
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
            throw error;
        }
    }

}

module.exports = CartsManager;
