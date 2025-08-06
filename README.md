# **apiCommerce**

API REST de ejemplo desarrollada con **Node.js + Express** usando **ES Modules** y un **JSON local** como base de datos.  
Permite realizar operaciones **CRUD** sobre productos.

---


### **Descripción de carpetas**

- **controllers/** → Lógica de negocio (maneja `req` y `res`)  
- **dao/** → Data Access Object (lectura/escritura de productos en JSON)  
- **routes/** → Define los endpoints de la API  
- **data/** → “Base de datos” local en JSON  
- **app.js** → Configuración principal y arranque del servidor  

---

## **🚀 Instalación y ejecución**

1️⃣ **Clonar el repositorio**
git clone https://github.com/usuario/apiCommerce.git
cd apiCommerce
# apiCommerce

API REST desarrollada con Node.js + Express usando ES Modules y un JSON local como base de datos.  
Permite realizar operaciones CRUD sobre productos.

## Instalación e inicio

Clonar el repositorio:

git clone https://github.com/usuario/apiCommerce.git
cd apiCommerce

Instalar dependencias:

npm install

Instalar nodemon (opcional, para desarrollo):

npm install --save-dev nodemon

Iniciar el servidor en modo desarrollo:

npm run dev

Modo producción:

npm start

La consola mostrará:

🚀 Servidor corriendo en http://localhost:3000
📂 Leyendo JSON desde: D:\Coder\Node\apiCommerce\src\data\products.json

## Endpoints disponibles

1️⃣ GET /

Descripción: Prueba de conexión  
Ejemplo: GET http://localhost:3000/  
Respuesta:  
🚀 Servidor corriendo en http://localhost:3000

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

## Notas finales

- La API usa JSON local, ideal para desarrollo sin base de datos real.
- Para producción se recomienda usar base de datos real y variables de entorno.
- Probá los endpoints con Postman, Thunder Client o cURL.
