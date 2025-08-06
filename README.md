# apiCommerce 🛒

API REST de ejemplo desarrollada con Node.js + Express usando ES Modules y un JSON local como base de datos.  
Permite realizar operaciones CRUD sobre **productos** y **carritos de compra**.

----------------------------------------------------------
📂 ESTRUCTURA DE CARPETAS

apiCommerce/
├─ src/
│  ├─ controllers/        # Lógica de negocio (maneja req/res)
│  ├─ dao/                # Data Access Object (lectura/escritura JSON)
│  ├─ routes/             # Endpoints de la API
│  ├─ data/               # “Base de datos” local en JSON
│  └─ app.js              # Configuración principal del servidor
├─ package.json
└─ node_modules/

----------------------------------------------------------
🚀 INSTALACIÓN Y EJECUCIÓN

# 1️⃣ Clonar el repositorio
git clone https://github.com/usuario/apiCommerce.git
cd apiCommerce

# 2️⃣ Instalar dependencias
npm install

# 3️⃣ Iniciar el servidor
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start

# La consola mostrará:
# 🚀 Servidor corriendo en http://localhost:3000
# 📂 Leyendo JSON desde: ./src/data/products.json

----------------------------------------------------------
📡 ENDPOINTS DISPONIBLES

==========================
PRODUCTOS
==========================

1️⃣ GET /
Descripción: Prueba de conexión
Ejemplo: GET http://localhost:3000/
Respuesta:
🚀 Servidor corriendo en http://localhost:3000

----------------------------------------------------------
2️⃣ GET /api/products
Descripción: Obtiene todos los productos
Ejemplo: GET http://localhost:3000/api/products
Respuesta:
[
  {
    "id": 1,
    "title": "Monitor 24\" Full HD",
    "description": "Monitor LED de 24 pulgadas",
    "code": "MON24FHD",
    "price": 150,
    "status": true,
    "stock": 10,
    "category": "Electrónica",
    "thumbnails": ["/images/monitores/monitor24_front.jpg"]
  }
]

----------------------------------------------------------
3️⃣ GET /api/products/:id
Descripción: Obtiene un producto por su ID
Ejemplo: GET http://localhost:3000/api/products/1
Respuesta:
{
  "id": 1,
  "title": "Monitor 24\" Full HD",
  "description": "Monitor LED de 24 pulgadas",
  "code": "MON24FHD",
  "price": 150,
  "status": true,
  "stock": 10,
  "category": "Electrónica",
  "thumbnails": ["/images/monitores/monitor24_front.jpg"]
}

----------------------------------------------------------
4️⃣ POST /api/products
Descripción: Crea un nuevo producto
Body (JSON):
{
  "title": "Teclado Mecánico RGB",
  "description": "Teclado retroiluminado",
  "code": "TECRGB01",
  "price": 80,
  "status": true,
  "stock": 25,
  "category": "Periféricos",
  "thumbnails": ["/images/teclados/teclado_rgb_front.jpg"]
}
Respuesta:
{
  "id": 2,
  "title": "Teclado Mecánico RGB",
  "description": "Teclado retroiluminado",
  "code": "TECRGB01",
  "price": 80,
  "status": true,
  "stock": 25,
  "category": "Periféricos",
  "thumbnails": ["/images/teclados/teclado_rgb_front.jpg"]
}

==========================
CARRITOS
==========================

1️⃣ POST /api/carts
Descripción: Crea un nuevo carrito
Respuesta:
{
  "id": 1,
  "products": [],
  "createdAt": "2025-08-05T21:00:00.000Z",
  "updatedAt": "2025-08-05T21:00:00.000Z",
  "status": "active"
}

----------------------------------------------------------
2️⃣ GET /api/carts/:id
Descripción: Obtiene un carrito por su ID
Ejemplo: GET http://localhost:3000/api/carts/1
Respuesta:
{
  "id": 1,
  "products": [
    { "product": 1, "quantity": 2 }
  ],
  "total": 300,
  "createdAt": "2025-08-05T21:00:00.000Z",
  "updatedAt": "2025-08-05T21:10:00.000Z",
  "status": "active"
}

----------------------------------------------------------
3️⃣ POST /api/carts/:cid/products/:pid
Descripción: Agrega un producto al carrito con control de stock
Body (opcional):
{
  "quantity": 3
}
Respuesta exitosa:
{
  "message": "Producto 1 agregado al carrito 1 con cantidad 3",
  "cart": {
    "id": 1,
    "products": [
      { "product": 1, "quantity": 3 }
    ],
    "total": 450,
    "updatedAt": "2025-08-05T21:15:00.000Z"
  }
}

----------------------------------------------------------
4️⃣ DELETE /api/carts/:id
Descripción: Elimina un carrito por su ID
Respuesta:
{
  "message": "Carrito con ID 1 eliminado correctamente",
  "deleted": { ...carritoEliminado }
}

----------------------------------------------------------
📝 NOTAS FINALES

- Esta API usa JSON local, ideal para desarrollo rápido sin base de datos real.
- Para entornos productivos, se recomienda usar una base de datos real y variables de entorno.
- Probá los endpoints con Postman, Thunder Client o cURL.

💻 Hecho con Node.js + Express + ❤️
