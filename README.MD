
# API de E-commerce - Productos y Carritos

## Objetivos

Desarrollar una API basica con Node.js y Express para la gestión de productos y carritos de compra, con persistencia en sistema de archivos JSON

## Entrega 01
- Curso: Programación Backend I. Desarrollo Avanzado de Backend 
- Comisión 76495 Del 02/07/25 al 04/09/25 Miércoles 20:30 a 22:30h
- Alumno:  Carlos Alfredo santa Cruz
- Profesor: Diego Polverelli - Adjunto o Tutor: Ivan Passalia

---

## Requisitos
- Desarrollo del Servidor
- El servidor debe estar basado en Node.js y Express, y debe escuchar en el puerto 8080. 
- Se deben disponer dos grupos de rutas:  /products y /carts. 
- Estos endpoints estarán implementados con el router de Express

---
## Instalación  ⚙️

1. Clona el repositorio o crea los archivos del proyecto
2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta el servidor:
```bash
# node src/app.js
```

4. Luego podrá acceder a la aplicación desde cualquier navegador en **localhost** desde [http://localhost:8080/](http://localhost:8080/)

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

  - GET /api/products - Obtener todos los productos (con query param limit opcional)
  - GET /api/products/:pid - Obtener producto por ID
  - POST /api/products - Crear nuevo producto

**Ejemplos:**
```bash
  GET http://localhost:8081/api/products?limit=5
  GET http://localhost:8081/api/products/1
```

### Carrito (Carts) (`/api/carts`)
  - GET  /api/carts       - Obtener todos los carritos
  - GET  /api/carts/:cid  - Obtener carrito por ID
  - POST /api/carts       - Crear nuevo carrito
  - POST /api/carts/:cid/product/:pid - Agregar producto al carrito

---
### Librerias utilizadas  📚

- [Express](https://expressjs.com/): Express es un marco de aplicación web Node.js que proporciona un conjunto de características para aplicaciones web y móviles.
- [Node.js](https://nodejs.org/es): Node.js® es un entorno de ejecución de JavaScript que permite a los desarrolladores crear servidores, aplicaciones web, herramientas de línea de comandos y scripts.