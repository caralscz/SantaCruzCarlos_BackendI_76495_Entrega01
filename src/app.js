/*
  app.js
*/ 


const express = require('express');
const path = require('path');
const fs = require('fs').promises;

// Importar routers
const productsRoutes = require('./routes/products');  // ('./dao/productsManager');  // ('./src/routes/products'); 
const cartsRoutes = require('./routes/carts');        // ('./dao/cartsManager');     // ('./src/routes/carts'); 

const app = express();
const PORT = 8081;         // colocar puerto 8080 para entregar

// Middleware
app.use(express.json()); // Para interpretar JSON en body
app.use(express.urlencoded({ extended: true }));

// Rutas principales
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

// Ruta de bienvenida: por defecto  
app.get('/', (req, res) => {
  res.json({
        message:'Bienvenido a la API de productos 📦y carritos 🛒',
        endpoints: {
            products: '/api/products',
            carts: '/api/carts'
        }
    });
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Inicializar servidor
async function startServer() {
    app.listen(PORT, () => {   
        console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
        console.log(`📦 Endpoints de productos: http://localhost:${PORT}/api/products`);
        console.log(`🛒 Endpoints de carritos: http://localhost:${PORT}/api/carts`);
    });
}

startServer().catch(console.error);

module.exports = app;