import CartsManager from "../dao/CartManager.js";
const cartsManager = new CartsManager();
export const createCart = async (req, res) => {
  try {
    const newCart = await cartsManager.createCart();
    res.status(201).json({
      message: "Carrito creado exitosamente",
      cart: newCart,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al crear carrito" });
  }
};

export const getCartById = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartsManager.getCartById(cid);
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener carrito" });
  }
};
export const addProductToCart = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity = 1 } = req.body; // Si no mandás quantity, suma 1 por defecto

  const result = await cartsManager.addProductToCart(Number(cid), Number(pid), Number(quantity));

  if (result.error) {
    return res.status(404).json({ error: result.error });
  }

  res.status(200).json(result); // { message, cart }
};
