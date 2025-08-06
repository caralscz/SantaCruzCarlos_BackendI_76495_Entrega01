
# API de E-commerce - Productos y Carritos

API RESTful desarrollada con Node.js y Express para la gestión de productos y carritos de compra, con persistencia en sistema de archivos.

## ?? Instalación

1. Clona el repositorio o crea los archivos del proyecto
2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta el servidor:
```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

El servidor se ejecutará en `http://localhost:8081`

## ?? Estructura del Proyecto

```
proyecto/
+-- app.js                      # Servidor principal
+-- package.json               # Configuración del proyecto
+-- src/
¦   +-- dao/
¦   ¦   +-- productsManager.js  # Gestión de productos
¦   ¦   +-- cartsManager.js     # Gestión de carritos
¦   +-- routes/
¦   ¦   +-- products.js         # Rutas de productos
¦   ¦   +-- carts.js           # Rutas de carritos
¦   +-- data/
¦       +-- products.json      # Almacén de productos
¦       +-- carts.json         # Almacén de carritos
```

## ??? Endpoints de la API

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

#### `POST /api/products`
Crea un nuevo producto.

**Body (JSON):**
```json
{
  "title": "Producto Ejemplo",
  "description": "Descripción del producto",
  "price": 99.99,
  "thumbnail": "imagen.jpg",
  "code": "PROD001",
  "stock": 50
}
```

#### `PUT /api/products/:pid`
Actualiza un producto existente.

**Body (JSON):**
```json
{
  "title": "Producto Actualizado",
  "price": 89.99,
  "stock": 30
}
```

#### `DELETE /api/products/:pid`
Elimina un producto específico.

**Ejemplo:**
```bash
DELETE http://localhost:8081/api/products/1
```

### Carritos (`/api/carts`)

#### `GET /api/carts`
Obtiene todos los carritos.

**Ejemplo:**
```bash
GET http://localhost:8081/api/carts
```

#### `GET /api/carts/:cid`
Obtiene un carrito específico por ID.

**Ejemplo:**
```bash
GET http://localhost:8081/api/carts/1
```

#### `POST /api/carts`
Crea un nuevo carrito vacío.

**Ejemplo:**
```bash
POST http://localhost:8081/api/carts
```

#### `POST /api/carts/:cid/product/:pid`
Agrega un producto al carrito o incrementa su cantidad si ya existe.

**Body (JSON):**
```json
{
  "quantity": 2
}
```

**Ejemplo:**
```bash
POST http://localhost:8081/api/carts/1/product/1
```

#### `PUT /api/carts/:cid/product/:pid`
Actualiza la cantidad de un producto en el carrito.

**Body (JSON):**
```json
{
  "quantity": 5
}
```

#### `DELETE /api/carts/:cid/product/:pid`
Elimina un producto específico del carrito.

**Ejemplo:**
```bash
DELETE http://localhost:8081/api/carts/1/product/1
```

#### `DELETE /api/carts/:cid`
Vacía el carrito (elimina todos los productos).

**Ejemplo:**
```bash
DELETE http://localhost:8081/api/carts/1
```

#### `DELETE /api/carts/:cid/delete`
Elimina el carrito completamente.

**Ejemplo:**
```bash
DELETE http://localhost:8081/api/carts/1/delete
```
