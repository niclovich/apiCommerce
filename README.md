# apiCommerce 🛒

API REST de ejemplo desarrollada con Node.js + Express usando ES Modules y un JSON local como base de datos.  
Permite realizar operaciones CRUD sobre **productos** y **carritos de compra**.

----------------------------------------------------------
## 📂 Estructura de Carpetas

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
## 🚀 Instalación y Ejecución

### 1️⃣ Clonar el repositorio
git clone https://github.com/usuario/apiCommerce.git
cd apiCommerce

### 2️⃣ Instalar dependencias
npm install

### 3️⃣ Iniciar el servidor
###  Modo desarrollo (con nodemon)
npm run dev

### Modo producción
npm start

### La consola mostrará:
 🚀 Servidor corriendo en http://localhost:3000

----------------------------------------------------------
## ENDPOINTS DISPONIBLES

### 🛍 Productos

| Método | Endpoint                 | Descripción                         |
|--------|-------------------------|-------------------------------------|
| GET    | `/`                     | Prueba de conexión                  |
| GET    | `/api/products`         | Obtiene todos los productos         |
| GET    | `/api/products/:id`     | Obtiene un producto por su ID       |
| POST   | `/api/products`         | Crea un nuevo producto              |

**Ejemplo de producto (JSON):**
echo '{
  "id": 1,
  "products": [
    { "product": 1, "quantity": 2 }
  ],
  "total": 300,
  "createdAt": "2025-08-05T21:00:00.000Z",
  "updatedAt": "2025-08-05T21:10:00.000Z",
  "status": "active"
}' | jq

### 🛒 Carritos

| Método  | Endpoint                                | Descripción                                    |
|---------|----------------------------------------|------------------------------------------------|
| **POST**   | `/api/carts`                            | Crea un nuevo carrito                          |
| **GET**    | `/api/carts/:id`                        | Obtiene un carrito por su ID                   |
| **POST**   | `/api/carts/:cid/products/:pid`         | Agrega un producto al carrito (con control de stock) |
| **DELETE** | `/api/carts/:id`                        | Elimina un carrito por su ID                   |

**Ejemplo de carrito (JSON):**

echo '{
  "id": 1,
  "products": [
    { "product": 1, "quantity": 2 }
  ],
  "total": 300,
  "createdAt": "2025-08-05T21:00:00.000Z",
  "updatedAt": "2025-08-05T21:10:00.000Z",
  "status": "active"
}' | jq-------------------------------------------------
## NOTAS FINALES

- Esta API usa JSON local, ideal para desarrollo rápido sin base de datos real.
- Para entornos productivos, se recomienda usar una base de datos real y variables de entorno.
- Probá los endpoints con Postman, Thunder Client o cURL.

💻 Hecho con Node.js + Express + ❤️
