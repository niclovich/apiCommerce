import ProductoManager from "../dao/ProductManager.js";

const ProductManager = new ProductoManager();

//  Obtener todos los productos
export const getAllProducts = async (req, res) => {
  //res.send('Entró a getAllProducts');
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

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    } = req.body;

    if (!title || !code || price === undefined || stock === undefined) {
      return res.status(400).json({
        error: "Los campos title, code, price y stock son obligatorios.",
      });
    }

    if (typeof title !== "string" || typeof code !== "string") {
      return res.status(400).json({
        error: "title y code deben ser cadenas de texto.",
      });
    }

    if (isNaN(price) || price < 0) {
      return res.status(400).json({
        error: "price debe ser un número mayor o igual a 0.",
      });
    }

    if (isNaN(stock) || stock < 0) {
      return res.status(400).json({
        error: "stock debe ser un número mayor o igual a 0.",
      });
    }

    const nuevo = await ProductManager.addProduct(
      title,
      description || "",
      code,
      parseFloat(price),
      status ?? true, // por defecto true si no viene
      parseInt(stock),
      category || "",
      thumbnails || []
    );

    res.status(201).json({
      message: " Producto creado correctamente",
      product: nuevo,
    });
  } catch (error) {
    console.error("❌ Error en createProduct:", error.message);
    res.status(500).json({
      error: "Error interno del servidor",
      details: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productId = parseInt(id, 10);

    if (isNaN(productId)) {
      return res
        .status(400)
        .json({ error: "El ID debe ser un número válido." });
    }

    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ error: "Debe enviar al menos un campo para actualizar." });
    }

    const actualizado = await ProductManager.updateProduct(productId, data);

    if (actualizado.error) {
      return res.status(404).json(actualizado); // Producto no encontrado
    }

    res.status(200).json({
      message: "Producto actualizado correctamente",
      product: actualizado,
    });
  } catch (error) {
    console.error(" Error en updateProduct:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productId = parseInt(id, 10);

    if (isNaN(productId)) {
      return res
        .status(400)
        .json({ error: "El ID debe ser un número válido." });
    }

    const eliminado = await ProductManager.deleteProduct(productId);

    if (eliminado.error) {
      return res.status(404).json(eliminado); // Producto no encontrado
    }

    res.status(200).json({
      message: " Producto eliminado correctamente",
      deleted: eliminado.deleted,
    });
  } catch (error) {
    console.error(" Error en deleteProduct:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
