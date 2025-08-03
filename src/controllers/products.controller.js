import ProductoManager from '../dao/ProductManager.js';

const ProductManager = new ProductoManager();

//  Obtener todos los productos
export const getAllProducts = async (req, res) => {
  //res.send('Entró a getAllProducts');

  const productos = await ProductManager.getAllProducts();
  res.json(productos);
};

//  Obtener producto por ID
export const getProductById = async (req, res) => {
  const id = parseInt(req.params.id);
  const producto = await ProductManager.getProductById(id);

  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(producto);
};

//  Crear producto nuevo
export const createProduct = async (req, res) => {
  const { title, description, code, price, status, stock, category, thumbnails } = req.body;
  const nuevo = await ProductManager.addProduct(
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails || []
  );

  res.status(201).json(nuevo);
};
