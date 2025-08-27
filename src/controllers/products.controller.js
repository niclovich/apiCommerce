import ProductoManager from "../dao/ProductManager.js";
const ProductManager = new ProductoManager();

// referencia a socket.io (inyectada desde app.js)
let io = null;
export const setIO = (ioInstance) => { io = ioInstance; };
const getSocketId = (req) => req.get('x-socket-id') || req.headers['x-socket-id'];

// ---- VISTA REALTIME ----
export const renderRealtimeProducts = async (_req, res) => {
  try {
    const products = await ProductManager.getAllProducts();
    res.render('realtimeproducts', {
      title: 'Productos en tiempo real',
      products
    });
  } catch (error) {
    console.error('❌ Error renderRealtimeProducts:', error.message);
    res.status(500).send('Error al cargar la vista de tiempo real');
  }
};
export const renderNewProduct = (_req, res) => {
  // solo pinta el formulario vacío
  res.render('product-new', { title: 'Registrar producto' });
};

export const renderEditProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const product = await ProductManager.getProductById(id);
    if (!product) return res.status(404).send('Producto no encontrado');

    // Derivo campos formateados para el form
    const priceFmt = Number(product.price ?? 0).toLocaleString('es-AR', { minimumFractionDigits: 2 });
    const thumbsCSV = Array.isArray(product.thumbnails)
      ? product.thumbnails.join(', ')
      : '';

    res.render('product-edit', {
      title: `Actualizar producto #${id}`,
      product: {
        ...product,
        priceFmt,
        thumbsCSV
      }
    });
  } catch (e) {
    console.error('renderEditProduct:', e.message);
    res.status(500).send('Error cargando producto');
  }
};
// ---- API ----

//  Obtener todos los productos
export const getAllProducts = async (_req, res) => {
  try {
    const productos = await ProductManager.getAllProducts();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

//  Obtener producto por ID
export const getProductById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const producto = await ProductManager.getProductById(id);
    if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      title, description, code, price, status, stock, category, thumbnails,
    } = req.body;

    // Validaciones básicas
    if (!title || !code || price === undefined || stock === undefined) {
      return res.status(400).json({ error: "Los campos title, code, price y stock son obligatorios." });
    }
    if (typeof title !== "string" || typeof code !== "string") {
      return res.status(400).json({ error: "title y code deben ser cadenas de texto." });
    }
    if (isNaN(price) || Number(price) < 0) {
      return res.status(400).json({ error: "price debe ser un número mayor o igual a 0." });
    }
    if (isNaN(stock) || Number(stock) < 0) {
      return res.status(400).json({ error: "stock debe ser un número mayor o igual a 0." });
    }

    const nuevo = await ProductManager.addProduct(
      title,
      description || "",
      code,
      parseFloat(price),
      status ?? true,
      parseInt(stock, 10),
      category || "",
      Array.isArray(thumbnails) ? thumbnails : []
    );

    if (nuevo?.error) {
      return res.status(400).json(nuevo);
    }

    // Emitir a todos EXCEPTO al emisor (si tenemos su socketId)
    const socketId = getSocketId(req);
    if (io) {
      if (socketId) {
        io.except(socketId).emit('products:created', nuevo);
      } else {
        // fallback si no nos mandan el header
        io.emit('products:created', nuevo);
      }
    }

    return res.status(201).json({ message: "Producto creado correctamente", product: nuevo });
  } catch (error) {
    console.error("❌ Error en createProduct:", error);
    return res.status(500).json({ error: "Error interno del servidor", details: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id, 10);
    if (isNaN(productId)) return res.status(400).json({ error: "El ID debe ser un número válido." });

    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ error: "Debe enviar al menos un campo para actualizar." });
    }

    // Normalizar numéricos si vienen como string
    if (data.price !== undefined) {
      if (isNaN(data.price) || Number(data.price) < 0) {
        return res.status(400).json({ error: "price debe ser un número mayor o igual a 0." });
      }
      data.price = parseFloat(data.price);
    }
    if (data.stock !== undefined) {
      if (isNaN(data.stock) || Number(data.stock) < 0) {
        return res.status(400).json({ error: "stock debe ser un número mayor o igual a 0." });
      }
      data.stock = parseInt(data.stock, 10);
    }
    if (data.thumbnails && !Array.isArray(data.thumbnails)) {
      return res.status(400).json({ error: "thumbnails debe ser un array de strings." });
    }

    const actualizado = await ProductManager.updateProduct(productId, data);
    if (actualizado.error) return res.status(404).json(actualizado);

    // Emitir a todos EXCEPTO al emisor
    const socketId = getSocketId(req);
    if (io) {
      if (socketId) {
        io.except(socketId).emit('products:updated', actualizado);
      } else {
        io.emit('products:updated', actualizado);
      }
    }

    return res.status(200).json({ message: "Producto actualizado correctamente", product: actualizado });
  } catch (error) {
    console.error("❌ Error en updateProduct:", error);
    return res.status(500).json({ error: "Error interno del servidor", details: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id, 10);
    if (isNaN(productId)) {
      return res.status(400).json({ error: "El ID debe ser un número válido." });
    }

    // Puede devolver, por ejemplo:
    // { deleted: 7 }  ó  { id: 7 }  ó  true/1 (afectados)
    const eliminado = await ProductManager.deleteProduct(productId);
    if (eliminado?.error) {
      return res.status(404).json(eliminado);
    }

    // Normalizo el ID eliminado:
    const id =
      eliminado?.deleted ??
      eliminado?.id ??
      productId; // fallback si el manager no devuelve el id

    // Emitir a todos EXCEPTO al emisor, con un payload unificado
    const socketId = getSocketId(req);
    const payload = { deleted: id };
    if (io) {
      if (socketId) {
        io.except(socketId).emit('products:deleted', payload);
      } else {
        io.emit('products:deleted', payload);
      }
    }

    return res.status(200).json({
      message: "Producto eliminado correctamente",
      deleted: id
    });
  } catch (error) {
    console.error("❌ Error en deleteProduct:", error);
    return res.status(500).json({ error: "Error interno del servidor", details: error.message });
  }
};
