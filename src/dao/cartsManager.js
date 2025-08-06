/*
------------------------------------------------------------ +
CartsManager - Gestion de Carritos
------------------------------------------------------------ +
src/dao/cartsManager.js

            id: Number/String (Autogenerado para asegurar que nunca se dupliquen los ids).   
            products: Array que contendrá objetos que representen cada producto.
                [
                product: Solo debe contener el ID del producto.    
                quantity: Debe contener el número de ejemplares de dicho producto (se agregará de uno en uno). 
                ]


*/ 

const fs = require('fs').promises;
const path = require('path');

class CartsManager {
    static filePath = path.join(__dirname, '../data/carts.json');

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
                // Si no existe, agregarlo
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

    // Actualizar cantidad de producto en carrito
    static async updateProductQuantity(cartId, productId, quantity) {
        try {
            const carts = await this.getCarts();
            const cartIndex = carts.findIndex(c => c.id === parseInt(cartId));
            
            if (cartIndex === -1) {
                throw new Error('Carrito no encontrado');
            }

            const cart = carts[cartIndex];
            const productIndex = cart.products.findIndex(p => p.product === parseInt(productId));

            if (productIndex === -1) {
                throw new Error('Producto no encontrado en el carrito');
            }

            if (parseInt(quantity) <= 0) {
                // Si la cantidad es 0 o menor, eliminar el producto
                cart.products.splice(productIndex, 1);
            } else {
                // Actualizar cantidad
                cart.products[productIndex].quantity = parseInt(quantity);
            }

            // Actualizar timestamp
            cart.timestamp = new Date().toISOString();

            await fs.writeFile(this.filePath, JSON.stringify(carts, null, 2));
            
            return cart;
        } catch (error) {
            console.error('Error al actualizar cantidad del producto:', error);
            throw error;
        }
    }

    // Eliminar producto del carrito
    static async removeProductFromCart(cartId, productId) {
        try {
            const carts = await this.getCarts();
            const cartIndex = carts.findIndex(c => c.id === parseInt(cartId));
            
            if (cartIndex === -1) {
                throw new Error('Carrito no encontrado');
            }

            const cart = carts[cartIndex];
            const productIndex = cart.products.findIndex(p => p.product === parseInt(productId));

            if (productIndex === -1) {
                throw new Error('Producto no encontrado en el carrito');
            }

            // Eliminar producto
            const removedProduct = cart.products.splice(productIndex, 1)[0];
            
            // Actualizar timestamp
            cart.timestamp = new Date().toISOString();

            await fs.writeFile(this.filePath, JSON.stringify(carts, null, 2));
            
            return { cart, removedProduct };
        } catch (error) {
            console.error('Error al eliminar producto del carrito:', error);
            throw error;
        }
    }

    // Vaciar carrito
    static async clearCart(cartId) {
        try {
            const carts = await this.getCarts();
            const cartIndex = carts.findIndex(c => c.id === parseInt(cartId));
            
            if (cartIndex === -1) {
                throw new Error('Carrito no encontrado');
            }

            const cart = carts[cartIndex];
            cart.products = [];
            cart.timestamp = new Date().toISOString();

            await fs.writeFile(this.filePath, JSON.stringify(carts, null, 2));
            
            return cart;
        } catch (error) {
            console.error('Error al vaciar carrito:', error);
            throw error;
        }
    }

    // Eliminar carrito
    static async deleteCart(id) {
        try {
            const carts = await this.getCarts();
            const cartIndex = carts.findIndex(c => c.id === parseInt(id));
            
            if (cartIndex === -1) {
                throw new Error('Carrito no encontrado');
            }

            const deletedCart = carts.splice(cartIndex, 1)[0];
            await fs.writeFile(this.filePath, JSON.stringify(carts, null, 2));
            
            return deletedCart;
        } catch (error) {
            console.error('Error al eliminar carrito:', error);
            throw error;
        }
    }
}

module.exports = CartsManager;
