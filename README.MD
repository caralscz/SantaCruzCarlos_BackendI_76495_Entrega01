
# API de E-commerce - Productos y Carritos

API desarrollada con Node.js y Express para la gestión de productos y carritos de compra, con persistencia en sistema de archivos JSON

## Instalación

1. Clona el repositorio o crea los archivos del proyecto
2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta el servidor:
```bash
# node src/app.js
```

El servidor se ejecutará en `http://localhost:8080`

## Estructura del Proyecto

```
proyecto/
+-- src/
¦   +-- dao/
¦   ¦   +-- productsManager.js  # Gestión de productos
¦   ¦   +-- cartsManager.js     # Gestión de carritos
¦   +-- routes/
¦   ¦   +-- products.js         # Rutas de productos
¦   ¦   +-- carts.js            # Rutas de carritos
¦   +-- data/
¦       +-- products.json      # Almacén de productos
¦       +-- carts.json         # Almacén de carritos
+-- app.js                      # Servidor principal
+-- package.json                # Configuración del proyecto

```

##  Endpoints de la API

### Productos (`/api/products`)

#### `GET /api/products`
Obtiene todos los productos o un número limitado.
- **Query Parameters:**
  - `limit` (opcional): Número de productos a retornar

**Ejemplo:**
```bash
GET http://localhost:8081/api/products?limit=5
```

#### `GET /api/products/:pid`
Obtiene un producto específico por ID.

**Ejemplo:**
```bash
GET http://localhost:8081/api/products/1
```
