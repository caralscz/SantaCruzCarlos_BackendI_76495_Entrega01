/* 
------------------------------------------------------------ +
ProductManager - Gestion de productos 
------------------------------------------------------------ +
 src/dao/productsManager.js

        El json de products (../data/products.json) contiene:
          {
            "id":1,
            "category":"RopaBebe",
            "nombreCateg":"Ropa Bebe",   
            "code":"0101",
            "stock":50,
            "price":22885,
            "status":true,
            "description":"Body Manga Larga Bebé Pack X 3",
            "thumbnails":"../imgShop/0101 Body Manga Larga Bebe Pack X 3 _171x221px.png",
            "title":"Body Manga Larga Bebé"
          }

*/

const fs = require('fs').promises;
const path = require('path');

class ProductManager {
    static filePath = path.join(__dirname, '../data/products.json');

    // Obtener todos los productos
    static async getProducts() {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error al leer productos:', error);
            return [];
        }
    }

    // Obtener producto por ID
    static async getProductById(id) {
        try {
            const products = await this.getProducts();
            const product = products.find(p => p.id === parseInt(id));
            return product || null;
        } catch (error) {
            console.error('Error al obtener producto por ID:', error);
            return null;
        }
    }

    // Crear nuevo producto
    static async createProduct(productData) {
        try {
            const products = await this.getProducts();
            
            // Validar campos requeridos
            const { title, description, price, thumbnail, code, stock } = productData;
            if (!title || !description || price === undefined || !code || stock === undefined) {
                throw new Error('Todos los campos son obligatorios: title, description, price, code, stock');
            }

            // Verificar que el código no se repita
            const existingProduct = products.find(p => p.code === code);
            if (existingProduct) {
                throw new Error('El código del producto ya existe');
            }

            // Generar nuevo ID
            const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
            
            const newProduct = {
                id: newId,
                title,
                description,
                price: parseFloat(price),
                thumbnail: thumbnail || '',
                code,
                stock: parseInt(stock),
                status: true
            };

            products.push(newProduct);
            await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
            
            return newProduct;
        } catch (error) {
            console.error('Error al crear producto:', error);
            throw error;
        }
    }

    // Actualizar producto
    static async updateProduct(id, updateData) {
        try {
            const products = await this.getProducts();
            const productIndex = products.findIndex(p => p.id === parseInt(id));
            
            if (productIndex === -1) {
                throw new Error('Producto no encontrado');
            }

            // No permitir actualizar el ID
            delete updateData.id;

            // Si se actualiza el código, verificar que no exista
            if (updateData.code) {
                const existingProduct = products.find(p => p.code === updateData.code && p.id !== parseInt(id));
                if (existingProduct) {
                    throw new Error('El código del producto ya existe');
                }
            }

            // Actualizar producto
            products[productIndex] = { ...products[productIndex], ...updateData };
            
            // Asegurar tipos correctos
            if (updateData.price !== undefined) {
                products[productIndex].price = parseFloat(updateData.price);
            }
            if (updateData.stock !== undefined) {
                products[productIndex].stock = parseInt(updateData.stock);
            }

            await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
            
            return products[productIndex];
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            throw error;
        }
    }

    // Eliminar producto
    static async deleteProduct(id) {
        try {
            const products = await this.getProducts();
            const productIndex = products.findIndex(p => p.id === parseInt(id));
            
            if (productIndex === -1) {
                throw new Error('Producto no encontrado');
            }

            const deletedProduct = products.splice(productIndex, 1)[0];
            await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
            
            return deletedProduct;
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            throw error;
        }
    }

    // Obtener productos con limit
    static async getProductsWithLimit(limit) {
        try {
            const products = await this.getProducts();
            if (limit && !isNaN(limit)) {
                return products.slice(0, parseInt(limit));
            }
            return products;
        } catch (error) {
            console.error('Error al obtener productos con límite:', error);
            return [];
        }
    }
}

module.exports = ProductManager;
