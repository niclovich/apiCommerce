import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class CartsManager {
  constructor() {
    this.cartsPath = path.resolve(__dirname, "../data/carts.json");
    this.productsPath = path.resolve(__dirname, "../data/products.json");
  }

  async #readFile(filePath) {
    try {
      const data = await fs.readFile(filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") return [];
      throw error;
    }
  }

  async #writeFile(filePath, data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  }

  async #calculateTotal(products) {
    const allProducts = await this.#readFile(this.productsPath);
    return products.reduce((sum, item) => {
      const prod = allProducts.find((p) => p.id === item.product);
      return sum + (prod ? prod.price * item.quantity : 0);
    }, 0);
  }

  // Crear carrito
  async createCart() {
    const carts = await this.#readFile(this.cartsPath);

    const newCart = {
      id: carts.length > 0 ? Math.max(...carts.map((c) => c.id)) + 1 : 1,
      products: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "active",
    };

    carts.push(newCart);
    await this.#writeFile(this.cartsPath, carts);
    return newCart;
  }

  // Obtener carrito por ID
  async getCartById(id) {
    const carts = await this.#readFile(this.cartsPath);
    const numericId = Number(id);
    return carts.find((c) => c.id === numericId) || null;
  }

  // Agregar producto al carrito con control de stock
  async addProductToCart(cid, pid, quantity = 1) {
    const carts = await this.#readFile(this.cartsPath);
    const products = await this.#readFile(this.productsPath);

    // Buscar carrito
    const cartIndex = carts.findIndex((c) => c.id === cid);
    if (cartIndex === -1)
      return { error: `No existe el carrito con ID ${cid}` };

    // Verificar que el producto exista
    const productExists = products.find((p) => p.id === pid);
    if (!productExists) return { error: `No existe el producto con ID ${pid}` };

    // 🔹 Verificar stock disponible
    const productStock = productExists.stock;
    if (productStock < quantity) {
      return {
        error: `Stock insuficiente para el producto ${pid}. Stock disponible: ${productStock}`,
      };
    }

    const cart = carts[cartIndex];
    const productIndex = cart.products.findIndex((p) => p.product === pid);

    let message;
    if (productIndex === -1) {
      // Agregar nuevo producto con cantidad
      cart.products.push({ product: pid, quantity });
      message = `Producto ${pid} agregado al carrito ${cid} con cantidad ${quantity}`;
    } else {
      // Incrementar cantidad según lo enviado
      const currentQuantity = cart.products[productIndex].quantity;
      const newQuantity = currentQuantity + quantity;

      if (newQuantity > productStock) {
        return {
          error: `No puedes agregar ${quantity} unidades. Stock disponible: ${
            productStock - currentQuantity
          }`,
        };
      }

      cart.products[productIndex].quantity = newQuantity;
      message = `Cantidad del producto ${pid} incrementada en carrito ${cid} (+${quantity})`;
    }

    cart.updatedAt = new Date().toISOString();
    cart.total = await this.#calculateTotal(cart.products);

    carts[cartIndex] = cart;
    await this.#writeFile(this.cartsPath, carts);

    return { message, cart };
  }

  // Eliminar carrito por ID
  async deleteCart(id) {
    const carts = await this.#readFile(this.cartsPath);
    const index = carts.findIndex((c) => c.id === id);

    if (index === -1)
      return { error: `No se encontró el carrito con ID ${id}` };

    const eliminado = carts.splice(index, 1)[0];
    await this.#writeFile(this.cartsPath, carts);

    return {
      message: `Carrito con ID ${id} eliminado correctamente`,
      deleted: eliminado,
    };
  }
}

export default CartsManager;
