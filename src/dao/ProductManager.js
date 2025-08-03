import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ProductoManager {
  constructor() {
    this.rutaDatos = path.resolve(__dirname, '../data/products.json');
  }

  async #readFile() {
    try {
      const data = await fs.readFile(this.rutaDatos, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') return [];
      throw error;
    }
  }

  async #writeFile(data) {
    await fs.writeFile(this.rutaDatos, JSON.stringify(data, null, 2));
  }

  async getAllProducts() {
    return await this.#readFile();
  }

  async getProductById(id) {
    const productos = await this.#readFile();
    return productos.find(p => p.id === id) || null;
  }

  async addProduct(title, description, code, price, status, stock, category, thumbnails) {
    const productos = await this.#readFile();

    if (productos.some(p => p.code === code)) {
      return { error: `Ya existe un producto con el code ${code}` };
    }

    const id = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
    const nuevoProducto = { id, title, description, code, price, status, stock, category, thumbnails };

    productos.push(nuevoProducto);
    await this.#writeFile(productos);
    return nuevoProducto;
  }
}

export default ProductoManager;
